import { Model } from "./model.js";

const PROPS = [
    "amt_sunlight", "chair_type", "gas_type",
    "balloon_material", "balloon_size", "balloon_shape", "balloon_color"
];

class Balloon extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            amt_sunlight: ["full_sun", "shade"],
            chair_type: ["wooden", "canvas"],
            gas_type: ["helium", "hydrogen", "argon"],
            balloon_material: ["foil", "latex"],
            balloon_size: ["sm", "med", "lg"],
            balloon_shape: ["sphere", "rectangle", "oval"],
            balloon_color: ["gray", "black"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 3)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        for (let bm of pas["balloon_material"]) {
            for (let bs of pas["balloon_size"]) {
                all.push(`${bm}__${bs}`);
            }
        }
        for (let bshape of pas["balloon_shape"]) {
            for (let bcolor of pas["balloon_color"]) {
                for (let bsize of pas["balloon_size"]) {
                    all.push(`${bshape}__${bcolor}__${bsize}`);
                }
            }
        }
        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 3)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("balloon_shape", "balloon_color", "balloon_size"));
        currSelectors.push(this.getCompoundSelectorFromProps("balloon_material", "balloon_size"));
        return currSelectors;
    }
}

let cond1 = new Balloon("cond1");
let cond2 = new Balloon("cond2");
