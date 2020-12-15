import { Model } from "./model.js";

const PROPS = [
    "slope",
    "ramp_material", "ramp_length", "ball_type", "ball_color", "starting_position"
];

class Ramps extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {

            slope: ["steep", "not_steep"],
            ramp_material: ["carpet", "glass", "plastic", "sandpaper"],
            ramp_length: ["meter", "half", "quarter"],
            starting_position: ["high", "low"],
            ball_type: ["golf_ball", "ping_pong_ball", "rubber_ball"],
            ball_color: ["pink", "yellow"],

        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 1)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        // ramp itself
        for (let rm of pas["ramp_material"]) {
            for (let rl of pas["ramp_length"]) {
                for (let sl of pas["slope"]) {
                    all.push(`${rm}__${rl}__${sl}`);
                }
            }
        }
        // ball
        for (let bt of pas["ball_type"]) {
            for (let bc of pas["ball_color"]) {
                all.push(`${bt}__${bc}`);
            }
        }
        // gate
        for (let rl of pas["ramp_length"]) {
            for (let sp of pas["starting_position"]) {
                for (let sl of pas["slope"]) {
                    all.push(`${rl}__${sp}__${sl}`);
                }
            }
        }

        return all;
    }

    getSelectorsForProps() {
        // simple selectors
        let currSelectors = [];
        for (let prop of PROPS.slice(0, 1)) {
            let computed = this.getSelectorForProp(prop);
            currSelectors.push(computed);
        }
        currSelectors.push(this.getCompoundSelectorFromProps("ramp_material", "ramp_length", "slope"));
        currSelectors.push(this.getCompoundSelectorFromProps("ball_type", "ball_color"));
        currSelectors.push(this.getCompoundSelectorFromProps("ramp_length", "starting_position", "slope"));
        return currSelectors;
    }
}

let cond1 = new Ramps("cond1");
let cond2 = new Ramps("cond2");
