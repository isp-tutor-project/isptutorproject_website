var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Ramps;
    (function (EFMod_Ramps) {
        class CONST {
        }
        EFMod_Ramps.CONST = CONST;
    })(EFMod_Ramps = EFTut_Suppl.EFMod_Ramps || (EFTut_Suppl.EFMod_Ramps = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Ramps;
    (function (EFMod_Ramps) {
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
        EFMod_Ramps.$Common = $Common;
    })(EFMod_Ramps = EFTut_Suppl.EFMod_Ramps || (EFTut_Suppl.EFMod_Ramps = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Ramps;
    (function (EFMod_Ramps) {
        class Globals {
        }
        EFMod_Ramps.Globals = Globals;
    })(EFMod_Ramps = EFTut_Suppl.EFMod_Ramps || (EFTut_Suppl.EFMod_Ramps = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map