#!/usr/bin/env python3

import glob
import json
import os
import sys

import xlsxwriter

from shared import (
    DEVEL_CLASS_CODES, META_DATA_FLDS, JSON_FLDS, get_file_path
)


data_path = get_file_path()
if not os.path.exists(data_path):
    print("ERROR: %s does not exist" % data_path)
    sys.exit(1)


rows = []
HDR = META_DATA_FLDS + \
    ["started","completedActivities","didMatsPost","activitiesCompleted"]
# put hdr as row 0
rows.append(HDR)

for file_name in glob.glob("%s/*.json" % data_path):
    with open(file_name, "r") as fh:
        user_data = json.load(fh)
        cols = []
        for fld in META_DATA_FLDS:
            cols.append(user_data[fld])
        cas = user_data["completedAssignments"]
        # bool fields
        cols.extend([
            "matsPreTest" in cas,
            "diPostTest" in cas,
            "matsPostTest" in cas
        ])
        cols.append(",".join(cas))
        # add this users cols to the rows
        rows.append(cols)


spread_sheet = os.path.join(data_path, "metadata.xlsx")
workbook = xlsxwriter.Workbook(spread_sheet)
worksheet = workbook.add_worksheet()
for row_num, row in enumerate(rows):
    for col_num, value in enumerate(row):
        worksheet.write(row_num, col_num, value)
workbook.close()