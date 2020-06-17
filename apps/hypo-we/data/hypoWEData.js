module.exports = {
    scenes: {
        selectVIN: {
            sceneType: "selectVIN",
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
            sceneType: "selectHotOrCold",
            transitions: {
                prev: "selectVIN",
                next: "scene3"
            },
            // customEnterActions: [
            //     {
            //         name: "hideBtns",
            //         args: ["prev", "next"]
            //     }
            // ]
        },
        scene3: {
            transitions: {
                prev: "selectHotCold",
                next: "scene4"
            }
        },
        scene4: {
            transitions: {
                prev: "scene3",
                next: "scene5"
            }
        },
        scene5: {
            transitions: {
                prev: "scene4",
            }
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