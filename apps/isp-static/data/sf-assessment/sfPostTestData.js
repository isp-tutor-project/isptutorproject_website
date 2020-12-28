const { ScienceFairAssessmentDataBuilder } = require("./builders");

const sfPostTestData = {
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
};


let bldr = new ScienceFairAssessmentDataBuilder(sfPostTestData);
module.exports = bldr.buildData();
