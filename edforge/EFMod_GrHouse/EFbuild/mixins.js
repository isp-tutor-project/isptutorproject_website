var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_GrHouse;
    (function (EFMod_GrHouse) {
        class CONST {
        }
        EFMod_GrHouse.CONST = CONST;
    })(EFMod_GrHouse = EFTut_Suppl.EFMod_GrHouse || (EFTut_Suppl.EFMod_GrHouse = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_GrHouse;
    (function (EFMod_GrHouse) {
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
            $updateNav() {
                if (!this.sceneState.sceneComplete)
                    this.tutorDoc.TutAutomator.SNavigator._instance.enableNext(false);
                else
                    this.tutorDoc.TutAutomator.SNavigator._instance.enableNext(true);
            }
        }
        EFMod_GrHouse.$Common = $Common;
    })(EFMod_GrHouse = EFTut_Suppl.EFMod_GrHouse || (EFTut_Suppl.EFMod_GrHouse = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_GrHouse;
    (function (EFMod_GrHouse) {
        class Globals {
        }
        EFMod_GrHouse.Globals = Globals;
    })(EFMod_GrHouse = EFTut_Suppl.EFMod_GrHouse || (EFTut_Suppl.EFMod_GrHouse = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map