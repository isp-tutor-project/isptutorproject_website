const { surveyOptions } = require("./shared");

module.exports = {
    questions: {
        memory: {
            q1: {
                type: "mc",
                text: "Q1) What do these results suggest students remember better?",
                options: [
                    {
                        value: "words", 
                        label: "Words"
                    },
                    {
                        value: "pictures",
                        label: "Pictures"
                    },
                    {
                        value: "neither",
                        label: "Neither (they remember words and pictures the same)"
                    }
                ]
            },        
            q2: {
                type: "textarea",
                text: "Q2) Briefly explain why you said these results suggest students remember PLACEHOLDER better.",
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you that students remember PLACEHOLDER better?",
                options: surveyOptions
            }
        },
        rockets: {
            q1: {
                type: "mc",
                text: "Q1) What do these results suggest about which rocket flew higher?",
                options: [{
                    value: "curved",
                    label: "Curved"
                }, {
                    value: "straight",
                    label: "Straight"
                }, {
                    value: "neither",
                    label: "Neither (both rockets flew the same height)"
                }]
            },
            q2: {
                type: "textarea",
                text: "Q2) Briefly explain why you said these results suggest that PLACEHOLDER rocket(s) flew higher."
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you that PLACEHOLDER rockets flew higher?",
                options: surveyOptions
            }                
        }
    },
    scenes: {
        start: {
            transitions: {
                next: "intro"
            }, 
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        intro: {
            transitions: {
                prev: "start",
                next: "memoryIntro1"
            }
        },
        memoryIntro1: {
            transitions: {
                prev: "intro",
                next: "memoryIntro2"
            }
        },
        memoryIntro2: {
            transitions: {
                prev: "memoryIntro1",
                next: "memoryIntro3"
            }
        },
        memoryIntro3: {
            transitions: {
                prev: "memoryIntro2",
                next: "memoryIntro4"
            }
        },
        memoryIntro4: {
            transitions: {
                prev: "memoryIntro3",
                next: "memoryIntro5"
            }
        },
        memoryIntro5: {
            transitions: {
                prev: "memoryIntro4",
                next: "memoryIntro6"
            }
        },
        memoryIntro6: {
            transitions: {
                prev: "memoryIntro5",
                next: "memoryIntro7"
            }
        },
        memoryIntro7: {
            transitions: {
                prev: "memoryIntro6",
                next: "memoryResults1Intro"
            }
        },
        memoryResults1Intro: {
            transitions: {
                prev: "memoryIntro7",
                next: "memoryResults1"
            }
        },
        memoryResults1: {
            sceneType: "memoryResults",
            transitions: {
                prev: "memoryResults1Intro",
                next: "memoryResults2Intro"
            }
        },
        memoryResults2Intro: {
            transitions: {
                prev: "memoryResults1",
                next: "memoryResults2"
            }
        },
        memoryResults2: {
            sceneType: "memoryResults",
            transitions: {
                prev: "memoryResults2Intro",
                next: "memoryResults3Intro"
            }
        },
        memoryResults3Intro: {
            transitions: {
                prev: "memoryResults2",
                next: "memoryResults3"
            }
        },
        memoryResults3: {
            sceneType: "memoryResults",
            transitions: {
                prev: "memoryResults3Intro",
                next: "memoryResults4Intro"
            }
        },
        memoryResults4Intro: {
            transitions: {
                prev: "memoryResults3",
                next: "memoryResults4"
            }
        },
        memoryResults4: {
            sceneType: "memoryResults",
            transitions: {
                prev: "memoryResults4Intro",
                next: "memoryResults5Intro"
            }
        },
        memoryResults5Intro: {
            transitions: {
                prev: "memoryResults4",
                next: "memoryResults5"
            }
        },
        memoryResults5: {
            sceneType: "memoryResults",
            transitions: {
                prev: "memoryResults5Intro",
                next: "rocketsIntro1"
            }
        },
        rocketsIntro1: {
            transitions: {
                prev: "memoryResults5",
                next: "rocketsIntro2"
            }
        },
        rocketsIntro2: {
            transitions: {
                prev: "rocketsIntro1",
                next: "rocketsIntro3"
            }
        },
        rocketsIntro3: {
            transitions: {
                prev: "rocketsIntro2",
                next: "rocketsIntro4"
            }
        },
        rocketsIntro4: {
            transitions: {
                prev: "rocketsIntro3",
                next: "rocketsResults1Intro"
            }
        },
        rocketsResults1Intro: {
            transitions: {
                prev: "rocketsIntro4",
                next: "rocketsResults1"
            }
        },
        rocketsResults1: {
            sceneType: "rocketsResults",
            transitions: {
                prev: "rocketsResults1Intro",
                next: "rocketsResults2Intro"
            }
        },
        rocketsResults2Intro: {
            transitions: {
                prev: "rocketsResults1",
                next: "rocketsResults2"
            }
        },
        rocketsResults2: {
            sceneType: "rocketsResults",
            transitions: {
                prev: "rocketsResults2Intro",
                next: "rocketsResults3Intro"
            }
        },
        rocketsResults3Intro: {
            transitions: {
                prev: "rocketsResults2",
                next: "rocketsResults3"
            }
        },
        rocketsResults3: {
            sceneType: "rocketsResults",
            transitions: {
                prev: "rocketsResults3Intro",
                next: "rocketsResults4Intro"
            }
        },
        rocketsResults4Intro: {
            transitions: {
                prev: "rocketsResults3",
                next: "rocketsResults4"
            }
        },
        rocketsResults4: {
            sceneType: "rocketsResults",
            transitions: {
                prev: "rocketsResults4Intro",
                next: "rocketsResults5Intro"
            }
        },
        rocketsResults5Intro: {
            transitions: {
                prev: "rocketsResults4",
                next: "rocketsResults5"
            }
        },
        rocketsResults5: {
            sceneType: "rocketsResults",
            transitions: {
                prev: "rocketsResults5Intro",
                next: "completed"
            }
        },
        completed: {
            transitions: {
                prev: "rocketsResults5"
            }
        }
    }
};
