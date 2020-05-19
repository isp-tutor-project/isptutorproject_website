import "./styles/index.scss";


import { NavBar } from "@isptutorproject/navbar";
import { SnackBar } from "@isptutorproject/snackbar";

import db from "@isptutorproject/isp-database";
window.db = db;

import { modules } from "../data/homePageData";


// convenience function so I don't have to constantly type document.getElementById()
function getEleById(eleID) {
    return document.getElementById(eleID);
}

function activatePage(pageID) {
    for (let page of document.querySelectorAll(".page")) {
        if (page.id === pageID) {
            page.classList.add("active")
        } else {
            page.classList.remove("active");
        }
    }
}

function getUserInfoFromLocalStorage() {
    collectionID = localStorage.getItem("collectionID");
    userID = localStorage.getItem("userID");
}

function removeUserInfoFromLocalStorage() {
    localStorage.removeItem("collectionID");
    localStorage.removeItem("userID");
    // reset collectionID and user ID vars to undefined
    getUserInfoFromLocalStorage();
}

function logoutUser() {
    removeUserInfoFromLocalStorage();
    indexPage();
}

function handleModuleBtn(e) {
    e.preventDefault();
    let url = e.target.getAttribute("data-url");
    let currentModule = e.target.getAttribute("data-module");
    let features = e.target.getAttribute("data-features");
    console.log(`
    clicked on: ${e.target}
    url: ${url}
    module: ${currentModule}
    features: ${features}
    `);

    localStorage.setItem("currentModule", currentModule);
    if (features) {
        localStorage.setItem("moduleFeatures", features);
    }
    window.location.href = url;
    // console.log(`I will redirect to: ${url}`);
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
    // signInText.innerHTML = `Welcome, ${userID}`;
    // signOutBtn.classList.remove("hidden");
    // // clear module btns
    moduleBtnsCntr.innerHTML = "";
    // add module btns
    modules.forEach((mod) => {
        let p = document.createElement("p");
        let btn = document.createElement("button");
        if (!mod.implemented) {
            btn.classList.add("disabled");
        }
        btn.classList.add("module-button");
        btn.classList.add("btn");
        btn.type = "button";
        btn.innerHTML = mod.label;
        if (mod.storageInfo.tutorFeatures) {
            btn.setAttribute("data-features", mod.storageInfo.tutorFeatures);
        }
        btn.setAttribute("data-module", mod.storageInfo.currentModule);
        btn.setAttribute("data-url", mod.url);
        btn.addEventListener("click", handleModuleBtn);
        p.appendChild(btn);
        moduleBtnsCntr.appendChild(p);
    })
}

let collectionID; 
let userID; 

const navbar = new NavBar(logoutUser);
const snackbar = new SnackBar();

// const signInText = getEleById("sign_in_text");
// const signOutRegion = getEleById("sign_out_region");
// const signOutBtn = getEleById("sign_out_button");

const loginBtn = getEleById("login_button");
const loginBackBtn = getEleById("l-back-button");
const loginForm = getEleById("login_form");
const loginSubmitBtn = getEleById("login_submit");

const registerBtn = getEleById("register_button");
const registerBackBtn = getEleById("r-back-button");
const registrationForm = getEleById("registration_form");
const registerSubmitBtn = getEleById("registration_submit");

const moduleBtnsCntr = getEleById("module_btns_container");

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
    let classCode = getEleById(flds.classcode).value.toUpperCase();
    collectionID = classCode;
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
    // save collection and uid so BRM can connect to firebase
    localStorage.setItem("collectionID", collectionID);
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
        db.collection(collectionID).doc(userID).get().then((doc) => {
            if (doc.exists) {
                console.log("Account found");
                snackbar.show("Signed in as " + userID + ".");
                homePage();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such account!");
                snackbar.show("No such account exists. Check that your name and birthday were typed in correctly.")
            }
        }).catch(function (error) {
            console.log("Error getting account:", error);
            snackbar.show("No such account exists. Check that you typed in the classcode correctly.")
        })
    }
});

// function fetchUserDoc(collec, uid) {
//     return db.collection(classCode).doc(uid).get();
// }

// function createAccount(classCode, uid) {
//     fetchUserDoc(classCode, uid)
//     .then((doc) => {
//         if (doc.exists) {
//             // account already exists
//         } else {
//             // try writing something do doc to create it
//         }
//     })
// }

// function loginUser(classCode, uid) {

// }

registerSubmitBtn.addEventListener("click", e => {
    e.preventDefault();
    if (parseUserForm("register", registrationForm)) {
        db.collection(collectionID).doc(userID).get().then((doc) => {
            if (doc.exists) {
                console.log("Account already exists");
                snackbar.show("Account already exists.");
            } else {
                console.log("Creating account");
                db.collection(collectionID).doc(userID).set({
                    currTutorNdx: 0
                })
                .then(function () {
                    console.log("Document successfully written!");
                    snackbar.show("Signed in as " + userID + ".");
                    homePage();
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                    snackbar.show("Error creating new account.");
                });
            }
        }).catch(function (error) {
            console.log("Error getting account:", error);
            snackbar.show("Cannot create account. Please make sure that class code is correct.");
        });
    }
});


function initApp() {
    
    getUserInfoFromLocalStorage();
    if (collectionID && userID) {
        homePage();
    } else {
        indexPage();
    }
}

initApp();