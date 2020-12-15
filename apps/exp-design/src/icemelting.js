import { Model } from "./model.js";

const PROPS = [
    "ice_temp", "glass_shape", 
    "water_temp", "glass_pattern", "ice_type", "ice_cube_size", "water_type", "amt_water"
];

class IceMelting extends Model {
    constructor(cond) {
        super(cond, PROPS);
        this.calcAllSelectors = this.calcAllSelectors.bind(this);
        this.area = "A4";
        this.topic = "T2";
        this.propAlternatives = {
            ice_temp: ["0", "minus20"],
            glass_shape: ["short", "tall"],
            water_temp: ["cool", "hot"],
            glass_pattern: ["striped", "plain"],
            ice_type: ["tap", "distilled", "salt"],
            ice_cube_size: ["1cm", "standard", "5cm"],
            water_type: ["tap", "distilled", "salt"],
            amt_water: ["full", "half", "quarter"]
        };
    }

    calcAllSelectors() {
        let pas = this.propAlternatives;
        let all = []
        for (let prop of PROPS.slice(0, 2)) {
            pas[prop].forEach((val) => all.push(`${prop}__${val}`));
        }
        // ice_type__ice_cube_size
        for (let it of pas["ice_type"]) {
            for (let ics of pas["ice_cube_size"]) {
                all.push(`${it}__${ics}`);
            }
        }
        // glass_shape__amt_water__ice_type__ice_cube_size
        for (let gs of pas["glass_shape"]) {
            for (let aw of pas["amt_water"]) {
                for (let it of pas["ice_type"]) {
                    for (let ics of pas["ice_cube_size"]) {
                        all.push(`${gs}__${aw}__${it}__${ics}`);
                    }
                }
            }
        }
        // glass_shape__water_type__amt_water
        for (let gs of pas["glass_shape"]) {
            for (let wt of pas["water_type"]) {
                for (let aw of pas["amt_water"]) {
                    all.push(`${gs}__${wt}__${aw}`);
                }
            }
        }
        // water_temp__glass_shape
        for (let wt of pas["water_temp"]) {
            for (let gs of pas["glass_shape"]) {
                all.push(`${wt}__${gs}`)
            }
        }
        // glass_pattern__glass_shape
        for (let gp of pas["glass_pattern"]) {
            for (let gs of pas["glass_shape"]) {
                all.push(`${gp}__${gs}`);
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
        // bucket ice cubes
        currSelectors.push(this.getCompoundSelectorFromProps("ice_type", "ice_cube_size"));
        // ice cube in glass
        currSelectors.push(this.getCompoundSelectorFromProps("glass_shape", "amt_water", "ice_type", "ice_cube_size"));
        // water in glass
        currSelectors.push(this.getCompoundSelectorFromProps("glass_shape", "water_type", "amt_water"));
        // glass water temp
        currSelectors.push(this.getCompoundSelectorFromProps("water_temp", "glass_shape"));
        // glass pattern
        currSelectors.push(this.getCompoundSelectorFromProps("glass_pattern", "glass_shape"));
        return currSelectors;
    }
}

let cond1 = new IceMelting("cond1");
let cond2 = new IceMelting("cond2");
