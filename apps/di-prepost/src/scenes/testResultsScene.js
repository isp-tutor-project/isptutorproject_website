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
        this.currentTransitionStateSaver = null;
        this.currentState = null;

        this.saveQ1State = this.saveQ1State.bind(this);
        this.saveQ2State = this.saveQ2State.bind(this);
        this.saveQ3State = this.saveQ3State.bind(this);
        this.revealStatHandler = this.revealStatHandler.bind(this);
        this.handleSortData = this.handleSortData.bind(this);

        this.showSortedDataBtn = document.getElementById(`${this.id}_show_sorted_table`);
        this.sortedTableText    = document.getElementById(`${this.id}_sorted_text`);

        // this.sortedImg   = document.getElementById(`${this.id}_sorted`);
        // this.unsortedImg = document.getElementById(`${this.id}_unsorted`);

        this.q2TextArea = document.getElementById(`${this.id}_q2_answer`);
        this.currentForm = null;
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
        this.q2Text = document.getElementById(`${this.id}_q2_text`);
        this.q3Text = document.getElementById(`${this.id}_q3_text`);

        this.setupEventHandlers();
    }

    restoreState(sceneState) {
        super.restoreState(sceneState);
        if (sceneState) {
            console.log("TestResultsScene::restoreState()");
            this.currentState = sceneState;

            if (sceneState.currentTransition) {
                this.currentTransition = sceneState.currentTransition;
            }
            if (sceneState.q1Selection) {
                let el = document.getElementById(sceneState.q1Selection);
                el.checked = true;
                // something is very wrong if we don't have both q1Selection
                // and a1Answer stored
                this.q1Answer = sceneState.q1Answer;
                this.updateQ2AndQ3Text();
            }
            if (sceneState.q2Answer) {
                this.q2TextArea.value = sceneState.q2Answer;
            }
            if (sceneState.q3Selection) {
                let el = document.getElementById(sceneState.q3Selection);
                el.checked = true;
            }
            for (let side of ["left", "right"]) {
                for (let stat of ["mean", "median", "mode", "range"]) {
                    if (sceneState[`${side}_${stat}_shown`]) {
                        this.revealStat(side, stat);
            }
            }
            }

            if (sceneState.dataSorted) {
                this.showSortedData();
                this.replaceSortBtnWithText();
        }
    }
    }

    updateSceneState(diff) {
        if (null === this.currentState) {
            this.currentState = {};
        }
        this.currentState = Object.assign(this.currentState, diff);
        // console.log(this.currentState);
        this.app.state.sceneState[this.id] = Object.assign({}, this.currentState);
    }

    revealStat(side, stat) {
        let btnEl  = document.getElementById(`${this.id}_reveal_${side}_${stat}`);
        let statEl = document.getElementById(`${this.id}_${side}_${stat}`);
        this.app.hide(btnEl);
        this.app.show(statEl);
        }
    }

    showSortedTable() {
        this.app.hide(this.showSortedTableBtn);
        this.app.hide(this.unsortedImg);
        this.app.show(this.sortedImg);
        this.app.show(this.sortedTableText);
    }

    handleShowLeftMean(e) {
        this.showMean("left");
        this.updateSceneState({"leftMeanShown": true});
    }

    handleShowRightMean(e) {
        this.showMean("right");
        this.updateSceneState({"rightMeanShown": true});
    }

    handleShowSortedTable(e) {
        this.showSortedTable();
        this.updateSceneState({"sortedTableShown": true});
    }

    hideAllForms() {
        for (let f of this.forms) {
            this.app.hide(f.form);
        }
    }

    handlePrevButton() {
        if (this.currentForm.changed) {
            this.currentTransitionStateSaver(this.currentForm.getData());
        }
        if (FIRST_TRANSITION === this.currentTransition) {
            this.app.followEdge("prev");
        } else {
            this.currentTransition--;
            this.handleTransition();
        }
    }

    handleNextButton() {
        if (this.currentForm.changed) {
            this.currentTransitionStateSaver(this.currentForm.getData());
        }
        if (LAST_TRANSITION === this.currentTransition) {
            this.app.followEdge("next");
        } else {
            this.currentTransition++;
            this.handleTransition();
        }
    }

    hasForm() {
        return true;
    }

    setupEventHandlers() {
        for (let btn of this.el.querySelectorAll(".reveal-stat")) {
            btn.addEventListener("click", this.revealStatHandler, {once: true});
        }
        this.showSortedDataBtn.addEventListener(
            "click", this.handleSortData, { once: true }
        );
    }

    updateQ2AndQ3Text() {
        let phRepl = `<span class="q1-answer">${this.q1Answer}</span>`;
        this.questions.q2.text = this.questions.q2.text.replace(
            "PLACEHOLDER", phRepl
        );
        this.questions.q3.text = this.questions.q3.text.replace(
            "PLACEHOLDER", phRepl
        );
        this.q2Text.innerHTML = this.questions.q2.text;
        this.q3Text.innerHTML = this.questions.q3.text;
    }

    saveQ1State(data) {
        this.q1Answer = data.selectedValue;
        this.updateSceneState({
            "q1Selection": data.selectedEleId,
            "q1Answer": this.q1Answer,
        });
        this.updateQ2AndQ3Text();
        this.submitQuestion("q1", data);
    }

    saveQ2State(data) {
        this.updateSceneState({q2Answer: data.answer});
        data.questionText = data.questionText
            .replace('<span class="q1-answer">', '')
            .replace('</span>', '');
        this.submitQuestion("q2", data);
    }

    saveQ3State(data) {
        this.updateSceneState({q3Selection: data.selectedEleId});
        data.questionText = data.questionText
            .replace('<span class="q1-answer">', '')
            .replace('</span>', '');
        this.submitQuestion("q3", data);
    }


    submitQuestion(qNum, data) {
        let logData = Object.assign(
            {
                type: "SUBMIT_ANSWER",
                questionId: `${this.app.activityKey}.${this.id}.${qNum}`
            },
            data
        );
        console.log(logData);
        this.app.state.events.push(logData);
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
        this.app.show(this.currentForm.form);
        if (!this.currentForm.isValid()) {
            this.app.disable(this.app.nextBtn);
        } else {
            this.app.enable(this.app.nextBtn);
        }
        switch (this.currentTransition) {
            case 0:
                this.currentTransitionStateSaver = this.saveQ1State;
                break;
            case 1:
                this.currentTransitionStateSaver = this.saveQ2State;
                this.q2TextArea.focus();
                break;
            case 2:
                this.currentTransitionStateSaver = this.saveQ3State;
                break;
            default:
                console.error(`invalid transition: ${this.currentTransition}`);
        }
    }

    post_enter() {
        console.log("TestResultsScene.post_enter()");
        console.log(this.forms);
        this.handleTransition();
        if (null !== this.currentState) {
            this.restoreState(this.currentState);
        }
    }

    // teardownAllFormEventHandlers() {
    //     for (let f of this.forms) {
    //         f.teardownEventHandlers();
    //     }
    // }

}
