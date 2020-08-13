var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Sinking;
    (function (EFMod_Sinking) {
        class CONST {
        }
        EFMod_Sinking.CONST = CONST;
    })(EFMod_Sinking = EFTut_Suppl.EFMod_Sinking || (EFTut_Suppl.EFMod_Sinking = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Sinking;
    (function (EFMod_Sinking) {
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
        EFMod_Sinking.$Common = $Common;
    })(EFMod_Sinking = EFTut_Suppl.EFMod_Sinking || (EFTut_Suppl.EFMod_Sinking = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Sinking;
    (function (EFMod_Sinking) {
        class Globals {
        }
        EFMod_Sinking.Globals = Globals;
    })(EFMod_Sinking = EFTut_Suppl.EFMod_Sinking || (EFTut_Suppl.EFMod_Sinking = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map