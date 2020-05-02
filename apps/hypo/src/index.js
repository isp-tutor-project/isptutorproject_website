
import { Scene, SceneTransitionsApp } from "@isptutorproject/scene-transitions-base";

import "./css/index.css";

let appData = require("@isptutorproject/isp-data/dist/hypoDefs.json");

// function raiseYourHand() {
//     stage.removeAllChildren();

//     let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
//         x: 50, y: 50
//     });

//     let text1 = new createjs.Text(
//         "In your notebook for this experiment", "22px Arial", "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 100, textAlign: "center"
//     });

//     let text2 = new createjs.Text(
//         "Make sure you have written your research question ...",
//         "22px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 175, textAlign: "center"
//     });

//     let text3 = new createjs.Text(getRQ(), "bold 22px Arial", "#000").set({
//         x: CANVAS_WIDTH / 2, y: 250,
//         textAlign: "center", lineHeight: 35, lineWidth: 700
//     });

//     let text4 = new createjs.Text(
//         "on the cover page of your notebook ", "22px Arial", "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 350, textAlign: "center"
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(image1, text1, text2, text3, text4, backButton, nextButton);
//     stage.update();
// }


// function startPage() {
//     stage.removeAllChildren();
//     let text = new createjs.Text(
//         "Welcome to the ISP Tutor's Hypothesis module." +
//         "\n\n" +
//         "Before you start working on your hypothesis for your research " +
//         "question, we will first define some important terms.",
//         "28px Arial ",
//         "#000"
//     ).set({
//         x: (CANVAS_WIDTH / 2) + 20, y: 80,
//         textAlign: "center", lineWidth: 700, lineHeight: 35
//     });

//     let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
//         x: 40, y: 80
//     });

//     let nextButton = createLargeButton(CANVAS_WIDTH / 2, 350, "Next", "#3769C2");
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(text, image1, nextButton);
//     stage.update();
// }

// function definitionPage1() {
//     stage.removeAllChildren();
//     let text = new createjs.DOMElement("start_page_overlay").set({
//         x: 20 * 2 / PIXEL_RATIO, y: 10 * 2 / PIXEL_RATIO,
//         scaleX: 0.6 * 2 / PIXEL_RATIO, scaleY: 0.6 * 2 / PIXEL_RATIO
//     });
//     text.htmlElement.style.display = "block";

//     let backButton = createBackButton();
//     backButton.on("click", e => {
//         text.htmlElement.style.display = "none";
//         prevHypoTask();
//     });

//     let nextButton = createNextButton();
//     nextButton.on("click", e => {
//         text.htmlElement.style.display = "none";
//         nextHypoTask();
//     });

//     stage.addChild(text, backButton, nextButton);
//     stage.update();
// }

// function definitionPage2() {
//     stage.removeAllChildren();

//     let text = new createjs.Text(
//         "Many middle school students have difficulty developing a good " +
//         "hypothesis for their prediction.\n\nFor example, most middle school " +
//         "students have difficulty explaining how hot/room temperature water " +
//         "would lead to more crystal growth.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: 80, y: 50, lineHeight: 35, lineWidth: CANVAS_WIDTH - 160
//     });

//     let image = new createjs.Bitmap(queue.getResult("ivToDvWithArrow")).set({
//         x: 215, y: 485, scaleX: 0.55, scaleY: 0.55
//     });

//     let text2 = new createjs.Text("???", "bold 24px Arial", "#000").set({
//         x: (CANVAS_WIDTH / 2) - 40, y: image.y - 20
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(text, image, text2, backButton, nextButton);
//     stage.update();
// }

// function definitionPage3() {
//     stage.removeAllChildren();

//     let text1 = new createjs.Text(
//         "To help you make a hypothesis for your prediction, we will ask you " +
//         "to make a concept map (an example is shown below). The final " +
//         "concept map should show step-by-step how the independent variable " +
//         "(water temperature) affects the dependent variable (amount of " +
//         "crystal growth).",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: 60, y: 40, lineHeight: 35, lineWidth: CANVAS_WIDTH - 120
//     });

//     let text2 = new createjs.Text(
//         "You will do this by linking concepts that are closely or directly " +
//         "related. For example, as shown below, Water temperature is closely " +
//         "related to 'Concept 1'. 'Concept 1' is closely related to 'Concept 2', " +
//         "and 'Concept 2' is directly related to 'Weight of crystal'.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: 100, y: 175, lineHeight: 35, lineWidth: CANVAS_WIDTH - 170
//     });

//     let image = new createjs.Bitmap(queue.getResult("defPagesCptMap")).set({
//         x: 200, y: 350
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(text1, text2, image, backButton, nextButton);
//     stage.update();
// }

// function definitionPage4() {
//     stage.removeAllChildren();

//     let text = new createjs.Text(
//         "For each connected pair of concepts (e.g. water temperature and " +
//         "Concept 1), you will be asked to indicate how the concepts are related.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: 60, y: 60, lineHeight: 35, lineWidth: CANVAS_WIDTH - 120
//     });

//     let image = new createjs.Bitmap(queue.getResult("defPagesCptMap")).set({
//         x: 200, y: 350
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(text, image, backButton, nextButton);
//     stage.update();
// }

// function definitionPage5() {
//     stage.removeAllChildren();
//     let image1 = new createjs.Bitmap(queue.getResult("defGraph")).set({
//         x: 60, y: 300, scaleX: 0.5, scaleY: 0.5
//     });
//     let image2 = new createjs.Bitmap(queue.getResult("causeGraph")).set({
//         x: 450, y: 500, scaleX: 0.5, scaleY: 0.5
//     });
//     let image3 = new createjs.Bitmap(queue.getResult("corrGraph")).set({
//         x: 800, y: 300, scaleX: 0.5, scaleY: 0.5
//     });

//     let title = new createjs.Text(
//         "Types of Relationships",
//         "bold 24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 100, textAlign: "center"
//     });

//     let text1 = new createjs.Text(
//         "When you make your hypothesis, you will need to choose the type of " +
//         "relationship between pairs of concepts. Here are the three types " +
//         "of relationships you can choose from when you make your hypothesis:",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 160,
//         textAlign: "center", lineWidth: 1000, lineHeight: 30
//     });

//     let text2 = new createjs.Text(
//         '(1) Definition\n\n(2) Cause\n\n(3) Correlation',
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 280, textAlign: "center", lineHeight: 30
//     });

//     let text3 = new createjs.Text('', 'italic 14px Arial', "#000").set({
//         x: CANVAS_WIDTH / 2, y: 370, textAlign: "center"
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     let images = [image1, image2, image3];
//     let iteration = 0;
//     nextButton.on("click", e => {
//         if (iteration == 3) {
//             nextHypoTask();
//         } else {
//             console.log(images[iteration]);
//             stage.addChild(images[iteration]);
//             stage.update();
//             iteration++;
//         }
//     });

//     stage.addChild(title, text1, text2, text3, backButton, nextButton);
//     stage.update();
// }

// function definitionPage6() {
//     stage.removeAllChildren();
//     let title = new createjs.Text(
//         "Types of Relationships for Hypotheses",
//         "bold 24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 80, textAlign: "center"
//     });

//     let text1 = new createjs.Text(
//         "(1) Definition: The meaning of a concept",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 130, textAlign: "center"
//     });

//     let text2 = new createjs.Text(
//         "Often, an “everyday” term is defined by the behaviors of " +
//         "molecules...\n\nFor example, the concept of the “temperature” of " +
//         "an object is defined as the average kinetic energy of the " +
//         "molecules that make up the object.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 150, y: 230, lineHeight: 25, lineWidth: 300
//     });

//     let text3 = new createjs.Text(
//         "Or, “Density” is the amount of mass of an object divided by its " +
//         "volume (or how much space it takes up).",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 150, y: 500, lineHeight: 25, lineWidth: 300,
//     });

//     let image1 = new createjs.DOMElement("temperature_gif_overlay");
//     image1.x = 115 * 2 / PIXEL_RATIO;
//     image1.y = 45 * 2 / PIXEL_RATIO;
//     image1.scaleX = .15 * 2 / PIXEL_RATIO;
//     image1.scaleY = .15 * 2 / PIXEL_RATIO;

//     let image2 = new createjs.Bitmap(queue.getResult("densitygraphic")).set({
//         x: 600, y: 440, scaleX: 0.5, scaleY: 0.5
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => {
//         image1.htmlElement.style.display = "none";
//         prevHypoTask();
//     });

//     let nextButton = createNextButton();
//     let iteration = 0;
//     nextButton.on("click", e => {
//         if (iteration == 0) {
//             stage.addChild(text2, image1);
//             image1.htmlElement.style.display = "block";
//             stage.update();
//         } else if (iteration == 1) {
//             stage.addChild(text3, image2);
//             stage.update();
//         } else if (iteration == 2) {
//             image1.htmlElement.style.display = "none";
//             nextHypoTask();
//         }
//         iteration++;
//     });

//     stage.addChild(title, text1, backButton, nextButton);
//     stage.update();
// }

// function definitionPage7() {
//     stage.removeAllChildren();
//     let text1 = new createjs.Text(
//         "(2) Causes: One variable influences another variable or something " +
//         "directly affects something else.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 80, textAlign: "center", lineWidth: 1000
//     });

//     let text2 = new createjs.Text(
//         "For example, being distracted while driving causes driving mistakes " +
//         "(because people’s attention is shifted away from what is happening " +
//         "on the road).",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 150, y: 180, lineHeight: 25, lineWidth: 450
//     });

//     let text3 = new createjs.Text(
//         "Or, the amount of caffeine someone drinks causes different amounts " +
//         "of alertness (because caffeine increases brain activity).",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 650, y: 180, lineHeight: 25, lineWidth: 450
//     });

//     let image1 = new createjs.Bitmap(queue.getResult("comic")).set({
//         x: 150, y: 300, scaleX: 0.8, scaleY: 0.7,
//     });

//     let image2 = new createjs.Bitmap(queue.getResult("coffeegraphic")).set({
//         x: 650, y: 300, scaleX: 0.7, scaleY: 0.7
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     let iteration = 0;
//     nextButton.on("click", e => {
//         if (iteration == 0) {
//             stage.addChild(text2, image1);
//             stage.update();
//         } else if (iteration == 1) {
//             stage.addChild(text3, image2);
//             stage.update();
//         } else if (iteration == 2) {
//             nextHypoTask();
//         }
//         iteration++;
//     });

//     stage.addChild(text1, backButton, nextButton);
//     stage.update();
// }

// function definitionPage8() {
//     stage.removeAllChildren();
//     let text1 = new createjs.Text(
//         "(3) Correlation: A relationship between two variables where both " +
//         "variables increase together, decrease together, or one increases " +
//         "as the other decreases. However, these variables may not directly " +
//         "affect each other.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 80,
//         textAlign: "center", lineWidth: 1000, lineHeight: 30
//     });

//     let text2 = new createjs.Text(
//         "For example, let’s say you found that there is a relationship between " +
//         "how often students eat pizza and their grades in school. You don’t " +
//         "know why there would be, so you can call that relationship a " +
//         "“correlation” in your hypothesis.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 130, y: 200, lineHeight: 25, lineWidth: 460
//     });

//     let text3 = new createjs.Text(
//         "There is a correlation between the amount of ice cream people buy " +
//         "and how often people go swimming. But there’s no logical reason to " +
//         "think one caused the other!",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 630, y: 200, lineHeight: 25, lineWidth: 460
//     });

//     let image1 = new createjs.Bitmap(queue.getResult("correlation")).set({
//         x: 170, y: 320, scaleX: 0.4, scaleY: 0.4,
//     });

//     let image2 = new createjs.Bitmap(queue.getResult("IceCreamSwimming")).set({
//         x: 680, y: 320, scaleX: 0.5, scaleY: 0.5
//     });

//     let graph1 = new createjs.Bitmap(queue.getResult("graph1")).set({
//         x: 220, y: 450, scaleX: 0.4, scaleY: 0.4
//     });

//     let graph2 = new createjs.Bitmap(queue.getResult("graph2")).set({
//         x: 710, y: 450, scaleX: 0.4, scaleY: 0.4
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     let iteration = 0;
//     nextButton.on("click", e => {
//         if (iteration == 0) {
//             stage.addChild(text2, image1, graph1);
//             stage.update();
//         } else if (iteration == 1) {
//             stage.addChild(text3, image2, graph2);
//             stage.update();
//         } else if (iteration == 2) {
//             nextHypoTask();
//         }
//         iteration++;
//     });

//     stage.addChild(text1, backButton, nextButton);
//     stage.update();
// }

// function definitionPage9() {
//     stage.removeAllChildren();
//     let text1 = new createjs.Text(
//         "Just because two things are correlated does not mean that one caused " +
//         "the other. There may be other reasons for two variables to change " +
//         "together. For example, both variables may be caused by a third variable.",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 80,
//         textAlign: "center", lineWidth: 1000, lineHeight: 30
//     });

//     let text2 = new createjs.Text(
//         "For example, the relationship between how often students eat pizza " +
//         "and grades could be because both eating pizza and grades are caused " +
//         "by a third variable: how often they study.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 110, y: 230, lineHeight: 25, lineWidth: 460,
//     });

//     let text3 = new createjs.Text(
//         "Or, the relationship between ice cream sales and how often people go " +
//         "swimming could be because both ice cream sales and swimming are " +
//         "caused by a third variable: temperature.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 650, y: 230, lineHeight: 25, lineWidth: 460
//     });

//     let image1 = new createjs.Bitmap(queue.getResult("causation_correlation")).set({
//         x: 110, y: 330, scaleX: 0.25, scaleY: 0.25
//     });

//     let image2 = new createjs.Bitmap(queue.getResult("Picture_SunTempIcecream")).set({
//         x: 660, y: 350, scaleX: 0.25, scaleY: 0.25
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     let iteration = 0;
//     nextButton.on("click", e => {
//         if (iteration == 0) {
//             stage.addChild(text2, image1);
//             stage.update();
//         } else if (iteration == 1) {
//             stage.addChild(text3, image2);
//             stage.update();
//         } else if (iteration == 2) {
//             nextHypoTask();
//         }
//         iteration++;
//     });

//     stage.addChild(text1, backButton, nextButton);
//     stage.update();
// }

// function definitionPage10() {
//     stage.removeAllChildren();
//     // add error field
//     errorField = new createjs.Container();
//     errorField.y = 10;

//     let text1 = new createjs.Text(
//         "For each phrase below, as one concept (underlined) increases, the " +
//         "other (underlined) concept may increase or decrease. Select the " +
//         "type of relationship that best describes the following pairs of concepts:",
//         "24px Arial",
//         "#000"
//     ).set({
//         x: 150, y: 100, lineWidth: 900, lineHeight: 30
//     });

//     let text3 = new createjs.Text(
//         "Reminder: Correlations and causes are different types of relationships.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 150, y: 470, lineHeight: 25, lineWidth: 800
//     });

//     let text4 = new createjs.Text(
//         "Just because two things are strongly related does not mean that one " +
//         "caused the other. There may be other reasons for this correlation. " +
//         "Both things may be caused by something else.",
//         "18px Arial",
//         "#000"
//     ).set({
//         x: 230, y: 520, lineHeight: 25, lineWidth: 800
//     });

//     let quiz = new createjs.DOMElement("quiz_overlay").set({
//         x: 50 * 2 / PIXEL_RATIO, y: 50 * 2 / PIXEL_RATIO,
//         scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO,
//     });
//     quiz.htmlElement.style.display = "block";

//     let quizQuestions = new createjs.DOMElement("quiz_questions_overlay").set({
//         x: 225 * 2 / PIXEL_RATIO, y: 53 * 2 / PIXEL_RATIO,
//         scaleX: 0.2 * 2 / PIXEL_RATIO, scaleY: 0.2 * 2 / PIXEL_RATIO
//     });
//     quizQuestions.htmlElement.style.display = "block";

//     function hideDOMOverlays() {
//         quiz.htmlElement.style.display = "none";
//         quizQuestions.htmlElement.style.display = "none";
//     }
//     let backButton = createBackButton();
//     backButton.on("click", e => {
//         hideDOMOverlays();
//         prevHypoTask();
//     });

//     let verifyButton = createRightButton("Check");
//     verifyButton.on("click", e => {
//         // checking validity info for quiz questions
//         let quizSelectors = document.getElementsByClassName("quiz_questions");
//         for (let i = 0; i < quizSelectors.length; i++) {
//             if (quizSelectors[i].value != QUIZ_ANSWERS[i]) {
//                 quizSelectors[i].setCustomValidity("Wrong Answer");
//             } else {
//                 quizSelectors[i].setCustomValidity("");
//                 quizSelectors[i].style.color = "green";
//             }
//             // resetting validity
//             quizSelectors[i].onchange = (() => {
//                 quizSelectors[i].setCustomValidity("");
//                 quizSelectors[i].style.color = "";
//             });
//         }
//         // testing if all answers are correct
//         if (quizQuestions.htmlElement.reportValidity()) {
//             updateErrorField("Your answers are all correct. Click Next to move on.",
//                 "16px Arial",
//                 "green");
//             stage.removeChild(verifyButton);
//             stage.addChild(nextButton);
//         }
//     });

//     let nextButton = createNextButton();
//     nextButton.on("click", e => {
//         hideDOMOverlays();
//         nextHypoTask();
//     });

//     stage.addChild(
//         errorField,
//         text1, text3, text4,
//         quiz, quizQuestions,
//         backButton, verifyButton
//     );
//     stage.update();
// }

function instructionPage() {
    stage.removeAllChildren();
    let delayStarted = false;
    let delayAchieved = false;
    // add error field
    errorField = new createjs.Container();
    errorField.y = 10;

    let text = new createjs.Text("Instructions", "bold 22px Arial", "#000").set({
        x: CANVAS_WIDTH / 2, y: (CANVAS_HEIGHT / 8) - 15, textAlign: "center"
    });

    let video = new createjs.DOMElement("instruction_video_overlay").set({
        x: 50 * 2 / PIXEL_RATIO, y: 30 * 2 / PIXEL_RATIO,
        scaleX: 0.25 * 2 / PIXEL_RATIO, scaleY: 0.25 * 2 / PIXEL_RATIO
    });
    video.htmlElement.style.display = "block";

    let backButton = createBackButton();
    backButton.on("click", e => {
        let vid = document.getElementById("instruction_video_overlay");
        vid.style.display = "none";
        vid.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        prevHypoTask();
    });

    let nextButton = createNextButton();
    nextButton.on("click", e => {
        if (!delayStarted) {
            updateErrorField(
                "Please watch the tutorial video.", "24px Arial", "#000"
            );
            nextButton.disable();
            delayStarted = true;
            setTimeout(() => {
                delayAchieved = true;
                nextButton.enable();
            }, 20000);
        } else if (!delayAchieved) {
            console.log("still delaying");
        } else {
            let vid = document.getElementById("instruction_video_overlay");
            vid.style.display = "none";
            vid.contentWindow.postMessage(
                '{"event": "command", "func": "stopVideo", "args": ""}', '*'
            );
            nextHypoTask();
        }
    });

    let advice = new createjs.Text(
        "Please watch the video above for a brief tutorial.\nWe recommend you " +
        "watch the video in full screen.",
        "16px Arial",
        "#000"
    ).set({
        x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT * 0.8, textAlign: "center"
    });

    stage.addChild(errorField, text, video, backButton, nextButton, advice);
    stage.update();
}

// function backToYourRQ() {
//     stage.removeAllChildren();
//     let image1 = new createjs.Bitmap(queue.getResult("TeacherPointing")).set({
//         x: 50, y: 50
//     });

//     let text1 = new createjs.Text(
//         "Now that you've seen how to set up your hypothesis by linking " +
//         "concepts, let's go back to your original research question...",
//         "22px Arial",
//         "#000"
//     ).set({
//         x: CANVAS_WIDTH / 2, y: 175,
//         textAlign: "center", lineHeight: 35, lineWidth: 700
//     });

//     let text2 = new createjs.Text(getRQ(), "bold 22px Arial", "#000").set({
//         x: CANVAS_WIDTH / 2, y: 300,
//         textAlign: "center", lineHeight: 35, lineWidth: 700
//     });

//     let backButton = createBackButton();
//     backButton.on("click", e => prevHypoTask());

//     let nextButton = createNextButton();
//     nextButton.on("click", e => nextHypoTask());

//     stage.addChild(image1, text1, text2, backButton, nextButton);
//     stage.update();
// }
class QuestionScene extends Scene {
    constructor(app, data) {
        super(app, data);
        this.checkAnswersBtn = document.getElementById("check_answers");
        this.checkAnswers = this.checkAnswers.bind(this);
        this.customActions = {
            showBtns: this.showBtns,
            hideBtns: this.hideBtns
        }
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

    checkAnswers(e) {
        e.preventDefault();
        console.log("check answers clicked");
    }

    performCustomEnterSceneActions() {
        this.checkAnswersBtn.addEventListener("click", this.checkAnswers);
    }
}

class HypoDefinitionsApp extends SceneTransitionsApp {
    constructor(appData) {
        super(appData);
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
        if ("standard" === sceneInfo.sceneType) {
            newScene = new Scene(this, sceneInfo);
        } else {
            newScene = new QuestionScene(this, sceneInfo);
        }
        return newScene;
    }


    logTransition(scene) {
        let data = {
            action: "SCENE_TRANSITION",
            from: this.currentScene.id,
            to: scene.id,
            timestamp: new Date().toLocaleString()
        };
        console.log(scene.id, data);
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

const app = new HypoDefinitionsApp(appData);
app.setStartScene("startPage");