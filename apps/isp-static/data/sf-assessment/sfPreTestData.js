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
                next: "sodaMintLookEachSection"
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

        sodaMintLookEachSection: {
            edges: {
                prev: "SodaMintQ1",
                next: "SodaMintQ2"
            }
        },

        SodaMintQ2: {
            edges: {
                prev: "sodaMintLookEachSection",
                next: "SodaMintQ2y"
            },
            question: {
                id: "sfPreTest.sodaMint.q2",
                type: "mc",
                correctAnswer: "a",
                text: "Q2) Do you see any problems with the student's Research Question?",
                options: [
                    { value: "a", label: "Yes" },
                    { value: "b", label: "No" },
                ]
            }
        },
        
        
        SodaMintQ2y: {
            edges: {
                prev: "SodaMintQ2",
                next: "SodaMintQ3"
            },
            question: {
                id: "sfPreTest.sodaMint.q2y",
                type: "mc",
                correctAnswer: "b",
                text: "Q2y) What is the biggest problem with Kaya's Research Question?",
                options: [
                    { value: "a", label: "Carbon dioxide doesn't affect the reaction." },
                    { value: "b", label: "At least one variable is not specific enough." },
                    { value: "c", label: "It doesn't address what she tested in the experiment." },
                ]
            }
        },

        

       SodaMintQ3: {
            edges: {
                prev: "SodaMintQ2y",
                next: "buildBeansIntro"
            },
            question: {
                id: "sfPreTest.sodaMint.q3",
                type: "mc",
                correctAnswer: "a",
                text: "Q3) Do you see any problems with the Hypothesis section?",
                options: [
                    { value: "a", label: "Yes" },
                    { value: "b", label: "No" },
                ]
            }
        },

  /*      SodaMintQ3y: {
            edges: {
                prev: "SodaMintQ3",
                next: "SodaMintQ4"
            },
            question: {
                id: "sfPreTest.sodaMint.q3y",
                type: "mc",
                correctAnswer: "c",
                text: "Q3y) What is the biggest problem with Kaya's Hypothesis?",
                options: [
                        { value: "a", label: "The hypothesis is too long." },
                        { value: "b", label: "It is not directly related to the research question. " },
                        { value: "c", label: "There is no scientific explanation given." },
                ]
            }
        },

        
     /*   SodaMintQ4: {     */

            buildBeansIntro: {
            edges: {
                prev: "SodaMintQ3",
                next: "completed"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["next"]
                }
            ]
        }, 





        completed: {
            edges: {
                prev: "buildBeansIntro"
            }
        }
    }
};

let bldr = new ScienceFairAssessmentDataBuilder(sfPreTestData);
module.exports = bldr.buildData();
