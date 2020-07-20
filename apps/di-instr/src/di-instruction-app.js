import { SceneBasedApp } from "@isptutorproject/scene-app-base";
import { DiInstructionScene } from "./di-instruction-scene";
import { DiStatsScene } from "./di-stats-scene";
import { DiMultipleChoiceFormScene } from "./di-mult-choice-form-scene";


export class DiInstructionApp extends SceneBasedApp {
    constructor(appData, activityConfig, defaultInitialState) {
        super(appData, activityConfig, defaultInitialState);
        // bind event handlers
        this.handleBackToQuestion = this.handleBackToQuestion.bind(this);
        this.handleReadyToAnswer = this.handleReadyToAnswer.bind(this);
        this.backToQuestionBtn = document.getElementById("back_to_question_btn");
        this.readyToAnswerBtn  = document.getElementById("ready_to_answer_btn");
        this.readyToAnswerBtn.addEventListener("click", this.handleReadyToAnswer);
        this.backToQuestionBtn.addEventListener("click", this.handleBackToQuestion);
    }

    handleReadyToAnswer(event) {
        event.preventDefault();
        this.followEdge("readyToAnswer");
    }

    handleBackToQuestion(event) {
        event.preventDefault();
        this.followEdge("backToQuestion");
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

}
