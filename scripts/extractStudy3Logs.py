#!/usr/bin/env python

# import argparse
import json
import os
import shutil
import sys

import firebase_admin
from firebase_admin import firestore

from shared import (
    META_DATA_FLDS, JSON_FLDS, DEVEL_CLASS_CODES, get_file_path
)

def fix_di_test_data(dct):
    # fix event types REVEAL_STAT and DATA_SORTED to use 'timestamp' as name of
    # ts field rather than 'time'
    events = dct.pop("events", None)
    # print(json.dumps(events, indent=4))
    new_events = []
    for event in events:
        if event["type"] in ["REVEAL_STAT", "DATA_SORTED"]:
            ts = event.pop("time")
            event["timestamp"] = ts
        new_events.append(event)
    dct["events"] = new_events
    # print(json.dumps(dct, indent=4))
    # sys.exit(0)
    return dct

def fix_di_instruction_data(dct):
    # SUBMIT_ANSWER events are listed as "action_type" rather than type
    events = dct.pop("events", None)
    # print(json.dumps(events, indent=4))
    new_events = []
    for event in events:
        if "action_type" in event:
            at = event.pop("action_type")
            event["type"] = at
        new_events.append(event)
    dct["events"] = new_events
    # print(json.dumps(dct, indent=4))
    # sys.exit(0)
    return dct

out_path = get_file_path()
exists = os.path.exists(out_path)
if not exists:
    os.makedirs(out_path)
else:
    shutil.rmtree(out_path)
    os.makedirs(out_path)


default_app = firebase_admin.initialize_app()
db = firestore.client()
snapshot = db.collection("STUDY_3")

for doc in snapshot.get():
    data = doc.to_dict()
    userid = data.get("userID")
    class_code = data.get("classCode", None)
    if class_code is None or class_code in DEVEL_CLASS_CODES:
        continue
    user_data = {
        fld: data[fld]
        for fld in META_DATA_FLDS
    }
    for fld in JSON_FLDS:
        raw_data = data.get(fld, None)
        if raw_data is not None:
            val = json.loads(raw_data)
            # val *should* be dict or sequence, but there was an early bug
            # where data got double-json-encoded, so I may need to
            # double-de-encode
            if isinstance(val, str):
                val = json.loads(val)
            #FIXME do munging of val prior to assigning to user_data[fld]
            # so that it is persisted in .json files and analysis can be done
            # with fixes already in place
            # print(fld)
            if fld in ["diPreTest", "diPostTest", "diCrystalGrowthTest"]:
                val = fix_di_test_data(val)
            elif "diInstruction" == fld:
                val = fix_di_instruction_data(val)

            user_data[fld] = val
    file_name = "%s.json" % userid
    file_path = os.path.join(out_path, file_name)
    with open(file_path, "w") as fh:
        # print("dumping", userid)
        json.dump(user_data, fh, indent=4)
# print("complete")

# def get_user_data(doc):
#     data = doc.to_dict()
#     userData = {}
#     for fld in META_DATA_FLDS:
#         userData[fld] = data.pop(fld)
#     userData["completedAssignments"] = json.loads(
#         data.pop("completedAssignments")
#     )
#     for key in JSON_KEYS:
#         if key in data:
#             # print("found", key)
#             text = data.pop(key)
#             actData = json.loads(text)
#             # old version of my isp-data was double-jsonifying data so
#             # that it was escaped.  if we still have a string, decode it
#             # one more time
#             if isinstance(actData, str):
#                 actData = json.loads(actData)
#             userData[key] = actData
#             # print("\n\n%s\n=============" % key)
#             # print(text)
#             # obj = json.loads(text)
#             # print(json.dumps(obj))
#     # if data:
#     #     print(sorted(data.keys()))
#     return userData


# def get_user_flds(doc):
#     data = get_user_data(doc)
#     return { k: data[k]
#         for k in ["classCode", "FN", "LN", "MON", "DAY", "userID"]
#     }

# def get_users(config):
#     users = []
#     snapshot = db.collection("STUDY_3")
#     # print(vars(snapshot))
#     for constraint in config["fetch_constraints"]:
#         # print(constraint)
#         snapshot = snapshot.where(constraint["fld_name"],
#                                   constraint["op"],
#                                   constraint["fld_val"])
#         # print(vars(snapshot))
#     # users = snapshot.get()
#     for doc in snapshot.get():
#         if "study_data" != doc.id:
#             userData = get_user_data(doc)
#             if config["completed_assignments_only"]:
#                 if len(userData["completedAssignments"]) > 7:
#                     users.append(userData)
#             else:
#                 users.append(userData)

#     # print(users)
#     return users



# # def find_dups(user):
# #     # for user in users:
# #     # print(user)
# #     snapshot = db.collection("STUDY_3") \
# #                  .where("FN", "==", user['FN']) \
# #                  .where("LN", "==", user['LN']) \
# #                  .where("MON", "==", user['MON']) \
# #                  .where("DAY", "==", user['DAY']) \
# #                  .get()
# #     # print("============================")
# #     size = len(snapshot)
# #     if 1 == size:
# #         doc = snapshot[0]
# #         uid = doc.id
# #         print("setting classcode for user %s to TEST" % uid)
# #         db.collection("STUDY_3").document(uid).update({"classCode": "TEST"})
# #     else:
# #         print("have duplicate user flds for %s", user)
# #     # for doc in snapshot:
# #     #     print(get_user_flds(doc))
# #     print()

# # users = get_study3_users()
# # for u in users:
# #     find_dups(u)
# #
# # data = get_specific_user("USER124_1")
# # print(json.dumps(data['matsPre'], indent=4))



# def list_meta_data(config, data):
#     text = "userId: %s " % data["userID"]
#     # data = doc.to_dict()

#     for fld_name in META_DATA_FLDS:
#         # try:
#         fld_value = data[fld_name]
#         if fld_name == "completedAssignments":
#             fld_value = len(data["completedAssignments"])
#             text += "# completedAssignments: %s" % fld_value
#         else:
#             text += "%s: %s " % (fld_name, fld_value)
#         # except KeyError as ke:
#         #     print("KEY_ERROR: (%s, %s, %s)" % (ke, doc.id, data))
#         #     sys.exit(1)
#     # if "completedAssignments" in data:
#     #     completed = data["completedAssignments"]
#     #     text += "# completedAssignments: %s " % completed)
#     print(text)


# def dump_json(config, data):
#     if "out_dir" not in config or config['out_dir'] is None:
#         print("ERROR --out-dir must be specified when using --action=dump-json")
#         sys.exit(0)
#     out_dir = config['out_dir']
#     if not os.path.exists(out_dir):
#         os.makedirs(out_dir, exist_ok=True)
#     full_path = os.path.join(out_dir, "%s.json" % data["userID"])
#     with open(full_path, "w") as fh:
#         json.dump(data, fh, indent=4)

# def get_config():
#     config = {
#         "fetch_constraints": [],
#         "action": None
#     }

#     parser = argparse.ArgumentParser()
#     parser.add_argument("--class-code",
#                         required=False,
#                         default="STUDY3")
#     parser.add_argument("--action",
#                         choices=["list-meta-data", "dump-json"],
#                         required=False,
#                         default="list-meta-data")
#     parser.add_argument("--fn", required=False, default="")
#     parser.add_argument("--ln", required=False, default="")
#     parser.add_argument("--mon", required=False, default="")
#     parser.add_argument("--day", required=False, default="")
#     parser.add_argument("--out-dir", required=False, default=None)
#     parser.add_argument("--completed", action="store_true", default=False)
#     args = parser.parse_args()
#     # print(args)
#     dct = vars(args)
#     for key in dct:
#         val = dct[key]
#         if val is None:
#             continue
#             # print("%s is None" % key)
#             # sys.exit(0)
#         if "class_code" == key:
#             if "" != val:
#                 config["fetch_constraints"].append({
#                     "fld_name": "classCode", "op": "==", "fld_val": val
#                 })
#         elif "action" == key:
#             config["action"] = \
#                 dump_json if val == "dump-json" else list_meta_data
#         elif "completed" == key:
#             config["completed_assignments_only"] = val
#         elif "out_dir" == key and val is not None:
#             config["out_dir"] = os.path.expanduser(val)
#         elif dct[key] != "":
#             config["fetch_constraints"].append({
#                 "fld_name": key.upper(), "op": "==", "fld_val": val.upper()
#             })

#     # print(config)
#     # sys.exit(0)
#     return config


# CONFIG = get_config()
# print(CONFIG)
# SNAPSHOT = get_users(CONFIG)
# # print(SNAPSHOT)
# for user_doc in SNAPSHOT:
#     # print(user_doc)
#     CONFIG["action"](CONFIG, user_doc) # pylint:disable=not-callable

# # for constraint in CONFIG["fetch_constraints"]:
#     # print(constraint)
# # print(CONFIG)

# # cursor = apply_constraints(constraints)


# # USERS = []:
# # USERS = get_all_users()

# # print(json.dumps(USERS, indent=4))
