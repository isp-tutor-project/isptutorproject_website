
import "./index.scss";

import { NavBar } from "@isptutorproject/navbar";

import { SceneBasedApp } from "@isptutorproject/scene-app-base";
import {
    DiTestScene,
    DiDualTableResultsScene,
    DiSingleTableResultsScene
} from "./scenes";

export class DiTestApp extends SceneBasedApp{

    createScene(sceneInfo) {
        let scene;
        switch(sceneInfo.sceneType) {
            case "carResults":
            case "rocketsResults":
                scene = new DiSingleTableResultsScene(this, sceneInfo);
                break;
            case "libraryResults":
            case "memoryResults":
                scene = new DiDualTableResultsScene(this, sceneInfo);
                break;
            default:
                scene = new DiTestScene(this, sceneInfo);

        }
        return scene;
    }


}