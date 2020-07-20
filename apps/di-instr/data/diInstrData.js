
const BACK_TO_QUESTION_SCENE = "scene11";
const READY_TO_ANSWER_SCENE = "scene26";

const SCENE_TYPES = {
    standard: "standard",
    stats: "stats",
    mc: "multipleChoiceForm"
};

NA = "N/A";

const SURVEY_OPTIONS = [
    { value: 'a', label: "Not at all sure" },
    { value: 'b', label: "A little sure" },
    { value: 'c', label: "Pretty sure" },
    { value: 'd', label: "Very sure" },
    { value: 'e', label: "I am Absolutely sure" }
];

const diInstructionData = {
    scenes: {
        start: {
            edges: {
                next: "intro1"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        intro1: {
            edges: {
                prev: "start",
                next: "intro2"
            }
        },
        intro2: {
            edges: {
                prev: "intro1",
                next: "intro3"
            }
        },
        intro3: {
            edges: {
                prev: "intro2",
                next: "intro4"
            }
        },
        intro4: {
            edges: {
                prev: "intro3",
                next: "intro5"
            }
        },
        intro5: {
            edges: {
                prev: "intro4",
                next: "intro6"
            }
        },
        intro6: {
            edges: {
                prev: "intro5",
                next: "intro7"
            }
        },
        intro7: {
            edges: {
                prev: "intro6",
                next: "intro8"
            }
        },
        intro8: {
            edges: {
                prev: "intro7",
                next: "intro9"
            }
        },
        intro9: {
            edges: {
                prev: "intro8",
                next: "intro10"
            }
        },
        intro10: {
            edges: {
                prev: "intro9",
                next: "intro11"
            }
        },
        intro11: {
            edges: {
                prev: "intro10",
                next: "intro12"
            }
        },
        intro12: {
            edges: {
                prev: "intro11",
                next: "intro13"
            }
        },
        intro13: {
            edges: {
                prev: "intro12",
                next: "intro14"
            }
        },
        intro14: {
            edges: {
                prev: "intro13",
                next: "intro15"
            }
        },
        intro15: {
            edges: {
                prev: "intro14",
                next: "intro16"
            }
        },
        intro16: {
            edges: {
                prev: "intro15",
                next: "scene1"
            }
        },
        scene1: {
            edges: {
                prev: "intro16",
                next: "scene2"
            }
        },
        scene2: {
            edges: {
                prev: "scene1",
                next: "scene3"
            }
        },
        scene3: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene2",
                next: "scene4"
            },
            question: {
                type: "mc",
                text: "Salt crystals grew...",
                correctAnswer: "a",
                ntlFb: "Thanks!",
                options: [
                    { value: "a", label: "more in hot water" },
                    { value: "b", label: "more in cold water" },
                    { value: "c", label: "equally well in hot and cold water" }
                ]
            }
        },
        scene4: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene3",
                next: "scene5"
            },
            question: {
                type: "survey",
                text: "How sure are you that the independent variable (water temperature) caused this difference in crystal weight across conditions?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene5: {
            edges: {
                prev: "scene4",
                next: "scene6"
            }
        },
        scene6: {
            edges: {
                prev: "scene5",
                next: "scene7"
            }
        },
        scene7: {
            edges: {
                prev: "scene6",
                next: "scene8"
            }
        },
        scene8: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene7",
                next: "scene9"
            },
            question: {
                type: "mc",
                text: "Do you see any results that look strange to you?",
                correctAnswer: "a",
                ntlFb: "Thanks",
                options: [
                    { value: "a", label: "Yes" },
                    { value: "b", label: "No" },
                    { value: "c", label: "I don't know" }
                ]
            }
        },
        scene9: {
            edges: {
                prev: "scene8",
                next: "scene10"
            }
        },
        scene10: {
            edges: {
                prev: "scene9",
                next: "scene11"
            }
        },
        scene11: {
            edges: {
                prev: "scene10",
                next: "scene26",
                mean: "scene12",
                median: "scene14",
                mode: "scene23",
                range: "scene24"
            }
        },
        scene12: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene11",
                next: "scene13",
                more: "scene13",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                }
            ]
        },
        scene13: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene12",
                next: "scene14",
                back: "scene12",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                readyToAnswer: READY_TO_ANSWER_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion", "readyToAnswer"]
                }
            ]
        },
        scene14: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene13",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                more: "scene15",
                next: "scene15"
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                }
            ]
        },
        scene15: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene14",
                next: "scene16",
                back: "scene14",
                more: "scene16",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row1.col2", ".row15.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene16: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene15",
                next: "scene17",
                back: "scene15",
                more: "scene17",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row2.col2", ".row14.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene17: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene16",
                next: "scene18",
                back: "scene16",
                more: "scene18",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row3.col2", ".row13.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene18: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene17",
                next: "scene19",
                back: "scene17",
                more: "scene19",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row4.col2", ".row12.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene19: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene18",
                next: "scene20",
                back: "scene18",
                more: "scene20",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row5.col2", ".row11.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene20: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene19",
                next: "scene21",
                back: "scene19",
                more: "scene21",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row6.col2", ".row10.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene21: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene20",
                next: "scene22",
                back: "scene20",
                more: "scene22",
                backToQuestion: BACK_TO_QUESTION_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row7.col2", ".row9.col2"],
                        color: "blue"
                    }
                }
            ]
        },
        scene22: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene21",
                next: "scene23",
                back: "scene21",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                readyToAnswer: READY_TO_ANSWER_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion", "readyToAnswer"]
                },
                {
                    name: "hiliteTableCells", args: {
                        table: "dogs_table",
                        cellSelectors: [".row8.col2"],
                        color: "green"
                    }
                }
            ]
        },
        scene23: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene22",
                next: "scene24",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                readyToAnswer: READY_TO_ANSWER_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion", "readyToAnswer"]
                }
            ]
        },
        scene24: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene23",
                next: "scene25",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                more: "scene25"
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion"]
                }
            ]
        },
        scene25: {
            sceneType: SCENE_TYPES.stats,
            edges: {
                prev: "scene24",
                next: "scene26",
                back: "scene24",
                backToQuestion: BACK_TO_QUESTION_SCENE,
                readyToAnswer: READY_TO_ANSWER_SCENE
            },
            customEnterActions: [
                {
                    name: "showBtns",
                    args: ["backToQuestion", "readyToAnswer"]
                }
            ]
        },
        scene26: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene25",
                next: "scene27"
            },
            question: {
                type: "mc",
                text: "What do you think is the best way to summarize the data in each condition?",
                correctAnswer: "c",
                posFb: "You're right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Minimum (The Smallest number)" },
                    { value: "b", label: "Maximum (The Biggest number)" },
                    { value: "c", label: "Mean (or average)" },
                    { value: "d", label: "Median (The Middle number)" },
                    { value: "e", label: "Mode (The Most common number)"},
                    { value: "f", label: "Range"}
                ]
            }
        },
        scene27: {
            edges: {
                prev: "scene26",
                next: "scene27a"
            }
        },
        scene27a: {
            edges: {
                prev: "scene27",
                next: "scene28"
            }
        },
        scene28: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene27a",
                next: "scene29"
            },
            question: {
                type: "mc",
                text: "Which calculation will give you the mean:",
                correctAnswer: "b",
                posFb: "You're right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "(20 + 27 + 30 + 32 + 41)" },
                    { value: "b", label: "(20 + 27 + 30 + 32 + 41) / 5" },
                    { value: "c", label: "(41 - 20) / 2" },
                    { value: "d", label: "(41 + 20) / 2" }
                ]
            }
        },
        scene29: {
            edges: {
                prev: "scene28",
                next: "scene30"
            }
        },
        scene30: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene29",
                next: "scene31"
            },
            question: {
                type: "mc",
                text: "Now, what is the mean weight for the Cold water condition?",
                correctAnswer: "b",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "(3 + 8 +12 + 16 + 21)" },
                    { value: "b", label: "(3 + 8 + 12 + 16 + 21) / 5" },
                    { value: "c", label: "( 21 + 3 ) / 2" },
                    { value: "d", label: "( 21 - 3 ) / 3" }
                ]
            }
        },
        scene31: {
            edges: {
                prev: "scene30",
                next: "scene32"
            }
        },
        scene32: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene31",
                next: "scene32a"
            },
            question: {
                type: "mc",
                text: "Comparing the means across conditions, what to these results suggest?",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Salt crystals grew more in hot water" },
                    { value: "b", label: "Salt crystals grew more in cold water" },
                    { value: "c", label: "Salt crystals grew equally well in hot and cold water." }
                ]
            }
        },
        scene32a: {
            edges: {
                prev: "scene32",
                next: "scene33"
            }
        },
        scene33: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene32a",
                next: "scene34"
            },
            question: {
                type: "survey",
                text: "How sure are you that the independent variable (water temperature) -- rather than random errors -- caused this difference?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene34: {
            edges: {
                prev: "scene33",
                next: "scene35"
            }
        },
        scene35: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene34",
                next: "scene35a"
            },
            question: {
                type: "mc",
                text: "What does comparing the means of Hot#1 condition to the Cold#2 condition suggest?",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Salt crystals grew more in hot water" },
                    { value: "b", label: "Salt crystals grew more in cold water" },
                    { value: "c", label: "Salt crystals grew equally well in hot and cold water." }
                ]
            }
        },
        scene35a: {
            edges: {
                prev: "scene35",
                next: "scene36"
            }
        },
        scene36: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene35",
                next: "scene37"
            },
            question: {
                type: "survey",
                text: "Now, how sure are you that the independent variable (water temperature) --rather than random errors--caused this difference?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene37: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene36",
                next: "scene38"
            },
            question: {
                type: "mc",
                text: "Compared to the hot condition results, which cold condition results are stronger evidence that water temperature affects crystal growth?",
                correctAnswer: "a",
                posFb: "That's right!",
                negFb: "Well, let's think about this...",
                options: [
                    { value: "a", label: "Cold#1" },
                    { value: "b", label: "Cold#2" },
                    { value: "c", label: "They are the same." }
                ]
            }
        },
        scene38: {
            edges: {
                prev: "scene37",
                next: "scene39"
            }
        },
        scene39: {
            edges: {
                prev: "scene38",
                next: "scene40"
            }
        },
        scene40: {
            edges: {
                prev: "scene39",
                next: "scene41"
            }
        },
        scene41: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene40",
                next: "scene42"
            },
            question: {
                type: "mc",
                text: "What do the results from the Hot water and Cold#3 conditions suggest?",
                correctAnswer: "b",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Salt crystals grew more in hot water" },
                    { value: "b", label: "Salt crystals grew more in cold water" },
                    { value: "c", label: "Salt crystals grew equally well in hot and cold water." }
                ]
            }
        },
        scene42: {
            edges: {
                prev: "scene41",
                next: "scene43"
            }
        },
        scene43: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene42",
                next: "scene44"
            },
            question: {
                type: "survey",
                text: "Now, how sure are you that water temperature -- rather than experimenter or random errors -- caused this difference?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene44: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene43",
                next: "scene45"
            },
            question: {
                type: "mc",
                text: "Compared to the hot condition results, which cold condition results (Cold#1 or Cold #3) are stronger evidence that water temperature affects crystal growth?",
                correctAnswer: "c",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Cold#1" },
                    { value: "b", label: "Cold#3" },
                    { value: "c", label: "They are the same" }
                ]
            }
        },
        scene45: {
            edges: {
                prev: "scene44",
                next: "scene46"
            }
        },
        scene46: {
            edges: {
                prev: "scene45",
                next: "scene47"
            }
        },
        scene47: {
            edges: {
                prev: "scene46",
                next: "scene48"
            }
        },
        scene48: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene47",
                next: "scene49"
            },
            question: {
                type: "mc",
                text: "Compared to the Hot water results, rank the Cold water results from <u>strongest</u> to <u>weakest</u> for how strongly they support the specific prediction:<br/><b>\"Crystals grow more in hot water than cold water.\"</b>",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Cold#1 is strongest, then Cold#2, and Cold#3 is weakest." },
                    { value: "b", label: "Cold#1 and Cold#3 are strongest, and Cold#2 is weakest." },
                    { value: "c", label: "Cold#3 is strongest, then Cold#2, and Cold#1 is weakest." }
                ]
            }
        },
        scene49: {
            edges: {
                prev: "scene48",
                next: "scene50"
            }
        },
        scene50: {
            edges: {
                prev: "scene49",
                next: "scene50a"
            }
        },
        scene50a: {
            edges: {
                prev: "scene50",
                next: "scene51"
            }
        },
        scene51: {
            edges: {
                prev: "scene50a",
                next: "scene51a"
            }
        },
        scene51a: {
            edges: {
                prev: "scene51",
                next: "scene52"
            }
        },
        scene52: {
            edges: {
                prev: "scene51",
                next: "scene53"
            }
        },
        scene53: {
            edges: {
                prev: "scene52",
                next: "scene54"
            }
        },
        scene54: {
            edges: {
                prev: "scene53",
                next: "scene55"
            }
        },
        scene55: {
            edges: {
                prev: "scene54",
                next: "scene56"
            }
        },
        scene56: {
            edges: {
                prev: "scene55",
                next: "scene57"
            }
        },
        scene57: {
            edges: {
                prev: "scene56",
                next: "scene58"
            }
        },
        scene58: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene57",
                next: "scene58a"
            },
            question: {
                type: "mc",
                text: "What do these results suggest?",
                correctAnswer: "a",
                posFb: "That’s right!",
                negFb: "Well, actually...",
                options: [
                    { value: "a", label: "Salt crystals grew more in hot water." },
                    { value: "b", label: "Salt crystals grew more in cold water." },
                    { value: "c", label: "Salt crystals grew equally well in hot and cold water." }
                ]
            }
        },
        scene58a: {
            edges: {
                prev: "scene58",
                next: "scene59"
            }
        },
        scene59: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene58",
                next: "scene60"
            },
            question: {
                type: "survey",
                text: "How sure are you that water temperature caused this difference in means?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene60: {
            edges: {
                prev: "scene59",
                next: "scene61"
            }
        },
        scene61: {
            edges: {
                prev: "scene60",
                next: "scene62"
            }
        },
        scene62: {
            edges: {
                prev: "scene61",
                next: "scene63"
            }
        },
        scene63: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene62",
                next: "scene63a"
            },
            question: {
                type: "mc",
                text: "What do these results suggest?",
                correctAnswer: "a",
                posFb: "That’s right!",
                negFb: "Well, actually...",
                options: [
                    { value: "a", label: "Salt crystals grew more in hot water." },
                    { value: "b", label: "Salt crystals grew more in cold water." },
                    { value: "c", label: "Salt crystals grew equally well in hot and cold water." }
                ]
            }
        },
        scene63a: {
            edges: {
                prev: "scene63",
                next: "scene64"
            }
        },
        scene64: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene63a",
                next: "scene65"
            },
            question: {
                type: "survey",
                text: "How sure are you that water temperature caused this difference in means?",
                correctAnswer: NA,
                ntlFb: "Thanks!",
                options: SURVEY_OPTIONS
            }
        },
        scene65: {
            edges: {
                prev: "scene64",
                next: "scene66"
            }
        },
        scene66: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene65",
                next: "scene67"
            },
            question: {
                type: "mc",
                text: "Which results (weight of crystals) are LESS spread out? (HINT: look at the range of salt weights on the x-axis.)",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results A" },
                    { value: "b", label: "Results B" },
                    { value: "c", label: "They are the same." }
                ]
            }
        },
        scene67: {
            edges: {
                prev: "scene66",
                next: "scene68"
            }
        },
        scene68: {
            edges: {
                prev: "scene67",
                next: "scene69"
            }
        },
        scene69: {
            edges: {
                prev: "scene68",
                next: "scene70"
            }
        },
        scene70: {
            edges: {
                prev: "scene69",
                next: "scene71"
            }
        },
        scene71: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene70",
                next: "scene72"
            },
            question: {
                type: "mc",
                text: "Which results (weight of crystals) are LESS spread out?",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results A" },
                    { value: "b", label: "Results B" },
                    { value: "c", label: "They are the same." }
                ]
            }
        },
        scene72: {
            edges: {
                prev: "scene71",
                next: "scene73"
            }
        },
        scene73: {
            edges: {
                prev: "scene72",
                next: "scene74"
            }
        },
        scene74: {
            edges: {
                prev: "scene73",
                next: "scene75"
            }
        },
        scene75: {
            edges: {
                prev: "scene74",
                next: "scene76"
            }
        },
        scene76: {
            edges: {
                prev: "scene75",
                next: "scene77"
            }
        },
        scene77: {
            edges: {
                prev: "scene76",
                next: "scene78"
            }
        },
        scene78: {
            edges: {
                prev: "scene77",
                next: "scene79"
            }
        },
        scene79: {
            edges: {
                prev: "scene78",
                next: "scene80"
            }
        },
        scene80: {
            edges: {
                prev: "scene79",
                next: "scene81"
            }
        },
        scene81: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene80",
                next: "scene82"
            },
            question: {
                type: "mc",
                text: "So, based on the amount of spread in the data, which results are stronger evidence that water temperature affects crystal growth?",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results A" },
                    { value: "b", label: "Results B" },
                    { value: "c", label: "They are the same."}
                ]
            }
        },
        scene82: {
            edges: {
                prev: "scene81",
                next: "scene83"
            }
        },
        scene83: {
            edges: {
                prev: "scene82",
                next: "scene84"
            }
        },
        scene84: {
            edges: {
                prev: "scene83",
                next: "scene89"
            }
        },
        scene89: {
            edges: {
                prev: "scene84",
                next: "scene90"
            }
        },
        scene90: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene89",
                next: "scene91"
            },
            question: {
                type: "mc",
                text: "Which data are LESS spread out?",
                correctAnswer: "b",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results C" },
                    { value: "b", label: "Results D" },
                    { value: "c", label: "They are the same."}
                ],
            }
        },
        scene91: {
            edges: {
                prev: "scene90",
                next: "scene92"
            }
        },
        scene92: {
            edges: {
                prev: "scene91",
                next: "scene93"
            }
        },
        scene93: {
            edges: {
                prev: "scene92",
                next: "scene94"
            }
        },
        scene94: {
            edges: {
                prev: "scene93",
                next: "scene95"
            }
        },
        scene95: {
            edges: {
                prev: "scene94",
                next: "scene96"
            }
        },
        scene96: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene95",
                next: "scene97"
            },
            question: {
                type: "mc",
                text: "So, which Results (C or D) are stronger evidence that water temperature affects crystal growth?",
                correctAnswer: "b",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results C" },
                    { value: "b", label: "Results D" },
                    { value: "c", label: "They are the same."}
                ]
            }
        },
        scene97: {
            edges: {
                prev: "scene96",
                next: "scene98"
            }
        },
        scene98: {
            edges: {
                prev: "scene97",
                next: "scene99"
            }
        },
        scene99: {
            edges: {
                prev: "scene98",
                next: "scene100"
            }
        },
        scene100: {
            edges: {
                prev: "scene99",
                next: "scene101"
            }
        },
        scene101: {
            edges: {
                prev: "scene100",
                next: "scene102"
            }
        },
        scene102: {
            edges: {
                prev: "scene101",
                next: "scene103"
            }
        },
        scene103: {
            edges: {
                prev: "scene102",
                next: "scene104"
            }
        },
        scene104: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene103",
                next: "scene104a"
            },
            question: {
                type: "mc",
                text: "What do these two sets of results (Results E &amp; F) suggest?",
                correctAnswer: "c",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Sugar crystals grow better than salt crystals." },
                    { value: "b", label: "Salt crystals grow better than sugar crystals." },
                    { value: "c", label: "I don’t know; They show opposite results." }
                ]
            }
        },
        scene104a: {
            edges: {
                prev: "scene104",
                next: "scene105"
            }
        },
        scene105: {
            edges: {
                prev: "scene104a",
                next: "scene106"
            }
        },
        scene106: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene105",
                next: "scene107"
            },
            question: {
                type: "mc",
                text: "Now that you see their measurements, which of the two sets of results do you trust more?",
                correctAnswer: "b",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Results E" },
                    { value: "b", label: "Results F" },
                    { value: "c", label: "They are equally good results." }
                ]
            }
        },
        scene107: {
            edges: {
                prev: "scene106",
                next: "scene108"
            }
        },
        scene108: {
            sceneType: SCENE_TYPES.mc,
            edges: {
                prev: "scene107",
                next: "scene108a"
            },
            question: {
                type: "mc",
                text: "Based on Results E &amp; F, which statement is more likely to be true?",
                correctAnswer: "a",
                posFb: "Right!",
                negFb: "Actually...",
                options: [
                    { value: "a", label: "Salt crystals grow better on a string in water than sugar crystals." },
                    { value: "b", label: "Sugar crystals grow better on a string in water than salt crystals." },
                    { value: "c", label: "Again, it’s impossible to even guess." }
                ]
            }
        },
        scene108a: {
            edges: {
                prev: "scene108",
                next: "scene109"
            }
        },
        scene109: {
            edges: {
                prev: "scene108a",
                next: "scene110"
            }
        },
        scene110: {
            edges: {
                prev: "scene109",
                next: "scene111"
            }
        },
        scene111: {
            edges: {
                prev: "scene110",
                next: "scene112"
            }
        },
        scene112: {
            edges: {
                prev: "scene111",
                next: "scene113"
            }
        },
        scene113: {
            edges: {
                prev: "scene112",
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "scene113"
            }
        }
    }
};

module.exports = diInstructionData;