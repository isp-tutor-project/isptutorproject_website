import { SceneTransitionsApp } from "@isptutorproject/scene-transitions-base";
import { DiInstructionScene } from "./di-instruction-scene";
import { DiStatsScene } from "./di-stats-scene";
import { DiMultipleChoiceFormScene } from "./di-mult-choice-form-scene";


const INITIAL_STATE = {
    transitions: [],
    answers: [],
    // mapping of sceneid => formValues
    sceneFormState: {},
    currentScene: "start"
};

export class DiInstructionApp extends SceneTransitionsApp {
    constructor(appData, db, activityKey, features) {
        super(appData, db, activityKey, features);
        this.backToQuestionBtn = document.getElementById("back_to_question_btn");
        this.readyToAnswerBtn = document.getElementById("ready_to_answer_btn");
        this.sceneIdRegion = document.getElementById("scene_id_region");
        this.nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("next");
        });
        this.prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("prev");
        });
        this.readyToAnswerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("readyToAnswer");
        });
        this.backToQuestionBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransition("backToQuestion");
        });
        window.app = this;
    }

    setSnackbar(snackbar) {
        this.snackbar = snackbar;
    }

    showFeedback(feedback) {
        this.snackbar.show(feedback);
    }

    createScene(sceneInfo) {
        let newScene;
        if ("stats" === sceneInfo.sceneType) {
            newScene = new DiStatsScene(this, sceneInfo);
        } else if ("multipleChoiceForm" === sceneInfo.sceneType) {
            newScene = new DiMultipleChoiceFormScene(this, sceneInfo);
        } else {
            newScene = new DiInstructionScene(this, sceneInfo);
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

};
