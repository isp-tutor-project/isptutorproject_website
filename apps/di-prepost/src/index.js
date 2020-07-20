
import "./index.scss";

import { SceneBasedApp } from "@isptutorproject/scene-app-base";
import { DiTestScene, DiTestResultsScene } from "./scenes";

export class DiTestApp extends SceneBasedApp{
    // constructor(appData, activityConfig, defaultInitialState) {
    //     super(appData, activityConfig, defaultInitialState);
    // }

    createScene(sceneInfo) {
        let scene;
        switch(sceneInfo.sceneType) {
            case "carResults":
            case "libraryResults":
            case "memoryResults":
            case "rocketsResults":
                scene = new DiTestResultsScene(this, sceneInfo);
                break;
            default:
                scene = new DiTestScene(this, sceneInfo);

        }
        return scene;
    }

    // logStudentAnswer(questionName, answer) {
    //     let question = this.currentScene.questions[questionName];
    //     let isCorrect = "N/A";
    //     if (question.hasOwnProperty("correctAnswer")) {
    //         isCorrect = (answer === question.correctAnswer)
    //     }
    //     let qid = `${this.currentScene.id}.${questionName}`;
    //     if ("" !== this.testName) {
    //         qid = `${this.testName}.${qid}`;
    //     }
    //     let data = {
    //         action: "SUBMIT_ANSWER",
    //         questionId: qid,
    //         questionText: question.text,
    //         answer: answer,
    //         isCorrect: isCorrect,
    //         timestamp: new Date().toLocaleString()
    //     }
    //     console.log(data);
    // }

}