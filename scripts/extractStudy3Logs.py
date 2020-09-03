#!/usr/bin/env python

import argparse
import json
import os
import sys

import firebase_admin
from firebase_admin import firestore

MATS = {
    "ANS": {
        "1": "Strongly Disagree",
        "2": "Disagree",
        "3": "Neither Agree nor Disagree",
        "4": "Agree",
        "5": "Strongly Agree"
    },
    "PRE": {
        "Q1": "<p>I have a good feeling about science:</p>",
        "Q2": "<p>Science is useful for solving problems in everyday life:</p>",
        "Q3": "<p>I do not do very well in science:</p>",
        "Q4": "<p>Science is interesting to me:</p>",
        "Q5": "<p>Science is one of my least favorite subjects:</p>",
        "Q6": "<p>Science is something that I enjoy very much:</p>",
        "Q7": "<p>I have a strong desire to learn science:</p>",
        "Q8": "<p>I feel tense when someone talks to me about science:</p>",
        "Q9": "<p>Most people should study some science:</p>",
        "Q10": "<p>Science is easy for me:</p>",
        "Q11": "<p>Science is helpful in understanding today's world:</p>",
        "Q12": "<p>I usually understand what we are talking about in science:</p>",
        "Q13": "<p>Sometimes I read ahead in our science book:</p>",
        "Q14": "<p>It makes me nervous to even think about doing science experiments:</p>"
    },
    "POST": {
        "Q1": "<p>It makes me nervous to even think about doing science experiments:</p>",
        "Q2": "<p>Sometimes I read ahead in our science book:</p>",
        "Q3": "<p>I usually understand what we are talking about in science:</p>",
        "Q4": "<p>Science is helpful in understanding today's world:</p>",
        "Q5": "<p>Science is easy for me:</p>",
        "Q6": "<p>Most people should study some science:</p>",
        "Q7": "<p>I feel tense when someone talks to me about science:</p>",
        "Q8": "<p>I have a strong desire to learn science:</p>",
        "Q9": "<p>Science is something that I enjoy very much:</p>",
        "Q10": "<p>Science is one of my least favorite subjects:</p>",
        "Q11": "<p>Science is interesting to me:</p>",
        "Q12": "<p>I do not do very well in science:</p>",
        "Q13": "<p>Science is useful for solving problems in everyday life:</p>",
        "Q14": "<p>I have a good feeling about science:</p>"
    }
}

JSON_KEYS = [
    "matsPre", "diPreTest",
    "rqted",  "hypoWE", "diInstruction", "diCrystalGrowthTest",
    "diPostTest", "matsPost"
]

META_DATA_FLDS = ["classCode", "FN", "LN", "MON", "DAY", "completedAssignments"]

default_app = firebase_admin.initialize_app()

db = firestore.client()



def get_user_data(doc):
    data = doc.to_dict()
    userData = {
        "userID": data.pop("userID"),
        "classCode": data.pop("classCode"),
        "condition": data.pop("condition"),
        "FN": data.pop("FN"),
        "LN": data.pop("LN"),
        "MON": data.pop("MON"),
        "DAY": data.pop("DAY"),
        "completedAssignments": json.loads(data.pop("completedAssignments"))
    }
    # print(doc.id)

    # print(data.keys())
    for key in JSON_KEYS:
        if key in data:
            # print("found", key)
            text = data.pop(key)
            actData = json.loads(text)
            # old version of my isp-data was double-jsonifying data so
            # that it was escaped.  if we still have a string, decode it
            # one more time
            if isinstance(actData, str):
                actData = json.loads(actData)
            userData[key] = actData
            # print("\n\n%s\n=============" % key)
            # print(text)
            # obj = json.loads(text)
            # print(json.dumps(obj))
    if data:
        print(sorted(data.keys()))

    return userData


def get_user_flds(doc):
    data = get_user_data(doc)
    return { k: data[k]
        for k in ["classCode", "FN", "LN", "MON", "DAY", "userID"]
    }

def get_users(config):
    users = []
    snapshot = db.collection("STUDY_3")
    # print(vars(snapshot))
    for constraint in config["fetch_constraints"]:
        # print(constraint)
        snapshot = snapshot.where(constraint["fld_name"],
                                  constraint["op"],
                                  constraint["fld_val"])
        # print(vars(snapshot))
    # users = snapshot.get()
    for doc in snapshot.get():
        if "study_data" != doc.id:
            userData = get_user_data(doc)
            if config["completed_assignments_only"]:
                if len(userData["completedAssignments"]) > 7:
                    users.append(userData)
            else:
                users.append(userData)

    # print(users)
    return users



# def find_dups(user):
#     # for user in users:
#     # print(user)
#     snapshot = db.collection("STUDY_3") \
#                  .where("FN", "==", user['FN']) \
#                  .where("LN", "==", user['LN']) \
#                  .where("MON", "==", user['MON']) \
#                  .where("DAY", "==", user['DAY']) \
#                  .get()
#     # print("============================")
#     size = len(snapshot)
#     if 1 == size:
#         doc = snapshot[0]
#         uid = doc.id
#         print("setting classcode for user %s to TEST" % uid)
#         db.collection("STUDY_3").document(uid).update({"classCode": "TEST"})
#     else:
#         print("have duplicate user flds for %s", user)
#     # for doc in snapshot:
#     #     print(get_user_flds(doc))
#     print()

# users = get_study3_users()
# for u in users:
#     find_dups(u)
#
# data = get_specific_user("USER124_1")
# print(json.dumps(data['matsPre'], indent=4))



def list_meta_data(config, data):
    text = "userId: %s " % data["userID"]
    # data = doc.to_dict()

    for fld_name in META_DATA_FLDS:
        # try:
        fld_value = data[fld_name]
        if fld_name == "completedAssignments":
            fld_value = len(data["completedAssignments"])
            text += "# completedAssignments: %s" % fld_value
        else:
            text += "%s: %s " % (fld_name, fld_value)
        # except KeyError as ke:
        #     print("KEY_ERROR: (%s, %s, %s)" % (ke, doc.id, data))
        #     sys.exit(1)
    # if "completedAssignments" in data:
    #     completed = data["completedAssignments"]
    #     text += "# completedAssignments: %s " % completed)
    print(text)


def dump_json(config, data):
    if "out_dir" not in config or config['out_dir'] is None:
        print("ERROR --out-dir must be specified when using --action=dump-json")
        sys.exit(0)
    out_dir = config['out_dir']
    if not os.path.exists(out_dir):
        os.makedirs(out_dir, exist_ok=True)
    full_path = os.path.join(out_dir, "%s.json" % data["userID"])
    with open(full_path, "w") as fh:
        json.dump(data, fh, indent=4)

def get_config():
    config = {
        "fetch_constraints": [],
        "action": None
    }

    parser = argparse.ArgumentParser()
    parser.add_argument("--class-code",
                        required=False,
                        default="STUDY3")
    parser.add_argument("--action",
                        choices=["list-meta-data", "dump-json"],
                        required=False,
                        default="list-meta-data")
    parser.add_argument("--fn", required=False, default="")
    parser.add_argument("--ln", required=False, default="")
    parser.add_argument("--mon", required=False, default="")
    parser.add_argument("--day", required=False, default="")
    parser.add_argument("--out-dir", required=False, default=None)
    parser.add_argument("--completed", action="store_true", default=False)
    args = parser.parse_args()
    # print(args)
    dct = vars(args)
    for key in dct:
        val = dct[key]
        if val is None:
            continue
            # print("%s is None" % key)
            # sys.exit(0)
        if "class_code" == key:
            if "" != val:
                config["fetch_constraints"].append({
                    "fld_name": "classCode", "op": "==", "fld_val": val
                })
        elif "action" == key:
            config["action"] = \
                dump_json if val == "dump-json" else list_meta_data
        elif "completed" == key:
            config["completed_assignments_only"] = val
        elif "out_dir" == key and val is not None:
            config["out_dir"] = os.path.expanduser(val)
        elif dct[key] != "":
            config["fetch_constraints"].append({
                "fld_name": key.upper(), "op": "==", "fld_val": val.upper()
            })

    # print(config)
    # sys.exit(0)
    return config


CONFIG = get_config()
print(CONFIG)
SNAPSHOT = get_users(CONFIG)
# print(SNAPSHOT)
for user_doc in SNAPSHOT:
    # print(user_doc)
    CONFIG["action"](CONFIG, user_doc) # pylint:disable=not-callable

# for constraint in CONFIG["fetch_constraints"]:
    # print(constraint)
# print(CONFIG)

# cursor = apply_constraints(constraints)


# USERS = []:
# USERS = get_all_users()

# print(json.dumps(USERS, indent=4))
