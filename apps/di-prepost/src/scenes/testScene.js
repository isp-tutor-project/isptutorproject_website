import { Scene } from "@isptutorproject/scene-app-base";

export class DiTestScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns,
        };
        this.btnNames = {
            prev: this.app.prevBtn,
            next: this.app.nextBtn
        };
    }

    performCustomEnterSceneActions() {
        for (let action of this.customEnterActions) {
            let name = action.name;
            let args = action.args;
            if (this.customActions.hasOwnProperty(name)) {
                this[name](args);
            }
        }
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        // if (process.env.NODE_ENV === "production") {
        //     this.app.hide(this.app.prevBtn);
        // } else {
        this.app.show(this.app.prevBtn);
        // }
        this.app.show(this.app.nextBtn);
    }

}