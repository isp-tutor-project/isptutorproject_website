
import {
    SceneTransitionsApp,
    Scene
} from "@isptutorproject/scene-transitions-base";


class SelectVINScene extends Scene {
    constructor(app, data) {
        super(app, data);
        this.selectVIN = this.selectVIN.bind(this);
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        for (let vin of document.querySelectorAll(".select-vin")) {
            vin.addEventListener("click", this.selectVIN);
        }
    }

    selectVIN(event) {
        event.preventDefault();
        // console.log(event);
        // let vin = event.target;
        this.app.vinName = event.target.getAttribute("data-vin");
        this.app.handleTransition("next");
    }
}

class SelectHotColdScene extends Scene {
    constructor(app, data) {
        super(app, data);
        
    }
}
class HypoWEScene extends Scene {
    constructor(app, data) {
        super(app, data);
        this.handleTransitionButton = this.handleTransitionButton.bind(this);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns,
        };
        this.btnNames = {
            prev: this.app.prevBtn,
            next: this.app.nextBtn,
        };
    }

    showBtns(btnNames) {
        for (let btnName of btnNames) {
            if (this.btnNames.hasOwnProperty(btnName)) {
                this.app.show(this.btnNames[btnName]);
            }
        }
    }

    hideBtns(btnNames) {
        for (let btnName of btnNames) {
            if (this.btnNames.hasOwnProperty(btnName)) {
                this.app.hide(this.btnNames[btnName]);
            }
        }
    }
   
    handleTransitionButton(e) {
        e.preventDefault();
        let transitionName = e.target.dataset.transition;
        this.app.handleTransition(transitionName);
    }


    getTransitionElements() {
        return this.el.getElementsByClassName("transition-to");
    }

    setupTransitionEventHandlers() {
        for (let el of this.getTransitionElements()) {
            el.addEventListener("click", this.handleTransitionButton, { once: true });
        }
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.setupTransitionEventHandlers();
        if (process.env.NODE_ENV === "production") {
            this.app.hide(this.app.prevBtn);
        } else {
            this.app.show(this.app.prevBtn);
        }
        this.app.show(this.app.nextBtn);
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

    defaultExitSceneActions() {
        super.defaultExitSceneActions()
    }
}

export class HypoWEApp extends(SceneTransitionsApp) {

    constructor(appData) {
        super(appData);
        this.vinName = null;
        this.nextBtn = document.getElementById("next_btn");
        this.prevBtn = document.getElementById("prev_btn");
        this.sceneIdRegion = document.getElementById("scene_id_region");
        this.nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("next");
        });
        this.prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("prev");
        });
    }

    createScene(sceneInfo) {
        let newScene;
        // if ("stats" === sceneInfo.sceneType) {
        //     newScene = new DiStatsScene(this, sceneInfo);
        // } else if ("multipleChoiceForm" === sceneInfo.sceneType) {
        //     newScene = new DiMultipleChoiceFormScene(this, sceneInfo);
        if ("selectVIN" === sceneInfo.sceneType) {
            newScene = new SelectVINScene(this, sceneInfo);
        } else {
            newScene = new HypoWEScene(this, sceneInfo);
        }
        return newScene;
    }

    logTransition(scene) {
        // FIXME: this needs to get stored in firestore
        let data = {
            action: "SCENE_TRANSITION",
            from: this.currentScene.id,
            to: scene.id,
            timestamp: new Date().toLocaleString()
        };
        console.log(scene.id, data);
    }

    logStudentAnswer(questionName, answer) {
        let question = this.currentScene.questions[questionName];
        let isCorrect = "N/A";
        if (question.hasOwnProperty("correctAnswer")) {
            isCorrect = (answer === question.correctAnswer)
        }
        let qid = `${this.currentScene.id}.${questionName}`;
        if ("" !== this.testName) {
            qid = `${this.testName}.${qid}`;
        }
        let data = {
            action: "SUBMIT_ANSWER",
            questionId: qid,
            questionText: question.text,
            answer: answer,
            isCorrect: isCorrect,
            timestamp: new Date().toLocaleString()
        }
        console.log(data);
    }

    transitionTo(scene) {
        super.transitionTo(scene);
        this.displaySceneId();
    }

    displaySceneId() {
        if (process.env.NODE_ENV === "development") {
            this.sceneIdRegion.innerHTML = this.currentScene.id;
        }
    }

}