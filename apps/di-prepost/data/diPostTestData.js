const { surveyOptions } = require("./shared");

module.exports = {
    questions: {
        car: {
            q1: {
                type: "mc",
                text: "Q1) Which type of wheel do these results suggest was faster?",
                options: [{
                    value: "thick wheels",
                    label: "Thick Wheels"
                }, {
                    value: "thin wheels",
                    label: "Thin Wheels"
                }, {
                    value: "neither wheels",
                    label: "Neither Wheels"
                }]
            },
            q2: {
                type: "textarea",
                text: "Q2) Please briefly explain why you said these results suggest that PLACEHOLDER were faster."
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you these results show PLACEHOLDER were faster?",
                options: surveyOptions
            }
        },
        library: {
            q1: {
                type: "mc",
                text: "Q1) Where do these results suggest that students learn more?",
                options: [{
                    value: "the library",
                    label: "The Library"
                }, {
                    value: "home",
                    label: "Home"
                }, {
                    value: "neither location",
                    label: "Neither"
                }]
            },
            q2: {
                type: "textarea",
                text: "Q2) Please briefly explain why you said that these results suggest that students learned more at PLACEHOLDER."
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you these results show students learned more at PLACEHOLDER?",
                options: surveyOptions
            }
        }
    },
    scenes: {
        start: {
            edges: {
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
            edges: {
                prev: "start",
                next: "repetitive"
            }
        },
        repetitive: {
            edges: {
                prev: "intro",
                next: "carsIntro1"
            }
        },
        carsIntro1: {
            edges: {
                prev: "intro",
                next: "carsIntro2"
            }
        },
        carsIntro2: {
            edges: {
                prev: "carsIntro1",
                next: "carsIntro3"
            }
        },
        carsIntro3: {
            edges: {
                prev: "carsIntro2",
                next: "carsResultsIntro1"
            }
        },
        carsResultsIntro1: {
            edges: {
                prev: "carsIntro3",
                next: "carsResults1"
            }
        },
        carsResults1: {
            sceneType: "carResults",
            edges: {
                prev: "carsResultsIntro1",
                next: "carsResultsIntro2"
            }
        },
        carsResultsIntro2: {
            edges: {
                prev: "carsResults1",
                next: "carsResults2"
            }
        },
        carsResults2: {
            sceneType: "carResults",
            edges: {
                prev: "carsResultsIntro2",
                next: "carsResultsIntro3"
            }
        },
        carsResultsIntro3: {
            edges: {
                prev: "carsResults2",
                next: "carsResults3"
            }
        },
        carsResults3: {
            sceneType: "carResults",
            edges: {
                prev: "carsResultsIntro3",
                next: "carsResultsIntro4"
            }
        },
        carsResultsIntro4: {
            edges: {
                prev: "carsResults3",
                next: "carsResults4"
            }
        },
        carsResults4: {
            sceneType: "carResults",
            edges: {
                prev: "carsResultsIntro4",
                next: "carsResultsIntro5"
            }
        },
        carsResultsIntro5: {
            edges: {
                prev: "carsResults4",
                next: "carsResults5"
            }
        },
        carsResults5: {
            sceneType: "carResults",
            edges: {
                prev: "carsResultsIntro5",
                next: "libraryIntro1"
            }
        },
        libraryIntro1: {
            edges: {
                prev: "carsResults5",
                next: "libraryIntro2"
            }
        },
        libraryIntro2: {
            edges: {
                prev: "libraryIntro1",
                next: "libraryIntro3"
            }
        },
        libraryIntro3: {
            edges: {
                prev: "libraryIntro2",
                next: "libraryIntro4"
            }
        },
        libraryIntro4: {
            edges: {
                prev: "libraryIntro3",
                next: "libraryIntro5"
            }
        },
        libraryIntro5: {
            edges: {
                prev: "libraryIntro4",
                next: "libraryIntro6"
            }
        },
        libraryIntro6: {
            edges: {
                prev: "libraryIntro5",
                next: "libraryResultsIntro1"
            }
        },
        libraryResultsIntro1: {
            edges: {
                prev: "libraryIntro6",
                next: "libraryResults1"
            }
        },
        libraryResults1: {
            sceneType: "libraryResults",
            edges: {
                prev: "libraryResultsIntro1",
                next: "libraryResultsIntro2"
            }
        },
        libraryResultsIntro2: {
            edges: {
                prev: "libraryResults1",
                next: "libraryResults2"
            }
        },
        libraryResults2: {
            sceneType: "libraryResults",
            edges: {
                prev: "libraryResultsIntro2",
                next: "libraryResultsIntro3"
            }
        },
        libraryResultsIntro3: {
            edges: {
                prev: "libraryResults2",
                next: "libraryResults3"
            }
        },
        libraryResults3: {
            sceneType: "libraryResults",
            edges: {
                prev: "libraryResultsIntro3",
                next: "libraryResultsIntro4"
            }
        },
        libraryResultsIntro4: {
            edges: {
                prev: "libraryResults3",
                next: "libraryResults4"
            }
        },
        libraryResults4: {
            sceneType: "libraryResults",
            edges: {
                prev: "libraryResultsIntro4",
                next: "libraryResultsIntro5"
            }
        },
        libraryResultsIntro5: {
            edges: {
                prev: "libraryResults4",
                next: "libraryResults5"
            }
        },
        libraryResults5: {
            sceneType: "libraryResults",
            edges: {
                prev: "libraryResultsIntro5",
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "libraryResults5"
            }
        }
    }
}