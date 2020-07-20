import { DiTestScene } from "./testScene";

import { RadioButtonForm } from "@isptutorproject/scene-app-base/radio-button-form";
import { TextareaForm } from "@isptutorproject/scene-app-base/textarea-form";

const FIRST_TRANSITION = 0;
const LAST_TRANSITION = 2;

export class DiTestResultsScene extends DiTestScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.q1Answer = null;
        // default to the first transition
        this.currentTransition = FIRST_TRANSITION;
        this.currentQuestion = null;
        this.q1 = this.q1.bind(this);
        this.q2 = this.q2.bind(this);
        this.q3 = this.q3.bind(this);

        this.showLeftMean = this.showLeftMean.bind(this);
        this.showRightMean = this.showRightMean.bind(this);
        this.showSortedTable = this.showSortedTable.bind(this);

        let side = "left"
        this.leftMeanBtn   = document.getElementById(`${this.id}_reveal_${side}_mean`);
        this.leftMeanValue = document.getElementById(`${this.id}_${side}_mean`);
        side = "right";
        this.rightMeanBtn   = document.getElementById(`${this.id}_reveal_${side}_mean`);
        this.rightMeanValue = document.getElementById(`${this.id}_${side}_mean`);
        this.showSortedTableBtn = document.getElementById(`${this.id}_show_sorted_table`);
        this.sortedTableText    = document.getElementById(`${this.id}_sorted_text`);
        this.sortedImg   = document.getElementById(`${this.id}_sorted`);
        this.unsortedImg = document.getElementById(`${this.id}_unsorted`);
        this.q2TextArea = document.getElementById(`${this.id}_q2_answer`);
        this.currentForm = null;
        this.transitions = [
            this.q1, this.q2, this.q3
        ];
        this.q1Form = new RadioButtonForm(
            this.app, sceneInfo.questions.q1, `${this.id}_q1_form`
        );
        this.q2Form = new TextareaForm(
            this.app, sceneInfo.questions.q2, `${this.id}_q2_form`
        );
        this.q3Form = new RadioButtonForm(
            this.app, sceneInfo.questions.q3, `${this.id}_q3_form`
        );
        this.forms = [
            this.q1Form,
            this.q2Form,
            this.q3Form
        ];
        // this.q2TextArea = this.q2Form.querySelector(".form-control");
        this.q2Text = document.getElementById(`${this.id}_q2_text`);
        this.q3Text = document.getElementById(`${this.id}_q3_text`);

        // this.handleQ1Submit = this.handleQ1Submit.bind(this);
        // this.handleQ2Submit = this.handleQ2Submit.bind(this);
        // this.handleQ3Submit = this.handleQ3Submit.bind(this);
        // this.handleFormChange = this.handleFormChange.bind(this);
        // this.setupElementReferences();
        this.setupEventHandlers();
    }

    showLeftMean(e) {
        this.app.hide(this.leftMeanBtn);
        this.app.show(this.leftMeanValue);
    }

    showRightMean(e) {
        this.app.hide(this.rightMeanBtn);
        this.app.show(this.rightMeanValue);
    }

    showSortedTable(e) {
        this.app.hide(this.showSortedTableBtn);
        this.app.hide(this.unsortedImg);
        this.app.show(this.sortedImg);
        this.app.show(this.sortedTableText);
    }

    hideAllForms() {
        for (let f of this.forms) {
            this.app.hide(f.form);
        }
    }

    q1() {
        console.log("showing q1");
        // this.currentForm = this.q1Form;
        // this.q1Form.setupEventHandlers();
        // this.app.show(this.currentForm.form);
        // if (! this.currentForm.isValid()) {
        //     this.app.disable(this.app.nextBtn);
        // }
    }

    q2() {
        console.log("showing q2");
        // this.currentForm = this.q2Form;
        // this.currentForm.setupEventHandlers();
        // this.q3Form.teardownEventHandlers();
        // this.app.show(this.currentForm.form)
        this.q2TextArea.focus();
        // if (!this.currentForm.isValid()) {
        //     this.app.disable(this.app.nextBtn);
        // }
    }

    q3() {
        console.log("showing q3");
        // this.currentForm = this.q3Form;
        // this.currentForm.setupEventHandlers();
        // this.q3Form.teardownEventHandlers();
        // this.app.show(this.currentForm.form)
        // if (!this.currentForm.isValid()) {
        //     this.app.disable(this.app.nextBtn);
        // }
    }

    handlePrevButton() {
        console.log("TestResultsScene::handlePrevButton()");
        if (this.currentForm.changed) {
            let data = this.currentForm.getData();
            console.log(data);
        }
        if (FIRST_TRANSITION === this.currentTransition) {
            console.log("at first transition. go to prev scene");
            this.app.followEdge("prev");
        } else {
            this.currentTransition--;
            this.handleTransition();
        }
    }

    handleNextButton() {
        console.log("TestResultsScene::handleNextButton()");
        if (this.currentForm.changed) {
            let data = this.currentForm.getData();
            let logData = Object.assign(
                {
                    action_type: "SUBMIT_ANSWER",
                    questionId: `${this.app.activityKey}.${this.id}.${this.currentQuestion}`
                },
                data
            );
            if ("q1" === this.currentQuestion) {
                this.q1Answer = selected.value;
                let phRepl = `<span class="q1_answer">${this.q1Answer}</span>`;
                this.questions.q2.text = this.questions.q2.text.replace("PLACEHOLDER",
                    phRepl);
                this.questions.q3.text = this.questions.q3.text.replace("PLACEHOLDER",
                    phRepl);
                this.q2Text.innerHTML = this.questions.q2.text;
                this.q3Text.innerHTML = this.questions.q3.text;
            }
            console.log(logData);

        }
        if (LAST_TRANSITION === this.currentTransition) {
            console.log("at last transition. go to next scene");
            this.app.followEdge("next");
        } else {
            this.currentTransition++;
            this.handleTransition();
        }

    }

    restoreState(sceneState) {
        super.restoreState(sceneState);
        if (sceneState) {
            console.log("TestResultsScene::restoreState()");
            if (sceneState.currentTransition) {
                this.currentTransition = sceneState.currentTransition;
            }
            if (sceneState.selectedRadios) {
                for (let eleID of sceneState.selectedRadios) {
                    let el = document.getElementById(eleID);
                    el.checked = true;
                }
            }
            if (sceneState.q2Answer) {

            }
        }
    }

    hasForm() {
        return true;
    }

    setupEventHandlers() {
        this.leftMeanBtn.addEventListener(
            "click", this.showLeftMean, {once: true}
        );
        this.rightMeanBtn.addEventListener(
            "click", this.showRightMean, { once: true }
        );
        this.showSortedTableBtn.addEventListener(
            "click", this.showSortedTable, { once: true }
        );
        // this.q1SubmitBtn.addEventListener("click", this.handleQ1Submit);
        // this.q2SubmitBtn.addEventListener("click", this.handleQ2Submit);
        // this.q3SubmitBtn.addEventListener("click", this.handleQ3Submit);
    }

    handleQ1Submit(e) {
        e.preventDefault();
        if (this.q1Form.checkValidity()) {
            let selected = this.q1Form.querySelector('input[type="radio"]:checked');
            this.q1Answer = selected.value;
            this.app.logStudentAnswer("q1", this.q1Answer);
            let phRepl = `<span class="q1_answer">${this.q1Answer}</span>`;
            this.questions.q2.text = this.questions.q2.text.replace("PLACEHOLDER",
                phRepl);
            this.questions.q3.text = this.questions.q3.text.replace("PLACEHOLDER",
                phRepl);
            this.q2Text.innerHTML = this.questions.q2.text;
            this.q3Text.innerHTML = this.questions.q3.text;
            this.app.hide(this.q1Form);
            this.app.show(this.q2Form);
            this.q2TextArea.focus();
        } else {
            this.app.snackbar.show("Please answer the question");
        }
    }

    handleQ2Submit(e) {
        e.preventDefault();
        // unfornately, textareas don't support pattern and nothing but
        // whitespace is considered valid
        if (this.q2Form.checkValidity() && this.q2TextArea.value.trim() !== "") {

            let answer = this.q2TextArea.value.trim();
            this.app.logStudentAnswer("q2", answer);
            this.app.hide(this.q2Form);
            this.app.show(this.q3Form);
        } else {
            this.app.snackbar.show("Please answer the question");
        }
    }

    handleQ3Submit(e) {
        e.preventDefault();
        let form = this.q3Form;
        if (form.checkValidity()) {
            let selected = form.querySelector('input[type="radio"]:checked');
            let answer = selected.value;
            this.app.logStudentAnswer("q3", answer);
            this.app.enable(this.app.nextBtn);
            // disable the submit button and radios, which all have the same
            // name but different IDs
            let name = selected.name;
            for (let radio of form.querySelectorAll(`input[name="${name}"]`)) {
                // using disabled css class doesn't seem to work, using
                // property instead
                radio.disabled = true;
            }
            this.app.disable(this.q3SubmitBtn);
            // I think this is unnecessary, as it should already be enabled
            // if (process.env.NODE_ENV !== "production") {
            //     this.app.enable(this.app.prevBtn);
            // }
        } else {
            this.app.snackbar.show("Please answer the question");
        }
    }


    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.hide(this.leftMeanValue);
        this.app.hide(this.rightMeanValue);
        this.app.hide(this.sortedTableText);
        this.app.show(this.leftMeanBtn);
        this.app.show(this.rightMeanBtn);
        this.app.show(this.showSortedTableBtn);


        // if (process.env.NODE_ENV === "production") {
        //     this.app.disable(this.app.nextBtn);
        // } else {
        this.app.show(this.app.prevBtn);
        this.app.show(this.app.nextBtn);
        this.app.enable(this.app.prevBtn);
        this.app.enable(this.app.nextBtn);
        // }
        this.q1Form.setupEventHandlers();
        this.q2Form.setupEventHandlers();
        this.q3Form.setupEventHandlers();
    }

    handleTransition() {
        console.log("TestResultsScene.handleTransition()");
        console.log(this.currentTransition);
        this.hideAllForms();
        this.currentForm = this.forms[this.currentTransition];
        this.currentQuestion = `q${this.currentTransition}`;
        this.app.show(this.currentForm.form);
        if (!this.currentForm.isValid()) {
            this.app.disable(this.app.nextBtn);
        } else {
            this.app.enable(this.app.nextBtn);
        }
        // this.teardownAllFormEventHandlers();
        this.transitions[this.currentTransition]();
        // for (let f of this.forms) {
        //     this.app.hide(f.form);
        //     f.teardownEventHandlers();
        // }
        // // let currFormEL = this.forms[this.currentTransition];
        // let currForm = this.forms[this.currentTransition];
        // currForm.setupEventHandlers();
        // this.app.show(currForm.form);
        // if (! currForm.isValid()) {
        //     this.app.disable(this.app.nextBtn);
        // }
    }

    post_enter() {
        console.log("TestResultsScene.post_enter()");
        console.log(this.forms);
        this.handleTransition();
    }

    // teardownAllFormEventHandlers() {
    //     for (let f of this.forms) {
    //         f.teardownEventHandlers();
    //     }
    // }

}
