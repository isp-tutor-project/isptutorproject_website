var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class CONST {
        }
        CONST.TUTORCONTAINER = "STutorContainer";
        CONST.NAVNONE = 0;
        CONST.NAVBACK = 1;
        CONST.NAVNEXT = 2;
        CONST.NAVBOTH = 3;
        CONST.NEXTSCENE = "nextbutton";
        CONST.PREVSCENE = "prevbutton";
        CONST.NAVSCENE = "SCENE";
        CONST.NAVTUTOR = "TUTOR";
        CONST.MOUSE_MOVE = "mousemove";
        CONST.MOUSE_DOWN = "mousedown";
        CONST.MOUSE_UP = "mouseup";
        CONST.MOUSE_CLICK = "click";
        CONST.DOUBLE_CLICK = "dblclick";
        CONST.CLICK = "click";
        CONST.FLATSTATE = 0;
        CONST.NORMALSTATE = 1;
        CONST.NORMALwBUBBLE = 2;
        CONST.SELECTEDSTATE = 3;
        CONST.SELECTEDwBUBBLE = 4;
        CONST.NORMALnoARROW = 5;
        CONST.SELECTEDnoARROW = 6;
        CONST.SELECTED2noARROW = 7;
        CONST.FTRS_ALL = null;
        CONST.VAR_FTR = "varsel";
        CONST.FTR_PRE = "FTR_PRE";
        CONST.FTR_DEV = "FTR_DEV";
        EFMod_RQSelect.CONST = CONST;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class $Common {
            $preCreateScene() { }
            $onCreateScene() { }
            $preEnterScene() { }
            $onEnterScene() { }
            $preExitScene() { }
            $onExitScene() { }
            $preShowScene() { }
            $preHideScene() { }
            $demoInitScene() { }
            $logScene() { }
            $rewindScene() { }
            $resolveTemplate(templID) { }
            $handleEvent() { }
            $nodePreEnter(nodeId) { }
            $nodePreExit(nodeId) { }
            $nodeAction(actionId) { }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $cuePoints(id) { }
            $timedEvents(id) { }
            $onAction(target, evt) { }
            $queryFinished() {
                let stateComplete = false;
                return stateComplete;
            }
            $canGoBack() {
                let stateComplete = true;
                return stateComplete;
            }
            $updateNav() {
                if (!this.$queryFinished())
                    this.enableNext(false);
                else
                    this.enableNext(true);
                if (!this.$canGoBack())
                    this.enableBack(false);
                else
                    this.enableBack(true);
            }
        }
        EFMod_RQSelect.$Common = $Common;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class Globals {
        }
        EFMod_RQSelect.Globals = Globals;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SNavigator {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
                this.addFeature("FTR_PASS1");
                if (this.testFeatures("FTR_CHOICE")) {
                    this.setTutorValue("experimentalGroup.ontologyKey", "EG_A1");
                }
                else if (this.testFeatures("FTR_NOCHOICE")) {
                    this.setTutorValue("experimentalGroup.ontologyKey", "EG_A2");
                }
                else if (this.testFeatures("FTR_BASELINE")) {
                    this.setTutorValue("experimentalGroup.ontologyKey", "EG_A3");
                }
                if (this.testFeatures("FTR_NCPLANTS")) {
                    this.setModuleValue("selectedArea", { "ontologyKey": "S_A4|name", "index": 4 });
                    this.setModuleValue("selectedTopic", { "ontologyKey": "S_A4_T1|name", "index": 1 });
                    this.setModuleValue("selectedVariable", { "ontologyKey": "S_A4_T1_V1|name", "index": 1 });
                    this.setModuleValue("selectedRQ", { "ontologyKey": "S_A4_T1_RQ1" });
                    this.addFeature("FTR_GRHOUSE");
                    this.setModuleValue("AreaSelectedID", "Sarea4|Sselected");
                    this.setModuleValue("AreaButtonID", "Sbutton4");
                    this.setModuleValue("TopicSelectedID", "Stopic1|Sselected");
                    this.setModuleValue("TopicButtonID", "Sbutton1");
                    this.setModuleValue("VariableHighlightID", "SbuttonHL1");
                    this.setModuleValue("VariableClickMaskID", "SclickMask1");
                }
                else if (this.testFeatures("FTR_NCSODA")) {
                    this.setModuleValue("selectedArea", { "ontologyKey": "S_A1|name", "index": 1 });
                    this.setModuleValue("selectedTopic", { "ontologyKey": "S_A1_T2|name", "index": 2 });
                    this.setModuleValue("selectedVariable", { "ontologyKey": "S_A1_T2_V4|name", "index": 4 });
                    this.setModuleValue("selectedRQ", { "ontologyKey": "S_A1_T2_RQ4" });
                    this.addFeature("FTR_SODA");
                    this.setModuleValue("AreaSelectedID", "Sarea1|Sselected");
                    this.setModuleValue("AreaButtonID", "Sbutton1");
                    this.setModuleValue("TopicSelectedID", "Stopic2|Sselected");
                    this.setModuleValue("TopicButtonID", "Sbutton2");
                    this.setModuleValue("VariableHighlightID", "SbuttonHL4");
                    this.setModuleValue("VariableClickMaskID", "SclickMask4");
                }
                else if (this.testFeatures("FTR_NCCRYSTAL")) {
                    this.setModuleValue("selectedArea", { "ontologyKey": "S_A1|name", "index": 1 });
                    this.setModuleValue("selectedTopic", { "ontologyKey": "S_A1_T1|name", "index": 1 });
                    this.setModuleValue("selectedVariable", { "ontologyKey": "S_A1_T1_V1|name", "index": 1 });
                    this.setModuleValue("selectedRQ", { "ontologyKey": "S_A1_T1_RQ1" });
                    this.addFeature("FTR_CRYSTAL");
                    this.setModuleValue("AreaSelectedID", "Sarea1|Sselected");
                    this.setModuleValue("AreaButtonID", "Sbutton1");
                    this.setModuleValue("TopicSelectedID", "Stopic1|Sselected");
                    this.setModuleValue("TopicButtonID", "Sbutton1");
                    this.setModuleValue("VariableHighlightID", "SbuttonHL1");
                    this.setModuleValue("VariableClickMaskID", "SclickMask1");
                }
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (cueID) {
                    case "$start":
                        console.log("executing CuePoint START");
                        break;
                    case "$end":
                        console.log("executing CuePoint END");
                        break;
                }
            }
            $timedEvents(id) {
            }
        }
        EFMod_RQSelect.SNavigator = SNavigator;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene1 {
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $preEnterScene() {
                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                this.Ssample.hidden = true;
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                console.log("executing CuePoint END");
                                break;
                            case "a":
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.SELECTEDnoARROW);
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.setNavMode(EFMod_RQSelect.CONST.NAVBOTH, EFMod_RQSelect.CONST.NAVSCENE);
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.SELECTEDSTATE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.SELECTEDwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.SELECTEDSTATE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track5":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.SELECTEDwBUBBLE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track6":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.SELECTEDSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                this.Ssample.hidden = true;
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track7":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.SELECTEDwBUBBLE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                this.Ssample.hidden = false;
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track8":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.NORMALwBUBBLE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.SELECTEDnoARROW);
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track9":
                        switch (cueID) {
                            case "$start":
                                this.Sintro1.gotoState(EFMod_RQSelect.CONST.SELECTEDSTATE);
                                this.Sintro2.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro3.gotoState(EFMod_RQSelect.CONST.FLATSTATE);
                                this.Sintro4.gotoState(EFMod_RQSelect.CONST.NORMALnoARROW);
                                break;
                            case "$end":
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene1 = SScene1;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene10 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.setSceneValue("RQconfirmed", false);
                this.setModuleValue("RQconfirmation", "UNKNOWN");
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                let RQconf = this.getModuleValue("RQconfirmation");
                switch (constrainId) {
                    case "!SELECTION_COMPLETE":
                        result = !this.getSceneValue("RQconfirmed");
                        break;
                    case "CHANGE_RQ":
                        if (RQconf === constrainId)
                            result = true;
                        break;
                    case "CHANGE_TOPIC":
                        if (RQconf === constrainId)
                            result = true;
                        break;
                    case "CHANGE_AREA":
                        if (RQconf === constrainId)
                            result = true;
                        break;
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                }
            }
            $onAction(target, evt) {
                this.setSceneValue("RQconfirmed", true);
                switch (target) {
                    case "Sbutton1":
                        this.setModuleValue("RQconfirmation", "CHANGE_RQ");
                        break;
                    case "Sbutton2":
                        this.setModuleValue("RQconfirmation", "CHANGE_TOPIC");
                        break;
                    case "Sbutton3":
                        this.setModuleValue("RQconfirmation", "CHANGE_AREA");
                        break;
                    case "Sbutton4":
                        this.setModuleValue("RQconfirmation", "OK");
                        break;
                }
                this.nextTrack("$onAction:" + target);
            }
            $timedEvents(id) {
            }
        }
        EFMod_RQSelect.SScene10 = SScene10;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene11 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.setSceneValue("RQconfirmed", false);
                this.setModuleValue("RQconfirmation", "UNKNOWN");
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                break;
                            case "$end":
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene11 = SScene11;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene2 {
            $onCreateScene() {
            }
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sbutton.*").hide();
                this.$("Sarea.*|Sselected,SsubTitle1,SsubTitle2,Sor").hide();
                this.setSceneValue("AreaSelected", false);
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                    case "NO_SELECTION":
                        result = !this.getSceneValue("AreaSelected");
                        break;
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea.*|Sselected,SsubTitle1,SsubTitle2,Sor").hide();
                                this.$("Sarea1|Sselected").show();
                                this.$("Sarea1|SsubTitle1,SsubTitle2,Sor").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea1|SsubTitle1,SsubTitle2,Sor").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("Sarea2|Sselected").show();
                                this.$("Sarea2|SsubTitle1,SsubTitle2,Sor").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track5":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea2|SsubTitle1,SsubTitle2,Sor").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track6":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("Sarea3|Sselected").show();
                                this.$("Sarea3|SsubTitle1,SsubTitle2,Sor").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track7":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea3|SsubTitle1,SsubTitle2,Sor").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track8":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("Sarea4|Sselected").show();
                                this.$("Sarea4|SsubTitle1,SsubTitle2,Sor").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track9":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea4|SsubTitle1,SsubTitle2,Sor").show();
                                this.$("Sbutton.*").disable();
                                this.$("Sbutton.*").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track10CHOICE":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("Sbutton.*").show();
                                this.$("Sbutton.*").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track10NOCHOICE":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("{{$EFM_AreaSelectedID}}").show();
                                this.$("{{$EFM_AreaButtonID}}").show();
                                this.$("{{$EFM_AreaButtonID}}").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $onAction(target, evt) {
                this.$("Sbutton.*").disable();
                this.$("Sbutton.*").hide();
                this.setSceneValue("AreaSelected", true);
                switch (target) {
                    case "Sbutton1":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A1|name");
                        this.setModuleValue("selectedArea.index", 1);
                        this.$("Sarea1|Sselected").show();
                        this.setSceneValue("Area Name:" + "physical and chemical changes");
                        this.setSceneValue("Area Index:" + 1);
                        break;
                    case "Sbutton2":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A2|name");
                        this.setModuleValue("selectedArea.index", 2);
                        this.$("Sarea2|Sselected").show();
                        this.setSceneValue("Area Name:" + "heat and temperature");
                        this.setSceneValue("Area Index:" + 2);
                        break;
                    case "Sbutton3":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A3|name");
                        this.setModuleValue("selectedArea.index", 3);
                        this.$("Sarea3|Sselected").show();
                        this.setSceneValue("Area Name:" + "forces and motion");
                        this.setSceneValue("Area Index:" + 3);
                        break;
                    case "Sbutton4":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A4|name");
                        this.setModuleValue("selectedArea.index", 4);
                        this.$("Sarea4|Sselected").show();
                        this.setSceneValue("Area Name:" + "plant reproduction");
                        this.setSceneValue("Area Index:" + 4);
                        break;
                }
                this.nextTrack("$onAction:" + target);
            }
        }
        EFMod_RQSelect.SScene2 = SScene2;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene2a {
            $onCreateScene() {
            }
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sbutton.*").hide();
                this.$("Sarea.*|Sselected,SsubTitle1,SsubTitle2,Sor").show();
                this.setSceneValue("AreaSelected", false);
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                    case "NO_SELECTION":
                        result = !this.getSceneValue("AreaSelected");
                        break;
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarea?|Sselected").hide();
                                this.$("Sbutton.*").show();
                                this.$("Sbutton.*").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $onAction(target, evt) {
                this.$("Sbutton.*").disable();
                this.$("Sbutton.*").hide();
                this.setSceneValue("AreaSelected", true);
                switch (target) {
                    case "Sbutton1":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A1|name");
                        this.setModuleValue("selectedArea.index", 1);
                        this.$("Sarea1|Sselected").show();
                        this.setSceneValue("Area Name:" + "physical and chemical changes");
                        this.setSceneValue("Area Index:" + 1);
                        break;
                    case "Sbutton2":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A2|name");
                        this.setModuleValue("selectedArea.index", 2);
                        this.$("Sarea2|Sselected").show();
                        this.setSceneValue("Area Name:" + "heat and temperature");
                        this.setSceneValue("Area Index:" + 2);
                        break;
                    case "Sbutton3":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A3|name");
                        this.setModuleValue("selectedArea.index", 3);
                        this.$("Sarea3|Sselected").show();
                        this.setSceneValue("Area Name:" + "forces and motion");
                        this.setSceneValue("Area Index:" + 3);
                        break;
                    case "Sbutton4":
                        this.setModuleValue("selectedArea.ontologyKey", "S_A4|name");
                        this.setModuleValue("selectedArea.index", 4);
                        this.$("Sarea4|Sselected").show();
                        this.setSceneValue("Area Name:" + "plant reproduction");
                        this.setSceneValue("Area Index:" + 4);
                        break;
                }
                this.nextTrack("$onAction:" + target);
            }
        }
        EFMod_RQSelect.SScene2a = SScene2a;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene3 {
            $onCreateScene() {
            }
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sbutton.*").hide();
                this.$("Stopic.|Sarea.topic.,Sarea.title.,Sselected").hide();
                let x = this.getModuleValue("selectedArea.index");
                this.$(`Stopic1|Sarea${x}topic1,Sarea${x}title1`).show();
                this.$(`Stopic2|Sarea${x}topic2,Sarea${x}title2`).show();
                this.setSceneValue("TopicSelected", false);
                this.delFeature("FTR_PASS1");
                this.addFeature("FTR_PASS2");
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                    case "NO_SELECTION":
                        result = !this.getSceneValue("TopicSelected");
                        break;
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1CHOICE":
                        switch (cueID) {
                            case "$start":
                                this.$("Sbutton.*").show();
                                this.$("Sbutton.*").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track1NOCHOICE":
                        switch (cueID) {
                            case "$start":
                                this.$("{{$EFM_TopicSelectedID}}").show();
                                this.$("{{$EFM_TopicButtonID}}").show();
                                this.$("{{$EFM_TopicButtonID}}").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $onAction(target, evt) {
                this.$("Sbutton.*").disable();
                this.$("Sbutton.*").hide();
                this.setSceneValue("TopicSelected", true);
                let x = this.getModuleValue("selectedArea.index");
                this.delFeature(EFMod_RQSelect.CONST.FTRS_ALL, EFMod_RQSelect.CONST.VAR_FTR);
                switch (target) {
                    case "Sbutton1":
                        this.setModuleValue("selectedTopic.ontologyKey", `S_A${x}_T1|name`);
                        this.setModuleValue("selectedTopic.index", 1);
                        this.addFeaturebyQuery(`S_A${x}_T1|features`, EFMod_RQSelect.CONST.VAR_FTR);
                        this.$("Stopic1|Sselected").show();
                        this.setSceneValue("Topic Index:" + 1);
                        break;
                    case "Sbutton2":
                        this.setModuleValue("selectedTopic.ontologyKey", `S_A${x}_T2|name`);
                        this.setModuleValue("selectedTopic.index", 2);
                        this.addFeaturebyQuery(`S_A${x}_T2|features`, EFMod_RQSelect.CONST.VAR_FTR);
                        this.$("Stopic2|Sselected").show();
                        this.setSceneValue("Topic Index:" + 2);
                        break;
                }
                this.nextTrack("$onAction:" + target);
            }
            $timedEvents(id) {
            }
        }
        EFMod_RQSelect.SScene3 = SScene3;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene4 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sarrow.*").hide();
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow1").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow2").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow3").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track5":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow4").show();
                                break;
                            case "$end":
                                this.$("Sarrow.").hide();
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene4 = SScene4;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene5 {
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                break;
                            case "$end":
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene5 = SScene5;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene5a {
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sarrow.").hide();
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                    case "SETCOMPLETE":
                        this.setSceneValue("complete", true);
                        break;
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1a":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow1").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow2").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow3").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow4").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track5":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow5").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track6":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow6").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track7":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow7").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track8":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow8").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene5a = SScene5a;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene6 {
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sarrow.*").hide();
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow1").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow2").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow3").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track5":
                        switch (cueID) {
                            case "$start":
                                this.$("Sarrow.").hide();
                                this.$("Sarrow4").show();
                                break;
                            case "$end":
                                this.$("Sarrow.").hide();
                                break;
                        }
                        break;
                }
            }
            $onAction(target, evt) {
            }
            $timedEvents(id) {
            }
        }
        EFMod_RQSelect.SScene6 = SScene6;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene7 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("Splay").show();
                                this.$("Splay").enable();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target, evt) {
                switch (target) {
                    case "Splay":
                        this.$("Splay.*").disable();
                        this.$("Splay.*").hide();
                        this.Smovie.playMC();
                        break;
                    case "Smovie":
                        if (evt === "complete") {
                            this.setSceneValue("complete", true);
                        }
                        break;
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene7 = SScene7;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene8 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.$("Sicon.|Svar.*").hide();
                this.$("Sicon1|Svar1a").show();
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track0":
                        switch (cueID) {
                            case "$start":
                                this.$("Stitle").hide();
                                this.$("SsubTitle.*").hide();
                                this.$("Sicon.|Svar.*").hide();
                                this.$("Sicon1|Svar1a").show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                this.$("SsubTitle.*").hide();
                                this.$("Sicon.|Svar.*").hide();
                                this.$("Sicon1|Svar1a").show();
                                this.Stitle.setContentByIndex(2);
                                this.Stitle.show();
                                break;
                            case "a":
                                this.SsubTitle1.setContentByIndex(2);
                                this.SsubTitle1.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track1a":
                        switch (cueID) {
                            case "$start":
                                this.$("Sicon2|Svar1b").show();
                                this.SsubTitle2.setContentByIndex(2);
                                this.SsubTitle2.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2":
                        switch (cueID) {
                            case "$start":
                                this.$("SsubTitle.*").hide();
                                this.$("Sicon.|Svar.*").hide();
                                this.$("Sicon1|Svar2a").show();
                                this.Stitle.setContentByIndex(3);
                                break;
                            case "a":
                                this.SsubTitle1.setContentByIndex(3);
                                this.SsubTitle1.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track2a":
                        switch (cueID) {
                            case "$start":
                                this.$("Sicon2|Svar2b").show();
                                this.SsubTitle2.setContentByIndex(3);
                                this.SsubTitle2.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3":
                        switch (cueID) {
                            case "$start":
                                this.$("SsubTitle.*").hide();
                                this.$("Sicon.|Svar.*").hide();
                                this.$("Sicon1|Svar3a").show();
                                this.Stitle.setContentByIndex(4);
                                break;
                            case "a":
                                this.SsubTitle1.setContentByIndex(4);
                                this.SsubTitle1.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track3a":
                        switch (cueID) {
                            case "$start":
                                this.$("Sicon2|Svar3b").show();
                                this.SsubTitle2.setContentByIndex(4);
                                this.SsubTitle2.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4":
                        switch (cueID) {
                            case "$start":
                                this.$("SsubTitle.*").hide();
                                this.$("Sicon.|Svar.*").hide();
                                this.$("Sicon1|Svar4a").show();
                                this.Stitle.setContentByIndex(5);
                                break;
                            case "a":
                                this.SsubTitle1.setContentByIndex(5);
                                this.SsubTitle1.show();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track4a":
                        switch (cueID) {
                            case "$start":
                                this.$("Sicon2|Svar4b").show();
                                this.SsubTitle2.setContentByIndex(5);
                                this.SsubTitle2.show();
                                break;
                            case "$end":
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SScene8 = SScene8;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SScene9 {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.setSceneValue("RQSelected", false);
                this.$("SbuttonHL.*").hide();
                if (this.testFeatures("FTR_NOCHOICE")) {
                    this.$("SclickMask.*").show();
                }
                else {
                    this.$("SclickMask.*").hide();
                }
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                    case "!SELECTION_COMPLETE":
                        result = !this.getSceneValue("RQSelected");
                        break;
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1CHOICE":
                        switch (cueID) {
                            case "$start":
                                break;
                            case "$end":
                                break;
                        }
                        break;
                    case "track1NOCHOICE":
                        switch (cueID) {
                            case "$start":
                                this.$("{{$EFM_VariableHighlightID}}").show();
                                this.$("{{$EFM_VariableClickMaskID}}").hide();
                                break;
                            case "$end":
                                break;
                        }
                        break;
                }
            }
            $onAction(target, evt) {
                this.setSceneValue("RQSelected", true);
                let x = this.getModuleValue("selectedArea.index");
                let y = this.getModuleValue("selectedTopic.index");
                switch (target) {
                    case "Sbutton1":
                        this.setModuleValue("selectedVariable.ontologyKey", `S_A${x}_T${y}_V1|name`);
                        this.setModuleValue("selectedVariable.index", 1);
                        this.setModuleValue("selectedRQ", { "ontologyKey": `S_A${x}_T${y}_RQ1`, "index": "1" });
                        this.setSceneValue("Variable Index:" + 1);
                        break;
                    case "Sbutton2":
                        this.setModuleValue("selectedVariable.ontologyKey", `S_A${x}_T${y}_V2|name`);
                        this.setModuleValue("selectedVariable.index", 2);
                        this.setModuleValue("selectedRQ", { "ontologyKey": `S_A${x}_T${y}_RQ2`, "index": "2" });
                        this.setSceneValue("Variable Index:" + 2);
                        break;
                    case "Sbutton3":
                        this.setModuleValue("selectedVariable.ontologyKey", `S_A${x}_T${y}_V3|name`);
                        this.setModuleValue("selectedVariable.index", 3);
                        this.setModuleValue("selectedRQ", { "ontologyKey": `S_A${x}_T${y}_RQ3`, "index": "3" });
                        this.setSceneValue("Variable Index:" + 3);
                        break;
                    case "Sbutton4":
                        this.setModuleValue("selectedVariable.ontologyKey", `S_A${x}_T${y}_V4|name`);
                        this.setModuleValue("selectedVariable.index", 4);
                        this.setModuleValue("selectedRQ", { "ontologyKey": `S_A${x}_T${y}_RQ4`, "index": "4" });
                        this.setSceneValue("Variable Index:" + 4);
                        break;
                }
                this.nextTrack("$onAction:" + target);
            }
            $timedEvents(id) {
            }
        }
        EFMod_RQSelect.SScene9 = SScene9;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SSceneBL {
            $preCreateScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNEXT, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
            }
            $nodePreEnter(nodeId) {
                switch (nodeId) {
                }
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                break;
                            case "$end":
                                this.setSceneValue("complete", true);
                                break;
                        }
                        break;
                }
            }
            $queryFinished() {
                let result = this.getSceneValue("complete");
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SSceneBL = SSceneBL;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SSceneEnd {
            $preCreateScene() {
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $preShowScene() {
            }
            $preHideScene() {
            }
            $onExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
            }
            $handleEvent(compID) {
                console.log(compID);
            }
            $nodePreEnter(nodeId) {
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                }
            }
            $timedEvents(id) {
            }
            $queryFinished() {
                let result = false;
                return result;
            }
            $onAction(target) {
                switch (target) {
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SSceneEnd = SSceneEnd;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_RQSelect;
    (function (EFMod_RQSelect) {
        class SSceneStart {
            $preCreateScene() {
            }
            $onCreateScene() {
                this.setSceneValue("complete", false);
            }
            $onEnterScene() {
            }
            $preEnterScene() {
                this.setNavMode(EFMod_RQSelect.CONST.NAVNONE, EFMod_RQSelect.CONST.NAVSCENE);
            }
            $preShowScene() {
            }
            $preHideScene() {
            }
            $onExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
            }
            $handleEvent(compID) {
                console.log(compID);
            }
            $nodePreEnter(nodeId) {
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                }
            }
            $nodeConstraint(constrainId) {
                let result = false;
                switch (constrainId) {
                }
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                }
            }
            $timedEvents(id) {
            }
            $queryFinished() {
                let result = false;
                return result;
            }
            $onAction(target) {
                switch (target) {
                    case "Sstart":
                        this.nextTrack("$onAction:" + this.graphState);
                        break;
                }
            }
            $onSelect(target) {
                switch (target) {
                }
            }
            $onClick(target) {
                switch (target) {
                }
            }
        }
        EFMod_RQSelect.SSceneStart = SSceneStart;
    })(EFMod_RQSelect = EFTut_Suppl.EFMod_RQSelect || (EFTut_Suppl.EFMod_RQSelect = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map