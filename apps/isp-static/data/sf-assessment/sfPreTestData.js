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
                id: "sfPreTest.sodaMint.q1_GeneralPosterOK",
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
                id: "sfPreTest.sodaMint.q2_RQ_OK",
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
                id: "sfPreTest.sodaMint.q3_Hypo_OK",
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
                id: "sfPreTest.sodaMint.q3y_Hypo_science_explan",
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
                id: "sfPreTest.sodaMint.q4_BRS_ok",
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
                id: "sfPreTest.sodaMint.q4y_BRS_aboutRQ",
                type: "mc",
                correctAnswer: "a",
                text: "Q4y) What is the biggest problem with Kaya's background Research Summary?",
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
                id: "sfPreTest.sodaMint.q5_Proc_OK",
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
                id: "sfPreTest.sodaMint.q5y_Proc_multi_trials",
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
                id: "sfPreTest.sodaMint.q6_InterpretGraph",
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
                id: "sfPreTest.sodaMint.q7_Concl_ok",
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
                id: "sfPreTest.sodaMint.q7y_Conclusion",
                type: "mc",
                correctAnswer: "c",
                text: "Q7y) What is the biggest problem with Kaya's Conclusion?",
                options: [
                    { value: "a", label: "It should say that her hypothesis was right." },
                    { value: "b", label: "It should say that her hypothesis was wrong." },
                    { value: "c", label: "It should say that her results were consistent with her hypothesis." },
                    { value: "d", label: "It should say that her results were inconsistent with her hypothesis." },
                ]
            }
        },

        SodaMintQ8: {
            edges: {
                prev: "SodaMintQ7y",
                next: "SodaMintQ9"
            },
            question: {
                id: "sfPreTest.sodaMint.q8_WhatIsIV",
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
                id: "sfPreTest.sodaMint.q9_WhatIsDV",
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
                id: "sfPreTest.Ramps.q1_GeneralPosterOK",
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
                id: "sfPreTest.Ramps.q2_RQ_OK",
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
                id: "sfPreTest.Ramps.q3_Hypo_OK",
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
                id: "sfPreTest.Ramps.q3y_BackRes_Hypo_coordinate",
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
                id: "sfPreTest.Ramps.q4_BRS_ok",
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
                id: "sfPreTest.Ramps.q5_Proc_OK",
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
                id: "sfPreTest.Ramps.q5y_Proc_confound",
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
                id: "sfPreTest.Ramps.q8_Concl_ok",
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
                id: "sfPreTest.Ramps.q9_WhatIsIV",
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
                id: "sfPreTest.Ramps.q10_WhatIsDV",
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
                prev: "RampsQ10",
                next: "YBeansLookEachSection"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["next"]
                }
            ]
        },

        YBeansLookEachSection: {
            edges: {
                prev: "buildBeansIntro",
                next: "YBeansQ1"
            }
        },

        YBeansQ1: {
            edges: {
                prev: "YBeansLookEachSection",
                next: "YBeansQ2"
            },
            question: {
                id: "sfPreTest.Beans.q1",
                type: "mc",
                correctAnswer: "b",
                text: "Q1) Select the best background research summary for this research question from the 3 choices below.",
                options: [
                    { value: "a", label: "I found that lemon juice has citric acid and is high in Vitamin C. Vitamin C is a nutrient that people need to be healthy." },
                    { value: "b", label: "I found that acid rain removes nutrients that plants need from the soil. Aluminum is one nutrient that acid rain removes. This causes plants to grow less or die." },
                    { value: "c", label: "I found that citric acid is a part of the molecular structure of living things, including plants. Also, both plant and animal cells have mitochondria and a nucleus." },

                ]
            }
        },

        YBeansQ2: {
            edges: {
                prev: "YBeansQ1",
                next: "YBeansQ3"
            },
            question: {
                id: "sfPreTest.Beans.q2",
                type: "mc",
                correctAnswer: "c",
                text: "Q2) Now select the best hypothesis for this research question from the 3 choices below.",
                options: [
                    { value: "a", label: "I predict that the plants that were given plain water will grow faster than the plants given water with citric acid. I made this prediction because high acidity hurts plant growth and citric acid is highly acidic." },
                    { value: "b", label: "I predict that the plants that were given plain water will grow slower than the plants given water with citric acid. I made this prediction because citric acid is good for plants." },
                    { value: "c", label: "I predict that the plants that were given plain water will grow faster than the plants given water with citric acid. I made this prediction because acids remove minerals and nutrients that plants need from the soil." },

                ]
            }
        },

        YBeansQ3: {
            edges: {
                prev: "YBeansQ2",
                next: "YBeansQ4"
            },
            question: {
                id: "sfPreTest.Beans.q3",
                type: "mc",
                correctAnswer: "a",
                text: "Q3) The first step of the procedure is shown above. Now select the best next step of the procedure from the choices below.",
                options: [
                    { value: "a", label: "Put both plants on the windowsill." },
                    { value: "b", label: "Put one plant on the windowsill and the other on the kitchen table." },

                ]
            }
        },

        YBeansQ4: {
            edges: {
                prev: "YBeansQ3",
                next: "YBeans_CompleteProcedure5"
            },
            question: {
                id: "sfPreTest.Beans.q4",
                type: "mc",
                correctAnswer: "a",
                text: "Q4) Now select the best next step to complete the following sentence: Every day at 8am...",
                options: [
                    { value: "a", label: "...add 10 mg of citric acid to 1/2 cups of water and give to one plant. Then give 1/2 cups plain water to the other plant." },
                    { value: "b", label: "...add 10 mg of lemon juice to 1/2 cups of water and give to one plant. Then give 1/2 cups plain water to the other plant." },
                    { value: "c", label: "...add 10 mg of citric acid to 1/2 cups of water and give to both plants." },

                ]
            }
        },

        YBeans_CompleteProcedure5: {
            edges: {
                prev: "YBeansQ4",
                next: "YBeansQ5"
            }
        },

        YBeansQ5: {
            edges: {
                prev: "YBeans_CompleteProcedure5",
                next: "YBeansQ6"
            },
            question: {
                id: "sfPreTest.Beans.q5_Results_InterpretTable",
                type: "mc",
                correctAnswer: "c",
                text: "Q5) The results are now shown. What is the best interpretation of the results?",
                options: [
                    { value: "a", label: "The plants given plain water did not grow, but the plants given water with citric acid grew to 32 cm." },
                    { value: "b", label: "The plants given plain water grew to 32 cm, but the plants given water with citric acid only grew a little." },
                    { value: "c", label: "The plants given plain water grew to 32 cm, but the plants given water with citric acid didn't grow." },

                ]
            }
        },

        YBeansQ6: {
            edges: {
                prev: "YBeansQ5",
                next: "YBeans7_lastpage"
            },
            question: {
                id: "sfPreTest.Beans.q6",
                type: "mc",
                correctAnswer: "c",
                text: "Q6) Select the best conclusion for this poster based on the given hypothesis (shown on poster) and results.",
                options: [
                    { value: "a", label: "The results are consistent with the hypothesis." },
                    { value: "b", label: "The results are not consistent with the hypothesis." },
                    { value: "c", label: "The hypothesis was correct." },

                ]
            }
        },

        YBeans7_lastpage: {
            edges: {
                prev: "YBeansQ6",
                next: "buildApplesIntro"
            }
        },

        buildApplesIntro: {
            edges: {
                prev: "YBeans7_lastpage",
                next: "ZApplesLookEachSection"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["next"]
                }
            ]
        },

        ZApplesLookEachSection: {
            edges: {
                prev: "buildApplesIntro",
                next: "ZApplesQ1"
            }
        },

        ZApplesQ1: {
            edges: {
                prev: "ZApplesLookEachSection",
                next: "ZApplesQ2"
            },
            question: {
                id: "sfPreTest.Apples.q1",
                type: "mc",
                correctAnswer: "c",
                text: "Q1) Select the best background research summary from the 3 choices below.",
                options: [
                    { value: "a", label: "Red Delicious apples are red because they reflect low-energy red light and absorb higher-energy light. Therefore, they absorb more energy and grow faster than apples that are other colors." },
                    { value: "b", label: "Red Delicious apples contain high levels of the molecule polyphenol oxidase and turn brown quickly when you cut them open. So, polyphenol oxidase causes apples to turn brown." },
                    { value: "c", label: "Red Delicious apples turn brown due to a chemical reaction between oxygen and a chemical (molecule) called polyphenol oxidase. These chemicals react to form melanin, which is brown." },

                ]
            }
        },

        ZApplesQ2: {
            edges: {
                prev: "ZApplesQ1",
                next: "ZApplesQ3"
            },
            question: {
                id: "sfPreTest.Apples.q2",
                type: "mc",
                correctAnswer: "c",
                text: "Q2) Select the best hypothesis from the 3 choices below, starting with 'I predict that...'",
                options: [
                    { value: "a", label: "...the apple halves given polyphenol oxidase will brown faster because it causes a reaction. As the amount of polyphenol oxidase increases, the time for apples to brown will decrease." },
                    { value: "b", label: "...the apple halves given polyphenol oxidase will brown faster. Apples that naturally have more polyphenol oxidase brown faster than apples with less. So, as the amount of polyphenol oxidase increases, the time for apples to brown will decrease." },
                    { value: "c", label: "...the apple halves given polyphenol oxidase will brown faster because they react with oxygen to make melanin (brown color). As the amount of polyphenol oxidase increases, the time for apples to brown will decrease." },

                ]
            }
        },

        ZApplesQ3: {
            edges: {
                prev: "ZApplesQ2",
                next: "ZApplesQ4"
            },
            question: {
                id: "sfPreTest.Apples.q3",
                type: "mc",
                correctAnswer: "a",
                text: "Q3) The first step of the procedure is given above. Select the best next step below.",
                options: [
                    { value: "a", label: "Add 10 mg of polyphenol oxidase to the top of one of the two apple halves." },
                    { value: "b", label: "Add 10 mg of polyphenol oxidase to the top of one of both of the apple halves." },


                ]
            }
        },

        ZApplesQ4: {
            edges: {
                prev: "ZApplesQ3",
                next: "ZApplesQ5"
            },
            question: {
                id: "sfPreTest.Apples.q4",
                type: "mc",
                correctAnswer: "a",
                text: "Q4) Please select the best next step.",
                options: [
                    { value: "a", label: "Place both apple halves in the refrigerator." },
                    { value: "b", label: "Place one apple half in the refrigerator and the other on the windowsill." },


                ]
            }
        },


        ZApples_CompleteProcedure5: {
            edges: {
                prev: "ZApplesQ4",
                next: "ZApplesQ5"
            }
        },

        ZApplesQ5: {
            edges: {
                prev: "YBeans_CompleteProcedure5",
                next: "ZApplesQ6"
            },
            question: {
                id: "sfPreTest.Beans.q5",
                type: "mc",
                correctAnswer: "b",
                text: "Q5) The results are now shown. What is the best interpretation of the results?",
                options: [
                    { value: "a", label: "Apples browned faster when no polyphenol oxidase was added." },
                    { value: "b", label: "Apples browned faster when 10 mg of polyphenol oxidase was added." },
                    { value: "c", label: "Apples browned equally fast when polyphenol oxidase was added or not." },

                ]
            }
        },

        ZApplesQ6: {
            edges: {
                prev: "ZApplesQ5",
                next: "ZApples7_lastpage"
            },
            question: {
                id: "sfPreTest.Apples.q6",
                type: "mc",
                correctAnswer: "a",
                text: "Q6) Select the best conclusion for this poster based on the given hypothesis (shown on poster) and results.",
                options: [
                    { value: "a", label: "The results are consistent with the hypothesis." },
                    { value: "b", label: "The results are not consistent with the hypothesis." },
                    { value: "c", label: "The hypothesis was correct." },

                ]
            }
        },

        
        ZApples7_lastpage: {
            edges: {
                prev: "ZApplesQ6",
                next: "GoalOfExperiment"
            }
        },

        GoalOfExperiment: {
            edges: {
                prev: "ZApples7_lastpage",
                next: "completed"
            },
            question: {
                id: "sfPreTest.qf_GoalExperiment",
                type: "mc",
                correctAnswer: "d",
                text: "Qf) What is the main point of doing an experiment like the ones shown here?",
                options: [
                    { value: "a", label: "To make best possible results." },
                    { value: "b", label: "To compare conditions to see which way is better." },
                    { value: "c", label: "To prove your hypothesis is right." },
                    { value: "d", label: "To find out about the variable you're testing." },

                ]
            }
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
