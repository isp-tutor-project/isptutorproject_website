var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Balloon;
    (function (EFMod_Balloon) {
        class CONST {
        }
        EFMod_Balloon.CONST = CONST;
    })(EFMod_Balloon = EFTut_Suppl.EFMod_Balloon || (EFTut_Suppl.EFMod_Balloon = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Balloon;
    (function (EFMod_Balloon) {
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
        EFMod_Balloon.$Common = $Common;
    })(EFMod_Balloon = EFTut_Suppl.EFMod_Balloon || (EFTut_Suppl.EFMod_Balloon = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Balloon;
    (function (EFMod_Balloon) {
        class Globals {
        }
        EFMod_Balloon.Globals = Globals;
    })(EFMod_Balloon = EFTut_Suppl.EFMod_Balloon || (EFTut_Suppl.EFMod_Balloon = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map