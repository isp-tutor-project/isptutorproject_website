module.exports = {
    scenes: {
        start: {
            edges: {
                next: "posterExample"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        posterExample: {
            edges: {
                prev: "start",
                next: "completed"
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
        completed: {
            edges: {
                prev: "posterExample"
            }
        }
    }
}