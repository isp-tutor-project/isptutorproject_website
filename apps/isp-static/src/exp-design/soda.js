import { Model } from "./model.js";

const PROPS = [
    "bottle_volume", "water_type", "mint_surface", "amt_sweetener",
    "bottle_material", "amt_caffeine", "sweetener_type", 
    "amt_co2", "amt_water"
];

class Soda extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            amt_co2: ["low_co2", "high_co2"],
            amt_water: ["full", "half", "quarter"],
            bottle_volume: ["1l", "2l"],
            bottle_material: ["plastic", "glass"],
            sweetener_type: ["aspartame", "sugar"],
            amt_caffeine: ["some", "none"],
            amt_sweetener: ["212", "500", "990"],
            mint_surface: ["rough", "smooth"],
            water_type: ["distilled", "salt", "tap"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 7)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let co2 of pas["amt_co2"]) {
            for (let aw of pas["amt_water"]) {
                for (let bv of pas["bottle_volume"]) {
                    all.push(`${co2}__${aw}__${bv}`);
                }
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 7)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("amt_co2", "amt_water", "bottle_volume"));
        return currSelectors;
    }
}

let cond1 = new Soda("cond1");
let cond2 = new Soda("cond2");
