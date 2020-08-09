export const activities = [
    {
        label: "Science Attitudes - Initial",
        phase: "pre-training",
        storageInfo: {
            currentActivity: "matsPreTest",
            currentActivityFeatures: "FTR_WEB:FTR_PRE"
        },
        url: "",
        implemented: false
    },
    {
        label: "Data Interpretation Questions - Initial",
        phase: "pre-training",
        storageInfo: {
            currentActivity: "diPreTest",
        },
        url: "/apps/di-prepost/pretest.html",
        implemented: true
    },
    {
        label: "See research question and trial run of experiment",
        phase: "rqSelect",
        storageInfo: {
            currentActivity: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_BASELINE:FTR_NCCRYSTAL"
        },
        url: "/edforge/rqSelect.html",
        implemented: false
    },
    {
        label: "Research Question Selection (No Choice Crystal)",
        phase: "rqSelect",
        storageInfo: {
            currentActivity: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_NOCHOICE:FTR_NCCRYSTAL"
        },
        url: "/edforge/rqSelect.html",
        implemented: false
    },
    {
        label: "Research Question Selection (Choice)",
        phase: "rqSelect",
        storageInfo: {
            currentModule: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_CHOICE"
        },
        url: "/edforge/rqSelect.html",
        implemented: false
    },
    {
        label: "Hypothesis (definition pages only)",
        phase: "reference",
        storageInfo: {
            currentActivity: "hypoDefs",
            currentActivityFeatures: "FTR_WEB:FTR_DEFS_ONLY"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        label: "Hypothesis (Initial Hypo w/o CptMap)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "initialHypo",
            currentActivityFeatures: "FTR_WEB:FTR_INITIAL_HYP:FTR_NOCPTMAP"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        label: "Hypothesis (Initial Hypo with CptMap)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "initialHypo",
            currentActivityFeatures: "FTR_WEB:FTR_INITIAL_HYP"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        label: "Hypothesis (Initial Hypo Bi-Directional)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "initialHypo",
            currentActivityFeatures: "FTR_WEB:FTR_INITIAL_HYP:FTR_BI_DIR"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        label: "Hypothesis (final hypothesis)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "finalHypo",
            currentActivityFeatures: "FTR_WEB:FTR_FINAL_HYP:FTR_NO_DEFS"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        label: "Watch students talk about their hypotheses (one-directional)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "hypoWE",
            currentActivityFeatures: "FTR_ONE_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: true
    },
    {
        label: "Watch students talk about their hypotheses (bi-directional)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "hypoWE",
            currentActivityFeatures: "FTR_BI_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: true
    },
    {
        label: "Lesson on Data Interpretation",
        phase: "data-interpretation",
        storageInfo: {
            currentActivity: "diInstruction"
        },
        url: "/apps/di-instr/",
        implemented: true
    },
    {
        label: "Interpret results on crystal growth",
        phase: "post-training",
        storageInfo: {
            currentActivity: "diCrysGr",
        },
        url: "/apps/di-prepost/crystal.html",
        implemented: true
    },
    {
        label: "Science Attitudes - Final",
        phase: "post-training",
        storageInfo: {
            currentActivity: "matsPostTest",
            currentActivityFeatures: "FTR_WEB:FTR_POST"
        },
        url: "",
        implemented: false
    },
    {
        label: "Data Interpretation Questions - Final",
        phase: "post-training",
        storageInfo: {
            currentActivity: "diPostTest",
        },
        url: "/apps/di-prepost/posttest.html",
        implemented: true
    }
];
