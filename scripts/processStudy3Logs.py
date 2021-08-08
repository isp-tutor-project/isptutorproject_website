#!/usr/bin/env python

# pylint: disable=unused-variable

from glob import glob
import json
import os
import sys
from time import asctime, localtime

from box import Box
import xlsxwriter

from shared import (
    get_file_path
)

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

NA = "N/A"

MATS_START_SCENE = "SMatsIntro"
MATS_END_SCENE = "SSceneEnd"
MATS_NUM_QUES = 14

MATS_QUES = [
    "I have a good feeling about science",
    "Science is useful for solving problems in everyday life",
    "I do not do very well in science",
    "Science is interesting to me",
    "Science is one of my least favorite subjects",
    "Science is something that I enjoy very much",
    "I have a strong desire to learn science",
    "I feel tense when someone talks to me about science",
    "Most people should study some science",
    "Science is easy for me",
    "Science is helpful in understanding today's world",
    "I usually understand what we are talking about in science",
    "Sometimes I read ahead in our science book",
    "It makes me nervous to even think about doing science experiments"
]


MATS = {
    "ANS": {
        "1": "Strongly Disagree",
        "2": "Disagree",
        "3": "Neither Agree nor Disagree",
        "4": "Agree",
        "5": "Strongly Agree"
    },
    "QUES": {
        "matsPre1":  MATS_QUES[0],
        "matsPre2":  MATS_QUES[1],
        "matsPre3":  MATS_QUES[2],
        "matsPre4":  MATS_QUES[3],
        "matsPre5":  MATS_QUES[4],
        "matsPre6":  MATS_QUES[5],
        "matsPre7":  MATS_QUES[6],
        "matsPre8":  MATS_QUES[7],
        "matsPre9":  MATS_QUES[8],
        "matsPre10": MATS_QUES[9],
        "matsPre11": MATS_QUES[10],
        "matsPre12": MATS_QUES[11],
        "matsPre13": MATS_QUES[12],
        "matsPre14": MATS_QUES[13],
        "matsPost1":  MATS_QUES[13],
        "matsPost2":  MATS_QUES[12],
        "matsPost3":  MATS_QUES[11],
        "matsPost4":  MATS_QUES[10],
        "matsPost5":  MATS_QUES[9],
        "matsPost6":  MATS_QUES[8],
        "matsPost7":  MATS_QUES[7],
        "matsPost8":  MATS_QUES[6],
        "matsPost9":  MATS_QUES[5],
        "matsPost10": MATS_QUES[4],
        "matsPost11": MATS_QUES[3],
        "matsPost12": MATS_QUES[2],
        "matsPost13": MATS_QUES[1],
        "matsPost14": MATS_QUES[0],
    }
}


HYPO_WE_NUM_SLIDES = 180
HYPO_WE_QUESTION_IDS = [
    "hotcold", "hotcold_likert", "incdec", "rel", "rel2", "hypo2"
]
HYPO_VAR_FLDS = [
    "hotcold", "hotcold_likert", "incdec", "incdec_correctness", "rel", "rel_correctness", "rel2", "rel2_correctness", "hypo2"
]
HYPO_LIKERT = [
    "I just guessed", "a bit sure", "pretty sure", "very sure", "100% sure"
]

def mk_mats_hdr():
    hdr = ["userID", "startTime", "endTime"]
    for ques in MATS_QUES:
        hdr.append(ques)
    return hdr


def mk_hypo_hdr():
    hdr = ["userID", "startTime", "endTime"]
    for i in range(1, HYPO_WE_NUM_SLIDES + 1):
        hdr.append("slide%dTime" % i)
    hdr.extend(HYPO_VAR_FLDS)
    return hdr

RQ_START_SCENE = "SSceneStart"
RQ_END_SCENE = "SScene11"

DI_TEST_RESULTS = {
    DI_PRE:  [("memory", 7), ("rockets", 4)],
    DI_POST: [("cars", 3), ("library", 6)],
    DI_CG:   [("crystal", 1)]
}


def mk_di_test_scenes(prefix, num_intro):
    resultsIntros = None
    intros = ["%sIntro%d" % (prefix, i) for i in range(1, num_intro + 1)]
    if prefix in ["cars", "library"]:
        resultsIntros = ["%sResultsIntro%d" % (prefix, i) for i in range(1, 6)]
    else:
        resultsIntros = ["%sResults%dIntro" % (prefix, i) for i in range(1, 6)]
    results = ["%sResults%d" % (prefix, i) for i in range(1, 6)]
    return [*intros, *resultsIntros, *results]


DI_TEST_SCENES = {
    DI_PRE: [
        "start",
        "intro",
        "repetitive",
        *mk_di_test_scenes(*DI_TEST_RESULTS[DI_PRE][0]),
        *mk_di_test_scenes(*DI_TEST_RESULTS[DI_PRE][1]),
        "completed"
    ],
    DI_POST: [
        "start",
        "intro",
        "repetitive",
        *mk_di_test_scenes(*DI_TEST_RESULTS[DI_POST][0]),
        *mk_di_test_scenes(*DI_TEST_RESULTS[DI_POST][1]),
        "completed"
    ],
    DI_CG: [
        "start",
        "intro",
        "repetitive",
        *mk_di_test_scenes(*DI_TEST_RESULTS[DI_CG][0]),
        "completed"
    ]
}

DI_INSTR_SCENES = [
    "start",
    "intro1", "intro2", "intro3", "intro4", "intro5", "intro6", "intro7",
    "intro8", "intro9", "intro10", "intro11", "intro12", "intro13",
    "intro14", "intro15", "intro16",
    "scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7",
    "scene8", "scene9",
    "scene10", "scene11", "scene12", "scene13", "scene14", "scene15",
    "scene16", "scene17", "scene18", "scene19",
    "scene20", "scene21", "scene22", "scene23", "scene24", "scene25",
    "scene26", "scene27", "scene27a", "scene28", "scene29",
    "scene30", "scene31", "scene32", "scene32a", "scene33", "scene34",
    "scene35", "scene35a", "scene36", "scene37", "scene38", "scene39",
    "scene40", "scene41", "scene42", "scene43", "scene44", "scene45",
    "scene46", "scene47", "scene48", "scene49",
    "scene50", "scene50a", "scene51", "scene51a", "scene52", "scene53",
    "scene54", "scene55", "scene56", "scene57", "scene58", "scene58a", "scene59",
    "scene60", "scene61", "scene62", "scene63", "scene63a", "scene64",
    "scene65", "scene66", "scene67", "scene68", "scene69",
    "scene70", "scene71", "scene72", "scene73", "scene74",
    "scene75", "scene76", "scene77", "scene78", "scene79",
    "scene80", "scene81", "scene82", "scene83", "scene84", "scene89",
    "scene90", "scene91", "scene92", "scene93", "scene94", "scene95",
    "scene96", "scene97", "scene98", "scene99",
    "scene100", "scene101", "scene102", "scene103", "scene104", "scene104a",
    "scene105", "scene106", "scene107", "scene108", "scene108a", "scene109",
    "scene110", "scene111", "scene112", "scene113",
    "completed"
]

DI_INSTR_QUES_IDS = [
    "scene8_question",
    "scene26_question",
    "scene28_question",
    "scene30_question",
    "scene32_question",
    "scene33_question",
    "scene35_question",
    "scene36_question",
    "scene37_question",
    "scene41_question",
    "scene43_question",
    "scene44_question",
    "scene48_question",
    "scene58_question",
    "scene59_question",
    "scene63_question",
    "scene64_question",
    "scene66_question",
    "scene71_question",
    "scene81_question",
    "scene90_question",
    "scene96_question",
    "scene104_question",
    "scene106_question",
    "scene108_question",
]

def mk_generic_di_results_flds():
    ret_val = {}
    for side in ["left", "right"]:
        for stat in ["mean", "median", "mode", "range"]:
            ret_val["%s_%s_shown" % (side, stat)] = False
    ret_val["dataSorted"] = False
    for q in range(1, 3):
        ret_val["q%dAnswer" % q] = NA
    ret_val["likert"] = -1
    return ret_val

def mk_di_results_flds(prefix):
    ret_val = {}
    gen_stats = mk_generic_di_results_flds()
    for (prefix, _unused) in DI_TEST_RESULTS[prefix]:
        for scn in range(1, 6):
            pfx = "%sResults%d" % (prefix, scn)
            for fn, val in gen_stats.items():
                ret_val["%s__%s" % (pfx, fn)] = val
    # print(ret_val)
    # sys.exit(0)
    return ret_val

def mk_di_test_hdr(which):
    flds = [
        "userID",
        *DI_TEST_SCENES[which],
        *[ key for key in mk_di_results_flds(which)]
    ]
    return flds


META_HDR = [
    "userID", "classCode", "condition", "userInfo", "startTime", "endTime",
    *["%s_completed" % ao for ao in ASSIGN_ORDER]
]
MATS_HDR = mk_mats_hdr()
RQ_HDR = ["userID", "startTime", "endTime"]
HYPO_WE_HDR = mk_hypo_hdr()
DI_PRE_HDR = mk_di_test_hdr(DI_PRE)
DI_POST_HDR = mk_di_test_hdr(DI_POST)
DI_CG_HDR = mk_di_test_hdr(DI_CG)
DI_INSTR_HDR = ["userID", *DI_INSTR_SCENES, *DI_INSTR_QUES_IDS]


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
    # init ret_val fields to NA. at any time, we can return this value as
    # it has been initialized with default values
    ret_val = {
        "userID": data["userID"],
        "startTime": NA,
        "endTime": NA
    }
    for qt in MATS_QUES:
        ret_val[qt] = NA

    test_data = None
    try:
        test_data = data[test_key].sceneState
    except (KeyError):
        return ret_val

    ret_val["startTime"] = get_ted_start_ts(test_data, MATS_START_SCENE)

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
                likert_val = int(scene_data[ques_key][1])
                ques_key = "%s%d" % (test_key, ques_num)
                ques_text = MATS["QUES"][ques_key]
                # quesnum2ans["%s%d" % (test_key, ques_num)] = int(ans_val)
                ret_val[ques_text] = likert_val
            except KeyError:
                return ret_val
    ret_val["endTime"] = get_ted_end_ts(test_data, MATS_END_SCENE)
    return ret_val


def analyze_di(di_data):

    start_ts = js_ts_2_str(di_data.events[0].timestamp)
    end_ts = js_ts_2_str(di_data.events[-1].timestamp)

    prev_ts = None
    curr_ts = None
    for evt in di_data.events:
        if "APP_START" == evt.type:
            curr_ts = evt.timestamp

def analyze_rq_bl(data):
    ret_val = {
        "userID": data["userID"],
        "startTime": NA,
        "endTime": NA
    }
    try:
        scenes_data = data[RQ_BL].sceneState
        ret_val["startTime"] = get_ted_start_ts(scenes_data, RQ_START_SCENE)
        ret_val["endTime"] = get_ted_end_ts(scenes_data, RQ_END_SCENE)
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
    ret_val = {
        "userID": user,
        "startTime": NA,
        "endTime": NA
    }
    for i in range(1, HYPO_WE_NUM_SLIDES + 1):
        ret_val["slide%dTime" % i] = NA
    # for ques_id in HYPO_WE_QUESTION_IDS:
    #     ret_val[ques_id] = NA
    for fld_name in HYPO_VAR_FLDS:
        ret_val[fld_name] = NA
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
            is_correct = NA
            correctness = ""
            if is_likert:
                ques_id += "_likert"
                if selected_ans in HYPO_LIKERT:
                    # convert text to likert score
                    selected_ans = HYPO_LIKERT.index(selected_ans) + 1
            elif not is_openended:
                # fld has correctness, compute the correctness and the
                # name of the correctness field
                is_correct = selected_ans == correct_ans
                correctness_fld = "%s_correctness" % ques_id
                ret_val[correctness_fld] = is_correct

            # associatiate selected value with question id
            ret_val[ques_id] = selected_ans
            # print("%s: %s\t\t%s: %s\t\t%s:%s" % (
            #     user, interaction_id,
            #     ques_id, selected_ans,
            #     "%s_correctness" % ques_id, is_correct)
            # )
            # print("%s\t%s: %s\t\t%s" % (
            #     user, ques_id, selected_ans, correctness)
            # )
        except ValueError:
            # this *shouldn't* happend for production users, but there was a
            # brief period in dev where some interactionIDs weren't set, causing
            # the split to not return enough values for the destrucured assignment
            # if this happens, we'll catch and ignore, simply leaving the data
            # for that question as N/A
            pass
    # print(user,)
    # for fld in HYPO_VAR_FLDS:
    #     print("%s:%s " % (fld, ret_val[fld]), )
    # print()
    # print(ret_val)
    # print(tot_time/ 60)
    # print(secs_2_hrs_min_secs(tot_time))
    # sys.exit(0)
    # print(ret_val)
    # sys.exit(0)
    return ret_val


def analyze_di_test(which, data):
    #flds should be userId, cumulativeTimeOnScene*, resultsScenesFinalStates*
    ret_val = {
        fld: NA
        for fld in mk_di_test_hdr(which)
    }
    ret_val["userID"] = data.userID
    which_data = data.get(which, None)
    if which_data is None:
        return ret_val
    events = which_data.get("events", None)
    if events is None or len(events) == 0:
        return ret_val

    # initialize time-on-scene to 0.0 seconds
    # and then iterate through events to figure out
    # how much time is spent on individual scenes
    scenes = {
        scene: 0.0
        for scene in DI_TEST_SCENES[which]
    }
    enterScene = 0
    leaveScene = 0
    currScene = 0
    for event in events:
        # print(event)
        tme = event.get("timestamp", None)
        # if tme is None:
        #     tme = event.get("time")
        tme = tme / 1000
        if "SCENE_TRANSITION" == event["type"]:
            # frm = event["from"]
            to = event["to"]
            leaveScene = tme
            dur = leaveScene - enterScene
            scenes[currScene] += dur
            currScene = to
            leaveScene = -1
            enterScene = tme
        elif "APP_START" == event["type"]:
            currScene = event["scene"]
            enterScene = tme
            leaveScene = -1
    for sn, tos in scenes.items():
        ret_val[sn] = tos

    # print(json.dumps(ret_val, indent=4))
    # sys.exit(0)

    # get the final state of variables
    # q1,2&3 for each result scene along with the
    # left,right (mean, median, etc) bool states
    generic_stats = mk_generic_di_results_flds()
    ltr_2_score = ["", "a", "b", "c", "d", "e"]
    for result_set, _unused in DI_TEST_RESULTS[which]:
        for i in range(1, 6):
            result = "%sResults%d" % (result_set, i)
            result_stats = data[which]["sceneState"].get(result, None)
            if result_stats is None:
                continue
            for stat in generic_stats:
                if stat != "likert":
                    stat_val = result_stats.get(stat, False)
                    fld_name = "%s__%s" % (result, stat)
                    ret_val[fld_name] = stat_val
                else:
                    stat_val = result_stats.get("q3Selection")
                    try:
                        likert = ltr_2_score.index(stat_val[-1])
                    except:
                        # print(stat_val, result, data.userID)
                        # sys.exit(1)
                        pass
                    else:
                        fld_name = "%s__likert" % result
                        ret_val[fld_name] = likert
    return ret_val


def analyze_di_instr(data):
    ret_val = {
        fld: NA
        for fld in DI_INSTR_HDR
    }
    ret_val["userID"] = data.userID
    di_data = data.get(DI_INSTR, None)
    if di_data is None:
        # print("no di_data. exiting")
        return ret_val
    events = di_data.get("events", None)
    if events is None:
        print("no events. exting")
        return ret_val

    # initialize time-on-scene to 0.0 seconds
    # and then iterate through events to figure out
    # how much time is spent on individual scenes
    scenes = {
        scene: 0.0
        for scene in DI_INSTR_SCENES
    }
    enterScene = 0
    leaveScene = 0
    currScene = 0
    for event in events:
        # print(event)
        tme = event.get("timestamp")
        tme = tme / 1000
        if "SCENE_TRANSITION" == event["type"]:
            # frm = event["from"]
            to = event["to"]
            leaveScene = tme
            dur = leaveScene - enterScene
            scenes[currScene] += dur
            currScene = to
            leaveScene = -1
            enterScene = tme
        elif "APP_START" == event["type"]:
            currScene = event["scene"]
            enterScene = tme
            leaveScene = -1
    for sn, tos in scenes.items():
        ret_val[sn] = tos


    scene_state = di_data.get("sceneState", None)
    for qid in DI_INSTR_QUES_IDS:
        scene_id = qid.replace("_question", "")
        if scene_id in scene_state:
            val = scene_state[scene_id]
            ret_val[qid] = val

    # sys.exit(0)
    # for event in events:
    #     if "SUBMIT_ANSWER" == event.type:
    #         qid = event.questionId
    #         qid = qid.replace("diInstruction", "")
    #         qid = qid + "_question"
    #         # DI_QUES_IDS.add(qid)

    # answers = [
    # ]

    # print(json.dumps(ret_val, indent=4))
    # sys.exit(0)
    return ret_val


def dump_simple_worksheet(workbook, ws_name, ws_data):
    worksheet = workbook.add_worksheet(ws_name)
    for row_num, row_data in enumerate(ws_data):
        for col_num, value in enumerate(row_data):
            worksheet.write(row_num, col_num, value)


def process_file(path):
    data = None
    with open(path, "r") as fh:
        data = Box(json.load(fh))

    userID = data.userID
    classCode = data.classCode
    condition = data.condition
    user_info = "%s_%s_%s_%s" % (data.FN, data.LN, data.MON, data.DAY)

    completed_assignments = data.completedAssignments
    num_complete = len(completed_assignments)
    num_incomplete = 8 - num_complete
    completed = num_complete * ['Y'] + num_incomplete * ['N']


    mats_pre_data = analyze_mats(MATS_PRE, data)
    di_pre_data = analyze_di_test(DI_PRE, data)
    rq_data = analyze_rq_bl(data)
    hypo_data = analyze_hypo_we(data)
    di_instr_data = analyze_di_instr(data)
    di_cg_data = analyze_di_test(DI_CG, data)
    di_post_data = analyze_di_test(DI_POST, data)
    mats_post_data = analyze_mats(MATS_POST, data)

    start_time = mats_pre_data["startTime"]
    end_time = mats_post_data["endTime"]
    meta_data = [userID, classCode, condition, user_info, start_time, end_time, *completed]
    return {
        "metaData": meta_data,
        "matsPre": mats_pre_data,
        "diPre": di_pre_data,
        "rq": rq_data,
        "hypo": hypo_data,
        "diInstruction": di_instr_data,
        "diCG": di_cg_data,
        "diPost": di_post_data,
        "matsPost": mats_post_data
    }


def process_data(data_path):
    out_file = os.path.join(data_path, "study3.xlsx")
    meta_data = [META_HDR]
    mats_pre_data = [MATS_HDR]
    di_pre_data = [DI_PRE_HDR]
    rq_data = [RQ_HDR]
    hypo_data = [HYPO_WE_HDR]
    di_instr_data = [DI_INSTR_HDR]
    di_cg_data = [DI_CG_HDR]
    di_post_data = [DI_POST_HDR]
    mats_post_data = [MATS_HDR]

    for json_file in sorted(glob("%s/*.json" % data_path)):
        user_data = process_file(json_file)
        meta_data.extend([user_data["metaData"]])
        mats_pre_data.append([
            val for key, val in user_data["matsPre"].items()
        ])
        di_pre_data.append([
            val for fld, val in user_data["diPre"].items()
        ])
        rq_data.append([
            val for fld, val in user_data["rq"].items()
        ])
        hypo_data.append([
            val for key, val in user_data["hypo"].items()
        ])
        di_instr_data.append([
            val for fld, val in user_data["diInstruction"].items()
        ])
        di_cg_data.append([
            val for fld, val in user_data["diCG"].items()
        ])
        di_post_data.append([
            val for fld, val in user_data["diPost"].items()
        ])
        mats_post_data.append([
            val for key, val in user_data["matsPost"].items()
        ])

    workbook = xlsxwriter.Workbook(out_file)
    dump_simple_worksheet(workbook, "meta_data", meta_data)
    dump_simple_worksheet(workbook, "matsPre", mats_pre_data)
    dump_simple_worksheet(workbook, "diPre", di_pre_data)
    dump_simple_worksheet(workbook, "rq", rq_data)
    dump_simple_worksheet(workbook, "hypo", hypo_data)
    dump_simple_worksheet(workbook, "diInstr", di_instr_data)
    dump_simple_worksheet(workbook, "diCrystalGrowth", di_cg_data)
    dump_simple_worksheet(workbook, "diPost", di_post_data)
    dump_simple_worksheet(workbook, "matsPost", mats_post_data)
    workbook.close()
    print("%s created" % out_file)



data_path = get_file_path()
if not os.path.exists(data_path):
    print('ERROR: "%s" does not exist' % data_path)
    sys.exit(1)
process_data(data_path)


