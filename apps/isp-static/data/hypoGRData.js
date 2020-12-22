module.exports = {
    scenes: {
        start: {
            edges: {
                next: "definition1"
            }
        },
        definition1: {
            edges: {
                prev: "start",
                next: "lessonOverview1"
            }
        },
        lessonOverview1: {
            edges: {
                prev: "definition1",
                next: "lessonOverview2"
            }
        },
        lessonOverview2: {
            edges: {
                prev: "lessonOverview1",
                next: "definition2"
            }
        },
        definition2: {
            edges: {
                prev: "lessonOverview2",
                next: "definition3"
            }
        },
        definition3: {
            edges: {
                prev: "definition2",
                next: "definition4"
            }
        },
        definition4: {
            edges: {
                prev: "definition3",
                next: "definition5"
            }
        },
        definition5: {
            edges: {
                prev: "definition4",
                next: "definition6"
            }
        },
        definition6: {
            edges: {
                prev: "definition5",
                next: "causes1"
            }
        },
        causes1: {
            edges: {
                prev: "definition6",
                next: "causes2"
            }
        },
        causes2: {
            edges: {
                prev: "causes1",
                next: "corr1"
            }
        },
        corr1: {
            edges: {
                prev: "causes2",
                next: "corr2"
            }
        },
        corr2: {
            edges: {
                prev: "corr1",
                next: "quiz"
            }
        },
        quiz: {
            edges: {
                prev: "corr2",
                next: "backToYourRQ"
            }
        },
        backToYourRQ: {
            edges: {
                prev: "quiz",
                next: "prediction2"
            }
        },
        prediction2: {
            edges: {
                prev: "backToYourRQ",
                next: "graph"
            }
        },
        graph: {
            edges: {
                prev: "prediction2",
                next: "notePad"
            }
        },
        notePad: {
            edges: {
                prev: "graph",
                next: "instruction"
            }
        },
        instruction: {
            edges: {
                prev: "notePad",
                next: "finalConceptMap"
            }
        },
        finalConceptMap: {
            edges: {
                prev: "instruction",
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "finalConceptMap",
            }
        }
    }
}