#!/usr/bin/env python

import json
import os
import sys

from box import Box

def usage():
    print("Usage: %s <input dirname>" % sys.argv[0])
    sys.exit(1)



# def parse_file(file_name, visitor)

def walk_tree(path):
    for (dirpath, dirnames, filenames) in os.walk(path):
        # print(dirpath, dirnames, filenames)
        for file_name in filenames:
            with open(os.path.join(path, file_name), "r") as fh:
                obj = Box(json.load(fh))
                if "hypoWE" not in obj:
                    continue
                if not len(obj.hypoWE.answers):
                    continue
                last_answer = obj.hypoWE.answers[-1]
                if last_answer.interactionID.endswith("hypo2_OE"):
                    hypo = last_answer.selectedAnswer
                    print(obj.userID, obj.classCode, hypo.replace("\n", " "))






if len(sys.argv) < 2:
    usage()

walk_tree(sys.argv[1])
