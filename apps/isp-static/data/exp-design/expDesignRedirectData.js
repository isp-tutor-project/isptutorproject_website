const expDesignRedirectData = {
    scenes: {
        start: {
            edges: {
                next: "change-aos"
            }
        },
        "change-aos": {
            edges: {
                prev: "start",
                next: "change-topic"
            }
        },
        "change-topic": {
            edges: {
                prev: "change-aos",
                next: "change-rq"
            }
        },
        "change-rq": {
            edges: {
                prev: "change-topic",
                next: "change-var"
            }
        },
        "change-var": {
            edges: {
                prev: "change-rq"
            }
        }
    }
}

module.exports = expDesignRedirectData
