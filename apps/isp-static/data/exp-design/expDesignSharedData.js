
const expDesignSharedScenes = {
    intro10: {
        edges: {
            next: "intro20"
        }
    },
    intro20: {
        edges: {
            prev: "intro10",
            next: "intro30"
        }
    },
    intro30: {
        edges: {
            prev: "intro20",
            next: "intro-select-IV"
        }
    },
    "intro-select-IV": {
        edges: {
            prev: "intro30",
            next: "intro-select-IV-values"
        }
    },
    "intro-select-IV-values": {
        edges: {
            prev: "intro-select-IV",
            next: "intro-think-about-other-variables"
        }
    },
    "intro-think-about-other-variables": {
        edges: {
            prev: "intro-select-IV-values",
            next: "intro-select-var1-values"
        }
    },
    "intro-select-var1-values": {
        edges: {
            prev: "intro-think-about-other-variables",
            next: "intro-select-var2-values"
        }
    },
    "intro-select-var2-values": {
        edges: {
            prev: "intro-select-var1-values",
            next: "intro-select-var3-values"
        }
    },
    "intro-select-var3-values": {
        edges: {
            prev: "intro-select-var2-values",
            next: "intro-think-about-procedure"
        }
    }
}

module.exports = {
    expDesignSharedScenes
}