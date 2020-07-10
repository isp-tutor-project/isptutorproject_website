import "./styles/index.scss";
// import "@isptutorproject/navbar/index.css";

import { NavBar } from "@isptutorproject/navbar";
import { getDBConnection } from "@isptutorproject/isp-database";

function initApp() {
    const navbar = new NavBar();
    const userID = localStorage.getItem("userID");

    console.log(`userName: ${userID}`);
    navbar.displayActivityTitle("Hypothesis Lesson");
    navbar.displayUser(userID);
    console.log("app initted");
}

initApp();