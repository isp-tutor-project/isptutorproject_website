

export class Model {
    constructor(cond, props) {
        this.menuChanged = this.menuChanged.bind(this);
        this.imageReady = this.imageReady.bind(this);
        this.props = {};
        for (let prop of props) {
            // console.log(prop);
            this.props[prop] = null;
        }
        // console.log(JSON.stringify(this.props, null, 4));
        this.cond = cond;
        this.area = null;
        this.topic = null;
        let imgSel = `${this.cond}_img`;
        // console.log(imgSel);
        this.imgEL = document.getElementById(imgSel);
        // console.log(this.imgEL);
        this.imgEL.addEventListener("load", this.imageReady);
        this.imgDoc = null;
        this.setupMenuListeners();
    }

    imageReady() {
        this.allSelectors = this.calcAllSelectors();
        this.imgDoc = this.imgEL.contentDocument;
        this.renderImage();
    }

    setupMenuListeners() {
        let sel = `select[id^="${this.cond}__"]`;
        // console.log(sel);
        for (let el of document.querySelectorAll(sel)) {
            if (!el) {
                console.error(`ERROR: can't add menu event listener for non-existant ${sel}`);
            } else {
                el.addEventListener("change", this.menuChanged);
            }
        }
    }

    calcAllSelectors() {
        throw new Error("Unimplemented Method");
    }

    getSelectorsForProps() {
        throw new Error("Unimplemented Method");
    }

    getSelectorForProp(prop) {
        // console.log("getSelectorForProp()", prop, this.props[prop]);
        // console.log(JSON.stringify(this.props, null, 4));
        return (null === this.props[prop]) ? null : `${prop}__${this.props[prop]}` ;
    }

    getCompoundSelectorFromProps(...props) {
        if (props.every((i) => this.props[i] !== null)) {
            let vals = props.map((p) => this.props[p]);
            return vals.join("__");
        }
        return null;
    }

    renderImage() {
        for (let sel of this.allSelectors) {
            let el = this.imgDoc.getElementById(sel);
            if (!el) {
                console.error(`error hiding ${whichImage}.${sel}`);
                return;
            }
            el.setAttribute("display", "none");
        }
        
        let currSelectors = this.getSelectorsForProps().filter((item) => item !== null);
        console.log(currSelectors);

        for (let sel of currSelectors) {
            let el = this.imgDoc.getElementById(sel);
            if (!el) {
                console.error(`error showing ${this.cond}.${sel}`);
                return;
            }
            el.setAttribute("display", "block");
        }
        /*
        for (let sel of allSelectors) {
            let el = doc.getElementById(sel);
            console.log(el.id, el.getAttribute("display"), el);
        }
        */
    }


    menuChanged(event) {
        let id = event.target.id;
        console.log(id);
        let cond = id.substring(0, 5);
        let prop = id.substring(7)
        let val = event.target.value;
        console.log(`condition: ${cond}  property: ${prop} changed to val: ${val}`);
        this.props[prop] = val;
        this.renderImage();
    }

}