import { Model } from "./model.js";

const PROPS = [
    "num_bees", "amt_sunlight", "water_type", "soil_type", "amt_water", "amt_fertilizer", "fertilizer_type",  
    "sunflower_type", "num_seedlings"
];

class Greenhouse extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            num_bees: ["whole_hive", "none"],
            amt_sunlight: ["full", "partial"],
            water_type: ["tap", "rain"],
            soil_type: ["peat_moss", "potting_soil", "clay"],
            amt_water: ["1l_per_day", "1l_every_other_day", "1l_per_week"],
            amt_fertilizer: ["some", "none"],
            fertilizer_type: ["manure", "wonder_grow", "sunflower_fertilizer"],
            sunflower_type: ["common", "pacino", "sunny_smile"],
            num_seedlings: ["3", "6", "9", "12"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 7)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let st of pas["sunflower_type"]) {
            for (let ns of pas["num_seedlings"]) {
                all.push(`${st}__${ns}`);
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        // don't list amt_fertilizer or fertilizer_type
        for (let prop of PROPS.slice(0, 5)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        // if amt_fertilizer != "none" show fertilizer_type
        if (this.props.amt_fertilizer && "none" !== this.props.amt_fertilizer) {
            currSelectors.push(this.getSelectorForProp("fertilizer_type"));
        }
        currSelectors.push(this.getCompoundSelectorFromProps("sunflower_type", "num_seedlings"));
        return currSelectors;
    }
}

let cond1 = new Greenhouse("cond1");
let cond2 = new Greenhouse("cond2");
