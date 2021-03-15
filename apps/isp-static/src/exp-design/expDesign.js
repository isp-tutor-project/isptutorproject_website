import {Scene, SceneBasedApp} from "@isptutorproject/scene-app-base"

export class ExpDesignScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo)
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
        // these button states may get overriden by scene-specific custom actions
        this.app.show(this.app.prevBtn);
        this.app.enable(this.app.prevBtn);
        this.app.show(this.app.nextBtn);
        this.app.enable(this.app.nextBtn);
    }
}

export class ExpDesignApp extends SceneBasedApp {
    constructor(appData, activityConfig, defaultInitialState) {
        super(appData, activityConfig, defaultInitialState)
        console.log(appData);
    }

    createScene(sceneInfo) {
        console.log("createScene:", sceneInfo)
        return new ExpDesignScene(this, sceneInfo)
    }
}