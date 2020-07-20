import { DiInstructionScene } from "./di-instruction-scene";

import { RadioButtonForm } from "@isptutorproject/scene-app-base/radio-button-form";

export class DiMultipleChoiceFormScene extends DiInstructionScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.form = new RadioButtonForm(
            app, sceneInfo.question, `${this.id}_radio_form`
        );
    }

    restoreState(value) {
        if (super.restoreState(value)) {
            let eleID = `${this.id}_option_${value}`;
            let el = document.getElementById(eleID);
            if (typeof(el) === "undefined") {
                console.error(`\t\tUnable to Select Radio Button ${eleID}`);
                return false;
             } else {
                el.checked = true;
                console.debug(`\t\tSelected Radio Button: ${eleID}`);
                return true;
            }
        }
        return false;
    }

    hasForm() {
        return true;
    }

    formChanged() {
        return this.form.changed;
    }

    saveFormData() {
        let data = this.form.getData();
        let logData = Object.assign(
            {
                action_type: "SUBMIT_ANSWER",
                questionId: `${this.app.activityKey}.${this.id}`
            },
            data
        );
        console.log("Updating state.events");
        this.app.state.events.push(logData);
        console.log("Updating state.sceneState");
        console.log(this.app.state);
        this.app.state.sceneState[this.id] = data.selectedValue;
    }

    pre_exit() {
        super.pre_exit();
        if (this.formChanged()) {
            this.saveFormData();
        }
    }

    setupEventHandlers() {
        this.form.setupEventHandlers();
    }

    teardownEventHandlers() {
        this.form.teardownEventHandlers();
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        if (process.env.NODE_ENV === "production") {
            // don't let student skip over question
            if (! this.form.isValid() ) {
                this.app.disable(this.app.nextBtn);
            }
        }
        this.setupEventHandlers();
    }

    defaultExitSceneActions() {
        super.defaultExitSceneActions();
        this.teardownEventHandlers();
    }
}
