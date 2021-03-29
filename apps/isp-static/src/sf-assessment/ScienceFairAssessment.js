import { Scene, SceneBasedApp } from "@isptutorproject/scene-app-base";

import { RadioButtonForm} from "@isptutorproject/scene-app-base/radio-button-form"

export class ScienceFairAssessmentScene extends Scene {
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
        // these button states may get overriden by scene-specific custom actions
        this.app.show(this.app.prevBtn)
        this.app.enable(this.app.prevBtn)
        this.app.show(this.app.nextBtn)
        this.app.enable(this.app.nextBtn)
    }

}


export class ScienceFairAssessmentMultChoiceScene extends ScienceFairAssessmentScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo)
        // console.log(sceneInfo)
        this.form = new RadioButtonForm(
            app, sceneInfo.question, `${sceneInfo.question.id}_radio_form`
        )
    }


    restoreState(value) {
        if (super.restoreState(value)) {
            const eleID = `${this.question.id}_option_${value}`
            const el = document.getElementById(eleID)
            if (typeof(el) === "undefined") {
                console.error(`\t\tUnable to Select Radio Button ${eleID}`)
                return false
            } else {
                el.checked = true;
                console.debug(`\t\tSelected Radio Button ${eleID}`)
                return true
            }
        }
        return false
    }

    hasForm() {
        return true;
    }

    formChanged() {
        return this.form.changed
    }

    handlePrevButton() {
        if (this.formChanged()) {
            this.saveFormData()
        }
        super.handlePrevButton()
    }

    handleNextButton() {
        if (this.formChanged()) {
            this.saveFormData()
        }
        super.handleNextButton()
    }

    setupEventHandlers() {
        this.form.setupEventHandlers()
    }

    teardownEventHandlers() {
        this.form.teardownEventHandlers()
    }


    defaultEnterSceneActions() {
        super.defaultEnterSceneActions()
        if (process.env.NODE_ENV === "production") {
            if (!this.form.isValid()) {
                this.app.disable(this.app.nextBtn)
            }
        }
        this.setupEventHandlers()
    }

    defaultExitSceneActions() {
        super.defaultExitSceneActions()
        this.teardownEventHandlers()
    }

    saveFormData() {
        const data = this.form.getData()
        const logData = Object.assign(
            {
                type: "SUBMIT_ANSWER",
                // this apps questionId's begin with this.app.activityKey
                questionId: `${this.question.id}`
            },
            data
        )
        this.app.state.events.push(logData)
        this.app.state.sceneState[this.id] = data.selectedValue
    }
}

// only differs from *MultChoiceScene in it's "next" navigation
export class ScienceFairAssessmentYNNavigationScene extends ScienceFairAssessmentMultChoiceScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo)
        console.log(this.question)
    }

    handleNextButton() {
        if (this.formChanged()) {
            this.saveFormData()
        }
        this.app.followDynamicEdge("next", this.app.state.sceneState[this.id])
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions()
        this.app.disable(this.app.nextBtn)
    }
}


export class ScienceFairAssessmentApp extends SceneBasedApp {
    constructor(appData, activityConfig, defaultInitialState) {
        super(appData, activityConfig, defaultInitialState)
    }

    followDynamicEdge(edgeName, value) {
        const alternatives = this.currentScene.edges[edgeName]
        const newSceneId = alternatives[value]
        const newScene = this.lookupScene(newSceneId)
        this.switchToScene(newScene)
    }

    createScene(sceneInfo) {
        let newScene
        switch (sceneInfo.sceneType) {
            case "ynNavigationScene":
                newScene = new ScienceFairAssessmentYNNavigationScene(this, sceneInfo)
                break
            case "multipleChoiceScene":
                newScene = new ScienceFairAssessmentMultChoiceScene(this, sceneInfo)
                break
            default:
                newScene = new ScienceFairAssessmentScene(this, sceneInfo)
                break
        }
        return newScene
    }

}
