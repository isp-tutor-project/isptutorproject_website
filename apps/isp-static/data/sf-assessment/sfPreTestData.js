module.exports = {
    scenes: {
        start: {
            edges: {
                next: "SodaMintQ1"  //this is one slide
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        SodaMintQ1: {
            edges: {
                prev: "start",
                next: "SodaMintQ2"
            },
            question: {
                id: "sfPreTest.sodaMint.q1",
                type: "mc",
                correctAnswer: "c",
                text: "Q1) What is the weight of an unladen swallow?",
                options: [
                    { value: "a", label: "Would that be of the <b>African</b>" },
                    { value: "b", label: "or <b>European</b> variety?" },
                    { value: "c", label: "42" }
                ]
            }
        },

        SodaMintQ2: {
            edges: {
                prev: "sodaMintQ1",
                next: "completed"
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
        completed: {
            edges: {
                prev: "SodaMintQ2"
            }
        }
    }
}