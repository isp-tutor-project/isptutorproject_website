var EFTut_Suppl;
(function (EFTut_Suppl) {
    var $GLOBAL;
    (function ($GLOBAL) {
        class CONST {
        }
        CONST.TUTORCONTAINER = "STutorContainer";
        CONST.NEXTSCENE = "nextbutton";
        CONST.PREVSCENE = "prevbutton";
        CONST.MOUSE_MOVE = "mousemove";
        CONST.MOUSE_DOWN = "mousedown";
        CONST.MOUSE_UP = "mouseup";
        CONST.MOUSE_CLICK = "click";
        CONST.DOUBLE_CLICK = "dblclick";
        CONST.CLICK = "click";
        $GLOBAL.CONST = CONST;
    })($GLOBAL = EFTut_Suppl.$GLOBAL || (EFTut_Suppl.$GLOBAL = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var $GLOBAL;
    (function ($GLOBAL_1) {
        class $GLOBAL {
            $preEnterScene(scene) {
                scene.setBreadCrumbs(scene.name);
                switch (scene.name) {
                    case "test":
                        break;
                    default:
                        scene.hideProgress();
                        break;
                }
            }
            $nodeConstraint(nodeId, constraintId) {
                let result = false;
                let RQconf = this.getModuleValue("RQconfirmation");
                switch (constraintId) {
                    case "CHANGE_RQ":
                        if (RQconf === constraintId)
                            result = true;
                        break;
                    case "CHANGE_TOPIC":
                        if (RQconf === constraintId)
                            result = true;
                        break;
                    case "CHANGE_AREA":
                        if (RQconf === constraintId)
                            result = true;
                        break;
                }
                return result;
            }
        }
        $GLOBAL_1.$GLOBAL = $GLOBAL;
    })($GLOBAL = EFTut_Suppl.$GLOBAL || (EFTut_Suppl.$GLOBAL = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=globals.js.map