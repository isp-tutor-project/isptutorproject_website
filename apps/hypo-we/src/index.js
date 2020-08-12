import "./styles/index.scss";
// import "@isptutorproject/navbar/index.css";

import { NavBar } from "@isptutorproject/navbar";

// lets the iframe log to our console via postMessage()
window.addEventListener('message', function (response) {
    // Make sure message is from our iframe, extensions like React dev tools might use the same technique and mess up our logs
    if (response.data && response.data.source === 'iframe') {
        // Do whatever you want here.
        console.log(...response.data.message);
    }
});

function initApp() {
    const navbar = new NavBar();
    const userID = localStorage.getItem("userID");

    console.log(`userName: ${userID}`);
    navbar.displayActivityTitle("Hypothesis Lesson");
    navbar.displayUser(userID);
    console.log("page inited");
}

initApp();