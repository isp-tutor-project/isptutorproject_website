export const modules = [
    {
        label: "Data Interpretation PreTest",
        phase: "pre-training",
        storageInfo: {
            currentModule: "diPreTest",
        },
        url: "/di-prepost/pretest.html",
        implemented: true
    },
    {
        label: "Research Question Selection (No Choice Crystal)",
        phase: "rqSelect",
        storageInfo: {
            currentModule: "rqSelect",
            tutorFeatures: "FTR_WEB:FTR_NOCHOICE:FTR_NCCRYSTAL"
        },
        url: "/tutors/rqSelect.html",
        implemented: false
    },
    {
        label: "Research Question Selection (Baseline)",
        phase: "rqSelect",
        storageInfo: {
            currentModule: "rqSelect",
            tutorFeatures: "FTR_WEB:FTR_BASELINE:FTR_NCPLANTS"
        },
        url: "/tutors/rqSelect.html",
        implemented: false
    },
    {
        label: "Hypothesis (Initial Hypo w/o CptMap)",
        phase: "hypo",
        storageInfo: {
            currentModule: "hypo",
            tutorFeatures: "FTR_WEB:FTR_INITIAL_HYP:FTR_NOCPTMAP"
        },
        url: "/hypo/",
        implemented: false
    },
    {
        label: "Hypothesis (Initial Hypo with CptMap)",
        phase: "hypo",
        storageInfo: {
            currentModule: "hypo",
            tutorFeatures: "FTR_WEB:FTR_INITIAL_HYP:FTR_CPTMAP"
        },
        url: "/hypo/",
        implemented: false
    },
    {
        label: "Hypothesis (definition pages only)",
        phase: "hypo",
        storageInfo: {
            currentModule: "hypo",
            tutorFeatures: "FTR_WEB:FTR_DEFS_ONLY"
        },
        url: "/hypo/",
        implemented: false
    },
    {
        label: "Hypothesis (final hypothesis",
        phase: "hypo",
        storageInfo: {
            currentModule: "hypo",
            tutorFeatures: "FTR_WEB:FTR_FINAL_HYP:FTR_CPTMAP"
        },
        url: "/hypo/",
        implemented: false
    },
    {
        label: "Data Interpretation Instruction",
        phase: "data-interpretation",
        storageInfo: {
            currentModule: "diInstruction"
        },
        url: "/di-instr/",
        implemented: true
    },
    {
        label: "Data Interpretation PostTest",
        phase: "post-training",
        storageInfo: {
            currentModule: "diPostTest",
        },
        url: "/di-prepost/posttest.html",
        implemented: true
    }
];
// {
//     label: "Research Question Selection (Choice)",
//         phase: "rqSelect",
//             storageInfo: {
//         currentModule: "rqSelect",
//             tutorFeatures: "FTR_WEB:FTR_CHOICE"
//     },
//     url: "/tutors/rqSelect.html",
//         implemented: false
// },
