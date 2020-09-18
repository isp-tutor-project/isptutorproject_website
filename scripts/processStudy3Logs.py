#!/usr/bin/env python

from glob import glob
import json
import os
import sys
from time import asctime, localtime

from box import Box
import xlsxwriter


MATS_PRE = "matsPre"
DI_PRE = "diPreTest"
RQ_BL = "rqted"
HYPO_WE = "hypoWE"
DI_INSTR = "diInstruction"
DI_CG = "diCrystalGrowthTest"
DI_POST = "diPostTest"
MATS_POST = "matsPost"

ASSIGN_ORDER = [
    MATS_PRE, DI_PRE, RQ_BL, HYPO_WE, DI_INSTR, DI_CG, DI_POST, MATS_POST
]

HDR = ["userID", "condition", "userInfo", "startTime", "endTime", *["%s_completed" % ao for ao in ASSIGN_ORDER]]

ASSIGN_ID_2_KEY = {
    "matsPreTest": MATS_PRE,
    "diPreTest": DI_PRE,
    "rqSelectBL": RQ_BL,
    "hypoWEoneDir": HYPO_WE,
    "hypoWEbiDir": HYPO_WE,
    "diInstrGR": DI_INSTR,
    "diCrystalGrowthTest": DI_CG,
    "diPost": DI_POST,
    "matsPostTest": MATS_POST
}

# MATS_START = []
NA = "N/A"

MATS_START_SCENE = "SMatsIntro"
MATS_END_SCENE = "SSceneEnd"
MATS_NUM_QUES = 14

def mk_mats_hdr(which_test):
    return ["%sStartTime" % which_test] + ["%sEndTime" % which_test] + [
        "%s%d" % (which_test, i)
        for i in range(1, MATS_NUM_QUES + 1)
    ]

MATS_PRE_HDR = mk_mats_hdr(MATS_PRE)
MATS_POST_HDR = mk_mats_hdr(MATS_POST)

RQ_START_SCENE = "SSceneStart"
RQ_END_SCENE = "SScene11"

HYPO_WE_NUM_SLIDES = 180
HYPO_WE_QUESTION_IDS = [
    "hotcold", "hotcold_likert", "incdec", "rel", "rel2", "hypo2"
]
HYPO_WE_HDR = HYPO_WE_QUESTION_IDS + ["slide%dTime" % i
                                      for i in range(1, HYPO_WE_NUM_SLIDES + 1)]

def js_ts_2_str(ts):
    return asctime(localtime(int(str(ts)[0:10])))


def get_ted_ts(scenes, scene_key, index):
    try:
        js_ts = scenes[scene_key]["$seq"][index]["time"]
    except (KeyError, IndexError):
        return NA
    return js_ts_2_str(js_ts)


def get_ted_start_ts(scenes, scene_key):
    return get_ted_ts(scenes, scene_key, 0)


def get_ted_end_ts(scenes, scene_key):
    return get_ted_ts(scenes, scene_key, -1)


def analyze_mats(test_key, data):
    which_test = test_key.replace("mats", "")
    ret_val = {
        "%s%d" % (test_key, i): NA
        for i in range(1, MATS_NUM_QUES + 1)
    }
    ret_val["%sStartTime" % test_key] = NA
    ret_val["%sEndTime" % test_key] = NA
    test_data = None
    try:
        test_data = data[test_key].sceneState
    except (KeyError):
        return ret_val

    ret_val["%sStartTime" % test_key] = get_ted_start_ts(test_data,
                                                         MATS_START_SCENE)

    for scene_num in range(1, 5):
        scene_key = "SMats%s%d" % (which_test, scene_num)
        scene_data = None
        try:
            scene_data = test_data[scene_key]
        except (KeyError, IndexError):
            return ret_val

        num_scene_ques = 2 if 4 == scene_num else 4
        for scene_ques_num in range(1, num_scene_ques + 1):
            ques_key = "%sTest:Sg%d" % (which_test, scene_ques_num)
            ques_num = ((scene_num - 1) * 4) + scene_ques_num

            try:
                ans_val = scene_data[ques_key][1]
                ret_val["%s%d" % (test_key, ques_num)] = int(ans_val)
            except KeyError:
                return ret_val

    ret_val["%sEndTime" % test_key] = get_ted_end_ts(test_data,
                                                     MATS_END_SCENE)
    # print(ret_val)
    return ret_val


def analyze_rq_bl(data):
    ret_val = {
        "%sStartTime" % RQ_BL: NA,
        "%sEndTime" % RQ_BL: NA
    }
    try:
        scenes_data = data[RQ_BL].sceneState
        ret_val["%sStartTime" % RQ_BL] = get_ted_start_ts(scenes_data,
                                                          RQ_START_SCENE)
        ret_val["%sEndTime" % RQ_BL] = get_ted_end_ts(scenes_data,
                                                      RQ_END_SCENE)
    except KeyError:
        pass

    return ret_val


def secs_2_hrs_min_secs(seconds):
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60

    return "%d:%02d:%02d" % (hour, minutes, seconds)


def analyze_hypo_we(data):
    user = data.userID
    ret_val = {"slide%dTime" % i: NA for i in range(1, HYPO_WE_NUM_SLIDES + 1)}
    ret_val["startTime"] = NA
    ret_val["endTime"] = NA
    for ques_id in HYPO_WE_QUESTION_IDS:
        ret_val[ques_id] = NA
    # print(ret_val)
    try:
        app_data = data[HYPO_WE]
        transitions = app_data.transitions
        answers = app_data.answers
        ret_val["startTime"] = js_ts_2_str(transitions[0].timestamp)
        ret_val["endTime"] = js_ts_2_str(transitions[-1].timestamp)
    except KeyError:
        return ret_val

    prev_slide_num = -1
    prev_slide_start = None
    tot_time = 0
    for slide in transitions:
        curr_slide_num = slide.slide_number
        curr_slide_start = slide.timestamp
        if -1 != prev_slide_num:
            time_on_prev_slide = (curr_slide_start - prev_slide_start) / 1000
            tot_time += time_on_prev_slide
            ret_val["slide%dTime" % prev_slide_num] = time_on_prev_slide
        prev_slide_num = curr_slide_num
        prev_slide_start = curr_slide_start
    for answer in answers:
        interaction_id, correct_ans, selected_ans = \
            answer.interactionID, answer.correctAnswer, answer.selectedAnswer
        try:
            _unused1, _unused_2, ques_id, *rest = interaction_id.split("_")
            is_openended = len(rest) > 0
            is_likert = len(rest) == 2
            if is_likert:
                ques_id += "_likert"
            is_correct = NA
            if not is_openended:
                is_correct = selected_ans == correct_ans
            print("%s: %s\t\t%s: %s\t\t%s:%s" % (
                user, interaction_id,
                ques_id, selected_ans,
                "%s_correctness" % ques_id, is_correct)
            )
        except ValueError:
            # this *shouldn't* happend for production users, but there was a
            # brief period in dev where some interactionIDs weren't set, causing
            # the split to not return enough values for the destrucured assignment
            # if this happens, we'll catch and ignore, simply leaving the data
            # for that question as N/A
            pass

    # print(ret_val)
    # print(tot_time/ 60)
    # print(secs_2_hrs_min_secs(tot_time))
    # sys.exit(0)
    return ret_val


def process_file(path):
    data = None
    with open(path, "r") as fh:
        data = Box(json.load(fh))

    userID = data.userID
    condition = data.condition
    user_info = "%s_%s_%s_%s" % (data.FN, data.LN, data.MON, data.DAY)

    completed_assignments = data.completedAssignments
    num_complete = len(completed_assignments)
    num_incomplete = 8 - num_complete
    completed = num_complete * ['Y'] + num_incomplete * ['N']

    mats_pre_data = analyze_mats(MATS_PRE, data)
    rq_data = analyze_rq_bl(data)
    hypo_data = analyze_hypo_we(data)
    # print(hypo_data)
    mats_post_data = analyze_mats(MATS_POST, data)
    # print(rq_data)
    start_time = mats_pre_data["matsPreStartTime"]
    # print(mats_pre_data)
    end_time = mats_post_data["matsPostEndTime"]
    row = [userID, condition, user_info, start_time, end_time, *completed]

    # print(mats_post_data)
    # sys.exit(0)
    # print(row)
    return row


def process_dir(path):
    return [HDR] + [
        process_file(json_file)
        for json_file in sorted(glob("%s/*.json" % path))
    ]

if len(sys.argv) != 2:
    print("USAGE: %s   <dir of .json files or file.json >" % sys.argv[0])
    sys.exit(1)


in_path = os.path.expanduser(sys.argv[1])
out_path = None
if not os.path.exists(in_path):
    print('ERROR: "%s" does not exist' % in_path)
    sys.exit(1)
if os.path.isfile(in_path):
    out_path = "%s.xslx" % os.path.splitext(in_path)[0]
    data = [HDR, process_file(in_path)]
else:
    in_path = in_path.rstrip("/")
    out_path = os.path.join(in_path, "%s.xlsx" % os.path.basename(in_path))
    data = process_dir(in_path)

workbook = xlsxwriter.Workbook(out_path)
worksheet = workbook.add_worksheet()
for row_num, row_data in enumerate(data):
    for col_num, value in enumerate(row_data):
        worksheet.write(row_num, col_num, value)
workbook.close()

# print(data)
