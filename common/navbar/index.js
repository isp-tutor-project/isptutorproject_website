import "./index.css";

export class NavBar {
    constructor(logoutHandler) {
        this.el = document.querySelector("nav.navbar");
        this.userInfoRegion = document.getElementById("user_info_region");
        this.signOutBtn = document.getElementById("sign_out_button");
        this.signInText = document.getElementById("sign_in_text");
        this.signOutUser = this.signOutUser.bind(this);
        this.logoutHandler = logoutHandler;
        this.signOutBtn.addEventListener("click", this.signOutUser);
    }

    signOutUser(e) {
        this.userInfoRegion.classList.add("invisible");
        if (this.logoutHandler) {
            this.logoutHandler();
        } else {
            window.location.path = "/";
        }
        // localStorage.removeItem("CLASSCODE");
        // localStorage.remove("USERID");
    }

    displayUser(userName) {
        this.signInText.innerHTML = `Welcome ${userName}`;
        this.userInfoRegion.classList.remove("invisible");
    }
};
