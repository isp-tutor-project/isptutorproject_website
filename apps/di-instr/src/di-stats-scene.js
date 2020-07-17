
import { DiInstructionScene } from "./di-instruction-scene";

export class DiStatsScene extends DiInstructionScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.hide(this.app.prevBtn);
        this.app.hide(this.app.nextBtn);
    }
}
