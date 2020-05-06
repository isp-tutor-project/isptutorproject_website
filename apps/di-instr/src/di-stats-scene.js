
import { DiInstructionScene } from "./di-instruction-scene";

export class DiStatsScene extends DiInstructionScene {
    constructor(app, data) {
        super(app, data);
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.hide(this.app.prevBtn);
        this.app.hide(this.app.nextBtn);
    }
}
