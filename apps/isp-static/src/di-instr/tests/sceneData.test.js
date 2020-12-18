import {reIndexData} from "../js/reindex";
import {sceneData} from "../js/sceneData";


const VALID_TRANSITIONS = new Set([
    'prev', 'next', 'backToQuestion', 'readyToAnswer',
    'mean', 'median', 'mode', 'range',
    "back", "more"
]);

const VALID_ACTIONS = new Set(['hideBtns', 'showBtns', 'hiliteDogs']);

const VALID_BTN_NAMES = new Set([
    'prev', 'next', 'backToQuestion', 'readyToAnswer'
]);

let VALID_DOG_IDS = new Set([...Array(15).keys()].map((val) => `dog_${val}`));

describe('Test sceneData sanity', () => {

    it('sceneData should be of type "list"', () => {
        expect(typeof(sceneData)).toEqual(typeof([]));
    });

    it('reindexing sceneData should convert to dict', () => {
        let reindexed = reIndexData(sceneData);
        expect(typeof(reindexed)).toEqual(typeof({}));
    });

    it('all scenes should have transitions', () => {
        let numScenes = sceneData.length;
        let numScenesWithTransitions = 0;
        for (let scene of sceneData) {
            if (scene.hasOwnProperty("transitions")) {
                numScenesWithTransitions++;
            }
        }
        expect(numScenesWithTransitions).toEqual(numScenes);
    });

    it('all transitions should be valid', () => {
        let invalidTransitions = [];
        for (let scene of sceneData) {
            let transitions = scene.transitions;
            for (let trans of Object.keys(transitions)) {
                if (!VALID_TRANSITIONS.has(trans)) {
                    invalidTransitions.push({
                        scene: scene.id,
                        invalidTransition: trans
                    });
                }
            }
        }
        expect(invalidTransitions).toEqual([]);
        // .toEqual(expect.arrayContaining(foundTransitions));
    });

    it('all transition values should be valid sceneIds', () => {
        const validSceneIds = new Set(sceneData.map((scene) => scene.id));
        let invalidSceneIds = [];
        for (let scene of sceneData) {
            let transitions = scene.transitions;
            for (let [trans, val] of Object.entries(transitions)) {
                if (!validSceneIds.has(val)) {
                    invalidSceneIds.push({
                        scene: scene.id,
                        transition: trans,
                        invalidTransitionValue: val
                    });
                }
            }
        }
        expect(invalidSceneIds).toEqual([]);
        // expect.arrayContaining(transitionScenes));
    });

    it('all actions are valid actions', () => {
        let invalidActions = [];
        for (let scene of sceneData) {
            if (scene.hasOwnProperty("actions")) {
                let actions = scene.actions;
                for (let action of actions) {
                    if (!VALID_ACTIONS.has(action.name)) {
                        invalidActions.push({
                            scene: scene.id, invalidAction: action.name
                        });
                    }
                }
            }
        }
        expect(invalidActions).toEqual([]);
        // .toEqual(expect.arrayContaining(foundActions));
    });

    it('"hideBtns|showBtns" action args should be valid btn names', () => {
        let invalidBtnNames = [];
        let releventActionNames = new Set(["hideBtns", "showBtns"]);
        for (let scene of sceneData) {
            if (scene.hasOwnProperty("actions")) {
                let actions = scene.actions;
                for (let {name, args} of actions) {
                    if (releventActionNames.has(name)) {
                        for (let btnName of args) {
                            if (!VALID_BTN_NAMES.has(btnName)) {
                                invalidBtnNames.push({
                                    scene: scene.id,
                                    action: name,
                                    invalidBtnName: btnName
                                });
                            }
                        }
                    }
                }
            }
        }
        expect(invalidBtnNames).toEqual([]);
    });

    it('"hiliteDogs" actions args should be valid dog ids', () => {
        let invalidDogIds = [];
        for (let scene of sceneData) {
            if (scene.hasOwnProperty("actions")) {
                let actions = scene.actions;
                for (let {name, args} of actions) {
                    if ("hiliteDogs" === name) {
                        for (let dogId of args) {
                            if (!VALID_DOG_IDS.has(dogId)) {
                                invalidDogIds.push({
                                    scene: scene.id,
                                    action: name,
                                    invalidDogId: dogId
                                });
                            }
                        }
                    }
                }
            }
        }
        expect(invalidDogIds).toEqual([]);
    });
});
