
import "./index.css";

import { 
    SceneTransitionsApp, 
    Scene
} from "@isptutorproject/scene-transitions-base";

// const btnNamesToBtns = {
//     "prev": prevBtn,
//     "next": nextBtn
// };

// function isValidBtnName(btnName) {
//     return btnNamesToBtns.hasOwnProperty(btnName);
// }

// function getBtnByName(btnName) {
//     return btnNamesToBtns[btnName];
// }


// function getMeanElements(sceneId, side) {
//     let btn = document.getElementById(`${sceneId}_reveal_${side}_mean`);
//     let div = document.getElementById(`${sceneId}_${side}_mean`);
//     return [btn, div];
// }


// function getImageRelatedElements(sceneId) {
//     let btn = document.getElementById(`${sceneId}_show_sorted_table`);
//     let msg = document.getElementById(`${sceneId}_sorted_text`);
//     let sortedImg = document.getElementById(`${sceneId}_sorted`);
//     let unsortedImg = document.getElementById(`${sceneId}_unsorted`);
//     return [btn, msg, sortedImg, unsortedImg];
// }

// function getQuestionForms(sceneId) {
//     let q1Form =
//         let q2Form =
//             let q3Form = 
//         return [q1Form, q2Form, q3Form];
// }

// function getQuestionSubmitBtns(sceneId) {
// }


export class DiTestScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        if (process.env.NODE_ENV === "production") {
            this.app.hide(this.app.prevBtn);
        } else {
            this.app.show(this.app.prevBtn);
        }
        this.app.show(this.app.nextBtn);
    }

    
}

export class DiTestResultsScene extends DiTestScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.q1Answer = null;
        this.showLeftMean = this.showLeftMean.bind(this);
        this.showRightMean = this.showRightMean.bind(this);
        this.showSortedTable = this.showSortedTable.bind(this);
        this.handleQ1Submit = this.handleQ1Submit.bind(this);
        this.handleQ2Submit = this.handleQ2Submit.bind(this);
        this.handleQ3Submit = this.handleQ3Submit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.setupElementReferences();
        this.setupEventHandlers();
    }

    setupElementReferences() {
        let side = "left"
        this.leftMeanBtn = document.getElementById(`${this.id}_reveal_${side}_mean`);
        this.leftMeanValue = document.getElementById(`${this.id}_${side}_mean`);
        side = "right";
        this.rightMeanBtn   = document.getElementById(`${this.id}_reveal_${side}_mean`);
        this.rightMeanValue = document.getElementById(`${this.id}_${side}_mean`);        
        this.showSortedTableBtn = document.getElementById(`${this.id}_show_sorted_table`);
        this.sortedTableText = document.getElementById(`${this.id}_sorted_text`);
        this.sortedImg = document.getElementById(`${this.id}_sorted`);
        this.unsortedImg = document.getElementById(`${this.id}_unsorted`);
        this.notifyRegion = document.getElementById(`${this.id}_notification_region`);
        this.q1Form = document.getElementById(`${this.id}_q1_form`);
        this.q2Form = document.getElementById(`${this.id}_q2_form`);
        this.q3Form = document.getElementById(`${this.id}_q3_form`);
        this.q2Text = document.getElementById(`${this.id}_q2_text`);
        this.q3Text = document.getElementById(`${this.id}_q3_text`);
        this.q2TextArea = this.q2Form.querySelector(".form-control");
        this.q1SubmitBtn = document.getElementById(`${this.id}_q1_submit`);
        this.q2SubmitBtn = document.getElementById(`${this.id}_q2_submit`);
        this.q3SubmitBtn = document.getElementById(`${this.id}_q3_submit`);
    }

    setupEventHandlers() {
        this.leftMeanBtn.addEventListener("click", this.showLeftMean);
        this.rightMeanBtn.addEventListener("click", this.showRightMean);
        this.showSortedTableBtn.addEventListener("click", this.showSortedTable);

        for (let form of [this.q1Form, this.q3Form]) {
            for (let el of form.querySelectorAll(".form-control")) {
                el.addEventListener("change", this.handleFormChange);
            }
        }
        // textareas don't support "onchange" event
        this.q2TextArea.addEventListener("input", this.handleFormChange);
        this.q1SubmitBtn.addEventListener("click", this.handleQ1Submit);
        this.q2SubmitBtn.addEventListener("click", this.handleQ2Submit);
        this.q3SubmitBtn.addEventListener("click", this.handleQ3Submit);
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

    handleQ1Submit(e) {
        e.preventDefault();
        if (this.q1Form.checkValidity()) {
            let selected = this.q1Form.querySelector('input[type="radio"]:checked');
            this.q1Answer = selected.value; 
            this.app.logStudentAnswer("q1", this.q1Answer);
            this.questions.q2.text = this.questions.q2.text.replace("PLACEHOLDER",
                                                                    this.q1Answer);
            this.questions.q3.text = this.questions.q3.text.replace("PLACEHOLDER",
                this.q1Answer);
            this.q2Text.innerHTML = this.questions.q2.text;
            this.q3Text.innerHTML = this.questions.q3.text;
            this.app.hide(this.q1Form);
            this.app.show(this.q2Form);
            this.q2TextArea.focus();
        } else {
            this.showNotificationRegion();
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
            this.showNotificationRegion();
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
            if (process.env.NODE_ENV !== "production") {
                this.app.enable(this.app.prevBtn);
            }
        } else {
            this.showNotificationRegion();
        }
    }


    hideNotificationRegion() {
        this.app.makeInvisible(this.notifyRegion);
    }

    showNotificationRegion() {
        this.app.makeVisible(this.notifyRegion);
    }

    handleFormChange(e) {
        // let btn = e.target;
        // console.log(`|${btn.id}|`);
        // let sceneId = btn.id.split('_')[0];
        this.hideNotificationRegion();
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.hide(this.leftMeanValue);
        this.app.hide(this.rightMeanValue);
        this.app.hide(this.sortedTableText);
        this.app.show(this.leftMeanBtn);
        this.app.show(this.rightMeanBtn);
        this.app.show(this.showSortedTableBtn);
        this.app.disable(this.app.prevBtn);
        this.app.disable(this.app.nextBtn);
        this.app.hide(this.q2Form);
        this.app.hide(this.q3Form);
        this.app.show(this.q1Form);
    }

}


export class DiTestApp extends SceneTransitionsApp{
    constructor(testData, testName = "") {
        super(testData);        
        this.testName = testName;
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
        window.app = this;
    }

    createScene(sceneInfo) {
        let newScene;
        // console.log(sceneInfo);
        if (["bogus", "standard"].includes(sceneInfo.sceneType)) {
            newScene = new DiTestScene(this, sceneInfo);
        } else if ("resultsScene" === sceneInfo.sceneType) {
            newScene = new DiTestResultsScene(this, sceneInfo);
        } else {
            console.error(`${sceneInfo.id}: Unknown sceneType: ${sceneInfo.sceneType}`);
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