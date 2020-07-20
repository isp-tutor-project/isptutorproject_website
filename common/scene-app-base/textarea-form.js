export class TextareaForm {
    constructor(app, formInfo, eleId) {
        this.handleChange = this.handleChange.bind(this);
        this.app = app;
        this.formInfo = formInfo;
        this.form = document.getElementById(eleId);
        console.log(this.form);
        this.textarea = this.form.querySelector('.form-control');
        this.changed = false;
    }

    isValid() {
        const validity = this.form.checkValidity();
        // console.log("form is valid:", validity);
        return validity;
    }

    handleChange(e) {
        // set form to dirty state so it will get saved later on
        if (this.textarea.value.trim() != "") {
            this.changed = true;
            console.log(this.getData());
            if (this.isValid()) {
                this.app.enable(this.app.nextBtn);
            }
        }
    }

    setupEventHandlers() {
        // for (let rb of this.radios) {
        //     rb.addEventListener('change', this.handleChange);
        // }
        this.textarea.addEventListener("input", this.handleChange);
    }

    teardownEventHandlers() {
        // for (let rb of this.radios) {
        //     rb.removeEventListener('change', this.handleChange);
        // }
        this.textarea.removeEventListener("input", this.handleChange);
    }


    getCorrectness() {
        // let sfi = this.formInfo;
        // let selectedAnswer = this.form.querySelector(
        //     'input[type="radio"]:checked'
        // )
        // let val = selectedAnswer.value.trim();
        // // let ansText = selectedAnswer.labels[0].innerText;
        // let correctAnswer = sfi.correctAnswer;
        // let isCorrect;

        // if ("N/A" === correctAnswer) {
        //     isCorrect = null;
        // } else if (correctAnswer === val) {
        //     isCorrect = true;
        // } else {
        //     isCorrect = false;
        // }
        // return isCorrect;
        return null;
    }

    getFeedback() {
        // let isCorrect = this.getCorrectness();
        let sfi = this.formInfo;
        // // console.log(isCorrect, sfi);
        let fbText, fbClassName, fbMsg;
        // switch (isCorrect) {
        //     case true:
        //         fbText = sfi.posFb;
        //         fbClassName = "pos-feedback";
        //         break;
        //     case false:
        //         fbText = sfi.negFb;
        //         fbClassName = "neg-feedback";
        //         break;
        //     default:
        //         fbText = sfi.ntlFb;
        //         fbClassName = "ntl-feedback";
        // }
        // if (typeof (fbText) === "undefined") {
        if (typeof (sfi.ntlFb) !== "undefined") {
            fbText = sfi.ntlFb;
            fbClassName = "ntl-feedback";
        }
        // }
        if (typeof (fbText) !== "undefined") {
            fbMsg = `<span class="${fbClassName}">${fbText}</span>`;
        }
        return fbMsg;
    }

    getData() {
        let sfi = this.formInfo;
        let isCorrect = this.getCorrectness();
        // let selectedAnswer = this.form.querySelector(
        //     'input[type="radio"]:checked'
        // );
        // let val = selectedAnswer.value.trim();
        // let lbl = selectedAnswer.labels[0].innerText;
        let answer = this.textarea.value.trim();
        let formData = {
            questionType: sfi.type,
            questionText: sfi.text,
            // selectedEleId: selectedAnswer.id,
            // selectedValue: val,
            // selectedLabel: lbl,
            answer: answer,
            isCorrect: isCorrect,
            timestamp: Date.now()
        }
        // set form to non-dirty state, so we don't resubmit unless they
        // change again
        this.changed = false;
        return formData;
    }

    // getFormData() {

    // }

    // handleFormSubmit(e) {
    //     e.preventDefault();

    //     if (this.form.checkValidity()) {

    //         let fbText;
    //         let fbClassName;

    //         if ("n/a" === correctAnswer) {
    //             isCorrect = null;
    //             fbText = sfi.ntlFb;
    //             fbClassName = "ntl-feedback";
    //         } else if (correctAnswer === val) {
    //             isCorrect = true;
    //             fbText = sfi.posFb;
    //             fbClassName = "pos-feedback";
    //         } else {
    //             isCorrect = false;
    //             fbText = sfi.negFb;
    //             fbClassName = 'neg-feedback';
    //         }

    //         if (!fbText) {
    //             fbText = sfi.ntlFb;
    //             fbClassName = 'ntl-feedback';
    //         }

    //         this.app.showFeedback(fbMsg);
    //         // what we want to store in firestore
    // }
    //         console.log(log);

    //     } else {
    //         let fbMsg = `<span class="text-danger">Please select an option</span>`;
    //         this.app.showFeedback(fbMsg);
    //     }
    // }

}