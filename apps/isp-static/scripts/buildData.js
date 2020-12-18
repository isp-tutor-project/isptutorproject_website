const { DataBuilder } = require("@isptutorproject/isp-data");
const {
    DiPreTestDataBuilder,
    DiPostTestDataBuilder,
    DiCrystalDataBuilder
} = require("./di-prepost");

const { RQIntroDataBuilder } = require("./rq-intro");

const { ExpDesignDataBuilder } = require("./exp-design");

let diInstr, diPre, diPost, diCrystal, rqIntro, expDesign;

diInstr = new DataBuilder("diInstr");
diInstr.buildData()

diPre = new DiPreTestDataBuilder("diPreTest");
diPre.buildData();

diPost = new DiPostTestDataBuilder("diPostTest");
diPost.buildData();

diCrystal = new DiCrystalDataBuilder("diCrystalTest");
diCrystal.buildData();

rqIntro = new RQIntroDataBuilder("rqIntro");
rqIntro.buildData();

expDesign = new ExpDesignDataBuilder("expDesign");
expDesign.buildData();
