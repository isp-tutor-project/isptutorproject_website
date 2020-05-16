const { surveyOptions } = require("./shared");

module.exports = {
    questions: {
        car: {
            q1: {
                type: "mc",
                text: "Q1) What do these results suggest about which type of wheel was faster?",
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
                text: "Q3) How sure are you that PLACEHOLDER were faster?",
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
                    label: "Neither Location"
                }]
            },
            q2: {
                type: "textarea",
                text: "Q2) Please briefly explain why you said that these results suggest that students learned more at PLACEHOLDER."
            },
            q3: {
                type: "survey",
                text: "Q3) How sure are you that students learned more at PLACEHOLDER?",
                options: surveyOptions
            }
        }
    },
    scenes: {
        start: {
            transitions: {
                next: "intro"
            }
        },
        intro: {
            transitions: {
                prev: "start",
                next: "carsIntro1"
            }
        },
        carsIntro1: {
            transitions: {
                prev: "intro",
                next: "carsIntro2"
            }
        },
        carsIntro2: {
            transitions: {
                prev: "carsIntro1",
                next: "carsIntro3"
            }
        },
        carsIntro3: {
            transitions: {
                prev: "carsIntro2",
                next: "carsResultsIntro1"
            }
        },
        carsResultsIntro1: {
            transitions: {
                prev: "carsIntro3",
                next: "carsResults1"
            }
        },
        carsResults1: {
            sceneType: "carResults",
            transitions: {
                prev: "carsResultsIntro1",
                next: "carsResultsIntro2"
            }
        },
        carsResultsIntro2: {
            transitions: {
                prev: "carsResults1",
                next: "carsResults2"
            }
        },
        carsResults2: {
            sceneType: "carResults",
            transitions: {
                prev: "carsResultsIntro2",
                next: "carsResultsIntro3"
            }
        },
        carsResultsIntro3: {
            transitions: {
                prev: "carsResults2",
                next: "carsResults3"
            }
        },
        carsResults3: {
            sceneType: "carResults",
            transitions: {
                prev: "carsResultsIntro3",
                next: "carsResultsIntro4"
            }
        },
        carsResultsIntro4: {
            transitions: {
                prev: "carsResults3",
                next: "carsResults4"
            }
        },
        carsResults4: {
            sceneType: "carResults",
            transitions: {
                prev: "carsResultsIntro4",
                next: "carsResultsIntro5"
            }
        },
        carsResultsIntro5: {
            transitions: {
                prev: "carsResults4",
                next: "carsResults5"
            }
        },
        carsResults5: {
            sceneType: "carResults",
            transitions: {
                prev: "carsResultsIntro5",
                next: "libraryIntro1"
            }
        },
        libraryIntro1: {
            transitions: {
                prev: "carsResults5",
                next: "libraryIntro2"
            }
        },
        libraryIntro2: {
            transitions: {
                prev: "libraryIntro1",
                next: "libraryIntro3"
            }
        },
        libraryIntro3: {
            transitions: {
                prev: "libraryIntro2",
                next: "libraryIntro4"
            }
        },
        libraryIntro4: {
            transitions: {
                prev: "libraryIntro3",
                next: "libraryIntro5"
            }
        },
        libraryIntro5: {
            transitions: {
                prev: "libraryIntro4",
                next: "libraryIntro6"
            }
        },
        libraryIntro6: {
            transitions: {
                prev: "libraryIntro5",
                next: "libraryResultsIntro1"
            }
        },
        libraryResultsIntro1: {
            transitions: {
                prev: "libraryIntro6",
                next: "libraryResults1"
            }
        },
        libraryResults1: {
            sceneType: "libraryResults",
            transitions: {
                prev: "libraryResultsIntro1",
                next: "libraryResultsIntro2"
            }
        },
        libraryResultsIntro2: {
            transitions: {
                prev: "libraryResults1",
                next: "libraryResults2"
            }
        },
        libraryResults2: {
            sceneType: "libraryResults",
            transitions: {
                prev: "libraryResultsIntro2",
                next: "libraryResultsIntro3"
            }
        },
        libraryResultsIntro3: {
            transitions: {
                prev: "libraryResults2",
                next: "libraryResults3"
            }
        },
        libraryResults3: {
            sceneType: "libraryResults",
            transitions: {
                prev: "libraryResultsIntro3",
                next: "libraryResultsIntro4"
            }
        },
        libraryResultsIntro4: {
            transitions: {
                prev: "libraryResults3",
                next: "libraryResults4"
            }
        },
        libraryResults4: {
            sceneType: "libraryResults",
            transitions: {
                prev: "libraryResultsIntro4",
                next: "libraryResultsIntro5"
            }
        },
        libraryResultsIntro5: {
            transitions: {
                prev: "libraryResults4",
                next: "libraryResults5"
            }
        },
        libraryResults5: {
            sceneType: "libraryResults",
            transitions: {
                prev: "libraryResultsIntro5",
                next: "complete"
            }
        },
        complete: {
            transitions: {
                prev: "libraryResults5",
            }
        },
    }
}