
import "./index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { SceneBasedApp, Scene } from "@isptutorproject/scene-app-base";
import { getActivityConfiguration } from "@isptutorproject/activity-config"

const activityData = require("../../dist/data/rqIntro.json");

const DEFAULT_APP_INITIAL_STATE = {
    events: [],
    sceneState: {},
    currentScene: "start"
};


class RQScene extends Scene {
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
        console.log(`RQScene::performCustomEnterSceneActions()`);
        for (let action of this.customEnterActions) {
            let name = action.name;
            let args = action.args;
            if (this.customActions.hasOwnProperty(name)) {
                this[name](args);
            }
        }
    }
}

class VideoScene extends RQScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.videoStartedPlaying = this.videoStartedPlaying.bind(this);
        this.videoStoppedPlaying = this.videoStoppedPlaying.bind(this);
        this.getDuration = this.getDuration.bind(this);
    }


    // remember time user started the video
    videoStartedPlaying(event) {
        console.log(event);
        this.timeStarted = new Date().getTime() / 1000;
        console.log(`Started Watching video @ ${this.timeStarted}`);
    }

    videoStoppedPlaying(event) {
        console.log(event);
        // Start time less then zero means stop event was fired vidout start event
        if (this.timeStarted > 0) {
            let playedFor = new Date().getTime() / 1000 - this.timeStarted;
            this.timeStarted = -1;
            // add the new number of seconds played
            this.timePlayed += playedFor;
        }
        // document.getElementById("played").innerHTML = Math.round(timePlayed) + "";
        console.log(`played for: ${Math.round(this.timePlayed)}`);
        // Count as complete only if end of video was reached
        if (this.timePlayed >= this.duration && event.type == "ended") {
            // document.getElementById("status").className = "complete";
            console.log("video ended");
            this.showBtns(["prev", "next"])
        }
    }

    getDuration(event) {
        console.log(event);
        this.duration = this.video.duration;
        // document.getElementById("duration").appendChild(new Text(Math.round(duration) + ""));
        console.log("Duration: ", this.duration);
    }

    performCustomEnterSceneActions() {
        // super.performCustomEnterSceneActions();
        console.log("VideoScene::performCustomEnterSceneActions");
        this.video = document.getElementById(this.videoId);
        console.log(this.video);
        this.timeStarted = -1;
        this.timePlayed = 0;
        this.duration = 0;
        if (this.video.readyState > 0) {
            // If video metadata is loaded get duration
            this.getDuration.call(this.video);
        } else {
            //If metadata not loaded, use event to get it
            this.video.addEventListener('loadedmetadata', this.getDuration);
        }
        this.video.addEventListener("play",    this.videoStartedPlaying);
        this.video.addEventListener("playing", this.videoStartedPlaying);
        this.video.addEventListener("ended",   this.videoStoppedPlaying);
        this.video.addEventListener("pause",   this.videoStoppedPlaying);
    }
}



class RQIntroApp extends SceneBasedApp {

    createScene(sceneInfo) {
        let scene;
        switch(sceneInfo.sceneType) {
            case "videoScene":
                scene = new VideoScene(this, sceneInfo);
                break;
            default:
                scene = new RQScene(this, sceneInfo);
                break;
        }
        return scene;
    }
}

let activityConfig = getActivityConfiguration();

let navbar = new NavBar();
navbar.displayActivityTitle("Crystal Growth Experiment Intro");
navbar.displayUser(activityConfig.userID);

let app = new RQIntroApp(
    activityData, activityConfig, DEFAULT_APP_INITIAL_STATE
);

if (process.env.NODE_ENV === "development") {
    app.setStartScene("start");
}
app.start();