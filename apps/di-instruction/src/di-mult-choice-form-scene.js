import { DiInstructionScene } from "./di-instruction-scene";

export class DiMultipleChoiceFormScene extends DiInstructionScene {
    constructor(app, data) {
        super(app, data);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.formInfo = data.question;
        this.form = document.getElementById(`${this.id}_radio_form`);
        this.fbRegion = document.getElementById(
            `${this.id}_feedback_region`
        );
        this.radios = this.form.querySelectorAll('input[type="radio"]');
        this.submitBtn = document.getElementById(`${this.id}_submit_btn`);
    }

    hideFeedbackRegion() {
        this.app.makeInvisible(this.fbRegion);
    }

    showFeedbackRegion() {
        this.app.makeVisible(this.fbRegion);
    }

    handleFormChange(e) {
        this.hideFeedbackRegion();
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (this.form.checkValidity()) {
            let sfi = this.formInfo;
            let selectedAnswer = this.form.querySelector(
                'input[type="radio"]:checked'
            )
            let val = selectedAnswer.value.trim();
            let ansText = selectedAnswer.labels[0].innerText;
            let correctAnswer = sfi.correctAnswer;
            let isCorrect;
            let fbText;
            let fbClassName;
            if ("n/a" === correctAnswer) {
                isCorrect = null;
                fbText = sfi.ntlFb;
                fbClassName = "ntl-feedback";
            } else if (correctAnswer === val) {
                isCorrect = true;
                fbText = sfi.posFb;
                fbClassName = "pos-feedback";
            } else {
                isCorrect = false;
                fbText = sfi.negFb;
                fbClassName = 'neg-feedback';
            }
            if (!fbText) {
                fbText = sfi.ntlFb;
                fbClassName = 'ntl-feedback';
            }
            if (this.fbRegion && fbText) {
                this.fbRegion.innerHTML = `<span class="${fbClassName}">
                    ${fbText}
                </span>`;
                this.showFeedbackRegion();
            }
            // what we want to store in firestore
            let log = {
                id: `${this.id}.question`,
                questionType: sfi.type,
                question: sfi.questionText,
                selected: ansText,
                isCorrect: isCorrect,
                timestamp: new Date().toLocaleString()
            }
            console.log(log);

            for (let radio of this.radios) {
                this.app.disable(radio);
                this.app.disable(radio.labels[0]);
            }
            this.app.disable(this.submitBtn);
            this.app.enable(this.app.nextBtn);
            this.app.enable(this.app.prevBtn);
        } else if (this.fbRegion) {
            this.fbRegion.innerHTML =
                `<span class="text-danger">Please select an option</span>`;
            this.showFeedbackRegion();
        }
    }

    setupEventHandlers() {
        for (let rb of this.radios) {
            rb.addEventListener('change', this.handleFormChange)
        }
        this.submitBtn.addEventListener("click", this.handleFormSubmit);
    }

    defaultEnterSceneActions() {
        super.defaultEnterSceneActions();
        this.app.disable(this.app.prevBtn);
        this.app.disable(this.app.nextBtn);
        this.setupEventHandlers();
    }

    defaultExitSceneActions() {
        super.defaultExitSceneActions();
        // these are strictly for development when the user can return to
        // this page via the prev btn
        this.app.enable(this.submitBtn);
        for (let rb of this.radios) {
            this.app.enable(rb);
        }
    }
}
