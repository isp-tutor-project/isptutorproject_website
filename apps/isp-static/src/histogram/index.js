import "./styles/index.scss";
// import "@isptutorproject/navbar/index.css";

import { NavBar } from "@isptutorproject/navbar";


function initApp() {
    const navbar = new NavBar();
    const userID = localStorage.getItem("userID");

    console.log(`userName: ${userID}`);
    navbar.displayActivityTitle("Histogram Lesson");
    navbar.displayUser(userID);
    console.log("page inited");
}

initApp();