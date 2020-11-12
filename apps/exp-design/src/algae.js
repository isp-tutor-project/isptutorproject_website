import { Model } from "./model.js";

const PROPS = [
    "temp", "music_exposure", "amt_co2", "amt_sunlight",
    "tank_shape", "tank_material", "music_type", "volume",
    "amt_water"
];

class Algae extends Model {
    constructor() {
        super(PROPS);
        this.area = "A4";
        this.topic = "T2";
    }

    calcAllSelectors() {
        let simpleSelectors = [];
        let compoundSelectors = [];
        for (let p of PROPS.slice(0, 8)) {

        }
    }
}

let cond1 = new Algae();
let cond2 = new Algae();
console.log(cond1);
console.log(cond2);