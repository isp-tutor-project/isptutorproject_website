const { surveyOptions } = require("./shared");

module.exports = {
    questions: {
        crystal: {
            q1: {
                type: "mc",
                text: "Q1) Which initial water temperature do these results suggest cause crystals to grow better?",
                options: [
                    {
                        value: "hot water",
                        label: "Hot water"
                    },
                    {
                        value: "cold water",
                        label: "Cold water"
                    },
                    {
                        value: "neither",
                        label: "Neither (Crystals grow the same in both hot and cold water)"
                    }
                ]
            },
            q2: {
                type: "textarea",
                text: "Q2) Please briefly explain why you said these results suggest that crystals grow better in PLACEHOLDER",
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you these results show crystals grow better in PLACEHOLDER?",
                options: surveyOptions
            }
        }
    },
    scenes: {
        start: {
            edges: {
                next: "crystalResults1Intro"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        crystalResults1Intro: {
            edges: {
                prev: "start",
                next: "crystalResults1"
            }
        },
        crystalResults1: {
            sceneType: "crystalResults",
            edges: {
                prev: "crystalResults1Intro",
                next: "crystalResults2Intro"
            }
        },
        crystalResults2Intro: {
            edges: {
                prev: "crystalResults1",
                next: "crystalResults2"
            }
        },
        crystalResults2: {
            sceneType: "crystalResults",
            edges: {
                prev: "crystalResults2Intro",
                next: "crystalResults3Intro"
            }

        },
        crystalResults3Intro: {
            edges: {
                prev: "crystalResults2",
                next: "crystalResults3"
            }
        },
        crystalResults3: {
            sceneType: "crystalResults",
            edges: {
                prev: "crystalResults3Intro",
                next: "crystalResults4Intro"
            }
        },
        crystalResults4Intro: {
            edges: {
                prev: "crystalResults3",
                next: "crystalResults4"
            }
        },
        crystalResults4: {
            sceneType: "crystalResults",
            edges: {
                prev: "crystalResults4Intro",
                next: "crystalResults5Intro"
            }
        },
        crystalResults5Intro: {
            edges: {
                prev: "crystalResults4",
                next: "crystalResults5"
            }
        },
        crystalResults5: {
            sceneType: "crystalResults",
            edges: {
                prev: "crystalResults5Intro",
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "crystalResults5"
            }
        }
    }
};

