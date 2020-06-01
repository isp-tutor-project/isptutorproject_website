module.exports = {
    scenes: {
        start: {
            transitions: {
                next: "scene1"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        scene1: {
            transitions: {
                prev: "start",
                next: "scene2"
            }
        },
        scene2: {
            transitions: {
                prev: "scene1",
                next: "scene3"
            }
        },
        scene3: {
            transitions: {
                prev: "scene2",
                next: "completed"
            }
        },
        completed: {
            transitions: {},
            customEnterActions: [{
                name: "hideBtns",
                args: ["prev", "next"]
            }]
        }
    }
};