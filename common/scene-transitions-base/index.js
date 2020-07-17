
export class Scene {
    constructor(app, sceneInfo) {
        console.debug(`\tInitializing Scene: ${sceneInfo.id}`);
        this.app = app;
        // copy all sceneInfo to 'this'
        for (let [k, v] of Object.entries(sceneInfo)) {
            this[k] = v;
        }
        this.el = document.getElementById(this.id);
    }

    restoreState(value) {
        if (typeof (value) !== "undefined") {
            console.debug(`\tRestoring Scene State for: ${this.id} `);
            return true;
        }
        return false;
    }

    _isBogus() {
        return this.id === "N/A" || this.sceneType === "bogus";
    }

    hasForm() {
        return false;
    }

    formChanged() {
        return false;
    }

    pre_enter() {

    }
    enter() {
        if (this._isBogus()) {
            return;
        }
        console.debug(`Entering Scene: ${this.id}`);
        console.debug("\tUpdating state.currentScene");
        this.app.state.currentScene = this.id;
        this.defaultEnterSceneActions();
        if (this.customEnterActions.length) {
            this.performCustomEnterSceneActions();
        }
    }

    post_enter() {

    }

    pre_exit() {

    }

    exit() {
        if (this._isBogus()) {
            return;
        }
        console.debug(`Exiting Scene: ${this.id}`);
        this.defaultExitSceneActions();
        if (this.customExitActions.length) {
            this.performCustomExitSceneActions();
        }
    }

    defaultEnterSceneActions() {
        this.el.classList.add("active");
    }

    defaultExitSceneActions() {
        this.el.classList.remove("active");
    }

    performCustomEnterSceneActions() {
        console.warn("Unimplemented Method: performCustomEnterSceneActions");
    }

    performCustomExitSceneActions() {
        console.warn("Unimplemented Method: performCustomExitSceneActions");
    }
}

export class SceneTransitionsApp {
    constructor(appData) {
        this.scenes = appData.scenes;
        console.debug(this.scenes);
        this.bogusSceneInfo = {
            id: "N/A",
            sceneType: "bogus"
        }
    }

    createScene(sceneInfo) {
        console.debug("createScene()", sceneInfo);
        return new Scene(this, sceneInfo);
    }

    transitionTo(scene) {
        this.logTransition(scene);
        this.prevScene = this.currentScene;
        this.prevScene.exit();
        this.currentScene = scene;
        this.currentScene.enter();
        delete this.prevScene;
    }

    lookupScene(sceneId) {
        let sceneInfo = this.scenes[sceneId];
        if (!sceneInfo) {
            console.error(`ERROR: no such scene ${sceneId}`);
        }
        return sceneInfo;
    }

    handleTransition(transitionName) {
        let newSceneId = this.currentScene.transitions[transitionName];
        let newSceneInfo = this.lookupScene(newSceneId);
        if (!newSceneInfo) {
            return;
        }
        let newScene = this.createScene(newSceneInfo);
        console.debug(newScene);
        this.transitionTo(newScene);
    }

    logTransition(scene) {
        console.warn("Unimplemented Method: logTransition()");
    }

    setStartScene(sceneId) {
        console.debug("setStartScene()", sceneId);
        let startSceneInfo = this.lookupScene(sceneId);

        if (!this.scenes.hasOwnProperty(sceneId)) {
            console.error(`no scene named "${sceneId}"`);
            return;
        }

        this.currentScene = this.createScene(this.bogusSceneInfo);
        if (!startSceneInfo) {
            return;
        }
        let startScene = this.createScene(startSceneInfo);
        this.transitionTo(startScene);
    }

    hide(el) {
        if (el) { el.classList.add("hidden"); }
    }

    show(el) {
        if (el) { el.classList.remove("hidden"); }
    }

    makeInvisible(el) {
        if (el) {
            // el.classList.remove("visible");
            el.classList.add("invisible");
        }
    }

    makeVisible(el) {
        if (el) {
            el.classList.remove("invisible");
            // el.classList.add("visible");
        }
    }

    disable(el) {
        if (el) {
            // console.log("disabling:", el);
            el.classList.add("disabled");
        } else {
            // console.log("not disabling non-existinant element:", el);
        }
    }

    enable(el) {
        if (el) {
            // console.log("disabling:", el);
            el.classList.remove("disabled");
        } else {
            // console.log("not disabling non-existinant element:", el);
        }
    }

}
