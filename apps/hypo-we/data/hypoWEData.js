module.exports = {
    scenes: {
        selectVIN: {
            transitions: {
                next: "selectHotCold"
            },
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        selectHotCold: {
            customEnterActions: [
                {
                    name: "hideBtns",
                    args: ["prev", "next"]
                }
            ]
        },
        scene6c: {
            transitions: {
                prev: "selectHotCold",
                next: "completed"
            }
        },
        scene6h: {
            transitions: {
                prev: "selectHotCold",
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