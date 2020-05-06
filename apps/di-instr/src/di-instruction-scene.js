import { Scene } from "@isptutorproject/scene-transitions-base";

export class DiInstructionScene extends Scene {
    constructor(app, data) {
        super(app, data);
        this.handleTransitionButton = this.handleTransitionButton.bind(this);
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

    showBtns(btnNames) {
        for (let btnName of btnNames) {
            if (this.btnNames.hasOwnProperty(btnName)) {
                this.app.show(this.btnNames[btnName]);
            }
        }
    }

    hideBtns(btnNames) {
        for (let btnName of btnNames) {
            if (this.btnNames.hasOwnProperty(btnName)) {
                this.app.hide(this.btnNames[btnName]);
            }
        }
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

    handleTransitionButton(e) {
        e.preventDefault();
        let transitionName = e.target.dataset.transition;
        this.app.handleTransition(transitionName);
    }

    getTransitionElements() {
        return this.el.getElementsByClassName("transition-to");
    }
    setupTransitionEventHandlers() {
        for (let el of this.getTransitionElements()) {
            el.addEventListener("click", this.handleTransitionButton, { once: true });
        }
    }

    // teardownTransitionEventHandlers() {
    //     for (let el of this.getTransitionElements()) {
    //         el.removeEventListener("click", this.handleTransition);
    //     }
    // }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.setupTransitionEventHandlers();
        if (process.env.NODE_ENV === "production") {
            this.app.hide(this.app.prevBtn);
        } else {
            this.app.show(this.app.prevBtn);
        }
        this.app.show(this.app.nextBtn);
        this.app.hide(this.app.readyToAnswerBtn);
        this.app.hide(this.app.backToQuestionBtn);
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

    defaultExitSceneActions() {
        super.defaultExitSceneActions()
    }
};
