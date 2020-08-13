declare namespace EFTut_Suppl.$GLOBAL {
    class CONST {
        static readonly TUTORCONTAINER = "STutorContainer";
        static readonly NEXTSCENE = "nextbutton";
        static readonly PREVSCENE = "prevbutton";
        static readonly MOUSE_MOVE: string;
        static readonly MOUSE_DOWN: string;
        static readonly MOUSE_UP: string;
        static readonly MOUSE_CLICK: string;
        static readonly DOUBLE_CLICK: string;
        static readonly CLICK: string;
    }
}
declare namespace EFTut_Suppl.$GLOBAL {
    class $GLOBAL {
        $var1: string;
        [key: string]: any;
        $preEnterScene(scene: any): void;
    }
}
