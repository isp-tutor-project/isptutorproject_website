#!/usr/bin/env python3

import glob
import json
import os
import sys

from box import Box
from box.exceptions import BoxValueError
# import firebase_admin
# from firebase_admin import firestore
import xlsxwriter

from shared import (
    DEVEL_CLASS_CODES, META_DATA_FLDS, JSON_FLDS, get_file_path
)

# default_app = firebase_admin.initialize_app()
# db = firestore.client()
# snapshot = db.collection("STUDY_3")

data_path = get_file_path()
if not os.path.exists(data_path):
    print("ERROR: %s does not exist" % data_path)
    sys.exit(1)

rows = []
for file_name in glob.glob("%s/*.json" % data_path):
    with open(file_name, "r") as fh:
        user_data = json.load(fh)
        cols = []
        for fld in META_DATA_FLDS:
            cols.append(user_data[fld])
        cas = user_data["completedAssignments"]
        complete = "matsPostTest" in cas
        cols.append(complete)
        cols.append(",".join(cas))
        rows.append(cols)

spread_sheet = os.path.join(data_path, "metadata.xlsx")
workbook = xlsxwriter.Workbook(spread_sheet)
worksheet = workbook.add_worksheet()
for row_num, row in enumerate(rows):
    for col_num, value in enumerate(row):
        # print(row_num, col_num, value)
        worksheet.write(row_num, col_num, value)
workbook.close()

# ALL_USERS = []
# for doc in snapshot.get():
#     if "study_data" == doc.id:
#         continue
#     data = doc.to_dict()
#     class_code = data.get("classCode", None)
#     if class_code is None or class_code in DEVEL_CLASS_CODES:
#         continue
#     userID = data.get("userID")
#     if "matsPre" not in data:
#         continue
#     matsPre = data["matsPre"]
#     matsPre = json.loads(matsPre)
#     if isinstance(matsPre, str):
#         matsPre = json.loads(matsPre)
#     matsPre = Box(matsPre)

#     row = [
#         userID,
#         class_code,
#         data.get("FN"),
#         data.get("LN"),
#         data.get("MON"),
#         data.get("DAY"),
#         data.get("completedAssignments")
#     ]
#     ALL_USERS.append(row)

# workbook = xlsxwriter.Workbook("all_user_metadata.xlsx")
# worksheet = workbook.add_worksheet()
# for row_num, row in enumerate(ALL_USERS):
#     for col_num, value in enumerate(row):
#         # print(row_num, col_num, value)
#         worksheet.write(row_num, col_num, value)
# workbook.close()

