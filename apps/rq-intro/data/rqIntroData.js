module.exports = {
    scenes: {
        start: {
            edges: {
                next: "scene1"
            },
            customEnterActions: [{
                name: "hideBtns",
                args: ["prev", "next"]
            }]
        },
        scene1: {
            sceneType: "videoScene",
            videoId: "crystals_video",
            edges: {
                prev: "start",
                next: "scene2"
            },
            customEnterActions: [{
                name: "disableBtns",
                args: ["next"]
            }]
        },
        scene2: {
            edges: {
                prev: "scene1",
                next: "completed"
            }
        },
        completed: {
            edges: {
                prev: "scene2"
            },
            customEnterActions: [{
                name: "hideBtns",
                args: ["prev", "next"]
            }]
        }
    }
};