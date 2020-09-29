#!/usr/bin/env python

import json
import os
import sys

from box import Box
from box.exceptions import BoxValueError

import firebase_admin
from firebase_admin import firestore

import xlsxwriter


default_app = firebase_admin.initialize_app()

db = firestore.client()

snapshot = db.collection("STUDY_3")

ALL_USERS = []
for doc in snapshot.get():
    if "study_data" == doc.id:
        continue
    data = doc.to_dict()
    class_code = data.get("classCode")
    if class_code in ["TEST", "TESTSCHOOL1", "TEST3"]:
        continue
    userID = data.get("userID")
    if "matsPre" not in data:
        continue
    matsPre = data["matsPre"]
    matsPre = json.loads(matsPre)
    if isinstance(matsPre, str):
        matsPre = json.loads(matsPre)
    matsPre = Box(matsPre)

    row = [
        userID,
        class_code,
        data.get("FN"),
        data.get("LN"),
        data.get("MON"),
        data.get("DAY")
    ]
    matsPre.sceneState.SMatsIntro
    # print(row)
    ALL_USERS.append(row)

workbook = xlsxwriter.Workbook("all_user_metadata.xlsx")
worksheet = workbook.add_worksheet()
for row_num, row in enumerate(ALL_USERS):
    for col_num, value in enumerate(row):
        # print(row_num, col_num, value)
        worksheet.write(row_num, col_num, value)
workbook.close()

