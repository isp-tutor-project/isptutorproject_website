import os
import sys

META_DATA_FLDS = [
    "userID", "classCode", "condition", "FN", "LN", "MON", "DAY"
]

JSON_FLDS = [
    "completedAssignments",
    "matsPre", "diPreTest",
    "rqted",  "hypoWE", "diInstruction", "diCrystalGrowthTest",
    "diPostTest", "matsPost"
]

DEVEL_CLASS_CODES = ["TEST", "TESTSCHOOL1", "TEST3"]

def get_file_path():
    if len(sys.argv) != 2:
        print("USAGE: %s <directory>" % sys.argv[0])
        sys.exit(0)
    dir_name = sys.argv[1]
    return os.path.join(".", dir_name)
