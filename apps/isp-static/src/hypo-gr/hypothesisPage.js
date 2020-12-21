// this is the index.js file, responsible for controlling the account 
// registration system and launching the different modules

/* global db, AdobeAn, createjs, stage */


// convenience function so I don't have to constantly
// type document.getElementById()
function getEleById(eleID) {
    return document.getElementById(eleID);
}

let currentPage = "home-page";
// commented out as I don't, as yet have a visually pleasing
// sign-out button
// let collectionID; 
// let userID; 
// if (HYPO_DEV) {
//     collectionID = localStorage.getItem("collectionID");
//     userID = localStorage.getItem("userID");
// }

// let currModulePage = document.getElementById("module-page");
// let newModulePage = document.getElementById("module-page").cloneNode(true);

// =============================================================================
// ========================= Useful functions ==================================
// =============================================================================

function openPage(page) {
    document.getElementById(currentPage).style.display = "none";
    document.getElementById(page).style.display = "block";
    currentPage = page;
}

// kind of a hacky fix to make the rq and ted modules work with my home button
function cleanModulePage() {
    //if (modulePage == null) modulePage = document.getElementById("module-page");
    let parent = currModulePage.parentNode;
    parent.removeChild(currModulePage);
    parent.insertBefore(newModulePage, document.getElementById("home-page"));
    currModulePage = newModulePage;
    newModulePage = newModulePage.cloneNode(true);
    document.getElementById("home-icon").addEventListener("click", e => {
        document.getElementById("home-overlay").style.display = "block";
    });
    document.getElementById("yes-btn").addEventListener("click", e => {
        cleanModulePage();
        document.getElementById("home-overlay").style.display = "none";
        openPage("home-page");
        initHomePage();
    });
}

// function showSnackbar(text) {
//     // Get the snackbar DIV
//     let snackbar = document.getElementById("snackbar");
//     snackbar.innerHTML = text;
//     // Add the "show" class to DIV
//     snackbar.className = "show";
//     // After 3 seconds, remove the show class from DIV
//     setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
// }

// ==========================================================================================================
// ========================================== Page Initiations ==============================================
// ==========================================================================================================

function initHomePage() {
    //let tutors = ["rq", "hypo", "ted"];
    // the list of tutors that will be displayed on the home page
    let tutors = ["rq", "hypo"];
    // db.collection(collectionID).doc(userID).get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document exists");
    //         return doc.data();
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch(function (error) {
    //     console.log("Error getting document:", error);
    // })
    // .then((data) => {
    //     let currTutorNdx = data.currTutorNdx;
    //     let brm = data.brm;
    //     if (tutors.length === currTutorNdx) {
    //         // student is done, disable all module buttons and display message
    //         tutors.forEach((tut, idx) => {
    //             let enbld = document.getElementById(tutors[idx] + "-button");
    //             enbld.classList.add("disabled");
    //         });
    //         showSnackbar("You have finished your work with the tutor.");
    //     } else {
    //         // student still working, enable/disable the appropriate module buttons
    //         let enabled = document.getElementById(tutors[currTutorNdx] + "-button");
    //         enabled.classList.remove("disabled");
    //         enabled.disabled = false;
    //         if (currTutorNdx != 0) {
    //             let former = document.getElementById(tutors[currTutorNdx - 1] + "-button");
    //             former.classList.add("disabled");
    //             former.disabled = true;
    //         }
    //     }
    // });

    // if (userID != null) {
    //     document.getElementById("sign-in-text").innerHTML = "Signed in as " + userID;
    //     // the following is commented out, as it looks like crap
    //     // document.getElementById("sign-out-region").innerHTML = `
    //     //     <a href="#" id="sign-out">Sign out</a>
    //     // `;
    //     // document.getElementById("sign-out").addEventListener("click", e => {
    //     //     logout();
    //     //     openPage('index-page');
    //     // });
    // }
}


function gotoHypoPage() {
    openPage("hypo-page");
    initHypoPage();
}

// =============================================================================
// ================================= Event Listeners ===========================
// =============================================================================

document.getElementById("completion-home-btn").addEventListener("click", e => {
    // cleanModulePage();
    document.getElementById("completion-overlay").style.display = "none";
    window.location.href = "/";
    // openPage("home-page");
    // initHomePage();
});
// document.getElementById("home-icon").addEventListener("click", e => {
//     document.getElementById("home-overlay").style.display = "block";
// });
document.getElementById("yes-btn").addEventListener("click", e => {
    cleanModulePage();
    document.getElementById("home-overlay").style.display = "none";
    openPage("home-page");
    initHomePage();
});
document.getElementById("cancel-btn").addEventListener("click", e => {
    document.getElementById("home-overlay").style.display = "none";
});

gotoHypoPage();
   