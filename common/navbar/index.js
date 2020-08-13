import "./index.css";

export class NavBar {
    constructor() {
        this.el = document.querySelector("nav.navbar");
        this.homeBtn = document.getElementById("navbar_home_btn");
        this.activityTitle = document.getElementById("activity_title");
        this.glossaryBtn = document.getElementById("navbar_glossary_btn");
        this.glossaryPopup = document.querySelector(".navbar-glossary-popup");
        this.signOutBtn = document.getElementById("sign_out_button");
        this.signInText = document.getElementById("sign_in_text");
        this.goHome      = this.goHome.bind(this);
        this.toggleGlossary = this.toggleGlossary.bind(this);
        this.signOutUser = this.signOutUser.bind(this);
        this.homeBtn.addEventListener('click', this.goHome);
        this.glossaryBtn.addEventListener("click", this.toggleGlossary);
        this.signOutBtn.addEventListener("click", this.signOutUser);
    }

    goHome(e) {
        let homePage = this.calcHomePage();
        this.redirectTo(homePage);
    }

    toggleGlossary(e) {
        this.glossaryPopup.classList.toggle("hidden");
    }

    calcHomePage() {
        let homePage = localStorage.getItem("homepage");
        if (null === homePage) {
            homePage = window.location.origin + "/";
        }
        return homePage;
    }

    redirectTo(url, allowRefresh=false) {
        // prevent refresh if already on this page
        let isSamePage = window.location.href === url;
        if (!isSamePage) {
            window.location.href = url;
        } else if (allowRefresh) {
            window.location.reload();
        } else {
            console.log("same url but refresh disabled");
        }
    }

    signOutUser(e) {
        this.signInText.innerHTML = "";
        this.signInText.classList.add("invisible");
        this.signOutBtn.classList.add("invisible");
        let homePage = this.calcHomePage();
        // this does the actual signing out
        localStorage.clear();
        this.redirectTo(homePage, true);
    }

    displayActivityTitle(title) {
        this.activityTitle.innerText = title.toUpperCase();
    }


    displayUser(userName) {
        this.signInText.innerHTML = `Welcome, ${userName}`;
        this.signInText.classList.remove("invisible");
        this.signOutBtn.classList.remove("invisible");
    }
};
