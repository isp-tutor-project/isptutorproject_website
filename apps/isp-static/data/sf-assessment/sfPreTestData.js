const { ScienceFairAssessmentDataBuilder } = require("./builders");

const sfPreTestData = {
    scenes: {
        start: {
            edges: {
                next: "evalIntro1"  //this is one slide
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        evalIntro1: {
            edges: {
                prev: "start",
                next: "evalIntro2"
            }
        },
        evalIntro2: {
            edges: {
                prev: "evalIntro1",
                next: "evalIntro3"
            }
        },
        evalIntro3: {
            edges: {
                prev: "evalIntro2",
                next: "posterIntro1"
            }
        },
        posterIntro1: {
            edges: {
                prev: "evalIntro3",
                next: "posterIntro2"
            }
        },
        posterIntro2: {
            edges: {
                prev: "posterIntro1",
                next: "sodaMintIntro"
            }
        },
        
        sodaMintIntro: {
            edges: {
                prev: "posterIntro2",
                next: "SodaMintQ1"
            }
        },
        SodaMintQ1: {
            edges: {
                prev: "sodaMintIntro",
                next: "SodaMintLookEachSection"
            },
            question: {
                id: "sfPreTest.sodaMint.q1",
                type: "mc",
                correctAnswer: "a",
                text: "Q1) Do you see any ways to improve this science project?",
                options: [
                    { value: "a", label: "Yes" },
                    { value: "b", label: "No" },
                  
                ]
            }
        },

        SodaMintLookEachSection: {
            edges: {
                prev: "SodaMintQ1",
                next: "SodaMintQ2"
            }
        },

        SodaMintQ2: {
            edges: {
                prev: "SodaMintQ1",
                next: "buildBeansIntro"
            },
            question: {
                id: "sfPreTest.sodaMint.q2",
                type: "mc",
                correctAnswer: "c",
                text: "Q2) [ENTER]]",
                options: [
                    { value: "a", label: "Would that be of the <b>African</b>" },
                    { value: "b", label: "or <b>European</b> variety?" },
                    { value: "c", label: "42" }
                ]
            }
        },
        buildBeansIntro: {
            edges: {
                prev: "SodaMintQ2",
                next: "completed"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        completed: {
            edges: {
                prev: "SodaMintQ2"
            }
        }
    }
};

let bldr = new ScienceFairAssessmentDataBuilder(sfPreTestData);
module.exports = bldr.buildData();
