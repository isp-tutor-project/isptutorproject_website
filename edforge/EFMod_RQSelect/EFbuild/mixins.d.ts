declare namespace EFTut_Suppl.EFMod_RQSelect {
    class CONST {
        static readonly TUTORCONTAINER: string;
        static readonly NAVNONE: number;
        static readonly NAVBACK: number;
        static readonly NAVNEXT: number;
        static readonly NAVBOTH: number;
        static readonly NEXTSCENE: string;
        static readonly PREVSCENE: string;
        static readonly NAVSCENE: string;
        static readonly NAVTUTOR: string;
        static readonly MOUSE_MOVE: string;
        static readonly MOUSE_DOWN: string;
        static readonly MOUSE_UP: string;
        static readonly MOUSE_CLICK: string;
        static readonly DOUBLE_CLICK: string;
        static readonly CLICK: string;
        static readonly FLATSTATE: number;
        static readonly NORMALSTATE: number;
        static readonly NORMALwBUBBLE: number;
        static readonly SELECTEDSTATE: number;
        static readonly SELECTEDwBUBBLE: number;
        static readonly NORMALnoARROW: number;
        static readonly SELECTEDnoARROW: number;
        static readonly SELECTED2noARROW: number;
        static readonly FTRS_ALL: any;
        static readonly VAR_FTR: string;
        static readonly FTR_PRE: any;
        static readonly FTR_DEV: any;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class $Common {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $preEnterScene(): void;
        $onEnterScene(): void;
        $preExitScene(): void;
        $onExitScene(): void;
        $preShowScene(): void;
        $preHideScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): void;
        $handleEvent(): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(id: string): void;
        $timedEvents(id: string): void;
        $onAction(target: string, evt: string): void;
        $queryFinished(): boolean;
        $canGoBack(): boolean;
        $updateNav(): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class Globals {
        [key: string]: any;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SNavigator {
        [key: string]: any;
        $preCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $timedEvents(id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene1 {
        [key: string]: any;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preCreateScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene10 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
        $timedEvents(id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene11 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $cuePoints(trackID: string, cueID: string): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene2 {
        [key: string]: any;
        $onCreateScene(): void;
        $preCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene2a {
        [key: string]: any;
        $onCreateScene(): void;
        $preCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene3 {
        [key: string]: any;
        $onCreateScene(): void;
        $preCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
        $timedEvents(id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene4 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene5 {
        [key: string]: any;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene5a {
        [key: string]: any;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene6 {
        [key: string]: any;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
        $timedEvents(id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene7 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string, evt: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene8 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SScene9 {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $onAction(target: string, evt: string): void;
        $timedEvents(id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SSceneBL {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): any;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SSceneEnd {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preShowScene(): void;
        $preHideScene(): void;
        $onExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): void;
        $handleEvent(compID: string): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $timedEvents(id: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_RQSelect {
    class SSceneStart {
        [key: string]: any;
        $preCreateScene(): void;
        $onCreateScene(): void;
        $onEnterScene(): void;
        $preEnterScene(): void;
        $preShowScene(): void;
        $preHideScene(): void;
        $onExitScene(): void;
        $demoInitScene(): void;
        $logScene(): void;
        $rewindScene(): void;
        $resolveTemplate(templID: string): void;
        $handleEvent(compID: string): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(trackID: string, cueID: string): void;
        $timedEvents(id: string): void;
        $queryFinished(): boolean;
        $onAction(target: string): void;
        $onSelect(target: string): void;
        $onClick(target: string): void;
    }
}
