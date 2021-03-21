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
                next: "SodaMintQ3y"
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


        

        SodaMintQ3y: {
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

        
        SodaMintQ4: {
            edges: {
                prev: "SodaMintQ3y",
                next: "SodaMintQ4y"
            },
            question: {
                id: "sfPreTest.sodaMint.q4",
                type: "mc",
                correctAnswer: "a",
                text: "Q4) Do you see any problems with the Research Summary section?",
                options: [
                    { value: "a", label: "Yes" },
                    { value: "b", label: "No" },
                ]
            }
        },



            SodaMintQ4y: {
                edges: {
                      prev: "SodaMintQ4",
                      next: "SodaMintQ5"
                },
                question: {
                    id: "sfPreTest.sodaMint.q4y",
                       type: "mc",
                        correctAnswer: "a",
                        text: "Q4y) What is the biggest problem with Kaya's Research Summary?",
                        options: [
                            { value: "a", label: "It doesn't have information about how sugar and carbon dioxide react." },
                             { value: "b", label: "It should include information from the student's conclusion. " },
                             { value: "c", label: "It should include information about alternative soft drinks." },
                            ]
                        }
                    },



                    SodaMintQ5: {
                        edges: {
                            prev: "SodaMintQ4y",
                            next: "SodaMintQ5y"
                        },
                        question: {
                            id: "sfPreTest.sodaMint.q5",
                            type: "mc",
                            correctAnswer: "a",
                            text: "Q5) Do you see any problems with the Procedure section?",
                            options: [
                                { value: "a", label: "Yes" },
                                { value: "b", label: "No" },
                            ]
                        }
                    },
            
            
            
                        SodaMintQ5y: {
                            edges: {
                                  prev: "SodaMintQ5",
                                  next: "SodaMintQ6"
                            },
                            question: {
                                id: "sfPreTest.sodaMint.q5y",
                                   type: "mc",
                                    correctAnswer: "a",
                                    text: "Q5y) What is the biggest problem with the Procedure?",
                                    options: [
                                        { value: "a", label: "It should have more than just one trial." },
                                         { value: "b", label: "It won't answer the student's question. " },
                                         { value: "c", label: "It doesn't compare anything." },
                                        ]
                                    }
                                },

                     SodaMintQ6: {
                        edges: {
                                prev: "SodaMintQ5y",
                                next: "SodaMintQ7"
                          },
                          question: {
                              id: "sfPreTest.sodaMint.q6",
                            type: "mc",
                            correctAnswer: "b",
                            text: "Q6) What is the best interpretation of the graph?",
                            options: [
                                    { value: "a", label: "The soda with less CO2 made a higher geyser." },
                                     { value: "b", label: "The soda with less CO2 made a lower geyser. " },                                         
                                     { value: "c", label: "The heights of the geysers were about the same." },
                                    ]
                                }
                            },

                            SodaMintQ7: {
                                edges: {
                                    prev: "SodaMintQ6",
                                    next: "SodaMintQ7y"
                                },
                                question: {
                                    id: "sfPreTest.sodaMint.q7",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q7) Do you see any problems with the Conclusion section?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                    ]
                                }
                            },
                            
                            
                            SodaMintQ7y: {
                                edges: {
                                    prev: "SodaMintQ7",
                                    next: "SodaMintQ8"
                                },
                                question: {
                                    id: "sfPreTest.sodaMint.q7y",
                                    type: "mc",
                                    correctAnswer: "c",
                                    text: "Q7y) What is the biggest problem with Kaya's Conclusion?",
                                    options: [
                                        { value: "a", label: "It should say that her hypothesis was right." },
                                        { value: "b", label: "It should say that her hypothesis was wrong." },
                                        { value: "c", label: "It should say that her results were consistent with her hypothesis." },
                                    ]
                                }
                            },

                            SodaMintQ8: {
                                edges: {
                                    prev: "SodaMintQ7y",
                                    next: "SodaMintQ9"
                                },
                                question: {
                                    id: "sfPreTest.sodaMint.q8",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q8) What is the independent variable in this study?",
                                    options: [
                                        { value: "a", label: "the amount of CO2 in the soda" },
                                        { value: "b", label: "the amount of sugar in the soda" },
                                        { value: "c", label: "the height of the geyser" },
                                    ]
                                }
                            },


                            SodaMintQ9: {
                                edges: {
                                    prev: "SodaMintQ8",
                                    next: "Ramp_evalIntro3_tryonemore"
                                },
                                question: {
                                    id: "sfPreTest.sodaMint.q9",
                                    type: "mc",
                                    correctAnswer: "c",
                                    text: "Q9) What is the dependent variable in this study?",
                                    options: [
                                        { value: "a", label: "the amount of CO2 in the soda" },
                                        { value: "b", label: "the amount of sugar in the soda" },
                                        { value: "c", label: "the height of the geyser" },
                                    ]
                                }
                            },

                            Ramp_evalIntro3_tryonemore: {
                                edges: {
                                    prev: "SodaMintQ9",
                                    next: "Ramps_Intro_ThisIsTim"
                                },
                                
                            },

/*     Ramps_Intro_ThisIsTim        */

                            Ramps_Intro_ThisIsTim: {
                                edges: {
                                    prev: "Ramp_evalIntro3_tryonemore",
                                    next: "RampsQ1"
                                },
                                
                            },

                            RampsQ1: {
                                edges: {
                                    prev: "Ramps_Intro_ThisIsTim",
                                    next: "RampsLookEachSection"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q1",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q1) Do you see any ways to improve this science project?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                      
                                    ]
                                }
                            },


                            RampsLookEachSection: {
                                edges: {
                                    prev: "RampsQ1",
                                    next: "RampsQ2"
                                }
                            },



                            RampsQ2: {
                                edges: {
                                    prev: "RampsLookEachSection",
                                    next: "RampsQ3"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q2",
                                    type: "mc",
                                    correctAnswer: "b",
                                    text: "Q2) Do you see any problems with the student's Research Question?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                      
                                    ]
                                }
                            },

                            RampsQ3: {
                                edges: {
                                    prev: "RampsQ2",
                                    next: "RampsQ3y"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q3",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q3) Do you see any problems with the Hypothesis section?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                      
                                    ]
                                }
                            },

                            RampsQ3y: {
                                edges: {
                                    prev: "RampsQ3",
                                    next: "RampsQ4"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q3y",
                                    type: "mc",
                                    correctAnswer: "b",
                                    text: "Q3y) What is the biggest problem with the Hypothesis section?",
                                    options: [
                                        { value: "a", label: "He was wrong; waves with higher frequencies actually DON'T have more energy. " },
                                        { value: "b", label: "He predicted that color affects speed even though he didn't find that in his research." },
                                        { value: "c", label: "His hypothesis was not related to his research question." },
                                      
                                    ]
                                }
                            },


                            RampsQ4: {
                                edges: {
                                    prev: "RampsQ3y",
                                    next: "RampsQ5"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q4",
                                    type: "mc",
                                    correctAnswer: "b",
                                    text: "Q4) Do you see any problems with the Research Summary section?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                      
                                    ]
                                }
                            },

                            RampsQ5: {
                                edges: {
                                    prev: "RampsQ4",
                                    next: "RampsQ5y"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q5",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q5) Do you see any problems with the Procedure section?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                       
                                    ]
                                }
                            },


                            RampsQ5y: {
                                edges: {
                                    prev: "RampsQ5",
                                    next: "RampsQ6"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q5y",
                                    type: "mc",
                                    correctAnswer: "c",
                                    text: "Q5y) What is  the biggest problem with the Procedure section?",
                                    options: [
                                        { value: "a", label: "The student only ran one trial in each condition." },
                                        { value: "b", label: "The student started the speedometer when the green lever was released." },
                                        { value: "b", label: "He started the red and yellow balls at different places on the ramp." },
                                       
                                    ]
                                }
                            }, 
                            
                            RampsQ6: {
                                edges: {
                                    prev: "RampsQ5y",
                                    next: "RampsQ7"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q6",
                                    type: "mc",
                                    correctAnswer: "a",
                                    text: "Q6) For the Results section, Tim does not say how the data were summarized. What would be the best way to summarize the data for each ball color?",
                                    options: [
                                        { value: "a", label: "Mean (or average)" },
                                        { value: "b", label: "Median (or the middle number)" },
                                        { value: "b", label: "Mode (or the most common number)" },
                                       
                                    ]
                                }
                            },


                            RampsQ7: {
                                edges: {
                                    prev: "RampsQ6",
                                    next: "RampsQ8"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q7",
                                    type: "mc",
                                    correctAnswer: "c",
                                    text: "Q7) Assume these results are from a good experiment. What is the best interpretation of these results?",
                                    options: [
                                        { value: "a", label: "The red ball rolls faster." },
                                        { value: "b", label: "The yellow ball rolls faster." },
                                        { value: "b", label: "It's not clear if there really is a difference." },
                                       
                                    ]
                                }
                            },



                            RampsQ8: {
                                edges: {
                                    prev: "RampsQ7",
                                    next: "RampsQ9"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q8",
                                    type: "mc",
                                    correctAnswer: "b",
                                    text: "Q8) (Assume the results are from a good experiment.) Do you see any problems with the Conclusion section?",
                                    options: [
                                        { value: "a", label: "Yes" },
                                        { value: "b", label: "No" },
                                       
                                    ]
                                }
                            },

                            RampsQ9: {
                                edges: {
                                    prev: "RampsQ8",
                                    next: "RampsQ10"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q9",
                                    type: "mc",
                                    correctAnswer: "c",
                                    text: "Q9) What is the independent variable in this study?",
                                    options: [
                                        { value: "a", label: "the size of the ball" },
                                        { value: "b", label: "the speed of the ball at the bottom of the ramp" },
                                        { value: "c", label: "the color the ball" },
                                       
                                    ]
                                }
                            },

                            RampsQ10: {
                                edges: {
                                    prev: "RampsQ9",
                                    next: "buildBeansIntro"
                                },
                                question: {
                                    id: "sfPreTest.Ramps.q10",
                                    type: "mc",
                                    correctAnswer: "b",
                                    text: "Q10) What is the dependent variable in this study?",
                                    options: [
                                        { value: "a", label: "the size of the ball" },
                                        { value: "b", label: "the speed of the ball at the bottom of the ramp" },
                                        { value: "c", label: "the color the ball" },
                                       
                                    ]
                                }
                            },

                       

            buildBeansIntro: {
            edges: {
                prev: "SodaMintQ7y",
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
