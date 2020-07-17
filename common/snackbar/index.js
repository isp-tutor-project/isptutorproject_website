import "./index.css";


export class SnackBar {
    constructor(eleID) {
        this.el = document.getElementById(eleID || "snackbar");
    }

    show(text) {
        if (typeof(text) !== "undefined" && null !== text) {
            this.el.innerHTML = text;
            // Add the "show" class to DIV
            // this.el.className = "show";
            this.el.classList.add("show");
            // After 3 seconds, remove the show class from DIV
            setTimeout(() => {
                // snackbar.className = snackbar.className.replace("show", "");
                this.el.classList.remove("show");
            }, 3000);
        }
    }
}
