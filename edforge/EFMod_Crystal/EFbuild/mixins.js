var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Crystal;
    (function (EFMod_Crystal) {
        class CONST {
        }
        EFMod_Crystal.CONST = CONST;
    })(EFMod_Crystal = EFTut_Suppl.EFMod_Crystal || (EFTut_Suppl.EFMod_Crystal = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Crystal;
    (function (EFMod_Crystal) {
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
        EFMod_Crystal.$Common = $Common;
    })(EFMod_Crystal = EFTut_Suppl.EFMod_Crystal || (EFTut_Suppl.EFMod_Crystal = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_Crystal;
    (function (EFMod_Crystal) {
        class Globals {
        }
        EFMod_Crystal.Globals = Globals;
    })(EFMod_Crystal = EFTut_Suppl.EFMod_Crystal || (EFTut_Suppl.EFMod_Crystal = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map