const { DataBuilder } = require("./builders/data-builder");

const { HomePageDataBuilder } = require("./builders/homepage");

const {
    DiPreTestDataBuilder,
    DiPostTestDataBuilder,
    DiCrystalDataBuilder
} = require("./builders/di-prepost");

const { RQIntroDataBuilder } = require("./builders/rq-intro");

const { ExpDesignDataBuilder } = require("./builders/exp-design");

const { ScienceFairAssessmentDataBuilder } = require("./builders/sf-assessment");

let homepage, diInstr, diPre, diPost, diCrystal, rqIntro, expDesign, sfPre, sfPost, hypoGR;

homepage = new HomePageDataBuilder("homepage/homePage");
homepage.buildData();

diInstr = new DataBuilder("di-instr/diInstr");
diInstr.buildData()

diPre = new DiPreTestDataBuilder("di-prepost/diPreTest");
diPre.buildData();

diPost = new DiPostTestDataBuilder("di-prepost/diPostTest");
diPost.buildData();

diCrystal = new DiCrystalDataBuilder("di-prepost/diCrystalTest");
diCrystal.buildData();

rqIntro = new RQIntroDataBuilder("rq-intro/rqIntro");
rqIntro.buildData();

expDesign = new ExpDesignDataBuilder("exp-design/expDesign");
expDesign.buildData();

sfPre = new ScienceFairAssessmentDataBuilder("sf-assessment/sfPreTest");
sfPre.buildData();

sfPost = new ScienceFairAssessmentDataBuilder("sf-assessment/sfPostTest");
sfPost.buildData();

hypoGR = new DataBuilder("hypo-gr/hypoGR");
hypoGR.buildData();
