System.register("thermite/IExptTypes", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("thermite/TIntroControl", ["core/CEFTimeLine", "thermite/TObject", "util/CUtil"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var CEFTimeLine_1, TObject_1, CUtil_1, TIntroControl;
    return {
        setters: [
            function (CEFTimeLine_1_1) {
                CEFTimeLine_1 = CEFTimeLine_1_1;
            },
            function (TObject_1_1) {
                TObject_1 = TObject_1_1;
            },
            function (CUtil_1_1) {
                CUtil_1 = CUtil_1_1;
            }
        ],
        execute: function () {
            TIntroControl = class TIntroControl extends TObject_1.TObject {
                constructor() {
                    super();
                    this.FLATSTATE = 0;
                    this.NORMALSTATE = 1;
                    this.NORMALwBUBBLE = 2;
                    this.SELECTEDSTATE = 3;
                    this.SELECTEDwBUBBLE = 4;
                    this.NORMALnoARROW = 5;
                    this.SELECTEDnoARROW = 6;
                    this.SELECTED2noARROW = 7;
                    this.init3();
                }
                TIntroControlInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_1.CUtil.trace("TIntroControl:Constructor");
                    this.effectTimeLine = new CEFTimeLine_1.CEFTimeLine(null, null, { "useTicks": false, "loop": false, "paused": true }, this.tutorDoc);
                    this.effectTweens = new Array();
                    this.FLATSTATE = 0;
                    this.NORMALSTATE = 1;
                    this.NORMALwBUBBLE = 2;
                    this.SELECTEDSTATE = 3;
                    this.SELECTEDwBUBBLE = 4;
                    this.NORMALnoARROW = 5;
                    this.SELECTEDnoARROW = 6;
                    this.SELECTED2noARROW = 7;
                }
                Destructor() {
                    super.Destructor();
                }
                addHTMLControls() {
                    this.STextBox1.addHTMLControls();
                    this.STextBox2.addHTMLControls();
                    this.gotoState(this.currState || this.FLATSTATE);
                }
                set hostScene(scene) {
                    this._hostScene = scene;
                    this.STextBox1.hostScene = scene;
                    this.STextBox2.hostScene = scene;
                }
                hideall() {
                    this.STextBox1.visible = false;
                    this.STextBox2.visible = false;
                    this.Sarrow.visible = false;
                    this.SboxNormal.visible = false;
                    this.SboxSelect.visible = false;
                    this.SboxShadow.visible = false;
                    this.SbubbleNormal.visible = false;
                    this.SbubbleSelect.visible = false;
                    this.SbubbleShadow.visible = false;
                }
                gotoState(state) {
                    this.hideall();
                    this.currState = state;
                    switch (state) {
                        case this.FLATSTATE:
                            this.STextBox1.visible = true;
                            this.SboxNormal.visible = true;
                            this.Sarrow.visible = true;
                            break;
                        case this.NORMALSTATE:
                            this.STextBox1.visible = true;
                            this.SboxNormal.visible = true;
                            this.SboxShadow.visible = true;
                            this.Sarrow.visible = true;
                            break;
                        case this.NORMALwBUBBLE:
                            this.STextBox1.visible = true;
                            this.STextBox2.visible = true;
                            this.SboxNormal.visible = true;
                            this.SboxShadow.visible = true;
                            this.SbubbleNormal.visible = true;
                            this.SbubbleShadow.visible = true;
                            this.Sarrow.visible = true;
                            break;
                        case this.SELECTEDSTATE:
                            this.STextBox1.visible = true;
                            this.SboxSelect.visible = true;
                            this.SboxShadow.visible = true;
                            this.Sarrow.visible = true;
                            break;
                        case this.SELECTEDwBUBBLE:
                            this.STextBox1.visible = true;
                            this.STextBox2.visible = true;
                            this.SboxSelect.visible = true;
                            this.SboxShadow.visible = true;
                            this.SbubbleSelect.visible = true;
                            this.SbubbleShadow.visible = true;
                            this.Sarrow.visible = true;
                            break;
                        case this.NORMALnoARROW:
                            this.STextBox1.visible = true;
                            this.SboxNormal.visible = true;
                            this.SboxShadow.visible = true;
                            break;
                        case this.SELECTEDnoARROW:
                            this.STextBox1.visible = true;
                            this.SboxSelect.visible = true;
                            this.SboxShadow.visible = true;
                            break;
                        case this.SELECTED2noARROW:
                            this.STextBox1.visible = true;
                            this.SboxSelect.visible = true;
                            this.SboxShadow.visible = true;
                            break;
                    }
                }
                set alpha(value) {
                    this._alpha = value;
                    if (this.STextBox1 && this.STextBox2) {
                        this.STextBox1.alpha = value;
                        this.STextBox2.alpha = value;
                    }
                }
                get alpha() {
                    return this._alpha;
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    return obj;
                }
                captureXMLState() {
                    let stateVal = { controller: {} };
                    let controller = stateVal.controller;
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                }
                compareXMLState(stateVal) {
                    var bTest = true;
                    return bTest;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: TIntroControl Custom Control");
                    super.deSerializeObj(objData);
                    this.STextBox1.deSerializeObj(objData.STextBox1);
                    this.STextBox2.deSerializeObj(objData.STextBox2);
                }
            };
            exports_2("TIntroControl", TIntroControl);
        }
    };
});
System.register("thermite/TMaterialIcon", ["core/CEFTimeLine", "thermite/TObject", "util/CUtil"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var CEFTimeLine_2, TObject_2, CUtil_2, TMaterialIcon;
    return {
        setters: [
            function (CEFTimeLine_2_1) {
                CEFTimeLine_2 = CEFTimeLine_2_1;
            },
            function (TObject_2_1) {
                TObject_2 = TObject_2_1;
            },
            function (CUtil_2_1) {
                CUtil_2 = CUtil_2_1;
            }
        ],
        execute: function () {
            TMaterialIcon = class TMaterialIcon extends TObject_2.TObject {
                constructor() {
                    super();
                    this.init3();
                }
                TMaterialIconInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_2.CUtil.trace("TMaterialIcon:Constructor");
                    this.effectTimeLine = new CEFTimeLine_2.CEFTimeLine(null, null, { "useTicks": false, "loop": false, "paused": true }, this.tutorDoc);
                    this.effectTweens = new Array();
                }
                Destructor() {
                    super.Destructor();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    return obj;
                }
                captureXMLState() {
                    let stateVal = { controller: {} };
                    let controller = stateVal.controller;
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                }
                compareXMLState(stateVal) {
                    var bTest = true;
                    return bTest;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: TMaterialIcon Custom Control");
                    super.deSerializeObj(objData);
                }
            };
            exports_3("TMaterialIcon", TMaterialIcon);
        }
    };
});
System.register("thermite/TTEDExpt", ["thermite/TObject", "util/CUtil"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var TObject_3, CUtil_3, TTEDExpt;
    return {
        setters: [
            function (TObject_3_1) {
                TObject_3 = TObject_3_1;
            },
            function (CUtil_3_1) {
                CUtil_3 = CUtil_3_1;
            }
        ],
        execute: function () {
            TTEDExpt = class TTEDExpt extends TObject_3.TObject {
                constructor() {
                    super();
                    this.init3();
                }
                TTEDExptInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_3.CUtil.trace("TTEDExpt:Constructor");
                    this.exptStruct = [null, null, null, null];
                    this.state = {};
                }
                onCreate() {
                    super.onCreate();
                    for (let i1 = 1; i1 <= 4; i1++) {
                        this["Stag" + i1].addHTMLControls();
                    }
                }
                Destructor() {
                    super.Destructor();
                }
                setContext(_hostModule, _ownerModule, _hostScene) {
                    super.setContext(_hostModule, _ownerModule, _hostScene);
                    for (let i1 = 1; i1 <= 4; i1++) {
                        this["Stag" + i1].setContext(_hostModule, _ownerModule, _hostScene);
                    }
                }
                setState(parent, parentName, variants) {
                    for (let sVar = 0; sVar < 4; sVar++) {
                        if (this.exptStruct[sVar].parent === parentName) {
                            let baseName = this.exptStruct[sVar].id;
                            let varName = baseName + variants[sVar];
                            parent[varName].show();
                            this.setState(parent[varName], baseName, variants);
                        }
                    }
                }
                hideAll(parent, parentName) {
                    for (let sVar = 0; sVar < 4; sVar++) {
                        if (this.exptStruct[sVar].parent === parentName) {
                            this.exptStruct[sVar].parentObj = parent;
                            for (let variant of this.exptStruct[sVar].variants) {
                                let baseName = this.exptStruct[sVar].id;
                                let varName = baseName + variant;
                                parent[varName].hide();
                                this.hideAll(parent[varName], baseName);
                            }
                        }
                    }
                }
                showHighlight(...target) {
                    target.forEach(element => {
                        this["Shighlight" + element].show();
                    });
                }
                hideHighlight(...target) {
                    target.forEach(element => {
                        this["Shighlight" + element].hide();
                    });
                }
                showCallOut(...target) {
                    target.forEach(element => {
                        this["Stag" + element].show();
                    });
                }
                hideCallOut(...target) {
                    target.forEach(element => {
                        this["Stag" + element].hide();
                    });
                }
                hideTags() {
                    for (let sVar = 1; sVar <= 4; sVar++) {
                        this["Shighlight" + sVar].hide();
                        this["Stag" + sVar].hide();
                    }
                }
                initFromTagData(tagData) {
                    for (let i1 = 0; i1 < 4; i1++) {
                        let dataSource = {
                            "layoutsource": tagData.layoutsource,
                            "htmlData": {
                                "html": tagData.tag[i1]
                            },
                            "templateRef": tagData.templateRef
                        };
                        this["Stag" + (i1 + 1)].deSerializeObj(dataSource);
                    }
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: TED Experiment Custom Control");
                    if (objData.exptStruct) {
                        this.exptStruct = this.hostScene.resolveSelector(objData.exptStruct.structData, objData.exptStruct.templateRef);
                        this.hideAll(this, "");
                    }
                    if (objData.initState) {
                        this.initState = objData.initState;
                        this.setState(this, "", this.initState);
                    }
                    if (objData.tagData) {
                        this.initFromTagData(objData.tagData);
                        this.hideTags();
                    }
                }
            };
            exports_4("TTEDExpt", TTEDExpt);
        }
    };
});
//# sourceMappingURL=exts.js.map