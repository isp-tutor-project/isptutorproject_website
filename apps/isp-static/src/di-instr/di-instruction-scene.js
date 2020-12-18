import { Scene } from "@isptutorproject/scene-app-base";

export class DiInstructionScene extends Scene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns,
            hiliteTableCells: this.hilightTableCells
        };
        this.btnNames = {
            prev: this.app.prevBtn,
            next: this.app.nextBtn,
            backToQuestion: this.app.backToQuestionBtn,
            readyToAnswer: this.app.readyToAnswerBtn
        };
    }

    hiliteTableCells(args) {
        let tableId = `${this.id}_${args.table}`;
        let table = document.getElementById(tableId);
        let color = args.color || "blue";
        for (let selector of args.cellSelectors) {
            let sel = `td${selector}`;
            let cell = table.querySelector(sel);
            cell.classList.add(`${color}-bg`);
        }
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
        this.app.show(this.app.prevBtn);
        this.app.enable(this.app.prevBtn);
        this.app.show(this.app.nextBtn);
        this.app.enable(this.app.nextBtn);
        this.app.hide(this.app.readyToAnswerBtn);
        this.app.hide(this.app.backToQuestionBtn);
    }

};
