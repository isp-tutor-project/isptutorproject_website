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

function setUserID(uid) {
    userID = uid;
    localStorage.setItem("userID", uid);
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
    let linkData = parseActivityLinkData(e);
    localStorage.setItem("currentActivity", JSON.stringify(linkData.currentActivity));
    window.location.href = linkData.url;
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

function homePage(userData) {
    activatePage("home_page");
    navbar.displayUser(userID);
    console.log(userData);
    // refresh activity btns
    // activityBtnsCntr.innerHTML = "";
    activityBtnsList.innerHTML = "";
    activities.forEach((act) => {
        if (act.implemented && userData.assignments.includes(act.id)) {
            // console.log(act.id);
            let completed = userData.completedAssignments.includes(act.id);
            let url;
            let li = document.createElement("li");
            let btn = document.createElement("button");
            if (completed) {
                btn.classList.add("disabled");
            }
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
            btn.setAttribute("data-activity", JSON.stringify(act.storageInfo));
            btn.setAttribute("data-url", url);
            btn.addEventListener("click", handleActivityClick);
            // for debugging
            btn.addEventListener("mouseover", handleActivityHover);
            li.appendChild(btn);
            activityBtnsList.appendChild(li);
        }
    });
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
    let classCode = getEleById(flds.classcode).value.trim().toUpperCase();
    if ("" === classCode) {
        classCode = "STUDY3";
    }
    let retVal = {
        "classCode": classCode,
        "FN":  getEleById(flds.fname).value.trim().toUpperCase(),
        "LN": getEleById(flds.lname).value.trim().toUpperCase(),
        "MON": getEleById(flds.bmonth).value.toUpperCase(),
        "DAY": getEleById(flds.bday).value
    };
    // console.log(retVal);
    return retVal;
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
    if (loginForm.reportValidity()) {
        let formData = parseUserForm("login", loginForm);
        // console.log(formData);
        db.lookupUserID(formData)
        .then((uid) => {
            if (!!uid) {
                console.log(`account exists: ${uid}`);
                setUserID(uid);
                return db.loginUser(userID);
            }
            return false;
        })
        .then((userData) => {
            if (userData) {
                homePage(userData);
            } else {
                console.error("loginError");
                snackbar.show("login error");
            }
        });
    }
});

registerSubmitBtn.addEventListener("click", e => {
    e.preventDefault();
    if (registrationForm.reportValidity()) {
        let formData = parseUserForm("register", registrationForm);
        // console.log(formData);
        db.lookupUserID(formData)
        .then((uid) => {
            // uid should be false if we're registering a new user
            if (!!uid) {
                snackbar.show("Account already exists!");
                console.log(`account "${uid}" already exists`);
                return false;
            } else {
                return db.registerUser(formData);
            }
        })
        .then((uid) => {
            if (uid) {
                setUserID(uid);
                // classCode = formData.classCode;
                return db.loginUser(userID);
            } else {
                snackbar.show("error creating account");
                return false;
            }
        }).then((userData) => {
            if (userData) {
                homePage(userData);
            } else {
                snackbar.show("login error");
            }
        });
    }

});

function initApp() {
    navbar = new NavBar();
    snackbar = new SnackBar();
    // let DB = "localstorage";
    let DB = "firestore";
    let schema = "study3";
    let homePageURL = window.location.href;
    localStorage.setItem("homepage", homePageURL);
    localStorage.setItem("database", DB);
    db = getDBConnection(DB, schema);
    console.log(db);
    window.db = db;
    getUserIDFromLocalStorage();
    if (userID) {
        db.loginUser(userID)
        .then((userData) => {
            if (userData) {
                homePage(userData);
            } else {
                snackbar.show("login error");
            }
        })
    } else {
        indexPage();
    }
}

initApp();