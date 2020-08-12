import "./styles/index.scss";

import { NavBar } from "@isptutorproject/navbar";
import { SnackBar } from "@isptutorproject/snackbar";
import { getDBConnection } from "@isptutorproject/isp-database";
import { activities } from "../data/homePageData";


// convenience function so I don't have to constantly type document.getElementById()
function getEleById(eleID) {
    return document.getElementById(eleID);
}

let userID, db, navbar, snackbar;

// page elements
const loginBtn          = getEleById("login_button");
const registerBtn       = getEleById("register_button");
const loginBackBtn      = getEleById("l-back-button");
const registerBackBtn   = getEleById("r-back-button");
const loginForm         = getEleById("login_form");
const loginSubmitBtn    = getEleById("login_submit");
const registrationForm  = getEleById("registration_form");
const registerSubmitBtn = getEleById("registration_submit");
// const activityBtnsCntr  = getEleById("activity_btns_container");
const activityBtnsList  = getEleById("activity_btns_list");

function activatePage(pageID) {
    for (let page of document.querySelectorAll(".page")) {
        if (page.id === pageID) {
            page.classList.add("active")
        } else {
            page.classList.remove("active");
        }
    }
}

function getUserIDFromLocalStorage() {
    userID = localStorage.getItem("userID");
}


function parseActivityLinkData(e) {
    return {
        url: e.target.getAttribute("data-url"),
        currentActivity: JSON.parse(e.target.getAttribute("data-activity"))
    };
}

function handleActivityHover(e) {
    // e.preventDefault();
    let data = parseActivityLinkData(e);
    console.log(`
    hovering over: ${e.target}
    url: ${data.url}
    currentActivity: ${JSON.stringify(data.currentActivity, null, 4)}
    `);
}

function handleActivityClick(e) {
    e.preventDefault();
    let url = e.target.getAttribute("data-url");
    let currentActivity = e.target.getAttribute("data-activity");
    let currentActivityFeatures = e.target.getAttribute("data-activity-features");
    localStorage.setItem("currentActivity", currentActivity);
    localStorage.setItem("currentActivityFeatures", currentActivityFeatures);
    window.location.href = url;
}

function indexPage(e) {
    if (e) {
        e.preventDefault();
    }
    activatePage("index_page");
}

function registrationPage(e) {
    if (e) {
        e.preventDefault();
    }
    activatePage("registration_page");
    registrationForm.reset();
}

function loginPage(e) {
    if (e) {
        e.preventDefault();
    }
    activatePage("login_page");
    loginForm.reset();
}

function homePage(e) {
    if (e) {
        e.preventDefault();
    }
    activatePage("home_page");
    navbar.displayUser(userID);
    // refresh activity btns
    // activityBtnsCntr.innerHTML = "";
    activityBtnsList.innerHTML = "";
    activities.forEach((act) => {
        if (act.implemented) {
            // console.log(act);
            let url;
            // let p = document.createElement("p");
            let p = document.createElement("li");
            let btn = document.createElement("button");
            // if (!act.implemented) {
            //     btn.classList.add("disabled");
            // }
            btn.classList.add("activity-button");
            btn.classList.add("btn");
            btn.type = "button";
            btn.innerHTML = act.label;
            if (act.url.startsWith("http")) {
                url = act.url;
            } else {
                // homepage url can be at a random path, and may end with index.html
                // localstorage retains all of this so we can simply redirect back.
                // strip off index.html and/or trailing slash if exist and append
                // relative path
                let tmp = localStorage.getItem("homepage");
                tmp = tmp.replace("index.html", "");
                if (tmp.endsWith("/")) {
                    tmp = tmp.slice(0, -1);
                }
                url = `${tmp}${act.url}`;
            }
            btn.setAttribute("data-activity-features", act.storageInfo.currentActivityFeatures || "");
            btn.setAttribute("data-activity", act.storageInfo.currentActivity);
            btn.setAttribute("data-url", url);
            btn.addEventListener("click", handleActivityClick);
            // for debugging
            btn.addEventListener("mouseover", handleActivityHover);
            p.appendChild(btn);
            // activityBtnsCntr.appendChild(p);
            activityBtnsList.appendChild(p);
        }
    });
}

function loginUser() {
    console.debug("Account found");
    snackbar.show("Signed in as " + userID + ".");
    homePage();
}

// =============================================================================
// ======================= userForm related functions ==========================
// =============================================================================

function isValidInput(input) {
    let regex = /^[A-Za-z]+$/
    if (regex.test(input)) {
        return true;
    }
    else {
        snackbar.show("Please do not enter any numbers, spaces, or special characters in your input.");
        return false;
    }
}

function ensureLength2(value, fldName) {
    if (value.length !== 2) {
        snackbar.show(`Please enter exactly two letters for your ${fldName}`)
        return false;
    }
    return true;
}

// simple parameterized wrapper which handles the otherwise duplicate login and
// registration form parsing.
function parseUserForm(prefix, form) {
    let fldNames = ['classcode', 'fname', 'lname', 'bmonth', 'bday'];
    // create a map of fldNames to prefixed ('r-' or 's-') field names
    let flds = {};
    fldNames.forEach((fld) => flds[fld] = `${prefix}_${fld}`);
    if (!form.reportValidity()) {
        return false;
    }
    classCode = getEleById(flds.classcode).value.toUpperCase();
    let firstname = getEleById(flds.fname).value;
    let lastname = getEleById(flds.lname).value;
    let month = getEleById(flds.bmonth).value;
    let day = getEleById(flds.bday).value;
    if (!ensureLength2(firstname, "first name")) {
        return false;
    }
    if (!ensureLength2(lastname, "last name")) {
        return false;
    }
    userID = firstname + lastname;
    if (!isValidInput(userID)) {
        return false;
    }
    userID += '_' + month + '_' + day;
    userID = userID.toUpperCase();
    // save classCode and uid so BRM can connect to firebase
    localStorage.setItem("classCode", classCode);
    localStorage.setItem("userID", userID);
    return true;
}

// =============================================================================
// ================================= Event Listeners ===========================
// =============================================================================

// signOutBtn.addEventListener("click", logoutUser);

loginBtn.addEventListener("click", loginPage);
registerBtn.addEventListener("click", registrationPage);
loginBackBtn.addEventListener("click", indexPage);
registerBackBtn.addEventListener("click", indexPage);


loginSubmitBtn.addEventListener("click", e => {
    e.preventDefault();
    if (parseUserForm("login", loginForm)) {
        db.setCredentials(classCode, userID);
        db.getUserData()
        .then((userData) => {
            if (userData) {
                loginUser();
            } else {
                console.error("No such account!");
                snackbar.show("No such account exists. Check that your name and birthday were typed in correctly.")
            }
        }).catch(function (error) {
            console.log("Error getting account:", error);
            snackbar.show("No such account exists. Check that you typed in the classcode correctly.")
        });
    }
});

registerSubmitBtn.addEventListener("click", e => {
    e.preventDefault();
    if (parseUserForm("register", registrationForm)) {
        db.setCredentials(classCode, userID);
        db.getUserData()
        .then((userData) => {
            if (userData) {
                let msg = "Account already exists.";
                console.error(msg);
                snackbar.show(msg);
            } else {
                console.debug("Creating account");
                // add some fields to account object
                db.setValues({
                    classCode: classCode,
                    userID: userID
                })
                .then(function () {
                    console.debug("Document successfully written!");
                    loginUser();
                })
                .catch(function (error) {
                    let msg = "Error creating new account.";
                    console.error(msg, error);
                    snackbar.show(msg);
                });
            }
        }).catch(function (error) {
            console.error("Error getting account:", error);
            snackbar.show("Cannot create account. Please make sure that class code is correct.");
        });
    }
});

function initApp() {
    navbar = new NavBar();
    snackbar = new SnackBar();
    // navbar.displayActivityTitle("ISP Home Page");
    let DB = "localstorage";
    let homePageURL = window.location.href;
    localStorage.setItem("homepage", homePageURL);
    localStorage.setItem("database", DB);
    db = getDBConnection(DB);
    getUserInfoFromLocalStorage();
    if (classCode && userID) {
        homePage();
    } else {
        indexPage();
    }
}

initApp();