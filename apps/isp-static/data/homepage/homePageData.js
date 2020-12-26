module.exports = [
    {
        id: "matsPreTest",
        label: "\"MATS\" Science Survey (pre)",
        phase: "pre-training",
        storageInfo: {
            id: "matsPreTest",
            key: "matsPre",
            features: "FTR_WEB:FTR_PRE"
        },
        url: "/edforge/mats.html",
        implemented: true
    },
    {
        id: "diPreTest",
        label: "Data Interpretation Questions - Initial",
        phase: "pre-training",
        storageInfo: {
            id: "diPreTest",
            key: "diPreTest",
            features: ""
        },
        url: "/apps/di-prepost/pretest.html",
        implemented: true
    },
    {
        id: "rqSelectBL",
        label: "Crystal Growth Experiment Intro",
        phase: "rqSelect",
        storageInfo: {
            id: "rqSelectBL",
            key: "rqted",
            features: "FTR_WEB:FTR_BASELINE:FTR_NCCRYSTAL"
        },
        // url: "/edforge/rq_bl.html",
        url: "/apps/rq-intro/",
        implemented: true
    },
    {
        id: "rqSelectNC",
        label: "Research Question Selection (No Choice Crystal)",
        phase: "rqSelect",
        storageInfo: {
            id: "rqSelectNC",
            key: "rqted",
            features: "FTR_WEB:FTR_NOCHOICE:FTR_NCCRYSTAL"
        },
        url: "/edforge/rqSelect.html",
        implemented: false
    },
    {
        id: "rqSelectC",
        label: "Research Question Selection (Choice)",
        phase: "rqSelect",
        storageInfo: {
            id: "rqSelectC",
            key:"rqted",
            features: "FTR_WEB:FTR_CHOICE"
        },
        url: "/edforge/rqSelect.html",
        implemented: false
    },
    {
        id: "hypoDefs",
        label: "Hypothesis (definition pages only)",
        phase: "reference",
        storageInfo: {
            id: "hypoDefs",
            key: "hypoDefs",
            features: "FTR_WEB:FTR_DEFS_ONLY"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        id: "hypoGRinitialHypoNoCptMap",
        label: "Hypothesis (Initial Hypo w/o CptMap)",
        phase: "hypo",
        storageInfo: {
            id: "hypoGRinitialHypoNoCptMap",
            key: "initialHypo",
            features: "FTR_WEB:FTR_INITIAL_HYP:FTR_NOCPTMAP"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        id: "hypoGRinitialHypoCptMap",
        label: "Hypothesis (Initial Hypo with CptMap)",
        phase: "hypo",
        storageInfo: {
            id: "hypoGRinitialHypoCptMap",
            key: "initialHypo",
            features: "FTR_WEB:FTR_INITIAL_HYP"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        id: "hypoGRinitialHypoBiDir",
        label: "Hypothesis (Initial Hypo Bi-Directional)",
        phase: "hypo",
        storageInfo: {
            id: "hypoGRinitialHypoBiDir",
            key: "initialHypo",
            features: "FTR_WEB:FTR_INITIAL_HYP:FTR_BI_DIR"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        id: "hypoGRfinalHypo",
        label: "Hypothesis (final hypothesis)",
        phase: "hypo",
        storageInfo: {
            id: "hypoGRfinalHypo",
            key: "finalHypo",
            features: "FTR_WEB:FTR_FINAL_HYP:FTR_NO_DEFS"
        },
        url: "/apps/hypo-gr/",
        implemented: false
    },
    {
        id: "hypoWEoneDir",
        label: "Hypothesis Lesson",
        phase: "hypo",
        storageInfo: {
            id: "hypoWEoneDir",
            key: "hypoWE",
            features: "FTR_ONE_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: true
    },
    {
        id: "hypoWEbiDir",
        label: "Hypothesis Lesson",
        phase: "hypo",
        storageInfo: {
            id: "hypoWEbiDir",
            key: "hypoWE",
            features: "FTR_BI_DIRECTIONAL"
        },
        url: "/apps/hypo-we/",
        implemented: true
    },
    {
        id: "diInstrGR",
        label: "Data Interpretation Instruction",
        phase: "data-interpretation",
        storageInfo: {
            id: "diInstrGR",
            key: "diInstruction",
            features: ""
        },
        url: "/apps/di-instr/",
        implemented: true
    },
    {
        id: "sfPreTest",
        label: "Science Fair Pre-Test",
        phase: "pre-training",
        storageInfo: {
            id: "sfPreTest",
            key: "sfPreTest",
            features: ""
        },
        url: "/apps/sf-assessment/pretest.html",
        implemented: true
    },
    {
        id: "sfPostTest",
        label: "Science Fair Post-Test",
        phase: "post-training",
        storageInfo: {
            id: "sfPostTest",
            key: "sfPostTest",
            features: ""
        },
        url: "/apps/sf-assessment/posttest.html",
        implemented: true
    },
    {
        id: "diCrystalGrowthTest",
        label: "Interpret final crystal growth results",
        phase: "post-training",
        storageInfo: {
            id: "diCrystalGrowthTest",
            key: "diCrystalGrowthTest",
            features: ""
        },
        url: "/apps/di-prepost/crystal.html",
        implemented: true
    },
    {
        id: "diPostTest",
        label: "Data Interpretation Questions - Final",
        phase: "post-training",
        storageInfo: {
            id: "diPostTest",
            key: "diPostTest",
            features: ""
        },
        url: "/apps/di-prepost/posttest.html",
        implemented: true
    },
    {
        id: "matsPostTest",
        label: "\"MATS\" Science Survey (post)",
        phase: "post-training",
        storageInfo: {
            id: "matsPostTest",
            key: "matsPost",
            features: "FTR_WEB:FTR_POST"
        },
        url: "/edforge/mats.html",
        implemented: true
    }
];
