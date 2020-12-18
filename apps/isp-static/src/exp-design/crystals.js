import { Model } from "./model.js";

const PROPS = [
    "water_temp", "crystal_type", "init_crystals", "container_type", "amt_water",
    "string_type", "string_length"
];

class Crystals extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            water_temp: ["cool", "hot"],
            crystal_type: ["salt", "sugar"],
            init_crystals: ["little", "none"],
            container_type: ["glass", "mug", "jar"],
            amt_water: ["full", "half", "quarter"],
            string_type: ["twine", "yarn"],
            string_length: ["full", "half", "quarter"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 5)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let st of pas["string_type"]) {
            for (let sl of pas["string_length"]) {
                all.push(`${st}__${sl}`);
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 5)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("string_type", "string_length"));
        return currSelectors;
    }
}

let cond1 = new Crystals("cond1");
let cond2 = new Crystals("cond2");
