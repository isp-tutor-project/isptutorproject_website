module.exports = {
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
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "intro"
            }
        }
    }
}