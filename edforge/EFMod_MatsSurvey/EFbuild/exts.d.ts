/// <reference path="../../dist/TutorEngineOne.d.ts" />
declare module "thermite/TMatsCheck" {
    import { TRadioButton } from "thermite/TRadioButton";
    export class TMatsCheck extends TRadioButton {
        constructor();
        TMatsCheckInitialize(): void;
        initialize(): void;
        private init6();
        deSerializeObj(objData: any): void;
    }
}
