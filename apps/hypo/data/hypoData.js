// using as many constants as possible to prevent typos
// unfortunately this doesn't work for property names
const RAISE_YOUR_HAND = "raiseYourHand";
const START_PAGE      = "startPage";
const DEF_PAGE_10     = "definitionPage10";
const DEF_PAGE_20     = "definitionPage20";
const DEF_PAGE_30     = "definitionPage30";
const DEF_PAGE_40     = "definitionPage40";
const DEF_PAGE_50A    = "definitionPage50a";
const DEF_PAGE_50B    = "definitionPage50b";
const DEF_PAGE_50C    = "definitionPage50c";
const DEF_PAGE_50D    = "definitionPage50d";
const DEF_PAGE_60A    = "definitionPage60a";
const DEF_PAGE_60B    = "definitionPage60b";
const DEF_PAGE_60C    = "definitionPage60c";
const DEF_PAGE_70A    = "definitionPage70a";
const DEF_PAGE_70B    = "definitionPage70b";
const DEF_PAGE_70C    = "definitionPage70c";
const DEF_PAGE_80A    = "definitionPage80a";
const DEF_PAGE_80B    = "definitionPage80b";
const DEF_PAGE_80C    = "definitionPage80c";
const DEF_PAGE_90A    = "definitionPage90a";
const DEF_PAGE_90B    = "definitionPage90b";
const DEF_PAGE_90C    = "definitionPage90c";
const DEF_PAGE_100    = "definitionPage100";
const BACK_TO_YOUR_RQ = "backToYourRQ";

const HIDE_BTNS       = "hideBtns";
const PREV            = "prev";
const NEXT            = "next";

const OPTIONS = [
    { value: 'a', label: "Definition"},
    { value: 'b', label: "Causes"},
    { value: 'c', label: "Correlation"},
];

const hypoDefinitionsData = {
    scenes: {
        raiseYourHand: {
            transitions: {},
            customEnterActions: [
                {
                    name: HIDE_BTNS,
                    args: [PREV, NEXT]
                }
            ]
        },
        startPage: {
            transitions: {
                prev: RAISE_YOUR_HAND,
                next: DEF_PAGE_10
            }
        },
        definitionPage10: {
            transitions: {
                prev: START_PAGE,
                next: DEF_PAGE_20
            }
        },
        definitionPage20: {
            transitions: {
                prev: DEF_PAGE_10,
                next: DEF_PAGE_30
            }
        },
        definitionPage30: {
            transitions: {
                prev: DEF_PAGE_20,
                next: DEF_PAGE_40
            }
        },
        definitionPage40: {
            transitions: {
                prev: DEF_PAGE_30,
                next: DEF_PAGE_50A
            }
        },
        definitionPage50a: {
            transitions: {
                prev: DEF_PAGE_40,
                next: DEF_PAGE_50B
            }
        },
        definitionPage50b: {
            transitions: {
                prev: DEF_PAGE_50A,
                next: DEF_PAGE_50C
            }
        },
        definitionPage50c: {
            transitions: {
                prev: DEF_PAGE_50B,
                next: DEF_PAGE_50D
            }
        },
        definitionPage50d: {
            transitions: {
                prev: DEF_PAGE_50C,
                next: DEF_PAGE_60A
            }
        },
        definitionPage60a: {
            transitions: {
                prev: DEF_PAGE_50D,
                next: DEF_PAGE_60B
            }
        },
        definitionPage60b: {
            transitions: {
                prev: DEF_PAGE_60A,
                next: DEF_PAGE_60C
            }
        },
        definitionPage60c: {
            transitions: {
                prev: DEF_PAGE_60B,
                next: DEF_PAGE_70A
            }
        },
        definitionPage70a: {
            transitions: {
                prev: DEF_PAGE_60C,
                next: DEF_PAGE_70B
            }
        },
        definitionPage70b: {
            transitions: {
                prev: DEF_PAGE_70A,
                next: DEF_PAGE_70C
            }
        },
        definitionPage70c: {
            transitions: {
                prev: DEF_PAGE_70B,
                next: DEF_PAGE_80A
            }
        },
        definitionPage80a: {
            transitions: {
                prev: DEF_PAGE_70C,
                next: DEF_PAGE_80B
            }
        },
        definitionPage80b: {
            transitions: {
                prev: DEF_PAGE_80A,
                next: DEF_PAGE_80C
            }
        },
        definitionPage80c: {
            transitions: {
                prev: DEF_PAGE_80B,
                next: DEF_PAGE_90A
            }
        },
        definitionPage90a: {
            transitions: {
                prev: DEF_PAGE_80C,
                next: DEF_PAGE_90B
            }
        },
        definitionPage90b: {
            transitions: {
                prev: DEF_PAGE_90A,
                next: DEF_PAGE_90C
            }
        },
        definitionPage90c: {
            transitions: {
                prev: DEF_PAGE_90B,
                next: DEF_PAGE_100
            }
        },
        definitionPage100: {
            sceneType: "questions",
            questions: {
                q1: { 
                    id: "q1",
                    text: "<u>How often a city is hit by a hurricane</u> and<u>how often it floods</u>",
                    correctAnswer: "b",
                    options: OPTIONS
                },
                q2: {
                    id: "q2",
                    text: "<u>Margarine (butter) sales</u> and <u>divorce rate</u>",
                    correctAnswer: "c",
                    options: OPTIONS
                }, 
                q3: {
                    id: "q3",
                    text: "<u>Humidity</u> and <u>the amount of water in the air</u>",
                    correctAnswer: "a",
                    options: OPTIONS
                }, 
                q4: {
                    id: "q4",
                    text: "<u>How hard you push on an object</u> and <u>how much the object moves</u>",
                    correctAnswer: "b",
                    options: OPTIONS
                }, 
                q5: {
                    id: "q5",
                    text: "<u>Friction</u> and <u>force of resistance to motion on a surface</u>",
                    correctAnswer: "a",
                    options: OPTIONS
                }
            },
            transitions: {
                prev: DEF_PAGE_90C,
                next: BACK_TO_YOUR_RQ
            }
        },
        backToYourRQ: {
            transitions: {
                prev: DEF_PAGE_100
            }
        }
    }
};

module.exports = hypoDefinitionsData;