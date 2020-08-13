var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Soda;
    (function (EFMod_Soda) {
        class CONST {
        }
        EFMod_Soda.CONST = CONST;
    })(EFMod_Soda = EFTut_Suppl.EFMod_Soda || (EFTut_Suppl.EFMod_Soda = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Soda;
    (function (EFMod_Soda) {
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
        EFMod_Soda.$Common = $Common;
    })(EFMod_Soda = EFTut_Suppl.EFMod_Soda || (EFTut_Suppl.EFMod_Soda = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Soda;
    (function (EFMod_Soda) {
        class Globals {
        }
        EFMod_Soda.Globals = Globals;
    })(EFMod_Soda = EFTut_Suppl.EFMod_Soda || (EFTut_Suppl.EFMod_Soda = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map