

export class Model {
    constructor(...props) {
        for (let prop of props) {
            console.log(prop);
            this[prop] = null;
        }
    }

    getAllSelector() {
        throw new Error("Unimplemented Method");
    }

    getCurrentSelectors() {
        throw new Error("Unimplemented Method");
    }

    getSelectorForProp(cond, prop) {
        return ("undefined" !== typeof (cond[prop])) ? `${prop}__${cond[prop]}` : null;
    }

    getCompoundSelectorFromProps(cond, ...props) {
        if (props.every((i) => cond[i])) {
            let vals = props.map((p) => cond[p])
            return vals.join("__");
        }
        return null;
    }

    renderImage(whichImage) {
        console.log(whichImage);
        let doc = ("cond1" === whichImage) ? conds.cond1 : conds.cond2;
        for (let sel of allSelectors) {
            let el = doc.getElementById(sel);
            if (!el) {
                console.error(`error hiding ${whichImage}.${sel}`);
                return;
            }
            el.setAttribute("display", "none");
        }
        let currPropValues = getSelectors(whichImage);
        for (let sel of currPropValues) {
            let el = doc.getElementById(sel);
            if (!el) {
                console.error(`error showing ${whichImage}.${sel}`);
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
        if ("cond1" === cond) {
            // console.log("BEFORE")
            // console.log(cond1);
            cond1[prop] = val;
            // console.log("AFTER");
            // console.log[cond1]
        } else {
            // console.log("BEFORE");
            // console.log(cond2);
            cond2[prop] = val;
            // console.log("AFTER");
            // console.log(cond2);
        }
        renderImage(cond);
    }


}