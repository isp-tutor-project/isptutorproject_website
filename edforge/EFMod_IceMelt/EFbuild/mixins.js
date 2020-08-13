var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_IceMelt;
    (function (EFMod_IceMelt) {
        class CONST {
        }
        EFMod_IceMelt.CONST = CONST;
    })(EFMod_IceMelt = EFTut_Suppl.EFMod_IceMelt || (EFTut_Suppl.EFMod_IceMelt = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_IceMelt;
    (function (EFMod_IceMelt) {
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
        EFMod_IceMelt.$Common = $Common;
    })(EFMod_IceMelt = EFTut_Suppl.EFMod_IceMelt || (EFTut_Suppl.EFMod_IceMelt = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_IceMelt;
    (function (EFMod_IceMelt) {
        class Globals {
        }
        EFMod_IceMelt.Globals = Globals;
    })(EFMod_IceMelt = EFTut_Suppl.EFMod_IceMelt || (EFTut_Suppl.EFMod_IceMelt = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map