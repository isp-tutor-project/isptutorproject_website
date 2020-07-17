export const activities = [
    {
        label: "Data Interpretation PreTest",
        phase: "pre-training",
        storageInfo: {
            currentActivity: "diPreTest",
        },
        url: "/apps/di-prepost/pretest.html",
        implemented: true
    },
    {
        label: "Research Question Selection (Baseline)",
        phase: "rqSelect",
        storageInfo: {
            currentActivity: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_BASELINE:FTR_NCPLANTS"
        },
        url: "/tutors/rqSelect.html",
        implemented: false
    },
    {
        label: "Research Question Selection (No Choice Crystal)",
        phase: "rqSelect",
        storageInfo: {
            currentActivity: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_NOCHOICE:FTR_NCCRYSTAL"
        },
        url: "/tutors/rqSelect.html",
        implemented: false
    },
    {
        label: "Research Question Selection (Choice)",
        phase: "rqSelect",
        storageInfo: {
            currentModule: "rqSelect",
            currentActivityFeatures: "FTR_WEB:FTR_CHOICE"
        },
        url: "/tutors/rqSelect.html",
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
        label: "Hypothesis WE (one-directional)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "hypoWE",
            currentActivityFeatures: "FTR_ONE_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: false
    },
    {
        label: "Hypothesis WE (bi-directional)",
        phase: "hypo",
        storageInfo: {
            currentActivity: "hypoWE",
            currentActivityFeatures: "FTR_BI_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: false
    },
    {
        label: "Data Interpretation Instruction",
        phase: "data-interpretation",
        storageInfo: {
            currentActivity: "diInstruction"
        },
        url: "/apps/di-instr/",
        implemented: true
    },
    {
        label: "Data Interpretation PostTest",
        phase: "post-training",
        storageInfo: {
            currentActivity: "diPostTest",
        },
        url: "/apps/di-prepost/posttest.html",
        implemented: true
    }
];
