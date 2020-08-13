System.register("thermite/TMatsCheck", ["thermite/TRadioButton", "util/CUtil"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TRadioButton_1, CUtil_1, TMatsCheck;
    return {
        setters: [
            function (TRadioButton_1_1) {
                TRadioButton_1 = TRadioButton_1_1;
            },
            function (CUtil_1_1) {
                CUtil_1 = CUtil_1_1;
            }
        ],
        execute: function () {
            TMatsCheck = class TMatsCheck extends TRadioButton_1.TRadioButton {
                constructor() {
                    super();
                    this.init6();
                }
                TMatsCheckInitialize() {
                    this.TRadioButtonInitialize.call(this);
                    this.init6();
                }
                initialize() {
                    this.TRadioButtonInitialize.call(this);
                    this.init6();
                }
                init6() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_1.CUtil.trace("TMatsCheck:Constructor");
                }
                deSerializeObj(objData) {
                    console.log("deserializing: CheckButton Control");
                    objData.btnData = objData.btnData || {};
                    objData.btnData.elements = [{ "name": "Scheck_FB", "sibling": "Slabel" },
                        { "name": "Scheck_BG", "sibling": "Scheck_FB" },
                        { "name": "Scheck_HR", "sibling": "Scheck_BG" }];
                    super.deSerializeObj(objData);
                }
            };
            exports_1("TMatsCheck", TMatsCheck);
        }
    };
});
//# sourceMappingURL=exts.js.map