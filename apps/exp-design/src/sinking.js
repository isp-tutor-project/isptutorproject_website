import { Model } from "./model.js";

const PROPS = [
    "water_density", "container_type",
    "shape", "object_density", "object_volume",
    "water_density", "amt_water"
];

class Sinking extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            object_density: ["lead", "glass"],
            object_volume: ["sm", "lg"],
            shape: ["tear", "sphere"],
            amt_water: ["full", "half", "quarter"],
            water_density: ["salt", "distilled"],
            container_type: ["cylinder_50", "cylinder_10", "jar_10"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 2)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let sh of pas["shape"]) {
            for (let od of pas["object_density"]) {
                for (let ov of pas["object_volume"]) {
                    all.push(`${sh}__${od}__${ov}`);
                }
            }
        }
        for (let ct of pas["container_type"]) {
            for (let wd of pas["water_density"]) {
                for (let aw of pas["amt_water"]) {
                    all.push(`${ct}__${wd}__${aw}`);
                }
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 2)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("shape", "object_density", "object_volume"));
        currSelectors.push(this.getCompoundSelectorFromProps("container_type", "water_density", "amt_water"));
        return currSelectors;
    }
}

let cond1 = new Sinking("cond1");
let cond2 = new Sinking("cond2");
