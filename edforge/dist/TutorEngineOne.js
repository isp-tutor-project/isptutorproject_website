var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("util/IModuleDesc", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/IBootLoader", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("util/CUtil", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var TutorEngineOne, CJSEvent, CUtil, __global;
    return {
        setters: [],
        execute: function () {
            CJSEvent = createjs.Event;
            CUtil = class CUtil extends Object {
                constructor() {
                    super();
                }
                static trace(message, ...alt) {
                    let fullMessage = "";
                    if (message instanceof Array) {
                    }
                    else if (arguments.length > 1) {
                        for (let item of arguments) {
                            fullMessage = fullMessage.concat(item, " ");
                        }
                        console.log(fullMessage + "\n");
                    }
                    else {
                        if (message.includes("call"))
                            var tag = 1;
                        console.log(message);
                    }
                }
                static getTimer() {
                    return ((CUtil.now && CUtil.now.call(CUtil.w.performance)) || (new Date().getTime()));
                }
                static getQualifiedClassName(value) {
                    let type = typeof value;
                    if (!value || (type != "object" && !value.prototype)) {
                        return type;
                    }
                    let prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
                    if (prototype.hasOwnProperty("__class__")) {
                        return prototype["__class__"];
                    }
                    let constructorString = prototype.constructor.toString().trim();
                    let index = constructorString.indexOf("(");
                    let className = constructorString.substring(9, index);
                    Object.defineProperty(prototype, "__class__", {
                        value: className,
                        enumerable: false,
                        writable: true
                    });
                    return className;
                }
                static mixinCodeSuppliments(recObj, donorObj, mixinSig) {
                    let propName;
                    let donor;
                    if (donorObj) {
                        donor = new donorObj();
                        let TObjProps = Object.getOwnPropertyNames(donor);
                        for (propName of TObjProps) {
                            if (mixinSig && !propName.startsWith(mixinSig))
                                continue;
                            recObj[propName] = donor[propName];
                        }
                        let protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(donor));
                        for (propName of protoProps) {
                            if (mixinSig && !propName.startsWith(mixinSig))
                                continue;
                            recObj[propName] = donor[propName];
                        }
                    }
                }
                static mixinDataObject(recObj, donorObj) {
                    let propName;
                    if (donorObj) {
                        let TObjProps = Object.getOwnPropertyNames(donorObj);
                        for (propName of TObjProps) {
                            recObj[propName] = donorObj[propName];
                        }
                    }
                }
                static getDefinitionByName2(name) {
                    if (!name)
                        return null;
                    let definition = CUtil.getDefinitionByNameCache[name];
                    if (definition) {
                        return definition;
                    }
                    let paths = name.split(".");
                    let length = paths.length;
                    definition = __global;
                    for (let i = 0; i < length; i++) {
                        let path = paths[i];
                        definition = definition[path];
                        if (!definition) {
                            return null;
                        }
                    }
                    CUtil.getDefinitionByNameCache[name] = definition;
                    return definition;
                }
                static preLoader(show) {
                    let preloaderDiv;
                    if (preloaderDiv = document.getElementById("_preload_div_")) {
                        if (show) {
                            preloaderDiv.style.display = 'inline-block';
                        }
                        else {
                            preloaderDiv.style.display = 'none';
                        }
                    }
                }
                static strMap2Obj(strMap) {
                    let obj = Object.create(null);
                    for (let [k, v] of strMap) {
                        obj[k] = v;
                    }
                    return obj;
                }
                static obj2StrMap(obj) {
                    let strMap = new Map();
                    for (let k of Object.keys(obj)) {
                        strMap.set(k, obj[k]);
                    }
                    return strMap;
                }
                static initSceneTick(tarComponent) {
                    let event = new CJSEvent("tick", false, false);
                    event.delta = 0;
                    event.paused = true;
                    event.time = CUtil.getTimer();
                    event.runTime = event.time;
                    tarComponent._tick(event);
                }
                static instantiateThermiteObject(_module, _className) {
                    let tarObject;
                    let ClassRef = this.getConstructorByName(_module, _className);
                    tarObject = new ClassRef();
                    return tarObject;
                }
                static getConstructorByName(moduleName, className) {
                    let classConstructor;
                    try {
                        classConstructor = EFLoadManager.classLib[moduleName][className];
                        if (!classConstructor) {
                            console.log("Module Not Loaded: " + moduleName);
                        }
                    }
                    catch (error) {
                        console.log("getConstructorByName Failed on Class: " + className + " in => " + moduleName + " - " + error);
                    }
                    return classConstructor;
                }
            };
            CUtil.w = window;
            CUtil.now = CUtil.w.performance.now || CUtil.w.performance.mozNow || CUtil.w.performance.msNow ||
                CUtil.w.performance.oNow || CUtil.w.performance.webkitNow;
            CUtil.getDefinitionByNameCache = {};
            CUtil.SHOW = true;
            CUtil.HIDE = false;
            exports_3("CUtil", CUtil);
            __global = this.__global || this;
        }
    };
});
System.register("events/CEFEvent", ["util/CUtil"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var CUtil_1, Event, CEFEvent;
    return {
        setters: [
            function (CUtil_1_1) {
                CUtil_1 = CUtil_1_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFEvent = class CEFEvent extends Event {
                constructor(TarObjID, type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.tarObjID = TarObjID;
                }
                clone() {
                    CUtil_1.CUtil.trace("cloning WOZEvent:");
                    return new CEFEvent(this.tarObjID, this.type, this.bubbles, this.cancelable);
                }
                captureLogState(obj = null) {
                    if (obj == null)
                        obj = {};
                    obj['target'] = this.tarObjID;
                    obj['type'] = this.type;
                    obj['bubbles'] = this.bubbles;
                    obj['cancelable'] = this.cancelable;
                    return obj;
                }
                captureXMLState() {
                    var xmlVal = "<CEFEvent target={tarObjID} type={type} bubbles={bubbles} cancelable={cancelable}/>";
                    return xmlVal;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    return false;
                }
                trace(message) {
                    let fullMessage = "";
                    if (Array.isArray(message)) {
                        for (let item of message) {
                            fullMessage += fullMessage.concat(item, " ");
                        }
                        console.log(fullMessage);
                    }
                    else {
                        fullMessage = message;
                    }
                    console.log(fullMessage);
                }
            };
            CEFEvent.ENTER_FRAME = "tick";
            CEFEvent.EXIT_FRAME = "tickend";
            CEFEvent.ADDED_TO_STAGE = "added";
            CEFEvent.REMOVED_FROM_STAGE = "removed";
            CEFEvent.MOTION_FINISH = "complete";
            CEFEvent.CHANGE = "change";
            CEFEvent.COMPLETE = "complete";
            exports_4("CEFEvent", CEFEvent);
        }
    };
});
System.register("util/CONST", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var CONST;
    return {
        setters: [],
        execute: function () {
            CONST = class CONST {
            };
            CONST.MC_NOLOOP = false;
            CONST.MC_LOOP = true;
            CONST.TUTORCONTAINER = "STutorContainer";
            CONST.NAVNONE = 0;
            CONST.NAVBACK = 1;
            CONST.NAVNEXT = 2;
            CONST.NAVBOTH = 3;
            CONST.NAVSCENE = "SCENE";
            CONST.NAVTUTOR = "TUTOR";
            CONST.ACTION_PFX = "$nodeAction.";
            CONST.SCENE_CHOICESET = "choiceset";
            CONST.SCENE_TRACK = "track";
            CONST.SCENE_ACTION = "action";
            CONST.TEMPLATE_VAR = "templateVar";
            CONST.NOVAR = "__novar";
            CONST.SCENE_DATA = "SceneData";
            CONST.TRACK_DATA = "TrackData";
            CONST.START_CUEPOINT = "$start";
            CONST.END_CUEPOINT = "$end";
            CONST.EFTEXT_TYPE = "eftext";
            CONST.EFINPUT_TYPE = "efinput";
            CONST.EFLISTBOX_TYPE = "eflist";
            CONST.EFTABLE_TYPE = "eftable";
            CONST.EFDATA_TYPE = "efdata";
            CONST.GLOBAL_MODULE = "$GLOBAL";
            CONST.GLOBAL_CODE = "$GLOBAL";
            CONST.COMMON_CODE = "$Common";
            CONST.EXT_SIG = "$";
            CONST.XNAME_SIG = "$$";
            CONST.TUTOR_COMMONPATH = "EFTutors/";
            CONST.ACCOUNT_LOADER = "/EFTutors/accounts.json";
            CONST.MODID_FILEPATH = "/EFconfig.json";
            CONST.GRAPH_FILEPATH = "/EFgraphs/scenegraphs.json";
            CONST.EXTS_FILEPATH = "/EFbuild/exts.js";
            CONST.MIXINS_FILEPATH = "/EFbuild/mixins.js";
            CONST.DATA_FILEPATH = "/EFbuild/_EFTUTORDATA.json";
            CONST.LIBR_FILEPATH = "/EFbuild/_EFLIBRARYDATA.json";
            CONST.FONTFACE_FILEPATH = "/EFfonts/fontfaces.css";
            CONST.TRACKDATA_FILEPATH = "/EFaudio/EFscripts/script_assets.json";
            CONST.TRACKASSETS_FILEPATH = "/EFaudio/EFassets/";
            CONST.GLOBALS_FILEPATH = "/EFbuild/globals.js";
            CONST.GDATA_FILEPATH = "/EFbuild/_EFTUTORDATA.json";
            CONST.GLIBR_FILEPATH = "/EFbuild/_EFLIBRARYDATA.json";
            CONST.SEGMENT_PREFIX = "_s";
            CONST.VOICE_PREFIX = "_v";
            CONST.ANMODULE_FILEPATH = ".js";
            CONST.COMMONAUDIO = "common/";
            CONST.TYPE_MP3 = ".mp3";
            CONST.TYPE_WAV = ".wav";
            CONST.TUTOR_GLOBALCODE = "TutorGlobalCode";
            CONST.TUTOR_GLOBALDATA = "TutorGlobalData";
            CONST.LOCAL = "LOCAL";
            CONST.WAIT = 250;
            CONST.DONT_LAUNCH = false;
            CONST.LAUNCH = true;
            CONST.END_OF_TUTOR = "END_OF_TUTOR";
            CONST.CONTROLCONTAINER_DESIGNHEIGHT = 100;
            CONST.EFMODULE_PREFIX = "EFMod_";
            CONST.THERMITE_PREFIX = "TC_";
            CONST.MODULE_PREFIX = "TM_";
            CONST.MODLINK_PREFIX = "TL_";
            CONST.SCENE_EXT = "sceneExt";
            CONST.TUTOR_EXT = "tutorExt";
            CONST.GLOBALONTOLOGY_SELECTOR = "$EFGO_";
            CONST.MODULEONTOLOGY_SELECTOR = "$EFO_";
            CONST.TRACK_SELECTOR = "$EFTR_";
            CONST.SCENESTATE_SELECTOR = "$EFS_";
            CONST.MODULESTATE_SELECTOR = "$EFM_";
            CONST.TUTORSTATE_SELECTOR = "$EFT_";
            CONST.MODULELIBRARY_SELECTOR = "$EFL_";
            CONST.GLOBALLIBRARY_SELECTOR = "$EFG_";
            CONST.FOREIGNMODULE_SELECTOR = "$EFFM_";
            CONST.SCENESTATE = "SCN";
            CONST.MODULESTATE = "MDL";
            CONST.TUTORSTATE = "TUT";
            CONST.TUTOR_VARIABLE = [
                "tutorconfig.json",
                "tutorgraph.json"
            ];
            CONST.TUTOR_FACTORIES = [
                "tutorConfig",
                "tutorGraph"
            ];
            CONST.EFFECT_FADE = "fade";
            CONST.EFFECT_SWAP = "swap";
            CONST.STATE_UP = "";
            CONST.STATE_OVER = "";
            CONST.STATE_DOWN = "";
            CONST.STATE_DISABLED = "";
            CONST.STATE_HIT = "";
            CONST.BUTTON_TEXT = "Slabel";
            CONST.SIMPLE_BUTTON = "SIMPLE_BUTTON";
            CONST.SHAPE_UP = "shape";
            CONST.SHAPE_OVER = "shape_1";
            CONST.SHAPE_DOWN = "shape_2";
            CONST.SHAPE_DISABLED = "shape_3";
            CONST.SHAPE_HIT = "shape_3";
            CONST.INSTANCE_UP = "instance";
            CONST.INSTANCE_OVER = "instance_1";
            CONST.INSTANCE_DOWN = "instance_2";
            CONST.INSTANCE_DISABLED = "instance_3";
            CONST.INSTANCE_HIT = "instance_3";
            CONST.STATE_OUT = "state_out";
            CONST.NEXTSCENE = "nextbutton";
            CONST.PREVSCENE = "prevbutton";
            CONST.MOUSE_MOVE = "mousemove";
            CONST.MOUSE_DOWN = "mousedown";
            CONST.MOUSE_UP = "mouseup";
            CONST.MOUSE_CLICK = "click";
            CONST.DOUBLE_CLICK = "dblclick";
            CONST.BUTTON_CLICK = "buttonclick";
            CONST.CLICK = "click";
            CONST.CANCELNAV = "CancelNav";
            CONST.OKNAV = "OK";
            CONST.ENDMODAL = "ENDMODAL";
            CONST.DLGSTAY = "DLGStay";
            CONST.DLGNEXT = "DLGNext";
            CONST.EF_REPLAY = "rootreplay";
            CONST.EF_CANCEL = "rootcancel";
            CONST.EF_PAUSING = "rootpause";
            CONST.EF_PLAYING = "rootplay";
            CONST.LUMA_R = 0.212671;
            CONST.LUMA_G = 0.71516;
            CONST.LUMA_B = 0.072169;
            CONST.SESSION_START = "sessionstart";
            CONST.SESSION_RUNNING = "sessionrunning";
            CONST.SESSION_INTERRUPTED = "sessioninterrupted";
            CONST.SESSION_COMPLETE = "sessioncomplete";
            CONST.xmlUSER_AUTH = "userAuth";
            CONST.xmlUPDATE_PROGRESS = "updateProgress";
            CONST.xmlLOG_STATE = "logState";
            CONST.xmlQUERY_STATE = "queryState";
            CONST.xmlACKAUTH = "ackauth";
            CONST.xmlNAKAUTH = "nakauth";
            CONST.xmlACKPROGLOG = "ackprogresslog";
            CONST.xmlNAKPROGLOG = "nakprogresslog";
            CONST.xmlACKSTATEQUERY = "ackstatequery";
            CONST.xmlNAKSTATEQUERY = "nakstatequery";
            CONST.xmlACKLATESTSTATEQUERY = "acklateststatequery";
            CONST.xmlNAKLATESTSTATEQUERY = "naklateststatequery";
            CONST.xmlACKSTATELOG = "ackstatelog";
            CONST.xmlNAKSTATELOG = "nakstatelog";
            CONST.xmlERROR = "error";
            CONST.xmlMESSAGE = "message";
            CONST.xmlSQLERROR = "sqlerror";
            CONST.INVALID_USER = "INVALID_USERPASS";
            CONST.PLAY_FAILED = "playFailed";
            CONST.PORT_NTP = 12000;
            CONST.PORT_ARBITER = 12001;
            CONST.PORT_SERVER = 12002;
            CONST.PORT_LOGGER = 12003;
            CONST.RECLOGNONE = 0;
            CONST.RECORDEVENTS = 1;
            CONST.LOGEVENTS = 2;
            CONST.RECLOGEVENTS = 3;
            CONST.MODE_JSON = "MODE_JSON";
            CONST.JSON_ACKLOG = "JSON_ACKLOG";
            CONST.JSON_ACKTERM = "JSON_ACKTERM";
            CONST.FIND = '"find"';
            CONST.INSERT = '"insert"';
            CONST.CREATEACCT = '"createacct"';
            CONST.UPSERT = '"upsert"';
            CONST.UPDATE = '"update"';
            CONST.UNSET = '"unset"';
            CONST.REMOVE = '"remove"';
            CONST.RECYCLE = '"recycle"';
            CONST.RECOVER = '"recover"';
            CONST.DBCOMMAND = '"dbcommand"';
            CONST.DBRUN_DBCOMMAND = "dbcommand";
            CONST.DBRUN_LISTDBS = "listdatabases";
            CONST.DBRUN_LISTCOLS = "listcollections";
            CONST.DBRUN_DROPCOLLECTION = "dropcollection";
            CONST.DBRUN_UPDATEDOCUMENT = "updatedocument";
            CONST.ACK_FIND = 'find';
            CONST.ACK_INSERT = 'insert';
            CONST.ACK_CREATEACCT = 'createacct';
            CONST.ACK_UPSERT = 'upsert';
            CONST.ACK_UPDATE = 'update';
            CONST.ACK_UNSET = 'unset';
            CONST.ACK_REMOVE = 'remove';
            CONST.ACK_RECYCLE = 'recycle';
            CONST.ACK_RECOVER = 'recover';
            CONST.ACK_DBCOMMAND = 'dbcommand';
            CONST.QUERY_ALL = "";
            CONST.LOG_PACKET = '"LOG_PACKET"';
            CONST.LOG_TERMINATE = '"LOG_TERMINATE"';
            CONST.LOG_PROGRESS = '"LOG_PROGRESS"';
            CONST.ACKLOG_PACKET = 'LOG_PACKET';
            CONST.ACKLOG_TERMINATE = 'LOG_TERMINATE';
            CONST.ACKLOG_PROGRESS = 'LOG_PROGRESS';
            CONST.ACKLOG_NAK = 'NAK_ERROR';
            CONST._READY = "READY";
            CONST._INPROGRESS = "IN PROGRESS";
            CONST._COMPLETE = "COMPLETE";
            CONST.GOTONEXTSCENE = "incTutorGraph";
            CONST.GOTONEXTTRACK = "incSceneGraph";
            CONST.TIMER = "timeout";
            CONST.TIMER_COMPLETE = "timercomplete";
            exports_5("CONST", CONST);
        }
    };
});
System.register("core/CEFTimer", ["events/CEFEvent", "util/CONST", "util/CUtil"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var CEFEvent_1, CONST_1, CUtil_2, Ticker, EventDispatcher, CEFTimer;
    return {
        setters: [
            function (CEFEvent_1_1) {
                CEFEvent_1 = CEFEvent_1_1;
            },
            function (CONST_1_1) {
                CONST_1 = CONST_1_1;
            },
            function (CUtil_2_1) {
                CUtil_2 = CUtil_2_1;
            }
        ],
        execute: function () {
            Ticker = createjs.Ticker;
            EventDispatcher = createjs.EventDispatcher;
            CEFTimer = class CEFTimer extends EventDispatcher {
                constructor(time, repeatCount = 0) {
                    super();
                    this.traceMode = false;
                    this._time = time;
                    this._repeatCount = repeatCount;
                    this.count = 0;
                    this.repeats = 0;
                    this.paused = true;
                    this.frame_ms = (1 / Ticker.framerate) * 1000;
                    this.frameRate = Ticker.framerate;
                    this._handler = null;
                    this._event = null;
                }
                static startTimer(duration, callback, scope, event) {
                    let timer = new CEFTimer(duration);
                    timer.publicEvent = event;
                    timer._event = event;
                    timer._handler = callback;
                    timer._scope = scope;
                    timer.start();
                    return timer;
                }
                tick(evt) {
                    this.count += this.frame_ms;
                    if (!this.paused && (this.count > this._time)) {
                        this.count = 0;
                        if (this._handler) {
                            this._handler.call(this._scope, this._event, this);
                        }
                        else
                            this.dispatchEvent(new Event(CONST_1.CONST.TIMER));
                        if (this._repeatCount > 0) {
                            this.repeats++;
                            if (this.repeats >= this._repeatCount) {
                                Ticker.off(CEFEvent_1.CEFEvent.ENTER_FRAME, this._tickHandler);
                                this.dispatchEvent(new Event(CONST_1.CONST.TIMER_COMPLETE));
                            }
                        }
                    }
                }
                timerAddThis() {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" timerAddThis : ");
                    var fAdd = true;
                    for (var i1 = 0; i1 < CEFTimer.activeTimers.length; i1++) {
                        if (CEFTimer.activeTimers[i1] == this) {
                            fAdd = false;
                            break;
                        }
                    }
                    if (fAdd)
                        CEFTimer.activeTimers.push(this);
                }
                timerRemoveThis() {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" timerRemoveThis : ");
                    for (var i1 = 0; i1 < CEFTimer.activeTimers.length; i1++) {
                        if (CEFTimer.activeTimers[i1] == this) {
                            CEFTimer.activeTimers.splice(i1, 1);
                            break;
                        }
                    }
                }
                connectToTutor() {
                    if (CEFTimer.tutorDoc) {
                        CEFTimer.tutorDoc.tutorContainer.on(CONST_1.CONST.EF_CANCEL, this.cancelTimers, this);
                        CEFTimer.tutorDoc.tutorContainer.on(CONST_1.CONST.EF_PAUSING, this.pauseTimers, this);
                        CEFTimer.tutorDoc.tutorContainer.on(CONST_1.CONST.EF_PLAYING, this.playTimers, this);
                        this.timerAddThis();
                    }
                }
                disConnectFromTutor() {
                    if (CEFTimer.tutorDoc) {
                        CEFTimer.tutorDoc.tutorContainer.off(CONST_1.CONST.EF_CANCEL, this.cancelTimers, this);
                        CEFTimer.tutorDoc.tutorContainer.off(CONST_1.CONST.EF_PAUSING, this.pauseTimers, this);
                        CEFTimer.tutorDoc.tutorContainer.off(CONST_1.CONST.EF_PLAYING, this.playTimers, this);
                        this.timerRemoveThis();
                    }
                }
                start() {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" Timer is starting");
                    this.connectToTutor();
                    this.paused = false;
                    this._tickHandler = Ticker.on(CEFEvent_1.CEFEvent.ENTER_FRAME, this.tick, this);
                }
                stop() {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" Timer is stopping");
                    this.disConnectFromTutor();
                    this.paused = true;
                    Ticker.off(CEFEvent_1.CEFEvent.ENTER_FRAME, this._tickHandler);
                }
                reset() {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace("Timer is resetting");
                    this.disConnectFromTutor();
                    this.count = 0;
                    this.repeats = 0;
                    this.paused = true;
                    Ticker.off(CEFEvent_1.CEFEvent.ENTER_FRAME, this._tickHandler);
                }
                cancelTimers(evt) {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" cancelTimers : " + CEFTimer.activeTimers.length);
                    var tCount = CEFTimer.activeTimers.length;
                    for (var i1 = 0; i1 < tCount; i1++) {
                        CEFTimer.activeTimers[0].stop();
                        CEFTimer.activeTimers.pop();
                    }
                }
                pauseTimers(evt) {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" pauseTimers : " + CEFTimer.activeTimers.length);
                    for (var i1 = 0; i1 < CEFTimer.activeTimers.length; i1++) {
                        CEFTimer.activeTimers[i1].stop();
                    }
                }
                playTimers(evt) {
                    if (this.traceMode)
                        CUtil_2.CUtil.trace(" playTimers : " + CEFTimer.activeTimers.length);
                    for (var i1 = 0; i1 < CEFTimer.activeTimers.length; i1++) {
                        CEFTimer.activeTimers[i1].start();
                    }
                }
            };
            CEFTimer.activeTimers = new Array();
            exports_6("CEFTimer", CEFTimer);
        }
    };
});
System.register("events/CEFNavEvent", ["util/CUtil"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var CUtil_3, Event, CEFNavEvent;
    return {
        setters: [
            function (CUtil_3_1) {
                CUtil_3 = CUtil_3_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFNavEvent = class CEFNavEvent extends Event {
                constructor(type, _target = null, _featureSet = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.wozNavTarget = _target;
                    this.wozFeatures = _featureSet;
                }
                clone() {
                    CUtil_3.CUtil.trace("cloning WOZEvent:");
                    return new CEFNavEvent(this.type, this.wozNavTarget, this.wozFeatures, this.bubbles, this.cancelable);
                }
            };
            CEFNavEvent.WOZNAVNEXT = "WOZNAVNEXT";
            CEFNavEvent.WOZNAVBACK = "WOZNAVBACK";
            CEFNavEvent.WOZNAVTO = "WOZNAVTO";
            CEFNavEvent.WOZNAVINC = "WOZNAVINC";
            CEFNavEvent.WOZNAVREPLAY = "WOZNAVREPLAY";
            exports_7("CEFNavEvent", CEFNavEvent);
        }
    };
});
System.register("scenegraph/IAudioTypes", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("events/CEFSceneCueEvent", ["util/CUtil"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Event, CUtil_4, CEFSceneCueEvent;
    return {
        setters: [
            function (CUtil_4_1) {
                CUtil_4 = CUtil_4_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFSceneCueEvent = class CEFSceneCueEvent extends Event {
                constructor(type, CueID, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.cueID = CueID;
                }
                clone() {
                    CUtil_4.CUtil.trace("cloning CEFSceneCueEvent:");
                    return new CEFSceneCueEvent(this.type, this.cueID, this.bubbles, this.cancelable);
                }
            };
            CEFSceneCueEvent.CUEPOINT = "cuePoint";
            exports_9("CEFSceneCueEvent", CEFSceneCueEvent);
        }
    };
});
System.register("scenegraph/CSceneHistoryNode", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var CSceneHistoryNode;
    return {
        setters: [],
        execute: function () {
            CSceneHistoryNode = class CSceneHistoryNode extends Object {
                constructor(_node, _track) {
                    super();
                    this.track = _track;
                    this.trackNdx = _node.index;
                    this.node = _node;
                }
            };
            exports_10("CSceneHistoryNode", CSceneHistoryNode);
        }
    };
});
System.register("scenegraph/CSceneEdge", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var CSceneEdge;
    return {
        setters: [],
        execute: function () {
            CSceneEdge = class CSceneEdge {
                constructor(_tutorDoc) {
                    this.tutorDoc = _tutorDoc;
                }
                static factory(_tutorDoc, parent, factory) {
                    let edge = new CSceneEdge(_tutorDoc);
                    edge._parent = parent;
                    edge._edgeConst = factory.constraint;
                    edge._edgeNode = factory.edge;
                    return edge;
                }
                testConstraint() {
                    let result = true;
                    result = (this._edgeConst === "") ? true : this._parent.sceneInstance.$nodeConstraint(this._edgeConst);
                    this._parent.sceneInstance.$updateNav();
                    return result;
                }
                followEdge() {
                    return this._parent.findNodeByName(this._edgeNode);
                }
            };
            exports_11("CSceneEdge", CSceneEdge);
        }
    };
});
System.register("scenegraph/CSceneNode", ["scenegraph/CSceneEdge"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var CSceneEdge_1, EventDispatcher, CSceneNode;
    return {
        setters: [
            function (CSceneEdge_1_1) {
                CSceneEdge_1 = CSceneEdge_1_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CSceneNode = class CSceneNode extends EventDispatcher {
                constructor(_tutorDoc, target = null) {
                    super();
                    this._edges = new Array;
                    this.tutorDoc = _tutorDoc;
                }
                nodeFactory(parent, id, nodefactory) {
                    this._parent = parent;
                    this._parentScene = parent._parentScene;
                    this._id = id;
                    this._type = nodefactory.type;
                    this._name = nodefactory.name;
                    for (let edge of nodefactory.edges) {
                        this._edges.push(CSceneEdge_1.CSceneEdge.factory(this.tutorDoc, parent, edge));
                    }
                }
                gotoNextTrack(bUserEvent = false) {
                    return null;
                }
                nextNode() {
                    let edge;
                    let node = null;
                    this._parent.sceneInstance.$nodePreExit(this._id);
                    for (edge of this._edges) {
                        if (edge.testConstraint()) {
                            node = edge.followEdge();
                            if (node != null) {
                                this._parentScene.graphState = node._id;
                                node._parent.sceneInstance.$nodePreEnter(node._id);
                            }
                            break;
                        }
                    }
                    return node;
                }
                seekToTrack(historyNode) {
                }
                get name() {
                    return this._name;
                }
                get id() {
                    return this._id;
                }
                get index() {
                    return -1;
                }
                applyNode() {
                    return false;
                }
                resetNode() {
                }
            };
            exports_12("CSceneNode", CSceneNode);
        }
    };
});
System.register("scenegraph/CSceneModule", ["scenegraph/CSceneNode", "scenegraph/CSceneTrack", "util/CUtil"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var CSceneNode_1, CSceneTrack_1, CUtil_5, CSceneModule;
    return {
        setters: [
            function (CSceneNode_1_1) {
                CSceneNode_1 = CSceneNode_1_1;
            },
            function (CSceneTrack_1_1) {
                CSceneTrack_1 = CSceneTrack_1_1;
            },
            function (CUtil_5_1) {
                CUtil_5 = CUtil_5_1;
            }
        ],
        execute: function () {
            CSceneModule = class CSceneModule extends CSceneNode_1.CSceneNode {
                constructor(_tutorDoc, target = null) {
                    super(_tutorDoc, target);
                    this._tracks = new Array;
                    this._ndx = -1;
                }
                static factory(_tutorDoc, parent, nodeName, moduleFactory) {
                    let node = new CSceneModule(_tutorDoc);
                    node.nodeFactory(parent, nodeName, moduleFactory);
                    if (moduleFactory.type == "moduleRef") {
                        moduleFactory = parent._graphFactory.CModules[node._name];
                    }
                    node._reuse = moduleFactory.reuse;
                    let actiontracks = moduleFactory.actiontracks;
                    for (let track of actiontracks) {
                        node._tracks.push(new CSceneTrack_1.CSceneTrack(_tutorDoc, track, parent));
                    }
                    return node;
                }
                gotoNextTrack() {
                    let nextTrack;
                    let features;
                    let featurePass = false;
                    while (this._ndx < this._tracks.length) {
                        this._ndx++;
                        nextTrack = this._tracks[this._ndx];
                        if (nextTrack != null) {
                            features = nextTrack.features;
                            if (features != "") {
                                featurePass = this.tutorDoc.testFeatureSet(features);
                                if (featurePass) {
                                    if (nextTrack.hasPFeature) {
                                        featurePass = nextTrack.testPFeature();
                                    }
                                }
                            }
                            else {
                                if (nextTrack.hasPFeature) {
                                    featurePass = nextTrack.testPFeature();
                                }
                                else
                                    featurePass = true;
                            }
                            if (featurePass) {
                                CUtil_5.CUtil.trace("Track Features: " + features + " passed:" + featurePass);
                                nextTrack = nextTrack.resolve();
                                break;
                            }
                        }
                        else
                            break;
                    }
                    if (this._ndx >= this._tracks.length) {
                        if (this._reuse) {
                            this.resetNode();
                        }
                    }
                    return nextTrack;
                }
                seekToTrack(historyNode) {
                    let seekTrack;
                    this._ndx = historyNode.trackNdx;
                    seekTrack = this._tracks[this._ndx];
                    seekTrack = seekTrack.resolve();
                    return seekTrack;
                }
                get index() {
                    return this._ndx;
                }
                applyNode() {
                    return false;
                }
                resetNode() {
                    this._ndx = -1;
                }
            };
            exports_13("CSceneModule", CSceneModule);
        }
    };
});
System.register("scenegraph/CSceneGraph", ["scenegraph/CSceneNode", "scenegraph/CSceneModule"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var CSceneNode_2, CSceneModule_1, CSceneGraph;
    return {
        setters: [
            function (CSceneNode_2_1) {
                CSceneNode_2 = CSceneNode_2_1;
            },
            function (CSceneModule_1_1) {
                CSceneModule_1 = CSceneModule_1_1;
            }
        ],
        execute: function () {
            CSceneGraph = class CSceneGraph extends CSceneNode_2.CSceneNode {
                constructor(_tutorDoc) {
                    super(_tutorDoc);
                    this._nodes = {};
                }
                static factory(_tutorDoc, parent, hostModule, sceneName) {
                    let scenegraph = new CSceneGraph(_tutorDoc);
                    try {
                        scenegraph._graphFactory = _tutorDoc.sceneGraph[hostModule][sceneName];
                        if (scenegraph._graphFactory == undefined)
                            throw ("missing scene");
                    }
                    catch (err) {
                        console.log("Error: Missing scene graph: " + hostModule + ":" + sceneName);
                    }
                    scenegraph.sceneInstance = parent;
                    scenegraph.volatile = scenegraph._graphFactory.volatile || false;
                    scenegraph.parseNodes();
                    scenegraph.seekRoot();
                    console.log("SCENEGRAPH: State:" + parent.name + ":ROOT");
                    return scenegraph;
                }
                seekRoot() {
                    this._currNode = this._nodes["root"];
                    this._parentScene.graphState = "root";
                }
                get sceneInstance() {
                    return this._parentScene;
                }
                set sceneInstance(scene) {
                    this._parentScene = scene;
                }
                get volatile() {
                    return this._volatile;
                }
                set volatile(value) {
                    this._volatile = value;
                }
                queryPFeature(pid, size, cycle) {
                    let iter = 0;
                    if (this.tutorDoc._pFeatures[pid] != undefined) {
                        iter = this.tutorDoc._pFeatures[pid] + 1;
                        if (iter >= size) {
                            iter = size - cycle;
                        }
                        this.tutorDoc._pFeatures[pid] = iter;
                    }
                    else
                        this.tutorDoc._pFeatures[pid] = 0;
                    return iter;
                }
                gotoNextTrack(bUserEvent) {
                    let inGroup = true;
                    if (this._currNode)
                        do {
                            if (bUserEvent && this._currTrack && this._currTrack.isGroup) {
                                while (this._currTrack && inGroup) {
                                    inGroup = this._currTrack.isAutoStep && this._currTrack.isGroup;
                                    this._currTrack = this._currNode.gotoNextTrack();
                                    this._rootTrack = this._rootTrack || this._currTrack;
                                }
                            }
                            else {
                                this._currTrack = this._currNode.gotoNextTrack();
                                this._rootTrack = this._rootTrack || this._currTrack;
                            }
                            if (this._currTrack == null) {
                                this._currNode = this._currNode.nextNode();
                                if (this._currNode)
                                    console.log("SCENEGRAPH: State:" + this._currNode.id);
                            }
                        } while ((this._currTrack == null) && (this._currNode != null));
                    this._prevTrack = this._currTrack;
                    return this._currTrack;
                }
                seekToTrack(historyNode) {
                    this._currNode = historyNode.node;
                    this._currTrack = historyNode.track;
                    return this._currNode.seekToTrack(historyNode);
                }
                parseNodes() {
                    let nodeList = this._graphFactory.CNodes;
                    for (let name in nodeList) {
                        if (!(name.startsWith("COMMENT"))) {
                            let nodeType = nodeList[name].subtype || nodeList[name].type;
                            switch (nodeType) {
                                case "module":
                                    try {
                                        this._nodes[name] = CSceneModule_1.CSceneModule.factory(this.tutorDoc, this, name, nodeList[name]);
                                    }
                                    catch (err) {
                                        console.error("ERROR: invalid module specification in sceneGraph:" + name);
                                    }
                                    break;
                                default:
                                    console.log("Error: Invalid Node Type: " + nodeType);
                                    break;
                            }
                        }
                    }
                    return true;
                }
                findNodeByName(name) {
                    return this._nodes[name];
                }
                get node() {
                    return this._currNode;
                }
                get rootTrack() {
                    return this._rootTrack;
                }
                set node(newNode) {
                    if (this._currNode != newNode)
                        this._currNode.resetNode();
                    this._currNode = newNode;
                }
                resetRoot() {
                    this._currNode = this._nodes["root"];
                    this._currNode.resetNode();
                }
            };
            exports_14("CSceneGraph", CSceneGraph);
        }
    };
});
System.register("scenegraph/CSceneChoiceSet", ["scenegraph/CSceneNode", "scenegraph/CSceneTrack"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var CSceneNode_3, CSceneTrack_2, CSceneChoiceSet;
    return {
        setters: [
            function (CSceneNode_3_1) {
                CSceneNode_3 = CSceneNode_3_1;
            },
            function (CSceneTrack_2_1) {
                CSceneTrack_2 = CSceneTrack_2_1;
            }
        ],
        execute: function () {
            CSceneChoiceSet = class CSceneChoiceSet extends CSceneNode_3.CSceneNode {
                constructor(_tutorDoc, target = null) {
                    super(_tutorDoc, target);
                    this._choices = new Array;
                    this._iter = 0;
                    this._replace = true;
                }
                static factory(_tutorDoc, parent, nodeName, moduleFactory) {
                    let node = new CSceneChoiceSet(_tutorDoc);
                    if (moduleFactory.type == "moduleRef") {
                        node.nodeFactory(parent, nodeName, moduleFactory);
                        moduleFactory = parent._graphFactory.CChoiceSets[node._name];
                    }
                    let choices = moduleFactory.choices;
                    for (let set in choices) {
                        node._choices.push(new CSceneTrack_2.CSceneTrack(_tutorDoc, set, parent));
                    }
                    node._replace = moduleFactory.replace;
                    node._cycle = Number(moduleFactory.cycle);
                    node._count = node._choices[0].count;
                    return node;
                }
                choose() {
                    let nextTrack;
                    let choice;
                    let curOdds = 0;
                    let sampleSize;
                    let rand;
                    do {
                        for (let choice of this._choices) {
                            sampleSize += choice.odds(this._iter);
                        }
                        if (sampleSize == 0) {
                            for (choice of this._choices) {
                                choice.replace();
                            }
                        }
                    } while (sampleSize == 0);
                    rand = Math.floor(Math.random() * sampleSize);
                    for (let choice of this._choices) {
                        curOdds += choice.odds(this._iter);
                        if (rand < curOdds) {
                            nextTrack = choice;
                            if (!this._replace)
                                choice.choose();
                            this._iter++;
                            if (this._iter >= this._count) {
                                this._iter = this._count - this._cycle;
                            }
                            break;
                        }
                    }
                    return nextTrack;
                }
            };
            exports_15("CSceneChoiceSet", CSceneChoiceSet);
        }
    };
});
System.register("thermite/events/TMouseEvent", ["util/CUtil"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var CUtil_6, MouseEvent, TMouseEvent;
    return {
        setters: [
            function (CUtil_6_1) {
                CUtil_6 = CUtil_6_1;
            }
        ],
        execute: function () {
            MouseEvent = createjs.MouseEvent;
            TMouseEvent = class TMouseEvent extends MouseEvent {
                constructor(TarObjID, type, bubbles = false, cancelable = false, stageX = 0, stageY = 0, nativeEvent = null, pointerID = 0, primary = false, rawX = 0, rawY = 0) {
                    super(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY);
                }
                clone() {
                    CUtil_6.CUtil.trace("cloning MouseEvent:");
                    return new TMouseEvent(this.tarObjID, this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
                }
                captureLogState(obj = null) {
                    obj['event'] = 'TMouseEvent';
                    obj['tarObjID'] = this.tarObjID;
                    obj['localX'] = this.localX;
                    obj['localY'] = this.localY;
                    return obj;
                }
                captureXMLState() {
                    var eventState = {};
                    return eventState;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    return bTest;
                }
            };
            TMouseEvent.MOUSE_OVER = "rollover";
            TMouseEvent.MOUSE_OUT = "rollout";
            TMouseEvent.MOUSE_DOWN = "mousedown";
            TMouseEvent.MOUSE_CLICK = "pressup";
            TMouseEvent.MOUSE_MOVE = "mousemove";
            TMouseEvent.MOUSE_UP = "mouseup";
            TMouseEvent.DOUBLE_CLICK = "dblclick";
            TMouseEvent.CLICK = "click";
            TMouseEvent.WOZCLICK = "WOZMOUSE_CLICK";
            TMouseEvent.WOZCLICKED = "WOZMOUSE_CLICKED";
            TMouseEvent.WOZDBLCLICK = "WOZMOUSE_DBLCLICKED";
            TMouseEvent.WOZMOVE = "WOZMOUSE_MOVE";
            TMouseEvent.WOZDOWN = "WOZMOUSE_DOWN";
            TMouseEvent.WOZUP = "WOZMOUSE_UP";
            TMouseEvent.WOZOVER = "WOZMOUSE_OVER";
            TMouseEvent.WOZOUT = "WOZMOUSE_OUT";
            TMouseEvent.WOZKEYDOWN = "WOZKEY_DOWN";
            TMouseEvent.WOZKEYUP = "WOZMKEY_UP";
            TMouseEvent.WOZNULL = "WOZNULL";
            exports_16("TMouseEvent", TMouseEvent);
        }
    };
});
System.register("thermite/events/TTextEvent", ["events/CEFEvent", "util/CUtil"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var CEFEvent_2, CUtil_7, TTextEvent;
    return {
        setters: [
            function (CEFEvent_2_1) {
                CEFEvent_2 = CEFEvent_2_1;
            },
            function (CUtil_7_1) {
                CUtil_7 = CUtil_7_1;
            }
        ],
        execute: function () {
            TTextEvent = class TTextEvent extends CEFEvent_2.CEFEvent {
                constructor(TarObjID, Type, Index1 = 0, Index2 = 0, TextData = "", Bubbles = false, Cancelable = false) {
                    super(TarObjID, Type, Bubbles, Cancelable);
                    this.textdata = TextData;
                    this.index1 = Index1;
                    this.index2 = Index2;
                }
                clone() {
                    CUtil_7.CUtil.trace("cloning CEFTextEvent:");
                    return new TTextEvent(this.tarObjID, this.type, this.index1, this.index2, this.textdata, this.bubbles, this.cancelable);
                }
            };
            TTextEvent.WOZSETSELECTION = "wozSetSelection";
            TTextEvent.WOZSETSCROLL = "wozSetScroll";
            TTextEvent.WOZINPUTTEXT = "wozInputText";
            TTextEvent.WOZCAPTUREFOCUS = "wozCaptureFocus";
            TTextEvent.WOZRELEASEFOCUS = "wozReleaseFocus";
            exports_17("TTextEvent", TTextEvent);
        }
    };
});
System.register("thermite/TCursorProxy", ["thermite/TRoot", "thermite/TObject", "thermite/TSceneBase", "thermite/events/TMouseEvent", "thermite/events/TTextEvent", "util/CUtil"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var TRoot_1, TObject_1, TSceneBase_1, TMouseEvent_1, TTextEvent_1, CUtil_8, Point, Tween, Ease, TCursorProxy;
    return {
        setters: [
            function (TRoot_1_1) {
                TRoot_1 = TRoot_1_1;
            },
            function (TObject_1_1) {
                TObject_1 = TObject_1_1;
            },
            function (TSceneBase_1_1) {
                TSceneBase_1 = TSceneBase_1_1;
            },
            function (TMouseEvent_1_1) {
                TMouseEvent_1 = TMouseEvent_1_1;
            },
            function (TTextEvent_1_1) {
                TTextEvent_1 = TTextEvent_1_1;
            },
            function (CUtil_8_1) {
                CUtil_8 = CUtil_8_1;
            }
        ],
        execute: function () {
            Point = createjs.Point;
            Tween = createjs.Tween;
            Ease = createjs.Ease;
            TCursorProxy = class TCursorProxy extends TRoot_1.TRoot {
                constructor() {
                    super();
                    this.curObject = null;
                    this.actObject = null;
                    this.cLocation = new Point;
                    this.fSparkler = true;
                    this.fSparklerTest = false;
                    this.fSparklerDrag = false;
                    this.fLiveLog = false;
                    this.init1();
                }
                TCursorProxyInitialize() {
                    this.TRootInitialize.call(this);
                    this.init1();
                }
                initialize() {
                    this.TRootInitialize.call(this);
                    this.init1();
                }
                init1() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("CEFCursorProxy:Constructor");
                    this.name = "WOZvCursor";
                    this.setCursorStyle("Sstandard");
                }
                setCursorStyle(style) {
                    this.Sstandard.visible = false;
                    this.Ssmallhand.visible = false;
                    this.Shand.visible = false;
                    this.Sautomate.visible = false;
                    this[style].visible = true;
                }
                initWOZCursor(sMode) {
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("Initializing WOZ Cursor Automation:");
                    this.sAuto = sMode;
                    if (sMode == TCursorProxy.WOZLIVE) {
                        this.stage.addEventListener(TMouseEvent_1.TMouseEvent.MOUSE_MOVE, this.liveMouseMove);
                        this.stage.addEventListener(TMouseEvent_1.TMouseEvent.MOUSE_DOWN, this.liveMouseDown);
                        this.stage.addEventListener(TMouseEvent_1.TMouseEvent.MOUSE_UP, this.liveMouseUp);
                        this.stage.addEventListener(TMouseEvent_1.TMouseEvent.DOUBLE_CLICK, this.liveMouseDblClick);
                    }
                    else if (sMode == TCursorProxy.WOZREPLAY) {
                        this.stage.removeEventListener(TMouseEvent_1.TMouseEvent.MOUSE_MOVE, this.liveMouseMove);
                        this.stage.removeEventListener(TMouseEvent_1.TMouseEvent.MOUSE_DOWN, this.liveMouseDown);
                        this.stage.removeEventListener(TMouseEvent_1.TMouseEvent.MOUSE_UP, this.liveMouseUp);
                        this.stage.removeEventListener(TMouseEvent_1.TMouseEvent.DOUBLE_CLICK, this.liveMouseDblClick);
                    }
                }
                decodeTarget(baseObj, objArray) {
                    let tmpObject = null;
                    let subObject;
                    subObject = objArray.shift();
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("decoding: " + subObject);
                    if ((subObject != "null") && (subObject != "none")) {
                        tmpObject = baseObj[subObject];
                        if (objArray.length)
                            tmpObject = this.decodeTarget(tmpObject, objArray);
                    }
                    return tmpObject;
                }
                initPlayBack() {
                    this.lastFrameTime = 0;
                }
                playBackAction(wozEvt) {
                    let traceAction = false;
                    let tarObject;
                    let objArray;
                    if (traceAction)
                        CUtil_8.CUtil.trace("PlayBack Action: " + wozEvt);
                    if (wozEvt.CEFMouseEvent != undefined) {
                        this.x = wozEvt.CEFMouseEvent.localX;
                        this.y = wozEvt.CEFMouseEvent.localY;
                        if (this.fSparklerTest) {
                            this.fSparklerTest = false;
                            if (wozEvt.CEFMouseEvent.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZMOVE)
                                this.fSparklerDrag = true;
                        }
                        if ((wozEvt.CEFMouseEvent.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZDOWN) && this.fSparkler) {
                            this.fSparklerDrag = false;
                            this.fSparklerTest = true;
                            this.Ssparkle.gotoAndPlay(2);
                        }
                        if ((wozEvt.CEFMouseEvent.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZUP) && this.fSparklerDrag)
                            this.Ssparkle.gotoAndPlay(10);
                        if (traceAction)
                            CUtil_8.CUtil.trace("Splitting: " + wozEvt.CEFMouseEvent.CEFEvent.target + " EVT TYPE: " + wozEvt.CEFMouseEvent.CEFEvent.type);
                        objArray = wozEvt.CEFMouseEvent.CEFEvent.target.split(".");
                        if (traceAction)
                            CUtil_8.CUtil.trace("Target Array: " + objArray[0]);
                        tarObject = this.decodeTarget(this.tutorDoc.tutorContainer, objArray);
                        if (tarObject) {
                            if (traceAction)
                                CUtil_8.CUtil.trace("Automation Target: " + tarObject + " Event: " + wozEvt.CEFMouseEvent.CEFEvent.type);
                            let evt = new TMouseEvent_1.TMouseEvent(tarObject.objID, wozEvt.CEFMouseEvent.CEFEvent.type, wozEvt.bubbles, wozEvt.cancelable, wozEvt.stageX, wozEvt.stageY, wozEvt.nativeEvent, wozEvt.pointerID, wozEvt.primary, wozEvt.rawX, wozEvt.rawY);
                            tarObject.dispatchEvent(evt);
                        }
                    }
                    else if (wozEvt.CEFTextEvent != undefined) {
                        if (traceAction)
                            CUtil_8.CUtil.trace("Splitting: " + wozEvt.CEFTextEvent.CEFEvent.target + " EVT TYPE: " + wozEvt.CEFTextEvent.CEFEvent.type);
                        if (wozEvt.CEFTextEvent.CEFEvent.type == TTextEvent_1.TTextEvent.WOZINPUTTEXT) {
                            objArray = wozEvt.CEFTextEvent.CEFEvent.target.split(".");
                            if (traceAction)
                                CUtil_8.CUtil.trace("Target Array: " + objArray[0]);
                            tarObject = this.decodeTarget(this.tutorDoc.tutorContainer, objArray);
                            if (tarObject) {
                                if (traceAction)
                                    CUtil_8.CUtil.trace("Automation Target: " + tarObject + " Event: " + wozEvt.CEFTextEvent.CEFEvent.type);
                                let tEvt = new TTextEvent_1.TTextEvent(tarObject.objID, wozEvt.CEFTextEvent.CEFEvent.type, wozEvt.CEFTextEvent.index1, wozEvt.CEFTextEvent.index2, wozEvt.CEFTextEvent.text, true, false);
                                tarObject.dispatchEvent(tEvt);
                            }
                        }
                    }
                }
                playBackMove(nextMove, frameTime) {
                    let relTime = (frameTime - this.lastFrameTime) / (nextMove.time - this.lastFrameTime);
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("PlayBack Move");
                    this.x += relTime * (nextMove.CEFMouseEvent.localX - this.x);
                    this.y += relTime * (nextMove.CEFMouseEvent.localY - this.y);
                    this.lastFrameTime = frameTime;
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("-- Target X: " + nextMove.CEFMouseEvent.localX + " -- Target Y: " + nextMove.CEFMouseEvent.localY);
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("-- Mouse  X: " + this.x + " -- Mouse  Y: " + this.y);
                }
                replayEvent(xEvt) {
                    let tarObject;
                    let objArray;
                    this.x = xEvt.localX;
                    this.y = xEvt.localY;
                    if (this.fSparklerTest) {
                        this.fSparklerTest = false;
                        if (xEvt.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZMOVE)
                            this.fSparklerDrag = true;
                    }
                    if ((xEvt.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZDOWN) && this.fSparkler) {
                        this.fSparklerDrag = false;
                        this.fSparklerTest = true;
                        this.Ssparkle.gotoAndPlay(2);
                    }
                    if ((xEvt.CEFEvent.type.toString() == TMouseEvent_1.TMouseEvent.WOZUP) && this.fSparklerDrag)
                        this.Ssparkle.gotoAndPlay(10);
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("Splitting: " + xEvt.CEFEvent.target + " EVT TYPE: " + xEvt.CEFEvent.type);
                    objArray = xEvt.CEFEvent.target.split(".");
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("Target Array: " + objArray[0]);
                    tarObject = this.decodeTarget(this.tutorDoc.tutorContainer, objArray);
                    if (tarObject) {
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("Automation Target: " + tarObject + " Event: " + xEvt.CEFEvent.type);
                        let evt = new TMouseEvent_1.TMouseEvent(tarObject.objID, xEvt.CEFEvent.type, xEvt.bubbles, xEvt.cancelable, xEvt.stageX, xEvt.stageY, xEvt.nativeEvent, xEvt.pointerID, xEvt.primary, xEvt.rawX, xEvt.rawY);
                        tarObject.dispatchEvent(evt);
                    }
                }
                replayEventB(xEvt) {
                    let tarObject;
                    this.x = xEvt.localX;
                    this.y = xEvt.localY;
                    tarObject = this.hitTestCoord(this.x, this.y);
                    if (tarObject) {
                        switch (xEvt.CEFEvent.type.toString()) {
                            case TMouseEvent_1.TMouseEvent.WOZMOVE:
                                return;
                            case TMouseEvent_1.TMouseEvent.WOZOUT:
                                tarObject = this.curObject;
                                break;
                            case TMouseEvent_1.TMouseEvent.WOZOVER:
                                this.curObject = tarObject;
                                break;
                            case TMouseEvent_1.TMouseEvent.WOZUP:
                                tarObject = this.actObject;
                                break;
                            case TMouseEvent_1.TMouseEvent.WOZDOWN:
                                this.actObject = this.curObject;
                                tarObject = this.curObject;
                                break;
                            case TMouseEvent_1.TMouseEvent.WOZCLICKED:
                                tarObject = this.actObject;
                                break;
                            case TMouseEvent_1.TMouseEvent.WOZDBLCLICK:
                                tarObject = this.actObject;
                                break;
                        }
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("Automation Target: " + tarObject + " Event: " + xEvt.CEFEvent.type);
                        let evt = new TMouseEvent_1.TMouseEvent(tarObject.objID, xEvt.CEFEvent.type, xEvt.bubbles, xEvt.cancelable, xEvt.stageX, xEvt.stageY, xEvt.nativeEvent, xEvt.pointerID, xEvt.primary, xEvt.rawX, xEvt.rawY);
                        tarObject.dispatchEvent(evt);
                    }
                }
                replayEventAndMove(xEvt, laEvt, l2Evt) {
                    let tweens;
                    let easingX;
                    let easingY;
                    let v1;
                    let v2;
                    let dX;
                    let dY;
                    this.replayEvent(xEvt);
                    let replayTime = (laEvt.CEFEvent.evtTime - xEvt.CEFEvent.evtTime) / 1000;
                    let replayTim2 = (l2Evt.CEFEvent.evtTime - laEvt.CEFEvent.evtTime) / 1000;
                    if (replayTime > 0) {
                        if (l2Evt == null) {
                            easingX = Ease.cubicOut;
                            easingY = Ease.cubicOut;
                        }
                        else {
                            dX = Math.abs(laEvt.localX - xEvt.localX);
                            v1 = dX / replayTime;
                            v2 = Math.abs(l2Evt.localX - laEvt.localX) / replayTim2;
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("delta T:" + replayTime + " : " + replayTim2);
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("X: v1/v2:  " + (v1 / v2));
                            if (dX < 10) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.linear");
                                easingX = Ease.linear;
                            }
                            else if ((v1 == 0) || (v2 == 0)) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.linear");
                                easingX = Ease.linear;
                            }
                            else if ((v1 / v2) > 3.5) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.cubicOut");
                                easingX = Ease.cubicOut;
                            }
                            else if ((v1 / v2) < .30) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.cubicIn");
                                easingX = Ease.cubicIn;
                            }
                            else {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.linear");
                                easingX = Ease.linear;
                            }
                            dY = Math.abs(laEvt.localY - xEvt.localY);
                            v1 = dY / replayTime;
                            v2 = Math.abs(l2Evt.localY - laEvt.localY) / replayTim2;
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("Y: v1/v2:  " + (v1 / v2));
                            if (dY < 10) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.linear");
                                easingY = Ease.linear;
                            }
                            else if ((v1 == 0) || (v2 == 0)) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing X: Ease.linear");
                                easingY = Ease.linear;
                            }
                            else if ((v1 / v2) > 3.5) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing Y: Ease.cubicOut");
                                easingY = Ease.cubicOut;
                            }
                            else if ((v1 / v2) < .30) {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing Y: Ease.cubicIn");
                                easingY = Ease.cubicIn;
                            }
                            else {
                                if (this.traceMode)
                                    CUtil_8.CUtil.trace("Easing Y: Ease.linear");
                                easingY = Ease.linear;
                            }
                        }
                        tweens = new Array;
                        tweens[0] = new Tween(this).to({ x: laEvt.localX }, replayTime, easingX);
                        tweens[1] = new Tween(this).to({ y: laEvt.localY }, replayTime, easingY);
                    }
                    return tweens;
                }
                replayMove(oldTime, laEvt) {
                    let tweens;
                    let replayTime = (laEvt.CEFEvent.evtTime - oldTime) / 1000;
                    if (replayTime > 0) {
                        tweens = new Array;
                        tweens[0] = new Tween(this).to({ x: laEvt.localX }, replayTime, Ease.cubicInOut);
                        tweens[1] = new Tween(this).to({ y: laEvt.localY }, replayTime, Ease.cubicInOut);
                    }
                    return tweens;
                }
                liveMouseMove(evt) {
                    let evtMove;
                    let fUpdate = false;
                    let locX;
                    let locY;
                    locX = evt.stageX;
                    locY = evt.stageY;
                    if (this.x != locX) {
                        this.x = locX;
                        fUpdate = true;
                    }
                    if (this.y != locY) {
                        this.y = locY;
                        fUpdate = true;
                    }
                    if (fUpdate) {
                        this.hitTestMouse(evt);
                        if (this.curObject) {
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("CEF Mouse Move : " + this.curObject.objID);
                            evtMove = new TMouseEvent_1.TMouseEvent("none", TMouseEvent_1.TMouseEvent.WOZMOVE, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                            if (this.fLiveLog)
                                this.tutorDoc.log.logLiveEvent(evtMove.captureLogState());
                            this.curObject.dispatchEvent(evtMove);
                        }
                        else {
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("NULL Mouse Move : ");
                            evtMove = new TMouseEvent_1.TMouseEvent("none", TMouseEvent_1.TMouseEvent.WOZMOVE, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                            if (this.fLiveLog)
                                this.tutorDoc.log.logLiveEvent(evtMove.captureLogState());
                        }
                    }
                }
                liveMouseDown(evt) {
                    let locX;
                    let locY;
                    locX = evt.stageX;
                    locY = evt.stageY;
                    this.hitTestMouse(evt);
                    if (this.curObject) {
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("CEF Mouse Down : " + this.curObject.objID);
                        let evtDown = new TMouseEvent_1.TMouseEvent(this.curObject.objID, TMouseEvent_1.TMouseEvent.WOZDOWN, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                        if (this.fLiveLog)
                            this.tutorDoc.log.logLiveEvent(evtDown.captureLogState());
                        this.curObject.dispatchEvent(evtDown);
                        this.actObject = this.curObject;
                    }
                }
                liveMouseUp(evt) {
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("CEF Mouse Up : " + ((this.curObject) ? this.curObject.objID : "null"));
                    let locX;
                    let locY;
                    if (this.actObject) {
                        let evtUp = new TMouseEvent_1.TMouseEvent(this.actObject.objID, TMouseEvent_1.TMouseEvent.WOZUP, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                        if (this.fLiveLog)
                            this.tutorDoc.log.logLiveEvent(evtUp.captureLogState());
                        this.actObject.dispatchEvent(evtUp);
                        if (this.actObject == this.curObject) {
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("CEF Mouse Click : " + this.curObject.objID + "  At X:" + locX + "  Y:" + locY);
                            let evtClicked = new TMouseEvent_1.TMouseEvent(this.curObject.objID, TMouseEvent_1.TMouseEvent.WOZCLICKED, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                            if (this.fLiveLog)
                                this.tutorDoc.log.logLiveEvent(evtClicked.captureLogState());
                            this.curObject.dispatchEvent(evtClicked);
                        }
                    }
                    this.actObject = null;
                }
                liveMouseDblClick(evt) {
                    let locX;
                    let locY;
                    if (this.curObject) {
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("CEF Mouse Dbl Clicked: " + this.curObject.objID);
                        let evtDblClick = new TMouseEvent_1.TMouseEvent(this.curObject.objID, TMouseEvent_1.TMouseEvent.WOZDBLCLICK, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                        if (this.fLiveLog)
                            this.tutorDoc.log.logLiveEvent(evtDblClick.captureLogState());
                        this.curObject.dispatchEvent(evtDblClick);
                    }
                }
                stateHelper(tarObj) {
                    let fTest = false;
                    if (this.hitTestCoord(this.x, this.y) == tarObj)
                        fTest = true;
                    return fTest;
                }
                hitTestCoord(locX, locY) {
                    let hitSet;
                    let hitObj;
                    let wozObj;
                    this.cLocation.x = locX;
                    this.cLocation.y = locY;
                    hitSet = this.stage.getObjectsUnderPoint(locX, locY, 0);
                    if (this.traceMode)
                        CUtil_8.CUtil.trace("Hittest results  - cursor name: " + name);
                    if (hitSet.length) {
                        hitObj = hitSet[hitSet.length - 1];
                        wozObj = this.isWOZObject(hitObj);
                        if (!wozObj && (hitSet.length > 1)) {
                            hitObj = hitSet[hitSet.length - 2];
                            wozObj = this.isWOZObject(hitObj);
                        }
                    }
                    if (wozObj)
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("HitTest WozObject Name - " + wozObj.name);
                    return wozObj;
                }
                hitTestMouse(evt) {
                    let hitObj;
                    hitObj = this.hitTestCoord(this.x, this.y);
                    if (hitObj || (!hitObj && (this.actObject == null)))
                        this.updateCurrentObject(evt, hitObj);
                }
                show(bFlag) {
                    if (bFlag) {
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("Hiding Hardware Mouse : ");
                        document.getElementById("canvas").style.cursor = "none";
                        this.visible = true;
                    }
                    else {
                        if (this.traceMode)
                            CUtil_8.CUtil.trace("Showing Hardware Mouse : ");
                        document.getElementById("canvas").style.cursor = "none";
                        this.visible = false;
                    }
                }
                updateCurrentObject(evt, hitObj) {
                    if (this.traceMode)
                        (hitObj) ? CUtil_8.CUtil.trace("updateCurrentObject hitObj: " + hitObj.objID) : CUtil_8.CUtil.trace("updateCurrentObject hitObj: null");
                    let locX;
                    let locY;
                    locX = evt.stageX;
                    locY = evt.stageY;
                    if (hitObj == this.curObject)
                        return;
                    else {
                        if (this.curObject) {
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("CEF Mouse Out : " + this.curObject.objID);
                            let evtOut = new TMouseEvent_1.TMouseEvent(this.curObject.objID, TMouseEvent_1.TMouseEvent.WOZOUT, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                            if (this.fLiveLog)
                                this.tutorDoc.log.logLiveEvent(evtOut.captureLogState());
                            this.curObject.dispatchEvent(evtOut);
                        }
                        this.curObject = hitObj;
                        if (this.curObject) {
                            if (this.traceMode)
                                CUtil_8.CUtil.trace("CEF Mouse Over: " + this.curObject.objID);
                            let evtOver = new TMouseEvent_1.TMouseEvent(this.curObject.objID, TMouseEvent_1.TMouseEvent.WOZOVER, evt.bubbles, evt.cancelable, evt.stageX, evt.stageY, evt.nativeEvent, evt.pointerID, evt.primary, evt.rawX, evt.rawY);
                            if (this.fLiveLog)
                                this.tutorDoc.log.logLiveEvent(evtOver.captureLogState());
                            this.curObject.dispatchEvent(evtOver);
                        }
                    }
                }
                isWOZObject(tObj) {
                    if (!tObj || tObj instanceof TSceneBase_1.TSceneBase)
                        return null;
                    else if (tObj instanceof TObject_1.TObject)
                        return tObj;
                    return this.isWOZObject(tObj.parent);
                }
            };
            TCursorProxy.WOZLIVE = "WOZLIVE";
            TCursorProxy.WOZREPLAY = "WOZREPLAY";
            exports_18("TCursorProxy", TCursorProxy);
        }
    };
});
System.register("core/CEFTimeStamp", ["thermite/TObject", "util/CUtil"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var TObject_2, CUtil_9, CEFTimeStamp;
    return {
        setters: [
            function (TObject_2_1) {
                TObject_2 = TObject_2_1;
            },
            function (CUtil_9_1) {
                CUtil_9 = CUtil_9_1;
            }
        ],
        execute: function () {
            CEFTimeStamp = class CEFTimeStamp extends TObject_2.TObject {
                constructor() {
                    if (CEFTimeStamp._baseTime == 0)
                        CEFTimeStamp._baseTime = Number(CUtil_9.CUtil.getTimer());
                    super();
                }
                getStartTime(objprop) {
                    var sResult;
                    var dT;
                    if (!this.hasOwnProperty(objprop)) {
                        sResult = 'invalid';
                    }
                    else {
                        dT = (this[objprop] - CEFTimeStamp._baseTime) / 1000;
                        sResult = dT.toFixed(3);
                    }
                    return sResult;
                }
                createLogAttr(objprop, restart = false) {
                    var sResult;
                    var dT;
                    if (!this.hasOwnProperty(objprop)) {
                        this[objprop] = Number(CUtil_9.CUtil.getTimer());
                        dT = (this[objprop] - CEFTimeStamp._baseTime) / 1000;
                    }
                    else {
                        if (restart)
                            this[objprop] = Number(CUtil_9.CUtil.getTimer());
                        dT = (Number(CUtil_9.CUtil.getTimer()) - this[objprop]) / 1000;
                    }
                    return sResult = dT.toFixed(3);
                }
            };
            CEFTimeStamp._baseTime = 0;
            exports_19("CEFTimeStamp", CEFTimeStamp);
        }
    };
});
System.register("events/CEFKeyboardEvent", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var Event, CEFKeyboardEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFKeyboardEvent = class CEFKeyboardEvent extends Event {
                constructor(type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                }
            };
            CEFKeyboardEvent.KEY_PRESS = "keypress";
            CEFKeyboardEvent.KEY_DOWN = "keydown";
            CEFKeyboardEvent.KEY_UP = "keyup";
            exports_20("CEFKeyboardEvent", CEFKeyboardEvent);
        }
    };
});
System.register("tutorgraph/CTutorConstraint", ["util/CUtil"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var CUtil_10, CTutorConstraint;
    return {
        setters: [
            function (CUtil_10_1) {
                CUtil_10 = CUtil_10_1;
            }
        ],
        execute: function () {
            CTutorConstraint = class CTutorConstraint extends Object {
                constructor(_tutorDoc) {
                    super();
                    this.tutorDoc = _tutorDoc;
                }
                static factory(_tutorDoc, parent, factory) {
                    let node = new CTutorConstraint(_tutorDoc);
                    node._parent = parent;
                    node._cmd = factory.cmd;
                    node._code = factory.code;
                    return node;
                }
                execute() {
                    let result = false;
                    switch (this._cmd) {
                        case "test":
                            result = this.tutorDoc.testFeatureSet(this._code);
                            break;
                        case "exec":
                            try {
                                result = eval(this._code);
                            }
                            catch (err) {
                                CUtil_10.CUtil.trace("CONST.execute: " + err.toString());
                                result = false;
                            }
                            break;
                    }
                    return result;
                }
            };
            exports_21("CTutorConstraint", CTutorConstraint);
        }
    };
});
System.register("tutorgraph/CTutorEdge", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var CTutorEdge;
    return {
        setters: [],
        execute: function () {
            CTutorEdge = class CTutorEdge extends Object {
                constructor(_tutorDoc) {
                    super();
                    this.tutorDoc = _tutorDoc;
                }
                static factory(_tutorDoc, parent, owner, factory) {
                    let edge = new CTutorEdge(_tutorDoc);
                    edge._parent = parent;
                    edge._edgeOwner = owner;
                    edge._edgeConst = factory.constraint;
                    edge._edgeNode = factory.edge;
                    if (factory.$P != undefined) {
                        edge._pid = factory.pid;
                        edge._prob = factory.$P.split('|');
                        edge._cycle = Number(factory.cycle);
                    }
                    return edge;
                }
                testPConstraint() {
                    let result = true;
                    let iter;
                    let rand;
                    if (this._pid != null) {
                        iter = this._parent.queryPConstraint(this._pid, this._prob.length, this._cycle);
                        rand = Math.random();
                        result = (rand < this._prob[iter]);
                    }
                    return result;
                }
                testConstraint() {
                    let result = true;
                    if (this._edgeConst.startsWith("FTR_")) {
                        result = this.tutorDoc.testFeatureSet(this._edgeConst);
                    }
                    else {
                        result = (this._edgeConst === "") ? true : this.tutorDoc.$nodeConstraint(this._edgeOwner.id, this._edgeConst);
                    }
                    return result;
                }
                followEdge() {
                    return this._parent.findNodeByName(this._edgeNode);
                }
            };
            exports_22("CTutorEdge", CTutorEdge);
        }
    };
});
System.register("tutorgraph/CTutorNode", ["tutorgraph/CTutorEdge"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var CTutorEdge_1, EventDispatcher, CTutorNode;
    return {
        setters: [
            function (CTutorEdge_1_1) {
                CTutorEdge_1 = CTutorEdge_1_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CTutorNode = class CTutorNode extends EventDispatcher {
                constructor(_tutorDoc) {
                    super();
                    this._edges = new Array;
                    this.tutorDoc = _tutorDoc;
                }
                nodeFactory(parent, nodeName, nodefactory) {
                    this._parent = parent;
                    this._id = nodefactory.id;
                    this._type = nodefactory.type;
                    this._name = nodeName;
                    this._preEnter = nodefactory.preenter;
                    this._preExit = nodefactory.preexit;
                    if (this._preEnter == "")
                        this._preEnter = null;
                    if (this._preExit == "")
                        this._preExit = null;
                    for (let edge of nodefactory.edges) {
                        this._edges.push(CTutorEdge_1.CTutorEdge.factory(this.tutorDoc, parent, this, edge));
                    }
                }
                get id() {
                    return this._id;
                }
                get name() {
                    return this._name;
                }
                captureGraph(obj) {
                    return obj;
                }
                restoreGraph(obj) {
                }
                nextScene() {
                    return null;
                }
                nextNode() {
                    let edge;
                    let node = this;
                    if (this._preExit != null) {
                    }
                    for (let edge of this._edges) {
                        if (edge.testConstraint() && edge.testPConstraint()) {
                            node = edge.followEdge();
                            if (node != null && node._preEnter != null) {
                                eval(node._preEnter);
                            }
                            break;
                        }
                    }
                    if (this._edges.length == 0)
                        node = null;
                    return node;
                }
                applyNode() {
                    return false;
                }
                seekToScene(seekScene) {
                    return null;
                }
                seekToSceneByName(seekScene) {
                    return null;
                }
                resetNode() {
                }
            };
            exports_23("CTutorNode", CTutorNode);
        }
    };
});
System.register("tutorgraph/CTutorAction", ["tutorgraph/CTutorNode"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var CTutorNode_1, CTutorAction;
    return {
        setters: [
            function (CTutorNode_1_1) {
                CTutorNode_1 = CTutorNode_1_1;
            }
        ],
        execute: function () {
            CTutorAction = class CTutorAction extends CTutorNode_1.CTutorNode {
                constructor(_tutorDoc) {
                    super(_tutorDoc);
                }
                static factory(_tutorDoc, parent, name, factory) {
                    let nodeFactoryData = factory.CNodes[name];
                    let node = new CTutorAction(_tutorDoc);
                    node.nodeFactory(parent, name, nodeFactoryData);
                    let actObject = factory.CActions[nodeFactoryData.link];
                    node._cmnd = actObject.cmd;
                    node._parms = actObject.parms;
                    return node;
                }
                captureGraph(obj) {
                    return obj;
                }
                restoreGraph(obj) {
                }
                nextScene() {
                    return null;
                }
                applyNode() {
                    return false;
                }
            };
            exports_24("CTutorAction", CTutorAction);
        }
    };
});
System.register("tutorgraph/CTutorModule", ["tutorgraph/CTutorNode", "tutorgraph/CTutorScene", "util/CUtil"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var CTutorNode_2, CTutorScene_1, CUtil_11, CTutorModule;
    return {
        setters: [
            function (CTutorNode_2_1) {
                CTutorNode_2 = CTutorNode_2_1;
            },
            function (CTutorScene_1_1) {
                CTutorScene_1 = CTutorScene_1_1;
            },
            function (CUtil_11_1) {
                CUtil_11 = CUtil_11_1;
            }
        ],
        execute: function () {
            CTutorModule = class CTutorModule extends CTutorNode_2.CTutorNode {
                constructor(_tutorDoc) {
                    super(_tutorDoc);
                    this._scenes = new Array;
                    this._ndx = -1;
                    this.restored = false;
                }
                static factory(_tutorDoc, parent, id, moduleFactory, factory) {
                    var moduleFactoryData = factory.CModules[moduleFactory.link];
                    var node = new CTutorModule(_tutorDoc);
                    if (moduleFactory.edges)
                        node.nodeFactory(parent, id, moduleFactory);
                    node._reuse = moduleFactoryData.reuse;
                    var sceneList = moduleFactoryData.scenes;
                    for (var scene of sceneList) {
                        node._scenes.push(new CTutorScene_1.CTutorScene(_tutorDoc, scene, parent));
                    }
                    return node;
                }
                captureGraph(obj) {
                    obj['index'] = this._ndx.toString();
                    return obj;
                }
                restoreGraph(obj) {
                    this._ndx = Number(obj['index']);
                    this.restored = true;
                    return this._scenes[this._ndx];
                }
                nextScene() {
                    var nextScene = null;
                    var features;
                    while (this._ndx < this._scenes.length) {
                        if (this.restored) {
                            this.restored = false;
                        }
                        else {
                            this._ndx++;
                        }
                        if (this._ndx >= this._scenes.length)
                            nextScene = null;
                        else
                            nextScene = this._scenes[this._ndx];
                        if (nextScene != null) {
                            features = nextScene.features;
                            if (features != "") {
                                if (this.tutorDoc.testFeatureSet(features)) {
                                    if (nextScene.hasPFeature) {
                                        if (nextScene.testPFeature())
                                            break;
                                    }
                                    else
                                        break;
                                }
                                CUtil_11.CUtil.trace("Graph Feature: " + features + " :failed.");
                            }
                            else if (nextScene.hasPFeature) {
                                if (nextScene.testPFeature())
                                    break;
                            }
                            else
                                break;
                        }
                        else
                            break;
                    }
                    if (this._ndx >= this._scenes.length) {
                        if (this._reuse) {
                            this.resetNode();
                        }
                    }
                    return nextScene;
                }
                applyNode() {
                    dispatchEvent(new Event("todo"));
                    return false;
                }
                seekToScene(seekScene) {
                    var scene = null;
                    var ndx = 0;
                    for (scene of this._scenes) {
                        if (seekScene == scene) {
                            this._ndx = ndx;
                            break;
                        }
                        ndx++;
                    }
                    return scene;
                }
                resetNode() {
                    this._ndx = -1;
                }
            };
            exports_25("CTutorModule", CTutorModule);
        }
    };
});
System.register("tutorgraph/CTutorModuleGroup", ["tutorgraph/CTutorNode", "tutorgraph/CTutorModule"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var CTutorNode_3, CTutorModule_1, CTutorModuleGroup;
    return {
        setters: [
            function (CTutorNode_3_1) {
                CTutorNode_3 = CTutorNode_3_1;
            },
            function (CTutorModule_1_1) {
                CTutorModule_1 = CTutorModule_1_1;
            }
        ],
        execute: function () {
            CTutorModuleGroup = class CTutorModuleGroup extends CTutorNode_3.CTutorNode {
                constructor(_tutorDoc) {
                    super(_tutorDoc);
                    this._modules = new Array;
                    this._ndx = -1;
                    this._moduleShown = false;
                    this._shownCount = 0;
                }
                static factory(_tutorDoc, parent, id, groupFactory, factory) {
                    let groupFactoryData = factory.CModuleGroups[groupFactory.link];
                    let node = new CTutorModuleGroup(_tutorDoc);
                    if (groupFactory.edges)
                        node.nodeFactory(parent, id, groupFactory);
                    node.instanceNode = groupFactoryData.instanceNode;
                    node.type = groupFactoryData.type;
                    node.start = groupFactoryData.start;
                    node.show = groupFactoryData.show;
                    node.reuse = groupFactoryData.reuse;
                    node.onempty = groupFactoryData.onempty;
                    let moduleList = groupFactoryData.modules;
                    for (let moduleDescr of moduleList) {
                        if (moduleDescr.instanceNode != "") {
                            node._modules.push(parent.findNodeByName(moduleDescr.instanceNode));
                        }
                        else {
                            node._modules.push(CTutorModule_1.CTutorModule.factory(_tutorDoc, parent, "", moduleDescr, factory));
                        }
                    }
                    return node;
                }
                captureGraph(obj) {
                    obj['index'] = this._ndx.toString();
                    obj['_moduleShown'] = this._moduleShown.toString();
                    obj['_shownCount'] = this._shownCount.toString();
                    obj['moduleNode'] = this._modules[this._ndx].captureGraph({});
                    return obj;
                }
                restoreGraph(obj) {
                    this._ndx = Number(obj['index']);
                    this._moduleShown = (obj['_moduleShown'] == 'true') ? true : false;
                    this._shownCount = Number(obj['_shownCount']);
                    return this._modules[this._ndx].restoreGraph(obj['moduleNode']);
                }
                initialize() {
                    switch (this.type) {
                        case CTutorModuleGroup.SEQUENTIAL:
                            switch (this.start) {
                                case CTutorModuleGroup.STOCHASTIC:
                                    break;
                                default:
                                    this._ndx = Number(this.start);
                                    break;
                            }
                            break;
                    }
                }
                nextScene() {
                    let nextScene = null;
                    if (this._ndx == -1)
                        this.initialize();
                    do {
                        nextScene = this._modules[this._ndx].nextScene();
                        if (nextScene == null) {
                            this._ndx++;
                            this._ndx = this._ndx % this._modules.length;
                            if (this.show != "all") {
                                if (this._moduleShown)
                                    this._shownCount++;
                                if (this._shownCount == Number(this.show)) {
                                    this._moduleShown = false;
                                    this._shownCount = 0;
                                    break;
                                }
                            }
                        }
                        else
                            break;
                    } while (this._ndx < this._modules.length);
                    if (nextScene != null)
                        this._moduleShown = true;
                    return nextScene;
                }
                applyNode() {
                    dispatchEvent(new Event("todo"));
                    return false;
                }
                seekToScene(seekScene) {
                    let module;
                    let scene = null;
                    let ndx = 0;
                    for (let module of this._modules) {
                        if (seekScene == module.seekToScene(seekScene)) {
                            this._ndx = ndx;
                            break;
                        }
                        ndx++;
                    }
                    return scene;
                }
                resetNode() {
                    this._ndx = -1;
                    this._shownCount = 0;
                    this._moduleShown = false;
                }
            };
            CTutorModuleGroup.SEQUENTIAL = "seqtype";
            CTutorModuleGroup.STOCHASTIC = "randtype";
            exports_26("CTutorModuleGroup", CTutorModuleGroup);
        }
    };
});
System.register("managers/ILogManager", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("managers/CLogManagerType", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var CLogManagerType;
    return {
        setters: [],
        execute: function () {
            CLogManagerType = class CLogManagerType {
            };
            exports_28("CLogManagerType", CLogManagerType);
        }
    };
});
System.register("mongo/MObject", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var MObject;
    return {
        setters: [],
        execute: function () {
            MObject = class MObject extends Object {
                constructor() {
                    super();
                }
            };
            exports_29("MObject", MObject);
        }
    };
});
System.register("mongo/CObject", ["mongo/MObject"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var MObject_1, CObject;
    return {
        setters: [
            function (MObject_1_1) {
                MObject_1 = MObject_1_1;
            }
        ],
        execute: function () {
            CObject = class CObject extends MObject_1.MObject {
                constructor() {
                    super();
                }
                getValue(tarObj, path) {
                    var objPath;
                    var dataObj;
                    try {
                        dataObj = tarObj;
                        objPath = path.split(".");
                        while (objPath.length > 1)
                            dataObj = dataObj[objPath.shift()];
                        return dataObj[objPath.shift()];
                    }
                    catch (err) {
                        return "";
                    }
                }
                setValue(tarObj, objPath, value) {
                    var dataObj;
                    var name;
                    dataObj = tarObj;
                    while (objPath.length > 1) {
                        name = objPath.shift();
                        if (dataObj[name] == null)
                            dataObj[name] = {};
                        dataObj = dataObj[name];
                    }
                    dataObj[objPath.shift()] = value;
                }
            };
            exports_30("CObject", CObject);
        }
    };
});
System.register("mongo/CMongo", ["util/CUtil", "mongo/MObject", "mongo/CObject"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var CUtil_12, MObject_2, CObject_1, CMongo;
    return {
        setters: [
            function (CUtil_12_1) {
                CUtil_12 = CUtil_12_1;
            },
            function (MObject_2_1) {
                MObject_2 = MObject_2_1;
            },
            function (CObject_1_1) {
                CObject_1 = CObject_1_1;
            }
        ],
        execute: function () {
            CMongo = class CMongo {
                constructor() {
                }
                static commandPacket(_source, _command, _collection, _query, _database = "TED") {
                    let packet;
                    let multi = false;
                    let type;
                    let item;
                    packet = '{"database":"' + _database + '","source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","query":{';
                    for (item in _query) {
                        if (multi)
                            packet += ',';
                        packet += '"' + item + '":';
                        type = CUtil_12.CUtil.getQualifiedClassName(_query[item]);
                        switch (type) {
                            case "string":
                                packet += '"' + _query[item] + '"';
                                break;
                            default:
                                packet += _query[item];
                                break;
                        }
                        multi = true;
                    }
                    packet += '}}';
                    return packet;
                }
                static queryPacket(_source, _command, _collection, _query, _limit = null, _database = "TED") {
                    let packet;
                    let multi = false;
                    let multilimit = false;
                    let type;
                    let item;
                    packet = '{"database":"' + _database + '","source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","query":{';
                    for (item in _query) {
                        if (multi)
                            packet += ',';
                        packet += '"' + item + '":';
                        type = CUtil_12.CUtil.getQualifiedClassName(_query[item]);
                        switch (type) {
                            case "string":
                                packet += '"' + _query[item] + '"';
                                break;
                            default:
                                packet += _query[item];
                                break;
                        }
                        multi = true;
                    }
                    packet += '}, "fields":{';
                    for (item in _limit) {
                        if (multilimit)
                            packet += ',';
                        packet += '"' + item + '":';
                        type = CUtil_12.CUtil.getQualifiedClassName(_limit[item]);
                        switch (type) {
                            case "string":
                                packet += '"' + _limit[item] + '"';
                                break;
                            default:
                                packet += _limit[item];
                                break;
                        }
                        multilimit = true;
                    }
                    packet += '}}';
                    return packet;
                }
                static recyclePacket(_source, _command, _collection, _query, recover) {
                    let packet;
                    let multi = false;
                    packet = '{"source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","query":{';
                    for (let item in _query) {
                        if (multi)
                            packet += ',';
                        packet += '"' + item + '":"' + _query[item] + '"';
                        multi = true;
                    }
                    packet += '}, "document":{"\$set":{"isActive":' + recover + '}}}';
                    return packet;
                }
                static insertPacket(_source, _command, _collection, _objectDoc) {
                    let packet;
                    let multi = false;
                    packet = '{"source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","document":';
                    packet += JSON.stringify(_objectDoc);
                    packet += '}';
                    return packet;
                }
                static updatePacket(_source, _command, _collection, _query, _updateObj) {
                    let packet;
                    let multi = false;
                    let item;
                    packet = '{"source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","query":{';
                    for (item in _query) {
                        if (multi)
                            packet += ',';
                        packet += '"' + item + '":"' + _query[item] + '"';
                        multi = true;
                    }
                    multi = false;
                    packet += '}, "document":{"\$set":{';
                    packet += this.parseUpdateFields(_updateObj);
                    packet += '}}}';
                    return packet;
                }
                static unsetFieldPacket(_source, _command, _collection, _query, _updateObj) {
                    let packet;
                    let multi = false;
                    let item;
                    packet = '{"source":"' + _source + '","command":' + _command + ',"collection":"' + _collection + '","query":{';
                    for (item in _query) {
                        if (multi)
                            packet += ',';
                        packet += '"' + item + '":"' + _query[item] + '"';
                        multi = true;
                    }
                    multi = false;
                    packet += '}, "document":{"\$unset":{';
                    packet += this.parseUpdateFields(_updateObj);
                    packet += '}}}';
                    return packet;
                }
                static parseUpdateFields(node, objPath = "") {
                    let objString = "";
                    let className;
                    let fieldMark = false;
                    for (let value in node) {
                        className = CUtil_12.CUtil.getQualifiedClassName(node[value]);
                        if (className == "Object") {
                            CUtil_12.CUtil.trace("type Error: parseUpdateFields");
                            throw (new Error("type Error: parseUpdateFields"));
                        }
                        if (node[value] instanceof CObject_1.CObject) {
                            if (fieldMark)
                                objString += ',';
                            fieldMark = false;
                            objString += this.parseUpdateFields(node[value], objPath + value + '.');
                        }
                        else {
                            if (objString.length > 0)
                                objString += ',';
                            objString += '"' + objPath + value + '"' + ':';
                            if (node[value] instanceof MObject_2.MObject)
                                objString += JSON.stringify(node[value]);
                            else {
                                if (typeof node[value] === "string")
                                    objString += '"' + node[value] + '"';
                                else
                                    objString += node[value];
                            }
                            fieldMark = true;
                        }
                    }
                    return objString;
                }
                static encodeAsJSON(_fields, parent) {
                    return JSON.stringify(this.encodeAsObject(null, _fields, parent));
                }
                static encodeAsObject(host, _fields, parent) {
                    let tempObj = {};
                    let leafObj;
                    let subDocName;
                    let pathArray;
                    if (host == null)
                        tempObj = {};
                    else
                        tempObj = host;
                    for (let formID in _fields) {
                        leafObj = tempObj;
                        pathArray = _fields[formID].split(".");
                        if (pathArray.length > 1) {
                            subDocName = pathArray.shift();
                            if (leafObj[subDocName] == undefined)
                                leafObj[subDocName] = {};
                            leafObj = this.objectBuilder(leafObj[subDocName], pathArray);
                        }
                        leafObj[pathArray[0]] = parent[formID].getItemData();
                    }
                    return tempObj;
                }
                static objectBuilder(leafObj, pathArray) {
                    let subDocName;
                    if (pathArray.length > 1) {
                        subDocName = pathArray.shift();
                        if (leafObj[subDocName] == undefined)
                            leafObj[subDocName] = {};
                        leafObj = this.objectBuilder(leafObj, pathArray);
                    }
                    return leafObj;
                }
                static setValue(tarObj, path, value) {
                    let objPath;
                    let dataObj;
                    let name;
                    dataObj = tarObj;
                    objPath = path.split(".");
                    while (objPath.length > 1) {
                        name = objPath.shift();
                        if (dataObj[name] == null)
                            dataObj[name] = new CObject_1.CObject;
                        dataObj = dataObj[name];
                    }
                    dataObj[objPath.shift()] = value;
                }
            };
            exports_31("CMongo", CMongo);
        }
    };
});
System.register("events/CDataEvent", ["util/CUtil"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var CUtil_13, Event, CDataEvent;
    return {
        setters: [
            function (CUtil_13_1) {
                CUtil_13 = CUtil_13_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CDataEvent = class CDataEvent extends Event {
                constructor(type = CDataEvent.DATA, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.traceMode = false;
                }
                clone() {
                    if (this.traceMode)
                        CUtil_13.CUtil.trace("cloning CDataEvent:");
                    return new CDataEvent(this.type, this.bubbles, this.cancelable);
                }
            };
            CDataEvent.DATA = "data";
            CDataEvent.UPLOAD_COMPLETE_DATA = "uploadCompleteData";
            exports_32("CDataEvent", CDataEvent);
        }
    };
});
System.register("events/CIOErrorEvent", ["util/CUtil"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var CUtil_14, Event, CIOErrorEvent;
    return {
        setters: [
            function (CUtil_14_1) {
                CUtil_14 = CUtil_14_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CIOErrorEvent = class CIOErrorEvent extends Event {
                constructor(type = CIOErrorEvent.IO_ERROR, _error = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.error = _error;
                }
                clone() {
                    CUtil_14.CUtil.trace("cloning CIOErrorEvent:");
                    return new CIOErrorEvent(this.type, this.error, this.bubbles, this.cancelable);
                }
            };
            CIOErrorEvent.IO_ERROR = "ioError";
            CIOErrorEvent.STANDARD_ERROR_IO_ERROR = "standardErrorIoError";
            CIOErrorEvent.STANDARD_INPUT_IO_ERROR = "standardInputIoError";
            CIOErrorEvent.STANDARD_OUTPUT_IO_ERROR = "standardOutputIoError";
            exports_33("CIOErrorEvent", CIOErrorEvent);
        }
    };
});
System.register("events/CTextEvent", ["util/CUtil"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var CUtil_15, Event, CTextEvent;
    return {
        setters: [
            function (CUtil_15_1) {
                CUtil_15 = CUtil_15_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CTextEvent = class CTextEvent extends Event {
                constructor(type = CTextEvent.COMPLETE, _text = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.text = _text;
                }
                clone() {
                    CUtil_15.CUtil.trace("cloning CTextEvent:");
                    return new CTextEvent(this.type, this.text, this.bubbles, this.cancelable);
                }
            };
            CTextEvent.COMPLETE = "dnscomplete";
            CTextEvent.FAILED = "dnsfailed";
            exports_34("CTextEvent", CTextEvent);
        }
    };
});
System.register("events/CErrorEvent", ["events/CTextEvent", "util/CUtil"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var CTextEvent_1, CUtil_16, CErrorEvent;
    return {
        setters: [
            function (CTextEvent_1_1) {
                CTextEvent_1 = CTextEvent_1_1;
            },
            function (CUtil_16_1) {
                CUtil_16 = CUtil_16_1;
            }
        ],
        execute: function () {
            CErrorEvent = class CErrorEvent extends CTextEvent_1.CTextEvent {
                constructor(type = CErrorEvent.ERROR, _text = "", _errorID = 0, bubbles = false, cancelable = false) {
                    super(type, _text, bubbles, cancelable);
                    this.errorID = _errorID;
                }
                clone() {
                    CUtil_16.CUtil.trace("cloning CErrorEvent:");
                    return new CErrorEvent(this.type, this.text, this.errorID, this.bubbles, this.cancelable);
                }
            };
            CErrorEvent.ERROR = "error";
            exports_35("CErrorEvent", CErrorEvent);
        }
    };
});
System.register("events/CSecurityErrorEvent", ["events/CErrorEvent", "util/CUtil"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var CErrorEvent_1, CUtil_17, CSecurityErrorEvent;
    return {
        setters: [
            function (CErrorEvent_1_1) {
                CErrorEvent_1 = CErrorEvent_1_1;
            },
            function (CUtil_17_1) {
                CUtil_17 = CUtil_17_1;
            }
        ],
        execute: function () {
            CSecurityErrorEvent = class CSecurityErrorEvent extends CErrorEvent_1.CErrorEvent {
                constructor(type = CSecurityErrorEvent.SECURITY_ERROR, _text = "", _errorID = 0, bubbles = false, cancelable = false) {
                    super(type, _text, _errorID, bubbles, cancelable);
                }
                clone() {
                    CUtil_17.CUtil.trace("cloning CSecurityErrorEvent:");
                    return new CSecurityErrorEvent(this.type, this.text, this.errorID, this.bubbles, this.cancelable);
                }
            };
            CSecurityErrorEvent.SECURITY_ERROR = "securityError";
            exports_36("CSecurityErrorEvent", CSecurityErrorEvent);
        }
    };
});
System.register("network/CSocket", ["util/CUtil"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var CUtil_18, CSocket;
    return {
        setters: [
            function (CUtil_18_1) {
                CUtil_18 = CUtil_18_1;
            }
        ],
        execute: function () {
            CSocket = class CSocket {
                constructor(host = null, port = 0) {
                    this.connecting = false;
                }
                openSocket(hostName, port) {
                    CUtil_18.CUtil.trace("CSocket: openSocket - " + hostName + " port:" + port);
                    this._host = hostName;
                    this._port = port.toString();
                }
                closeSocket() {
                    CUtil_18.CUtil.trace("CSocket: closeSocket - " + this._host + " port:" + this._port);
                }
                sendData(data) {
                    let fResult = true;
                    return fResult;
                }
                configureListeners(connect = true) {
                }
                connectHandler(event) {
                    CUtil_18.CUtil.trace("CSocket connectHandler: " + event);
                }
                closeHandler(event) {
                    CUtil_18.CUtil.trace("CSocket closeHandler: " + event);
                }
                dataHandler(event) {
                }
                ioErrorHandler(event) {
                    CUtil_18.CUtil.trace("CSocket ioErrorHandler: " + event);
                }
                progressHandler(event) {
                    CUtil_18.CUtil.trace("CSocket progressHandler loaded:" + event.loaded + " total: " + event.total);
                }
                securityErrorHandler(event) {
                    CUtil_18.CUtil.trace("CSocket securityErrorHandler: " + event);
                }
                configureAbandonListeners(connect = true) {
                }
                abandonConnectHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket connectHandler - Now Closing: " + event);
                }
                abandonCloseHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket CloseHandler - Socket Released: " + event);
                }
                abandonDataHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket DataHandler: " + event);
                }
                abandonIoErrorHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket ioErrorHandler: " + event);
                }
                abandonProgressHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket ProgressHandler: " + event);
                }
                abandonSecurityErrorHandler(event) {
                    CUtil_18.CUtil.trace("Abandoned Socket SecurityErrorHandler: " + event);
                }
            };
            CSocket.PORT_NTP = 12000;
            CSocket.PORT_ARBITER = 12001;
            CSocket.PORT_SERVER = 12002;
            CSocket.PORT_LOGGER = 12003;
            CSocket.xmlTYPE_UNKNOWN = 0;
            CSocket.xmlCLIENT_ARB = 1;
            CSocket.xmlCLIENT_TED = 2;
            CSocket.xmlCLIENT_SES = 3;
            CSocket.xmlCLIENT_LGR = 4;
            CSocket.xmlCLIENT_TUT = 5;
            CSocket.xmlCLIENT_WOZ = 6;
            CSocket.xmlCLIENT_NTP = 7;
            CSocket.xmlSERVER_ARB = 8;
            CSocket.xmlSERVER_TED = 9;
            CSocket.xmlSERVER_SES = 10;
            CSocket.xmlSERVER_LGR = 11;
            CSocket.xmlSERVER_NTP = 12;
            CSocket.xmlCLIENT_MESSAGE = "clientmessage";
            CSocket.xmlSERVER_MESSAGE = "servermessage";
            CSocket.xmlADVERTISE = "advertise_service";
            CSocket.xmlPUBLISH = "publish_service";
            CSocket.xmlTYPE = "type";
            CSocket.xmlNAME = "name";
            CSocket.xmlPRIVATE_IP = "private_ip";
            CSocket.xmlPUBLIC_IP = "public_ip";
            CSocket.xmlCONNECT_IP = "connect_ip";
            CSocket.xmlNOOP = "noopevent";
            CSocket.xmlPROTOCOL_ERROR = "protocol_error";
            CSocket.xmlERROR_ID = "error_id";
            CSocket.xmlQUERY = "query";
            CSocket.xmlUNKNOWN = "Unknown";
            CSocket.xmlNTP_MESSAGE = "ntp_message";
            CSocket.xmlNTPT1 = "T1";
            CSocket.xmlNTPT2 = "T2";
            CSocket.xmlDOM_REQUEST = "policy-file-request";
            CSocket.xmlACK = "ack";
            CSocket.xmlACKSESSION = "acksession";
            CSocket.xmlACKTERM = "ackterm";
            CSocket.xmlACKLOG = "acklog";
            CSocket.xmlNAKLOG = "naklog";
            CSocket.xmlACKAUTH = "ackauth";
            CSocket.xmlNAKAUTH = "nakauth";
            CSocket.xmlACKATTACH = "ackattach";
            CSocket.xmlSQLERROR = "sqlerror";
            CSocket.xmlInvalidUsername = "INVALID_USERNAME";
            CSocket.xmlInvalidPassword = "INVALID_PASSWORD";
            exports_37("CSocket", CSocket);
        }
    };
});
System.register("events/CLogEvent", ["util/CUtil"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var CUtil_19, Event, CLogEvent;
    return {
        setters: [
            function (CUtil_19_1) {
                CUtil_19 = CUtil_19_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CLogEvent = class CLogEvent extends Event {
                constructor(type = CLogEvent.COMPLETE, _subType = null, _logNdx = 0, _logTtl = 0, _dataPacket = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.traceMode = false;
                    this.subType = _subType;
                    this.logNdx = _logNdx;
                    this.logTtl = _logTtl;
                    this.dataPacket = _dataPacket;
                }
                clone() {
                    if (this.traceMode)
                        CUtil_19.CUtil.trace("cloning CLogEvent:");
                    return new CLogEvent(this.type, this.subType, this.logNdx, this.logTtl, this.dataPacket, this.bubbles, this.cancelable);
                }
            };
            CLogEvent.COMPLETE = "complete";
            CLogEvent.PACKET_FORWARD = "Packet Forward";
            CLogEvent.SESSION_STATUS = "sessionstatus";
            CLogEvent.CONNECT_STATUS = "connectstatus";
            CLogEvent.DATASTREAM_STATUS = "datastreamstatus";
            CLogEvent.STREAM_STATUS = "streamstatus";
            CLogEvent.QUEUE_STATUS = "queuestatus";
            CLogEvent.SEND_STATUS = "sendstatus";
            CLogEvent.STATE_MSG = "logstate";
            CLogEvent.PROG_MSG = "logprogress";
            CLogEvent.STATUS_MSG = "logstatus";
            CLogEvent.SERVER_FAILED = "serverfailed";
            CLogEvent.AUTH_SUCCESS = "loginsuccess";
            CLogEvent.AUTH_FAILED = "loginfailed";
            CLogEvent.DDNS_IN_PROGRESS = "DDNS in progress";
            CLogEvent.DDNS_RESOLVED = "DDNS resolved";
            CLogEvent.DDNS_FAILED = "DDNS failed";
            CLogEvent.CONNECTION_OPEN = "Connection open";
            CLogEvent.CONNECTION_CLOSED = "Connection closed";
            CLogEvent.CONNECTION_RECYCLING = "Connection recycling";
            CLogEvent.CONNECT_FAILED = "Connect failed";
            CLogEvent.CONNECTION_TERMINATED = "Connection terminated";
            CLogEvent.SESSION_ABANDONED = "Session abandoned";
            CLogEvent.SESSION_RESTARTED = "Session Restarted";
            CLogEvent.SESSION_FLUSHED = "Session Flushed";
            CLogEvent.SESSION_TERMINATED = "Session Terminated";
            CLogEvent.SOCKET_OPENED = "Socket opened";
            CLogEvent.SOCKET_CLOSED = "Socket closed";
            CLogEvent.SOCKET_IOERR = "Socket io failed";
            CLogEvent.SOCKET_SECERR = "Socket sec failed";
            CLogEvent.QUEUE_OPENED = "Queue opened";
            CLogEvent.QUEUE_CLOSED = "Queue closed";
            CLogEvent.QUEUE_CHANGED = "Queue changed";
            CLogEvent.QUEUE_WAITING = "Queue waiting";
            CLogEvent.QUEUE_SENDING = "Queue sending";
            CLogEvent.QUEUE_RESET = "Queue reset";
            CLogEvent.STREAM_OPENED = "STREAM opened";
            CLogEvent.STREAM_CLOSED = "STREAM closed";
            CLogEvent.QUERY_SUCCESS = "Query Success";
            CLogEvent.QUERY_FAILED = "Query failed";
            CLogEvent.PACKET_DATA = "Packet Data";
            exports_38("CLogEvent", CLogEvent);
        }
    };
});
System.register("events/CProgressEvent", ["util/CUtil"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var CUtil_20, Event, CProgressEvent;
    return {
        setters: [
            function (CUtil_20_1) {
                CUtil_20 = CUtil_20_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CProgressEvent = class CProgressEvent extends Event {
                constructor(type = CProgressEvent.PROGRESS, _loaded = null, _total = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.traceMode = false;
                    this.loaded = _loaded;
                    this.total = _total;
                }
                clone() {
                    if (this.traceMode)
                        CUtil_20.CUtil.trace("cloning CProgressEvent:");
                    return new CProgressEvent(this.type, this.loaded, this.total, this.bubbles, this.cancelable);
                }
            };
            CProgressEvent.PROGRESS = "progress";
            CProgressEvent.STANDARD_ERROR_DATA = "standardErrorData";
            CProgressEvent.STANDARD_INPUT_PROGRESS = "standardInputProgress";
            CProgressEvent.STANDARD_OUTPUT_DATA = "standardOutputData";
            exports_39("CProgressEvent", CProgressEvent);
        }
    };
});
System.register("network/CLogSocket", ["events/CLogEvent"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var CLogEvent_1, EventDispatcher, CLogSocket;
    return {
        setters: [
            function (CLogEvent_1_1) {
                CLogEvent_1 = CLogEvent_1_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CLogSocket = class CLogSocket extends EventDispatcher {
                constructor(host = null, port = 0, _tracer = null) {
                    super();
                    this._connected = false;
                    this.openSocket(host, port);
                    this.tracer = _tracer;
                }
                openSocket(host = null, port = 0, _tracer = null) {
                }
                closeSocket() {
                }
                sendData(dataPacket) {
                    return true;
                }
                get connected() {
                    return this._connected;
                }
                connectHandler(event) {
                    this.dispatchEvent(new CLogEvent_1.CLogEvent(CLogEvent_1.CLogEvent.CONNECT_STATUS, CLogEvent_1.CLogEvent.SOCKET_OPENED));
                }
                closeHandler(event) {
                    this.dispatchEvent(new CLogEvent_1.CLogEvent(CLogEvent_1.CLogEvent.CONNECT_STATUS, CLogEvent_1.CLogEvent.SOCKET_CLOSED));
                }
                dataHandler(event) {
                }
                ioErrorHandler(event) {
                    this.dispatchEvent(new CLogEvent_1.CLogEvent(CLogEvent_1.CLogEvent.CONNECT_STATUS, CLogEvent_1.CLogEvent.SOCKET_IOERR));
                }
                progressHandler(event) {
                }
                securityErrorHandler(event) {
                    this.dispatchEvent(new CLogEvent_1.CLogEvent(CLogEvent_1.CLogEvent.CONNECT_STATUS, CLogEvent_1.CLogEvent.SOCKET_SECERR));
                }
            };
            exports_40("CLogSocket", CLogSocket);
        }
    };
});
System.register("network/CLogQueue", ["events/CLogEvent", "util/CONST", "util/CUtil"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var CLogEvent_2, CONST_2, CUtil_21, EventDispatcher, CLogQueue;
    return {
        setters: [
            function (CLogEvent_2_1) {
                CLogEvent_2 = CLogEvent_2_1;
            },
            function (CONST_2_1) {
                CONST_2 = CONST_2_1;
            },
            function (CUtil_21_1) {
                CUtil_21 = CUtil_21_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CLogQueue = class CLogQueue extends EventDispatcher {
                constructor() {
                    super(...arguments);
                    this.traceMode = true;
                    this.logTrace = false;
                    this.logEvtIndex = -1;
                    this.logAckIndex = -1;
                    this.jsonEvents = new Array();
                    this._queueOpen = false;
                    this._queueStreaming = false;
                    this._queueMode = CONST_2.CONST.MODE_JSON;
                }
                CLogQueue() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_21.CUtil.trace("CLogQueue:Constructor");
                    this.resetQueue();
                }
                get queueMode() {
                    return this._queueMode;
                }
                get isStreaming() {
                    return this._queueStreaming;
                }
                get length() {
                    return this.logEvtIndex;
                }
                get Position() {
                    return this.logAckIndex;
                }
                openQueue() {
                    this._queueOpen = true;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_STATUS, CLogEvent_2.CLogEvent.QUEUE_OPENED));
                }
                closeQueue() {
                    this._queueOpen = false;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_STATUS, CLogEvent_2.CLogEvent.QUEUE_CLOSED));
                }
                startQueueStream() {
                    this._queueStreaming = true;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_CHANGED))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_CHANGED));
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_STATUS, CLogEvent_2.CLogEvent.STREAM_OPENED));
                }
                stopQueueStream() {
                    this._queueStreaming = false;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_STATUS, CLogEvent_2.CLogEvent.STREAM_CLOSED));
                }
                resetQueue() {
                    this.logEvtIndex = -1;
                    this.logAckIndex = -1;
                    this.playBackSiz = 0;
                    this.logEvents = "<eventlog/>";
                    this.jsonEvents = new Array();
                    this.LogSource = "";
                    this.xmlEvents = null;
                    this.lastAction = -1;
                    this.lastMove = -1;
                    this.fPlayBackDone = false;
                    this.playBackNdx = -1;
                    this.playBackSiz = -1;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_STATUS, CLogEvent_2.CLogEvent.QUEUE_RESET));
                }
                restartQueue() {
                    this.logAckIndex = -1;
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_CHANGED))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_CHANGED));
                }
                isQueueEmpty() {
                    let fEmpty;
                    if (this.logAckIndex != this.logEvtIndex)
                        fEmpty = false;
                    else
                        fEmpty = true;
                    return fEmpty;
                }
                nextPacket() {
                    if (this._queueMode == CONST_2.CONST.MODE_JSON)
                        return this.jsonEvents[this.logAckIndex + 1];
                    else
                        return this.logEvents.children()[this.logAckIndex + 1];
                }
                get nextNdx() {
                    return this.logEvtIndex + 1;
                }
                logEvent(dataEvt) {
                    if (this._queueOpen) {
                        this.logEvtIndex++;
                        if (this._queueMode == CONST_2.CONST.MODE_JSON)
                            this.jsonEvents.push(dataEvt);
                        else
                            this.logEvents.appendChild(dataEvt);
                        this.emitProgress();
                        if (this._queueStreaming) {
                            if (this.hasEventListener(CLogEvent_2.CLogEvent.QUEUE_CHANGED))
                                this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.QUEUE_CHANGED));
                        }
                    }
                }
                ackPacket(seqID, reSend = false) {
                    let fResult = false;
                    if (seqID == this.logAckIndex + 1) {
                        if (this.traceMode)
                            CUtil_21.CUtil.trace("@@@@@@@  PACKET ACK: " + (this.logAckIndex + 1));
                        if (!reSend) {
                            this.logAckIndex++;
                            this.emitProgress();
                        }
                        fResult = true;
                    }
                    return fResult;
                }
                emitProgress() {
                    if (this.hasEventListener(CLogEvent_2.CLogEvent.PROG_MSG))
                        this.dispatchEvent(new CLogEvent_2.CLogEvent(CLogEvent_2.CLogEvent.PROG_MSG, null, this.logAckIndex, this.logEvtIndex));
                }
                setPlayBackSource(LogSource) {
                    if (this.LogSource == null) {
                        this.LogSource = "logCache";
                        this.xmlEvents = this.logEvents.clientmessage;
                        this.playBackSiz = this.logEvtIndex;
                    }
                    else {
                        this.LogSource = "xmlSource";
                        this.xmlEvents = this.LogSource;
                        this.playBackSiz = this.LogSource.length;
                        if (this.logTrace)
                            CUtil_21.CUtil.trace("this.playBackSiz: " + this.playBackSiz);
                    }
                    this.fPlayBackDone = false;
                    this.playBackNdx = 0;
                    this.lastAction = -1;
                    this.lastMove = 0;
                }
                unWrapLog() {
                    let unWrapped = "<unwrapped/>";
                    for (let i1 = 0; i1 < this.logEvtIndex; i1++) {
                        unWrapped.appendChild(this.logEvents.children()[i1].logrecord[0]);
                    }
                    return unWrapped.children();
                }
                normalizePlayBackTime() {
                    let nBaseTime;
                    let nEvent;
                    nBaseTime = this.xmlEvents[0].time;
                    if (nBaseTime != 0) {
                        for (nEvent = 0; nEvent < this.playBackSiz; nEvent++) {
                            this.xmlEvents[nEvent].time -= nBaseTime;
                            this.xmlEvents[nEvent].time *= 1000;
                        }
                    }
                }
                normalizePlayBack() {
                    let xmlEvent;
                    let nBaseTime;
                    let nBaseState;
                    let nBaseFrame;
                    let nEvent;
                    xmlEvent = this.xmlEvents[0];
                    nBaseTime = xmlEvent.time;
                    nBaseState = xmlEvent.stateID;
                    nBaseFrame = xmlEvent.frameID;
                    if (nBaseTime != 0) {
                        for (nEvent = 0; nEvent < this.playBackSiz; nEvent++) {
                            xmlEvent = this.xmlEvents[nEvent];
                            xmlEvent.time -= nBaseTime;
                            xmlEvent.stateID -= nBaseState;
                            xmlEvent.frameID -= nBaseFrame;
                        }
                    }
                }
                getNextEventState() {
                    let xmlEvent;
                    xmlEvent = this.xmlEvents[this.playBackNdx];
                    return xmlEvent.stateID;
                }
                getNextEvent(stateID, frameID) {
                    let xmlEvent;
                    let xResult = null;
                    if (this.logTrace)
                        CUtil_21.CUtil.trace("getEvent for State: " + stateID + " : Frame : " + frameID);
                    for (; this.playBackNdx < this.playBackSiz; this.playBackNdx++) {
                        xmlEvent = this.xmlEvents[this.playBackNdx];
                        if (xmlEvent.type != "WOZevent")
                            continue;
                        if (xmlEvent.frameID == frameID) {
                            if (xmlEvent.CEFMouseEvent != undefined) {
                                xResult = xmlEvent;
                                this.playBackNdx++;
                                break;
                            }
                            else if (xmlEvent.CEFTextEvent != undefined) {
                                xResult = xmlEvent;
                                this.playBackNdx++;
                                break;
                            }
                        }
                        else
                            break;
                    }
                    if (this.playBackNdx >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    return xResult;
                }
                playBackDone() {
                    return this.fPlayBackDone;
                }
                getActionEvent(frameTime) {
                    let xResult = null;
                    let nAction;
                    if (this.logTrace)
                        CUtil_21.CUtil.trace("getActionEvent: " + frameTime);
                    for (nAction = this.lastAction + 1; nAction < this.playBackSiz; nAction++) {
                        if (this.xmlEvents[nAction].type != "WOZevent")
                            continue;
                        else if (this.xmlEvents[nAction].CEFMouseEvent != undefined) {
                            if (this.xmlEvents[nAction].time <= frameTime) {
                                if (this.xmlEvents[nAction].CEFMouseEvent.CEFEvent.type != "WOZMOUSE_MOVE") {
                                    xResult = this.xmlEvents[nAction];
                                    break;
                                }
                            }
                            else
                                break;
                        }
                        else if (this.xmlEvents[nAction].CEFTextEvent != undefined) {
                            if (this.xmlEvents[nAction].time <= frameTime) {
                                xResult = this.xmlEvents[nAction];
                                break;
                            }
                            else
                                break;
                        }
                    }
                    if (nAction >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    if (xResult != null)
                        this.lastAction = nAction;
                    return xResult;
                }
                setPlayBackDone(val) {
                    this.fPlayBackDone = val;
                }
                getMoveEvent(frameTime) {
                    let xResult = null;
                    let nMove;
                    for (nMove = this.lastMove; nMove < this.playBackSiz; nMove++) {
                        if (this.xmlEvents[nMove].type != "WOZevent")
                            continue;
                        if (this.xmlEvents[nMove].time >= frameTime) {
                            if (this.xmlEvents[nMove].CEFMouseEvent.CEFEvent.type == "WOZMOUSE_MOVE") {
                                xResult = this.xmlEvents[nMove];
                                break;
                            }
                        }
                    }
                    if (nMove >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    this.lastMove = nMove;
                    return xResult;
                }
            };
            exports_41("CLogQueue", CLogQueue);
        }
    };
});
System.register("network/CURLRequest", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var CURLRequest;
    return {
        setters: [],
        execute: function () {
            CURLRequest = class CURLRequest {
                constructor(_url, _type = CURLRequest.MIME_JSON, _timeout = 2000) {
                    this.url = _url;
                    this.type = _type;
                    this.timeout = _timeout;
                }
            };
            CURLRequest.MIME_TEXT = "text/plain";
            CURLRequest.MIME_HTML = "text/html";
            CURLRequest.MIME_JPEG = "image/jpeg";
            CURLRequest.MIME_PNG = "image/png";
            CURLRequest.MIME_MPEG = "audio/mpeg";
            CURLRequest.MIME_OGG = "audio/ogg";
            CURLRequest.MIME_AUDIO = "audio/*";
            CURLRequest.MIME_MP4 = "video/mp4";
            CURLRequest.MIME_APP = "application/*";
            CURLRequest.MIME_JSON = "application/json";
            CURLRequest.MIME_JS = "application/javascript";
            CURLRequest.MIME_ES = "application/ecmascript";
            CURLRequest.MIME_OCTET = "application/octet-stream";
            exports_42("CURLRequest", CURLRequest);
        }
    };
});
System.register("network/CURLLoader", [], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var EventDispatcher, CURLLoader;
    return {
        setters: [],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CURLLoader = class CURLLoader extends EventDispatcher {
                constructor(_request = null) {
                    super();
                    this.request = _request;
                }
                loadJSON(pathToFile, scope, callback) {
                    let async;
                    let xhr = new XMLHttpRequest();
                    xhr.overrideMimeType("application/json");
                    xhr.open('GET', pathToFile, async = true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            callback.call(scope, xhr.responseText);
                        }
                    };
                    xhr.send(null);
                }
                load(_request, progressFn = null) {
                    this.request = _request;
                    return this.loadAsyncModule(progressFn);
                }
                loadAsyncModule(progressFn) {
                    let loader = this;
                    var requestPromise = new Promise(function (resolve, reject) {
                        let xhr = new XMLHttpRequest;
                        xhr.open("GET", loader.request.url, true);
                        xhr.timeout = 5000;
                        xhr.onload = function (e) {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200 || xhr.status === 0) {
                                    resolve(xhr.response);
                                }
                                else {
                                    console.error(xhr.response);
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.onprogress = function (e) {
                            if (progressFn)
                                progressFn(loader.request, e);
                        };
                        xhr.ontimeout = function (e) {
                            console.error("Timeout: loadAsyncModule");
                            reject("timeout");
                        };
                        xhr.send();
                    });
                    return requestPromise;
                }
            };
            exports_43("CURLLoader", CURLLoader);
        }
    };
});
System.register("events/CDnsEvent", ["util/CUtil"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var CUtil_22, Event, CDnsEvent;
    return {
        setters: [
            function (CUtil_22_1) {
                CUtil_22 = CUtil_22_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CDnsEvent = class CDnsEvent extends Event {
                constructor(type = CDnsEvent.COMPLETE, _dnsData = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.dnsData = _dnsData;
                }
                clone() {
                    CUtil_22.CUtil.trace("cloning CDnsEvent:");
                    return new CDnsEvent(this.type, this.dnsData, this.bubbles, this.cancelable);
                }
            };
            CDnsEvent.COMPLETE = "dnscomplete";
            CDnsEvent.FAILED = "dnsfailed";
            exports_44("CDnsEvent", CDnsEvent);
        }
    };
});
System.register("network/CDDnsLoader", ["network/CURLLoader", "events/CDnsEvent", "events/CIOErrorEvent", "events/CSecurityErrorEvent", "events/CEFEvent", "events/CProgressEvent", "util/CUtil", "network/CURLRequest"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var CURLLoader_1, CDnsEvent_1, CIOErrorEvent_1, CSecurityErrorEvent_1, CEFEvent_3, CProgressEvent_1, CUtil_23, CURLRequest_1, CDDnsLoader;
    return {
        setters: [
            function (CURLLoader_1_1) {
                CURLLoader_1 = CURLLoader_1_1;
            },
            function (CDnsEvent_1_1) {
                CDnsEvent_1 = CDnsEvent_1_1;
            },
            function (CIOErrorEvent_1_1) {
                CIOErrorEvent_1 = CIOErrorEvent_1_1;
            },
            function (CSecurityErrorEvent_1_1) {
                CSecurityErrorEvent_1 = CSecurityErrorEvent_1_1;
            },
            function (CEFEvent_3_1) {
                CEFEvent_3 = CEFEvent_3_1;
            },
            function (CProgressEvent_1_1) {
                CProgressEvent_1 = CProgressEvent_1_1;
            },
            function (CUtil_23_1) {
                CUtil_23 = CUtil_23_1;
            },
            function (CURLRequest_1_1) {
                CURLRequest_1 = CURLRequest_1_1;
            }
        ],
        execute: function () {
            CDDnsLoader = class CDDnsLoader extends CURLLoader_1.CURLLoader {
                constructor(request = null, _StextArea = null) {
                    super(request);
                    this.source = "http://tedserver.psy.cmu.edu/DDNS.JSON";
                    this.tracer = _StextArea;
                }
                resolveArbiter() {
                    let request = new CURLRequest_1.CURLRequest(this.source);
                    this.configureDDNSListeners(true);
                    try {
                        this.load(request);
                        CUtil_23.CUtil.trace("Document load requested: " + this.source);
                    }
                    catch (error) {
                        CUtil_23.CUtil.trace("Error loading requested document: " + this.source);
                    }
                }
                configureDDNSListeners(fAdd) {
                    if (fAdd) {
                        this.addEventListener(CEFEvent_3.CEFEvent.COMPLETE, this.completeHandlerDDNS);
                        this.addEventListener(CProgressEvent_1.CProgressEvent.PROGRESS, this.progressHandlerDDNS);
                        this.addEventListener(CSecurityErrorEvent_1.CSecurityErrorEvent.SECURITY_ERROR, this.securityErrorHandlerDDNS);
                        this.addEventListener(CIOErrorEvent_1.CIOErrorEvent.IO_ERROR, this.ioErrorHandlerDDNS);
                    }
                    else {
                        this.removeEventListener(CEFEvent_3.CEFEvent.COMPLETE, this.completeHandlerDDNS);
                        this.removeEventListener(CProgressEvent_1.CProgressEvent.PROGRESS, this.progressHandlerDDNS);
                        this.removeEventListener(CSecurityErrorEvent_1.CSecurityErrorEvent.SECURITY_ERROR, this.securityErrorHandlerDDNS);
                        this.removeEventListener(CIOErrorEvent_1.CIOErrorEvent.IO_ERROR, this.ioErrorHandlerDDNS);
                    }
                }
                completeHandlerDDNS(evt) {
                    CUtil_23.CUtil.trace("DDNS Load Successful:");
                    let server;
                    let ipAddress = "";
                    let _logManager;
                    this.configureDDNSListeners(false);
                    try {
                        this.ddnsJSON = JSON.parse(this.data);
                        for (server in this.ddnsJSON.servers) {
                            if (server.protocol == 'TEDSERVER_E') {
                                _logManager.sessionHost = server.ipAddress;
                                _logManager.sessionPort = Number(server.port);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        CUtil_23.CUtil.trace('Invalid DDNS.JSON specification');
                    }
                    this.dispatchEvent(new CDnsEvent_1.CDnsEvent(CDnsEvent_1.CDnsEvent.COMPLETE, server.ipAddress));
                }
                progressHandlerDDNS(evt) {
                    CUtil_23.CUtil.trace("DDNS progressHandler loaded:" + evt.loaded + " total: " + evt.total);
                }
                securityErrorHandlerDDNS(evt) {
                    this.configureDDNSListeners(false);
                    this.dispatchEvent(new CDnsEvent_1.CDnsEvent(CDnsEvent_1.CDnsEvent.FAILED, evt.toString()));
                }
                ioErrorHandlerDDNS(evt) {
                    this.configureDDNSListeners(false);
                    this.dispatchEvent(new CDnsEvent_1.CDnsEvent(CDnsEvent_1.CDnsEvent.FAILED, evt.toString()));
                }
            };
            exports_45("CDDnsLoader", CDDnsLoader);
        }
    };
});
System.register("events/CTimerEvent", ["util/CUtil"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var CUtil_24, Event, CTimerEvent;
    return {
        setters: [
            function (CUtil_24_1) {
                CUtil_24 = CUtil_24_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CTimerEvent = class CTimerEvent extends Event {
                constructor(type = CTimerEvent.TIMER, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.traceMode = false;
                }
                clone() {
                    if (this.traceMode)
                        CUtil_24.CUtil.trace("cloning CTimerEvent:");
                    return new CTimerEvent(this.type, this.bubbles, this.cancelable);
                }
            };
            CTimerEvent.TIMER = "timer";
            CTimerEvent.TIMER_COMPLETE = "timer_complete";
            exports_46("CTimerEvent", CTimerEvent);
        }
    };
});
System.register("managers/CLogManager", ["core/CEFTimer", "mongo/CMongo", "mongo/CObject", "network/CSocket", "network/CLogSocket", "network/CLogQueue", "network/CDDnsLoader", "events/CLogEvent", "events/CTimerEvent", "events/CDataEvent", "events/CDnsEvent", "util/CONST", "util/CUtil"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var CEFTimer_1, CMongo_1, CObject_2, CSocket_1, CLogSocket_1, CLogQueue_1, CDDnsLoader_1, CLogEvent_3, CTimerEvent_1, CDataEvent_1, CDnsEvent_2, CONST_3, CUtil_25, EventDispatcher, CLogManager, SingletonObj;
    return {
        setters: [
            function (CEFTimer_1_1) {
                CEFTimer_1 = CEFTimer_1_1;
            },
            function (CMongo_1_1) {
                CMongo_1 = CMongo_1_1;
            },
            function (CObject_2_1) {
                CObject_2 = CObject_2_1;
            },
            function (CSocket_1_1) {
                CSocket_1 = CSocket_1_1;
            },
            function (CLogSocket_1_1) {
                CLogSocket_1 = CLogSocket_1_1;
            },
            function (CLogQueue_1_1) {
                CLogQueue_1 = CLogQueue_1_1;
            },
            function (CDDnsLoader_1_1) {
                CDDnsLoader_1 = CDDnsLoader_1_1;
            },
            function (CLogEvent_3_1) {
                CLogEvent_3 = CLogEvent_3_1;
            },
            function (CTimerEvent_1_1) {
                CTimerEvent_1 = CTimerEvent_1_1;
            },
            function (CDataEvent_1_1) {
                CDataEvent_1 = CDataEvent_1_1;
            },
            function (CDnsEvent_2_1) {
                CDnsEvent_2 = CDnsEvent_2_1;
            },
            function (CONST_3_1) {
                CONST_3 = CONST_3_1;
            },
            function (CUtil_25_1) {
                CUtil_25 = CUtil_25_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CLogManager = class CLogManager extends EventDispatcher {
                constructor(enforcer) {
                    super();
                    this.traceMode = true;
                    this.fdebugMode = false;
                    this._forcedAddress = "";
                    this._DataStreaming = false;
                    this._QueStreaming = false;
                    this._logWaiting = true;
                    this._sending = false;
                    this._authenticating = false;
                    this._fReconnect = false;
                    this._isConnecting = false;
                    this._isConnected = false;
                    this._sessionActive = false;
                    this._sessionID = "";
                    this._sessionStatus = CONST_3.CONST.SESSION_START;
                    this.logEventTimer = new CEFTimer_1.CEFTimer(60);
                    this.logTimeout = new CEFTimer_1.CEFTimer(10000, 1);
                    this._useQueue = true;
                    this._fTutorPart = "test";
                    if (enforcer && enforcer instanceof SingletonObj) {
                        CLogManager._logQueue = new CLogQueue_1.CLogQueue();
                        CLogManager._logQueue.addEventListener(CLogEvent_3.CLogEvent.PROG_MSG, this.progressListener);
                    }
                    else {
                        throw (new Error("Invalid CLogManager Creation Request"));
                    }
                }
                static getInstance() {
                    let result;
                    if (CLogManager._instance == null)
                        CLogManager._instance = new CLogManager(new SingletonObj());
                    return CLogManager._instance;
                }
                useLocalHost() {
                    this.fdebugMode = true;
                }
                progressListener(e) {
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.PROG_MSG))
                        this.dispatchEvent(e);
                }
                queryTheQueue() {
                    CLogManager._logQueue.emitProgress();
                }
                get fLogging() {
                    return this._fLogging;
                }
                set fLogging(newVal) {
                    this._fLogging = newVal;
                    if (this._fLogging & CONST_3.CONST.RECORDEVENTS)
                        CLogManager._logQueue.openQueue();
                    else
                        CLogManager._logQueue.closeQueue();
                }
                set account(_account) {
                    this._sessionAccount = _account;
                }
                get fTutorPart() {
                    return this._fTutorPart;
                }
                set fTutorPart(newVal) {
                    this._fTutorPart = newVal;
                }
                setQueueStreamState(startQueue) {
                    if (startQueue && (this._fLogging & CONST_3.CONST.LOGEVENTS)) {
                        this.startQueuedStream();
                        CUtil_25.CUtil.trace('Stream now Open');
                    }
                    else {
                        this.stopQueuedStream();
                        CUtil_25.CUtil.trace('Stream now Closed');
                    }
                }
                getQueueStreamState() {
                    let result;
                    if (CLogManager._logQueue.isStreaming)
                        result = CLogEvent_3.CLogEvent.CONNECTION_OPEN;
                    else
                        result = CLogEvent_3.CLogEvent.CONNECTION_CLOSED;
                    return result;
                }
                getQueueState() {
                    let result;
                    if (this._QueStreaming) {
                        if (!CLogManager._logQueue.isQueueEmpty())
                            result = CLogEvent_3.CLogEvent.QUEUE_OPENED;
                        else
                            result = CLogEvent_3.CLogEvent.QUEUE_WAITING;
                    }
                    else
                        result = CLogEvent_3.CLogEvent.QUEUE_CLOSED;
                    return result;
                }
                connectProtocol(func) {
                }
                disConnectProtocol(func) {
                }
                attachTracer(_StextArea) {
                    this.tracer = _StextArea;
                }
                connectForInterface() {
                    this.indirectConnectSocket();
                }
                connectToAuthenticate() {
                    if (!this._authenticating) {
                        this._authenticating = true;
                        this.indirectConnectSocket();
                    }
                }
                connectToReattach() {
                    if (!this._authenticating) {
                        this._authenticating = true;
                        this.directConnectSocket();
                    }
                }
                indirectConnectSocket() {
                    if (!(this._isConnecting || this._isConnected)) {
                        this._isConnecting = true;
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.DDNS_IN_PROGRESS));
                        if (!this.dnsLoader)
                            this.dnsLoader = new CDDnsLoader_1.CDDnsLoader(null, this.tracer);
                        if (this.dnsLoader) {
                            this.dnsLoader.addEventListener(CDnsEvent_2.CDnsEvent.COMPLETE, this.DNSresolved);
                            this.dnsLoader.addEventListener(CDnsEvent_2.CDnsEvent.FAILED, this.DNSfailed);
                            this.dnsLoader.resolveArbiter();
                        }
                        else
                            this._isConnecting = false;
                    }
                }
                directConnectSocket() {
                    this.createSocket();
                    try {
                        if (this.fdebugMode) {
                            this._logHostAddress = "127.0.0.1";
                            this._logHostPort = CONST_3.CONST.PORT_LOGGER;
                        }
                        this.logSocket.openSocket(this._logHostAddress, this._logHostPort);
                    }
                    catch (error) {
                        CUtil_25.CUtil.trace("catch all" + error);
                    }
                }
                get connectionActive() {
                    return (this._isConnected);
                }
                getConnectionState() {
                    let result;
                    if (this._isConnected)
                        result = CLogEvent_3.CLogEvent.CONNECTION_OPEN;
                    else
                        result = CLogEvent_3.CLogEvent.CONNECTION_CLOSED;
                    return result;
                }
                get connectionActiveOrPending() {
                    return (this._isConnecting || this._isConnected);
                }
                get sessionID() {
                    return this._sessionID;
                }
                get sessionHost() {
                    return this._logHostAddress;
                }
                set sessionHost(newHost) {
                    this._logHostAddress = newHost;
                }
                get sessionPort() {
                    return this._logHostPort;
                }
                set sessionPort(newPort) {
                    this._logHostPort = newPort;
                }
                useQueue(useQ) {
                    if (this._sessionID == "")
                        this._useQueue = useQ;
                }
                get isSessionActive() {
                    return this._sessionActive;
                }
                get sessionStatus() {
                    return this._sessionStatus;
                }
                abandonSession(abandonData = false, newStatus = CONST_3.CONST.SESSION_START) {
                    this._sessionActive = false;
                    this._sessionStatus = newStatus;
                    this._sessionID = "";
                    this._sessionTime = 0;
                    this.fLogging = CONST_3.CONST.RECLOGNONE;
                    this.abandonSocket(abandonData);
                }
                abandonSocket(abandonData = false) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ ABANDON SOCKET @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    if (this.logSocket) {
                        if (this.logSocket.connected) {
                        }
                        else {
                            this._isConnected = false;
                            this._isConnecting = false;
                        }
                        this.cleanupSocket();
                        this.stopDebugDataStream();
                        if (abandonData)
                            CLogManager._logQueue.resetQueue();
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.CONNECTION_TERMINATED));
                    }
                    else {
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.CONNECTION_TERMINATED));
                    }
                }
                timeStampSession() {
                    this._sessionTime = CUtil_25.CUtil.getTimer();
                }
                get sessionTime() {
                    let curTime;
                    curTime = (CUtil_25.CUtil.getTimer() - this._sessionTime) / 1000.0;
                    return curTime.toString();
                }
                submitAuthentication(logData) {
                    this.sendJSONPacket(logData);
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.SEND_STATUS))
                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SEND_STATUS));
                }
                submitJSONQuery(logData) {
                    this.sendJSONPacket(logData);
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.SEND_STATUS))
                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SEND_STATUS));
                }
                flushGlobalStateLocally(name) {
                }
                generateEvent(logData, type) {
                    try {
                        logData['type'] = type;
                        logData['version'] = '1.0';
                        logData['time'] = this.sessionTime;
                        logData['seqid'] = CLogManager._logQueue.nextNdx;
                        logData = CMongo_1.CMongo.insertPacket('logmanager', CONST_3.CONST.LOG_PACKET, 'unused', logData);
                        logData = logData.replace("{", '{"seqid":' + CLogManager._logQueue.nextNdx + ',');
                    }
                    catch (error) {
                        console.log("Log Event Generation Failed: " + error);
                    }
                    return logData;
                }
                logSessionIDEvent() {
                    this.timeStampSession();
                    let logData = { 'event': 'sessionID', 'name': this._sessionID, 'part': this._fTutorPart };
                    logData = this.generateEvent(logData, 'SessionEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logLiveEvent(logData) {
                    logData = this.generateEvent(logData, 'WOZevent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logActionEvent(logData) {
                    logData = this.generateEvent(logData, 'ActionEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logStateEvent(logData) {
                    logData = this.generateEvent(logData, 'StateEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logNavEvent(logData) {
                    logData = this.generateEvent(logData, 'NavEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logDurationEvent(logData) {
                    logData = this.generateEvent(logData, 'DurationEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logProgressEvent(logData) {
                    logData = CMongo_1.CMongo.updatePacket('logManager', CONST_3.CONST.LOG_PROGRESS, 'unused', { "_id": this._sessionAccount.userData._id }, logData['reify']);
                    logData = logData.replace("{", '{"seqid":' + CLogManager._logQueue.nextNdx + ',');
                    CLogManager._logQueue.logEvent(logData);
                }
                logTerminateEvent() {
                    let termMsg = {};
                    let profileNdx = this._sessionAccount.session.profile_Index;
                    termMsg['phases'] = new CObject_2.CObject;
                    termMsg['phases'][profileNdx] = new CObject_2.CObject;
                    termMsg['phases'][profileNdx]['progress'] = CONST_3.CONST._COMPLETE;
                    termMsg = CMongo_1.CMongo.updatePacket('logManager', CONST_3.CONST.LOG_TERMINATE, 'unused', { "_id": this._sessionAccount.userData._id }, termMsg);
                    CLogManager._logQueue.logEvent(termMsg);
                    CLogManager._logQueue.closeQueue();
                    if (this._fLogging & CONST_3.CONST.LOGEVENTS) {
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.SESSION_TERMINATED));
                    }
                    else {
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.SESSION_FLUSHED));
                    }
                }
                logDebugEvent(logData) {
                    this.generateEvent(logData, 'DebugEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                logErrorEvent(logData) {
                    this.generateEvent(logData, 'ErrorEvent');
                    CLogManager._logQueue.logEvent(logData);
                }
                sendPacket(packet) {
                    return this.sendXMLPacket(packet);
                }
                sendXMLPacket(packet) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@  QUEUEING XML PACKET: \n", packet);
                    let packetStr;
                    let fResult = false;
                    if (this._isConnected) {
                        packetStr = packet;
                        if (!this.logSocket.sendData(packetStr)) {
                            if (this.traceMode)
                                CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ SOCKET OFFLINE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                        }
                        else {
                            fResult = true;
                            if (this.tracer) {
                                if (packet.children[0].name == "terminatesession") {
                                }
                            }
                        }
                    }
                    return fResult;
                }
                sendJSONPacket(packet) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@  SENDING JSON LOG PACKET: \n", packet);
                    let packetStr;
                    let fResult = false;
                    if (this._isConnected) {
                        if (typeof packet === 'string')
                            packetStr = packet;
                        else
                            packetStr = JSON.stringify(packet);
                        if (!this.logSocket.sendData(packetStr)) {
                            if (this.traceMode)
                                CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ SOCKET OFFLINE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                        }
                        else {
                            this.logTimeout.reset();
                            this.logTimeout.addEventListener(CTimerEvent_1.CTimerEvent.TIMER_COMPLETE, this.socketTimeout);
                            this.logTimeout.start();
                            CUtil_25.CUtil.trace("created Timer : " + this.logTimeout);
                            fResult = true;
                        }
                    }
                    return fResult;
                }
                resetSendTimer() {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("SOCKET TIMER - Cleaned up ");
                    this.logTimeout.reset();
                    this.logTimeout.removeEventListener(CTimerEvent_1.CTimerEvent.TIMER_COMPLETE, this.socketTimeout);
                }
                socketTimeout(e) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ SOCKET TIMEOUT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    this.resetSendTimer();
                    this.recycleConnection(false);
                }
                sendDebugPacket(logData) {
                    if (!this._sending) {
                        if (this._useQueue) {
                            this.logDebugEvent(logData);
                        }
                        else if (this.sendXMLPacket(logData)) {
                            this.logSocket.addEventListener(CDataEvent_1.CDataEvent.DATA, this.ackPacket);
                            this._sending = true;
                        }
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SEND_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SEND_STATUS));
                    }
                }
                ackPacket(evt) {
                    let data = evt.data;
                    this.logSocket.removeEventListener(CDataEvent_1.CDataEvent.DATA, this.ackPacket);
                    this._sending = false;
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.SEND_STATUS))
                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SEND_STATUS));
                }
                startDebugDataStream() {
                    if (!this._DataStreaming) {
                        this._DataStreaming = true;
                        this.logSocket.addEventListener(CDataEvent_1.CDataEvent.DATA, this.ackStream);
                        if (this.sendJSONPacket({ 'event': 'noop' })) {
                        }
                        else {
                            this._DataStreaming = false;
                            this.logSocket.removeEventListener(CDataEvent_1.CDataEvent.DATA, this.ackStream);
                        }
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.DATASTREAM_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.DATASTREAM_STATUS, CLogEvent_3.CLogEvent.STREAM_OPENED));
                    }
                }
                stopDebugDataStream() {
                    if (this._DataStreaming) {
                        this._DataStreaming = false;
                        this.logSocket.addEventListener(CDataEvent_1.CDataEvent.DATA, this.ackStream);
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.DATASTREAM_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.DATASTREAM_STATUS, CLogEvent_3.CLogEvent.STREAM_CLOSED));
                    }
                }
                ackStream(evt) {
                    let data = evt.data;
                    if (this._DataStreaming)
                        this.sendXMLPacket({ 'event': 'noop' });
                    else
                        this.logSocket.removeEventListener(CDataEvent_1.CDataEvent.DATA, this.ackStream);
                }
                startQueuedStream() {
                    if (!this._QueStreaming) {
                        this._QueStreaming = true;
                        CLogManager._logQueue.addEventListener(CLogEvent_3.CLogEvent.QUEUE_CHANGED, this.queueChanged);
                        CLogManager._logQueue.startQueueStream();
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.STREAM_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.STREAM_STATUS, CLogEvent_3.CLogEvent.STREAM_OPENED));
                    }
                }
                stopQueuedStream() {
                    if (this._QueStreaming) {
                        this._QueStreaming = false;
                        CLogManager._logQueue.removeEventListener(CLogEvent_3.CLogEvent.QUEUE_CHANGED, this.queueChanged);
                        CLogManager._logQueue.stopQueueStream();
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.STREAM_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.STREAM_STATUS, CLogEvent_3.CLogEvent.STREAM_CLOSED));
                    }
                }
                queueChanged(evt) {
                    if (this._logWaiting && !CLogManager._logQueue.isQueueEmpty()) {
                        if (this.sendJSONPacket(CLogManager._logQueue.nextPacket())) {
                            this._logWaiting = false;
                            if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_SENDING));
                        }
                    }
                }
                startQueueing() {
                    CUtil_25.CUtil.trace("start queueing");
                    this.logEventTimer.addEventListener(CTimerEvent_1.CTimerEvent.TIMER, this.queueCallBack);
                    this.logEventTimer.start();
                }
                stopQueueing() {
                    CUtil_25.CUtil.trace("stop queueing");
                    this.logEventTimer.stop();
                    this.logEventTimer.removeEventListener(CTimerEvent_1.CTimerEvent.TIMER, this.queueCallBack);
                }
                queueCallBack(evt) {
                    let logData = { 'event': 'noop' };
                    this.logDebugEvent(logData);
                    if (this.traceMode)
                        CUtil_25.CUtil.trace(".");
                }
                get isDataStreaming() {
                    return this._DataStreaming;
                }
                get isQueueStreaming() {
                    return this._QueStreaming;
                }
                get queueLength() {
                    return CLogManager._logQueue.length;
                }
                get queuePosition() {
                    return CLogManager._logQueue.Position;
                }
                get isSending() {
                    return this._sending;
                }
                get isConnected() {
                    return (this.logSocket) ? this.logSocket.connected : false;
                }
                socketConnectionHdlr(evt) {
                    let authMsg;
                    if (evt.subType == CLogEvent_3.CLogEvent.SOCKET_OPENED) {
                        this._isConnecting = false;
                        this._isConnected = true;
                        if (this.traceMode)
                            CUtil_25.CUtil.trace("############ this.logSocket Connected");
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.CONNECTION_OPEN));
                    }
                    else {
                        if (this._sessionStatus == CONST_3.CONST.SESSION_RUNNING)
                            this._sessionStatus = CONST_3.CONST.SESSION_INTERRUPTED;
                        if (!this.logSocket.connected) {
                            this.logSocket.removeEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS, this.socketConnectionHdlr);
                            this.logSocket.removeEventListener(CDataEvent_1.CDataEvent.DATA, this.protocolHandlerLGR);
                            if (this.traceMode)
                                CUtil_25.CUtil.trace("############ this.logSocket Disconnected - allow GC");
                            this.logSocket = null;
                            this._isConnected = false;
                            this._authenticating = false;
                            this._logWaiting = true;
                            if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_WAITING));
                            if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.CONNECTION_CLOSED));
                        }
                        this._isConnecting = false;
                    }
                    if (this._sending) {
                        this._sending = false;
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SEND_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SEND_STATUS));
                    }
                }
                createSocket() {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ SOCKET CREATION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    this.logSocket = new CLogSocket_1.CLogSocket(null, 0, this.tracer);
                    this.logSocket.addEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS, this.socketConnectionHdlr);
                    this.logSocket.addEventListener(CDataEvent_1.CDataEvent.DATA, this.protocolHandlerLGR);
                }
                cleanupSocket() {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ SOCKET CLEANUP @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    this.resetSendTimer();
                    if (this.logSocket) {
                        if (this.logSocket.connected) {
                            this.logSocket.closeSocket();
                        }
                        else {
                            this.logSocket.removeEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS, this.socketConnectionHdlr);
                            this.logSocket.removeEventListener(CDataEvent_1.CDataEvent.DATA, this.protocolHandlerLGR);
                        }
                    }
                    this._logWaiting = true;
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_WAITING));
                }
                recycleConnection(fRestart) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ CONNECTION RECYCLING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    this.cleanupSocket();
                    if (fRestart)
                        CLogManager._logQueue.restartQueue();
                }
                cleanupDNSLoader() {
                    this.dnsLoader.removeEventListener(CDnsEvent_2.CDnsEvent.COMPLETE, this.DNSresolved);
                    this.dnsLoader.removeEventListener(CDnsEvent_2.CDnsEvent.FAILED, this.DNSfailed);
                    this.dnsLoader = null;
                }
                DNSresolved(evt) {
                    if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.DDNS_RESOLVED));
                    this.createSocket();
                    try {
                        if (this.fdebugMode) {
                            this._logHostAddress = "127.0.0.1";
                            this._logHostPort = CONST_3.CONST.PORT_LOGGER;
                        }
                        this.logSocket.openSocket(this._logHostAddress, this._logHostPort);
                    }
                    catch (error) {
                        CUtil_25.CUtil.trace("catch all" + error);
                    }
                    this.cleanupDNSLoader();
                }
                DNSfailed(evt) {
                    this.cleanupDNSLoader();
                    if (this._isConnecting) {
                        this._isConnecting = false;
                        if (this.hasEventListener(CLogEvent_3.CLogEvent.CONNECT_STATUS))
                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.CONNECT_STATUS, CLogEvent_3.CLogEvent.DDNS_FAILED));
                    }
                }
                protocolHandlerLGR(evt) {
                    let servermessage;
                    let dataPacket;
                    let seqID;
                    if (CLogManager._logQueue.queueMode == CONST_3.CONST.MODE_JSON) {
                        try {
                            dataPacket = JSON.parse(evt.data);
                            switch (dataPacket.command) {
                                case CONST_3.CONST.ACKLOG_PACKET:
                                case CONST_3.CONST.ACKLOG_PROGRESS:
                                    if (this.traceMode)
                                        CUtil_25.CUtil.trace("@@@@@@@  JSON LOG PACKET ACKNOWLEDGED:");
                                    this.resetSendTimer();
                                    if (!CLogManager._logQueue.ackPacket(dataPacket.seqid)) {
                                        break;
                                    }
                                    if (this._QueStreaming) {
                                        if (!CLogManager._logQueue.isQueueEmpty()) {
                                            this.sendJSONPacket(CLogManager._logQueue.nextPacket());
                                            if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_OPENED));
                                        }
                                        else {
                                            this._logWaiting = true;
                                            if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_WAITING));
                                        }
                                    }
                                    else {
                                        this._logWaiting = true;
                                        if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_WAITING));
                                    }
                                    break;
                                case CONST_3.CONST.ACKLOG_NAK:
                                    this.resetSendTimer();
                                    let packet = CLogManager._logQueue.nextPacket();
                                    if (packet != null) {
                                        this.sendJSONPacket(packet);
                                    }
                                    else {
                                    }
                                    break;
                                case CONST_3.CONST.ACKLOG_TERMINATE:
                                    this.resetSendTimer();
                                    if (this.traceMode)
                                        CUtil_25.CUtil.trace("@@@@@@@@@@@@@@@@@@@@@@ CONST.ACKLOG_TERMINATE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                                    this.abandonSession(false, CONST_3.CONST.SESSION_COMPLETE);
                                    if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                        this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.SESSION_FLUSHED));
                                    break;
                                default:
                                    this.resetSendTimer();
                                    this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.PACKET_FORWARD, CLogEvent_3.CLogEvent.PACKET_DATA, 0, 0, dataPacket));
                                    break;
                            }
                        }
                        catch (err) {
                            CUtil_25.CUtil.trace("protocolHandlerLGR - Message Format Error: " + err.tostring());
                            this._authenticating = false;
                            if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.AUTH_FAILED));
                        }
                    }
                    else {
                        servermessage = evt.data;
                        if (this.traceMode)
                            CUtil_25.CUtil.trace("Logger Responded: " + servermessage.name() + "\n\nFull Packet: \n" + servermessage);
                        if (servermessage.name() == CSocket_1.CSocket.xmlSERVER_MESSAGE) {
                            let msgClass;
                            for (msgClass in servermessage.children()) {
                                switch (msgClass.name().tostring()) {
                                    case CSocket_1.CSocket.xmlACKAUTH:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("Authentication success: " + msgClass.type);
                                        this._authenticating = false;
                                        this._sessionActive = true;
                                        this._sessionStatus = CONST_3.CONST.SESSION_RUNNING;
                                        this._sessionID = msgClass.type;
                                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.AUTH_SUCCESS, 0, 0, msgClass.type));
                                        break;
                                    case CSocket_1.CSocket.xmlNAKAUTH:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("Authentication failed: " + msgClass.type);
                                        this._authenticating = false;
                                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.AUTH_FAILED));
                                        break;
                                    case CSocket_1.CSocket.xmlSQLERROR:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("Server failure: " + msgClass.type + " " + msgClass.message);
                                        this._authenticating = false;
                                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.AUTH_FAILED));
                                        break;
                                    case CSocket_1.CSocket.xmlACKATTACH:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("@@@@@@@  SESSION REATTACH ACK: ");
                                        this._authenticating = false;
                                        this._sessionID = msgClass.type;
                                        this._sessionStatus = CONST_3.CONST.SESSION_RUNNING;
                                        if (this.sessionID.charAt(0) == '#') {
                                            if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.AUTH_FAILED));
                                        }
                                        else {
                                            if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.SESSION_RESTARTED, 0, 0, msgClass.type));
                                        }
                                        break;
                                    case CSocket_1.CSocket.xmlACK:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("@@@@@@@  SIMPLE PACKET ACK: ");
                                        break;
                                    case CSocket_1.CSocket.xmlACKSESSION:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("@@@@@@@  SESSION PACKET ACK: ");
                                        this._sessionID = msgClass.type;
                                        if (this._sessionID.charAt(0) == '#') {
                                            this.cleanupSocket();
                                            if (this.hasEventListener(CLogEvent_3.CLogEvent.SERVER_FAILED))
                                                this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SERVER_FAILED, this._sessionID));
                                        }
                                        break;
                                    case CSocket_1.CSocket.xmlACKTERM:
                                        this.abandonSession(false);
                                        if (this.hasEventListener(CLogEvent_3.CLogEvent.SESSION_STATUS))
                                            this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.SESSION_STATUS, CLogEvent_3.CLogEvent.SESSION_FLUSHED));
                                        break;
                                    case CSocket_1.CSocket.xmlACKLOG:
                                        seqID = msgClass.type;
                                        if (!CLogManager._logQueue.ackPacket(seqID)) {
                                            break;
                                        }
                                        if (this._QueStreaming) {
                                            if (!CLogManager._logQueue.isQueueEmpty()) {
                                                if (this.sendXMLPacket(CLogManager._logQueue.nextPacket())) {
                                                }
                                                if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                                    this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_OPENED));
                                            }
                                            else {
                                                this._logWaiting = true;
                                                if (this.hasEventListener(CLogEvent_3.CLogEvent.QUEUE_STATUS))
                                                    this.dispatchEvent(new CLogEvent_3.CLogEvent(CLogEvent_3.CLogEvent.QUEUE_STATUS, CLogEvent_3.CLogEvent.QUEUE_WAITING));
                                            }
                                        }
                                        break;
                                    default:
                                        if (this.traceMode)
                                            CUtil_25.CUtil.trace("Protocol Error");
                                        break;
                                }
                            }
                        }
                    }
                }
                activateSession(sessionID = null) {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("Authentication success: " + sessionID);
                    this._authenticating = false;
                    this._sessionActive = true;
                    this._sessionStatus = CONST_3.CONST.SESSION_RUNNING;
                    if (sessionID != null)
                        this._sessionID = sessionID;
                }
                failSession() {
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("Authentication failed: ");
                    this._authenticating = false;
                }
                setPlayBackSource(logSource) {
                    if (logSource == null) {
                        this.LogSource = "logCache";
                        this.playBackSiz = CLogManager._logQueue.length;
                    }
                    else {
                        this.LogSource = "xmlSource";
                        this.JSONEvents = logSource;
                        this.playBackSiz = logSource.length();
                        if (this.traceMode)
                            CUtil_25.CUtil.trace("playBackSiz: " + this.playBackSiz);
                    }
                    this.fPlayBackDone = false;
                    this.playBackNdx = 0;
                    this.lastAction = -1;
                    this.lastMove = 0;
                }
                unWrapLog() {
                    let unWrapped = "<unwrapped/>";
                    for (let i1 = 0; i1 < CLogManager._logQueue.length; i1++) {
                    }
                    return unWrapped.children();
                }
                normalizePlayBackTime() {
                    let nBaseTime;
                    let nEvent;
                    nBaseTime = this.JSONEvents[0].time;
                    if (nBaseTime != 0) {
                        for (nEvent = 0; nEvent < this.playBackSiz; nEvent++) {
                            this.JSONEvents[nEvent].time -= nBaseTime;
                            this.JSONEvents[nEvent].time *= 1000;
                        }
                    }
                }
                normalizePlayBack() {
                    let xmlEvent;
                    let nBaseTime;
                    let nBaseState;
                    let nBaseFrame;
                    let nEvent;
                    xmlEvent = this.JSONEvents[0];
                    nBaseTime = xmlEvent.time;
                    nBaseState = xmlEvent.stateID;
                    nBaseFrame = xmlEvent.frameID;
                    if (nBaseTime != 0) {
                        for (nEvent = 0; nEvent < this.playBackSiz; nEvent++) {
                            xmlEvent = this.JSONEvents[nEvent];
                            xmlEvent.time -= nBaseTime;
                            xmlEvent.stateID -= nBaseState;
                            xmlEvent.frameID -= nBaseFrame;
                        }
                    }
                }
                getNextEventState() {
                    let xmlEvent;
                    xmlEvent = this.JSONEvents[this.playBackNdx];
                    return xmlEvent.stateID;
                }
                getNextEvent(stateID, frameID) {
                    let xmlEvent;
                    let xResult = null;
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("getEvent for State: " + stateID + " : Frame : " + frameID);
                    for (; this.playBackNdx < this.playBackSiz; this.playBackNdx++) {
                        xmlEvent = this.JSONEvents[this.playBackNdx];
                        if (xmlEvent.type != "WOZevent")
                            continue;
                        if (xmlEvent.frameID == frameID) {
                            if (xmlEvent.CEFMouseEvent != undefined) {
                                xResult = xmlEvent;
                                this.playBackNdx++;
                                break;
                            }
                            else if (xmlEvent.CEFTextEvent != undefined) {
                                xResult = xmlEvent;
                                this.playBackNdx++;
                                break;
                            }
                        }
                        else
                            break;
                    }
                    if (this.playBackNdx >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    return xResult;
                }
                playBackDone() {
                    return this.fPlayBackDone;
                }
                getActionEvent(frameTime) {
                    let xResult = null;
                    let nAction;
                    if (this.traceMode)
                        CUtil_25.CUtil.trace("getActionEvent: " + frameTime);
                    for (nAction = this.lastAction + 1; nAction < this.playBackSiz; nAction++) {
                        if (this.JSONEvents[nAction].type != "WOZevent")
                            continue;
                        else if (this.JSONEvents[nAction].CEFMouseEvent != undefined) {
                            if (this.JSONEvents[nAction].time <= frameTime) {
                                if (this.JSONEvents[nAction].CEFMouseEvent.CEFEvent.type != "WOZMOUSE_MOVE") {
                                    xResult = this.JSONEvents[nAction];
                                    break;
                                }
                            }
                            else
                                break;
                        }
                        else if (this.JSONEvents[nAction].CEFTextEvent != undefined) {
                            if (this.JSONEvents[nAction].time <= frameTime) {
                                xResult = this.JSONEvents[nAction];
                                break;
                            }
                            else
                                break;
                        }
                    }
                    if (nAction >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    if (xResult != null)
                        this.lastAction = nAction;
                    return xResult;
                }
                setPlayBackDone(val) {
                    this.fPlayBackDone = val;
                }
                getMoveEvent(frameTime) {
                    let xResult = null;
                    let nMove;
                    for (nMove = this.lastMove; nMove < this.playBackSiz; nMove++) {
                        if (this.JSONEvents[nMove].type != "WOZevent")
                            continue;
                        if (this.JSONEvents[nMove].time >= frameTime) {
                            if (this.JSONEvents[nMove].CEFMouseEvent.CEFEvent.type == "WOZMOUSE_MOVE") {
                                xResult = this.JSONEvents[nMove];
                                break;
                            }
                        }
                    }
                    if (nMove >= this.playBackSiz)
                        this.fPlayBackDone = true;
                    this.lastMove = nMove;
                    return xResult;
                }
            };
            exports_47("CLogManager", CLogManager);
            SingletonObj = class SingletonObj {
            };
            exports_47("SingletonObj", SingletonObj);
        }
    };
});
System.register("scenegraph/CSceneHistory", ["scenegraph/CSceneHistoryNode"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var CSceneHistoryNode_1, CSceneHistory;
    return {
        setters: [
            function (CSceneHistoryNode_1_1) {
                CSceneHistoryNode_1 = CSceneHistoryNode_1_1;
            }
        ],
        execute: function () {
            CSceneHistory = class CSceneHistory extends Object {
                constructor(_tutorDoc) {
                    super();
                    this._history = new Array();
                    this._volatile = false;
                    this.tutorDoc = _tutorDoc;
                    this._ndx = 0;
                }
                push(node, scene) {
                    if (scene != null) {
                        this._history.push(new CSceneHistoryNode_1.CSceneHistoryNode(node, scene));
                        this._ndx = this._history.length;
                    }
                }
                next() {
                    let next = null;
                    if (this._ndx < this._history.length) {
                        this._ndx = this._ndx + 1;
                        next = this._history[this._ndx - 1];
                    }
                    return next;
                }
                back() {
                    let prev = null;
                    if (this._ndx > 1) {
                        this._ndx = this._ndx - 1;
                        if (this._volatile)
                            this._history.pop();
                        prev = this._history[this._ndx - 1];
                    }
                    return prev;
                }
                set volatile(newState) {
                    this._volatile = newState;
                }
                get isVolatile() {
                    return this._volatile;
                }
            };
            exports_48("CSceneHistory", CSceneHistory);
        }
    };
});
System.register("thermite/TText", ["thermite/TObject", "events/CEFEvent", "util/CUtil"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var TObject_3, CEFEvent_4, CUtil_26, TText;
    return {
        setters: [
            function (TObject_3_1) {
                TObject_3 = TObject_3_1;
            },
            function (CEFEvent_4_1) {
                CEFEvent_4 = CEFEvent_4_1;
            },
            function (CUtil_26_1) {
                CUtil_26 = CUtil_26_1;
            }
        ],
        execute: function () {
            TText = class TText extends TObject_3.TObject {
                constructor() {
                    super();
                    this.init3();
                }
                TTextInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_26.CUtil.trace("TText:Constructor");
                    this.on(CEFEvent_4.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                }
                Destructor() {
                }
                onAddedToStage(evt) {
                    console.log("Text On Stage");
                }
            };
            exports_49("TText", TText);
        }
    };
});
System.register("core/CEFTimeLine", ["events/CEFEvent", "util/CUtil"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var CEFEvent_5, CUtil_27, Timeline, CEFTimeLine;
    return {
        setters: [
            function (CEFEvent_5_1) {
                CEFEvent_5 = CEFEvent_5_1;
            },
            function (CUtil_27_1) {
                CUtil_27 = CUtil_27_1;
            }
        ],
        execute: function () {
            Timeline = createjs.Timeline;
            CEFTimeLine = class CEFTimeLine extends Timeline {
                constructor(tweens, labels, props, _tutorDoc) {
                    super(tweens, labels, props);
                    this.traceMode = false;
                    this.traceMode = true;
                    this.tutorDoc = _tutorDoc;
                    this.tutorContainer = _tutorDoc.tutorContainer;
                    this.tutorAutoObj = _tutorDoc.TutAutomator;
                    this.targets = new Array();
                }
                addTween(...tween) {
                    let result;
                    result = super.addTween(...tween);
                    tween.forEach(tween => this.targets.push(tween.target));
                    return result;
                }
                startTransition(xnF = null, scope) {
                    if (this.traceMode)
                        CUtil_27.CUtil.trace("startTransition : ");
                    this.xnFinalize = xnF;
                    this.xnScope = scope;
                    this.on(CEFEvent_5.CEFEvent.CHANGE, this.xnChanged, this);
                    this.gotoAndPlay(0);
                    if (this.traceMode)
                        CUtil_27.CUtil.trace("Transition Running: ");
                }
                stopTransitions() {
                    this.setPaused(true);
                    while (this._tweens.length != 0)
                        this.removeTween(this._tweens[0]);
                }
                xnChanged(evt) {
                    if (this.traceMode)
                        CUtil_27.CUtil.trace("xnChanged : ");
                    if (this.position >= this.duration) {
                        evt.remove();
                        this.xnFinished();
                    }
                }
                xnFinished() {
                    if (this.traceMode)
                        CUtil_27.CUtil.trace("xnFinished : ");
                    this.stopTransitions();
                    for (let tar of this.targets) {
                    }
                    this.targets = new Array();
                    if (this.xnFinalize != null)
                        this.xnFinalize.call(this.xnScope);
                    this.tutorDoc.incStateID();
                }
            };
            exports_50("CEFTimeLine", CEFTimeLine);
        }
    };
});
System.register("events/CEFMouseEvent", ["util/CUtil"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var CUtil_28, MouseEvent, TMouseEvent;
    return {
        setters: [
            function (CUtil_28_1) {
                CUtil_28 = CUtil_28_1;
            }
        ],
        execute: function () {
            MouseEvent = createjs.MouseEvent;
            TMouseEvent = class TMouseEvent extends MouseEvent {
                constructor(TarObjID, type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
                    super(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY);
                    this.localX = rawX;
                    this.localY = rawY;
                }
                clone() {
                    CUtil_28.CUtil.trace("cloning WOZEvent:");
                    return new TMouseEvent(this.tarObjID, this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
                }
                captureLogState(obj = null) {
                    obj['event'] = 'CEFMouseEvent';
                    obj['tarObjID'] = this.tarObjID;
                    obj['localX'] = this.localX;
                    obj['localY'] = this.localY;
                    return obj;
                }
                captureXMLState() {
                    var eventState = {};
                    return eventState;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    return bTest;
                }
            };
            TMouseEvent.MOUSE_MOVE = "mousemove";
            TMouseEvent.MOUSE_DOWN = "mousedown";
            TMouseEvent.MOUSE_UP = "mouseup";
            TMouseEvent.MOUSE_CLICK = "click";
            TMouseEvent.DOUBLE_CLICK = "dblclick";
            TMouseEvent.CLICK = "click";
            TMouseEvent.WOZCLICK = "WOZMOUSE_CLICK";
            TMouseEvent.WOZCLICKED = "WOZMOUSE_CLICKED";
            TMouseEvent.WOZDBLCLICK = "WOZMOUSE_DBLCLICKED";
            TMouseEvent.WOZMOVE = "WOZMOUSE_MOVE";
            TMouseEvent.WOZDOWN = "WOZMOUSE_DOWN";
            TMouseEvent.WOZUP = "WOZMOUSE_UP";
            TMouseEvent.WOZOVER = "WOZMOUSE_OVER";
            TMouseEvent.WOZOUT = "WOZMOUSE_OUT";
            TMouseEvent.WOZKEYDOWN = "WOZKEY_DOWN";
            TMouseEvent.WOZKEYUP = "WOZMKEY_UP";
            TMouseEvent.WOZNULL = "WOZNULL";
            exports_51("TMouseEvent", TMouseEvent);
        }
    };
});
System.register("thermite/THtmlBase", ["thermite/TObject", "core/CEFTimeLine", "events/CEFEvent", "events/CEFMouseEvent", "util/CUtil", "util/CONST"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var TObject_4, CEFTimeLine_1, CEFEvent_6, CEFMouseEvent_1, CUtil_29, CONST_4, Tween, Event, Ease, THtmlBase;
    return {
        setters: [
            function (TObject_4_1) {
                TObject_4 = TObject_4_1;
            },
            function (CEFTimeLine_1_1) {
                CEFTimeLine_1 = CEFTimeLine_1_1;
            },
            function (CEFEvent_6_1) {
                CEFEvent_6 = CEFEvent_6_1;
            },
            function (CEFMouseEvent_1_1) {
                CEFMouseEvent_1 = CEFMouseEvent_1_1;
            },
            function (CUtil_29_1) {
                CUtil_29 = CUtil_29_1;
            },
            function (CONST_4_1) {
                CONST_4 = CONST_4_1;
            }
        ],
        execute: function () {
            Tween = createjs.Tween;
            Event = createjs.Event;
            Ease = createjs.Ease;
            THtmlBase = class THtmlBase extends TObject_4.TObject {
                constructor() {
                    super();
                }
                THtmlBaseInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_29.CUtil.trace("THtmlBase:Constructor");
                    this.on(CEFEvent_6.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                    this.fAdded = false;
                    this.fEnabled = true;
                    this.isHTMLControl = true;
                    this.HTMLmute = true;
                    this.cssDirty = {};
                }
                Destructor() {
                    this.removeEventListener(CEFMouseEvent_1.TMouseEvent.WOZCLICKED, this.doMouseClicked);
                    this.removeEventListener(CEFMouseEvent_1.TMouseEvent.WOZOVER, this.doMouseOver);
                    this.removeEventListener(CEFMouseEvent_1.TMouseEvent.WOZOUT, this.doMouseOut);
                    this.removeEventListener(CEFMouseEvent_1.TMouseEvent.WOZDOWN, this.doMouseDown);
                    this.removeEventListener(CEFMouseEvent_1.TMouseEvent.WOZUP, this.doMouseUp);
                    if (this.fAdded) {
                        dom_overlay_container.removeChild(this.outerContainer);
                        this.fAdded = false;
                    }
                    super.Destructor();
                }
                enable() {
                    this.fEnabled = true;
                }
                disable() {
                    this.fEnabled = false;
                }
                invertScale() {
                    let mat = this.getMatrix();
                    let tx1 = mat.decompose();
                    let sx = tx1.scaleX;
                    let sy = tx1.scaleY;
                    let w = this.dimContainer.nominalBounds.width * sx;
                    let h = this.dimContainer.nominalBounds.height * sy;
                    this.scaleCompensation = CONST_4.CONST.CONTROLCONTAINER_DESIGNHEIGHT / h;
                    console.log("Scaled Height: " + h);
                    console.log("Scaled Compensation: " + this.scaleCompensation);
                }
                onAddedToStage(evt) {
                    this._lastFrame = this.parent.currentFrame;
                    if (!this.fAdded) {
                        this.effectTimeLine = new CEFTimeLine_1.CEFTimeLine(null, null, { "useTicks": false, "loop": false, "paused": true }, this.tutorDoc);
                        this.effectTweens = new Array();
                        this.styleElement = document.createElement('style');
                        this.styleElement.type = 'text/css';
                        if (this.cssClass)
                            this.styleElement.id = this.cssClass.toLowerCase();
                        else
                            this.styleElement.id = this.name.toLowerCase();
                        this.effectAlpha = 1;
                    }
                }
                addHTMLControls() {
                    let stage;
                    if (this.outerContainer && !this.fAdded) {
                        dom_overlay_container.appendChild(this.outerContainer);
                        document.head.appendChild(this.styleElement);
                        this.addCSSRules(this.styleElement, this.cssSheet);
                        this.fAdded = true;
                        this.HTMLmute = false;
                        if (stage = this.getStage()) {
                            this._updateVisibilityCbk = stage.on('drawstart', this._handleDrawStart, this, false);
                            this._updateComponentCbk = stage.on('drawend', this._handleDrawEnd, this, false);
                        }
                    }
                }
                buildRuleSet(cssRules) {
                    let rules = "";
                    for (let rule in cssRules) {
                        rules += `${rule}: ${cssRules[rule]};\n`;
                    }
                    return rules;
                }
                setProperty(key, value, force = false) {
                    if (force || this.cssSheet[key] != value) {
                        this.cssDirty[key] = true;
                    }
                    this.cssSheet[key] = value;
                }
                updateStyle(force) {
                    for (let attr in this.cssSheet) {
                        if (force || this.cssDirty[attr]) {
                            this.cssDirty[attr] = false;
                            this.outerContainer.style[attr] = this.cssSheet[attr];
                        }
                    }
                }
                muteHTMLControl(mute) {
                    this.HTMLmute = mute;
                }
                _handleDrawStart(evt) {
                    if (this.fAdded) {
                        if ((this.getStage() == null || this._lastFrame != this.parent.currentFrame)) {
                        }
                    }
                }
                _handleDrawEnd(evt) {
                    if (this.fAdded && !this.HTMLmute) {
                        let mat = this.dimContainer.getConcatenatedDisplayProps(this.dimContainer._props).matrix;
                        let tx1 = mat.decompose();
                        let sx = tx1.scaleX;
                        let sy = tx1.scaleY;
                        mat.tx += this.dimContainer.nominalBounds.x * sx;
                        mat.ty += this.dimContainer.nominalBounds.y * sy;
                        let w = this.dimContainer.nominalBounds.width * sx;
                        let h = this.dimContainer.nominalBounds.height * sy;
                        let dp = window.devicePixelRatio || 1;
                        mat.tx /= dp;
                        mat.ty /= dp;
                        mat.a /= (dp * sx);
                        mat.b /= (dp * sx);
                        mat.c /= (dp * sy);
                        mat.d /= (dp * sy);
                        this.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
                        let x = (mat.tx + this.regX * mat.a + this.regY * mat.c - this.regX);
                        let y = (mat.ty + this.regX * mat.b + this.regY * mat.d - this.regY);
                        let tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
                        this.setProperty("visibility", this.visible ? "visible" : "hidden");
                        let obj = this;
                        let alpha = this.alpha;
                        while (obj.parent) {
                            obj = obj.parent;
                            alpha = obj.alpha * alpha;
                        }
                        this.setProperty("opacity", alpha);
                        this.setProperty("font-size", this.fontSize * sy * this.scaleCompensation + "px");
                        this.setProperty('transform', tx);
                        this.setProperty('width', w + "px");
                        this.setProperty('height', h + "px");
                        this.updateStyle(false);
                    }
                }
                hideSpan(spanID) {
                    let span = document.getElementById(spanID);
                    span.style.visibility = "hidden";
                }
                showSpan(spanID) {
                    let span = document.getElementById(spanID);
                    span.style.visibility = "visible";
                }
                show() {
                    super.show();
                    this.outerContainer.style.visibility = "visible";
                }
                hide() {
                    super.hide();
                    this.outerContainer.style.visibility = "hidden";
                }
                setContentById(objId, effectType = CONST_4.CONST.EFFECT_FADE, effectDur = 500) {
                    for (let i1 = 0; i1 < this._objDataArray.length; i1++) {
                        if (this._objDataArray[i1].Id === objId) {
                            this.effectNewIndex = i1;
                            this.performTransition(this.effectNewIndex, effectType, effectDur);
                            break;
                        }
                    }
                }
                setContentNext(effectType = CONST_4.CONST.EFFECT_FADE, effectDur = 500) {
                    this.effectNewIndex = (this._currObjNdx + 1) % this._objDataArray.length;
                    this.performTransition(this.effectNewIndex, effectType, effectDur);
                }
                setContentByIndex(newIndex, effectType = CONST_4.CONST.EFFECT_FADE, effectDur = 500) {
                    let zeroBase = newIndex - 1;
                    this.performTransition(zeroBase, effectType, effectDur);
                }
                setContentFromString(newContent) {
                    let dataSource = {
                        "htmlData": {
                            "html": newContent
                        },
                    };
                    this.deSerializeObj(dataSource);
                }
                performTransition(effectNewIndex, effectType, effectDur = 500) {
                    if (this._currObjNdx !== effectNewIndex) {
                        this.effectNewIndex = effectNewIndex;
                        this.effectType = effectType;
                        this.effectTimeMS = effectDur;
                        switch (effectType) {
                            case CONST_4.CONST.EFFECT_FADE:
                                this.effectTweens.push(new Tween(this).to({ alpha: 0 }, effectDur / 2, Ease.cubicInOut));
                                this.effectTimeLine.addTween(...this.effectTweens);
                                this.effectTimeLine.startTransition(this.swapContent, this);
                                break;
                            case CONST_4.CONST.EFFECT_SWAP:
                                this.swapContent();
                                break;
                        }
                    }
                }
                swapContent() {
                    this.effectTimeLine.removeTween(...this.effectTweens);
                    try {
                        this._currObjNdx = this.effectNewIndex;
                        this.deSerializeObj(this._objDataArray[this.effectNewIndex]);
                    }
                    catch (err) {
                    }
                    switch (this.effectType) {
                        case CONST_4.CONST.EFFECT_FADE:
                            this.effectTweens.push(new Tween(this).to({ alpha: this.effectAlpha }, this.effectTimeMS / 2, Ease.cubicInOut));
                            this.effectTimeLine.addTween(...this.effectTweens);
                            this.effectTimeLine.startTransition(this.effectFinished, this);
                            break;
                        case CONST_4.CONST.EFFECT_SWAP:
                            break;
                    }
                }
                effectFinished() {
                    this.effectTimeLine.removeTween(...this.effectTweens);
                    this.dispatchEvent(new Event(CEFEvent_6.CEFEvent.COMPLETE, false, false));
                }
                addCSSRules(styleElement, cssStyles) {
                    let sheet = styleElement.sheet;
                    for (let ruleSet in cssStyles) {
                        let ruleStr = `${ruleSet} {${this.buildRuleSet(cssStyles[ruleSet])}}`;
                        sheet.insertRule(ruleStr, sheet.cssRules.length);
                    }
                }
                addCustomStyles(srcStyle, tarStyle) {
                    for (let ruleSet in srcStyle) {
                        let styles = srcStyle[ruleSet];
                        for (let style in styles) {
                            tarStyle[ruleSet] = tarStyle[ruleSet] || {};
                            tarStyle[ruleSet][style] = styles[style];
                        }
                    }
                }
                getText() {
                    return this.controlContainer.innerHTML;
                }
                setText(text) {
                    this.controlContainer.innerHTML = text;
                }
                initObjfromHtmlData(objData) {
                    if (objData.htmlData) {
                        if (objData.htmlData.html)
                            this.controlContainer.innerHTML = this.hostScene.resolveTemplates(objData.htmlData.html, this._templateRef);
                        if (objData.htmlData.style) {
                            this.addCustomStyles(objData.htmlData.style, this.cssSheet);
                        }
                        this.invertScale();
                    }
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: HTMLBase Custom Control");
                    if (Array.isArray(objData)) {
                        this._objDataArray = objData;
                        for (let i1 = 0; i1 < objData.length; i1++) {
                            if (!objData[i1])
                                break;
                            if (objData[i1].default) {
                                this._currObjNdx = i1;
                                this.fontSize = objData[i1].fontSize || this.fontSize;
                                this.deSerializeObj(objData[i1]);
                                break;
                            }
                        }
                    }
                    this.fontSize = objData.fontSize || this.fontSize;
                    if (objData.cssClass) {
                        this.cssClass = objData.cssClass;
                        this.outerContainer.setAttribute(this.cssClass, "");
                    }
                }
            };
            exports_52("THtmlBase", THtmlBase);
        }
    };
});
System.register("thermite/THtmlText", ["thermite/THtmlBase", "util/CUtil", "util/CONST"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var THtmlBase_1, CUtil_30, CONST_5, THtmlText;
    return {
        setters: [
            function (THtmlBase_1_1) {
                THtmlBase_1 = THtmlBase_1_1;
            },
            function (CUtil_30_1) {
                CUtil_30 = CUtil_30_1;
            },
            function (CONST_5_1) {
                CONST_5 = CONST_5_1;
            }
        ],
        execute: function () {
            THtmlText = class THtmlText extends THtmlBase_1.THtmlBase {
                constructor() {
                    super();
                }
                THtmlTextInitialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_30.CUtil.trace("THtmlText:Constructor");
                    this.cssSheet = {
                        "[eftext].outerContainer": {
                            "display": "block",
                            "position": "absolute",
                            "box-sizing": "content-box",
                            "visibility": "hidden"
                        },
                        "[eftext] .tablecell": {
                            "display": "table-cell",
                            "box-sizing": "border-box",
                            "height": "inherit",
                            "width": "inherit",
                        },
                        "[eftext] p": {
                            "margin": "0px",
                        }
                    };
                }
                onAddedToStage(evt) {
                    console.log("HTMLText On Stage");
                    if (!this.fAdded) {
                        this.dimContainer = this.SControlContainer;
                        this.SControlContainer.visible = false;
                        this.outerContainer = document.createElement("div");
                        this.outerContainer.className = "outerContainer";
                        this.outerContainer.setAttribute(CONST_5.CONST.EFTEXT_TYPE, "");
                        this.outerContainer.setAttribute(this.name, "");
                        this.controlContainer = document.createElement("div");
                        this.controlContainer.className = "tablecell";
                        this.outerContainer.appendChild(this.controlContainer);
                        super.onAddedToStage(evt);
                    }
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: Text Control");
                }
            };
            exports_53("THtmlText", THtmlText);
        }
    };
});
System.register("thermite/TProgress", ["core/CEFTimeLine", "thermite/TObject", "util/CUtil"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var CEFTimeLine_2, TObject_5, CUtil_31, TProgress;
    return {
        setters: [
            function (CEFTimeLine_2_1) {
                CEFTimeLine_2 = CEFTimeLine_2_1;
            },
            function (TObject_5_1) {
                TObject_5 = TObject_5_1;
            },
            function (CUtil_31_1) {
                CUtil_31 = CUtil_31_1;
            }
        ],
        execute: function () {
            TProgress = class TProgress extends TObject_5.TObject {
                constructor() {
                    super();
                    this.SHOW = true;
                    this.HIDE = false;
                    this.MAXSTATE = 1000;
                    this.init3();
                }
                TProgressInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_31.CUtil.trace("TProgress:Constructor");
                    this.effectTimeLine = new CEFTimeLine_2.CEFTimeLine(null, null, { "useTicks": false, "loop": false, "paused": true }, this.tutorDoc);
                    this.effectTweens = new Array();
                    this.SHOW = true;
                    this.HIDE = false;
                    this.MAXSTATE = 1000;
                }
                Destructor() {
                    super.Destructor();
                }
                addHTMLControls() {
                }
                set hostScene(scene) {
                    this._hostScene = scene;
                }
                showStates(item, newState, show) {
                    let state;
                    let id = 1;
                    while (id <= newState) {
                        state = "Sstate" + id;
                        if (this[item][state]) {
                            this[item][state].visible = show;
                        }
                        else {
                            break;
                        }
                        id++;
                    }
                }
                showAll(show) {
                    let item;
                    let id = 1;
                    while (true) {
                        item = "Sprog" + id;
                        if (this[item]) {
                            this.showStates(item, this.MAXSTATE, show);
                        }
                        else {
                            break;
                        }
                        id++;
                    }
                }
                gotoStepState(step, state) {
                    let item;
                    item = "Sprog" + step;
                    this.showStates(item, state, this.SHOW);
                }
                gotoState(step, state) {
                    if (state == 0) {
                        this.visible = false;
                    }
                    else {
                        this.visible = true;
                        this.showAll(this.HIDE);
                        this.currStep = step;
                        this.currState = state;
                        for (let i1 = 1; i1 < step; i1++)
                            this.gotoStepState(i1, this.MAXSTATE);
                        this.gotoStepState(step, state);
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    return obj;
                }
                captureXMLState() {
                    let stateVal = { progress: {} };
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                }
                compareXMLState(stateVal) {
                    var bTest = true;
                    return bTest;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: TProgress Custom Control");
                    super.deSerializeObj(objData);
                }
            };
            exports_54("TProgress", TProgress);
        }
    };
});
System.register("thermite/TNavPanel", ["util/CUtil", "util/CONST", "thermite/TScene"], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var CUtil_32, CONST_6, TScene_1, TNavPanel;
    return {
        setters: [
            function (CUtil_32_1) {
                CUtil_32 = CUtil_32_1;
            },
            function (CONST_6_1) {
                CONST_6 = CONST_6_1;
            },
            function (TScene_1_1) {
                TScene_1 = TScene_1_1;
            }
        ],
        execute: function () {
            TNavPanel = class TNavPanel extends TScene_1.TScene {
                constructor() {
                    super();
                    this.init5();
                }
                TNavPanelInitialize() {
                    this.TSceneInitialize.call(this);
                    this.init5();
                }
                initialize() {
                    this.TSceneInitialize.call(this);
                    this.init5();
                }
                init5() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_32.CUtil.trace("TNavPanel:Constructor");
                }
                Destructor() {
                    super.Destructor();
                }
                onCreate() {
                    super.onCreate();
                    this.tutorDoc.attachNavPanel(this);
                    this.SbreadCrumbs.addHTMLControls();
                    this.enableNext(false);
                    this.enablePrev(false);
                    this.hideProgress();
                    if (this.SbackDev)
                        this.SbackDev.hidden = true;
                    if (this.SnextDev)
                        this.SnextDev.hidden = true;
                }
                enableNext(enable) {
                    this.Snext.enable(enable);
                }
                enablePrev(enable) {
                    this.enableBack(enable);
                }
                enableBack(enable) {
                    this.Sback.enable(enable);
                }
                setBreadCrumbs(text) {
                    this.SbreadCrumbs.setContentFromString(text);
                }
                hideProgress() {
                    if (this.Sprogress)
                        this.Sprogress.visible = false;
                }
                setProgress(step, state) {
                    if (this.Sprogress) {
                        this.Sprogress.visible = true;
                        this.Sprogress.gotoState(step, state);
                    }
                }
                showHideNavButton(type, show) {
                    switch (type) {
                        case CONST_6.CONST.NEXTSCENE:
                            this.Snext.hidden = !show;
                            this.Snext.enable(show);
                            break;
                        case CONST_6.CONST.PREVSCENE:
                            this.Sback.hidden = !show;
                            this.Sback.enable(show);
                            break;
                    }
                }
                connectNavButton(type, butComp, _once = true) {
                    this.disConnectNavButton(type, butComp);
                    switch (type) {
                        case CONST_6.CONST.NEXTSCENE:
                            this._nextButton = this[butComp].on(CONST_6.CONST.BUTTON_CLICK, this.tutorNavigator.onButtonNext, this.tutorNavigator);
                            this.Snext.hidden = false;
                            break;
                        case CONST_6.CONST.PREVSCENE:
                            this._prevButton = this[butComp].on(CONST_6.CONST.BUTTON_CLICK, this.tutorNavigator.onButtonPrev, this.tutorNavigator);
                            this.Sback.hidden = false;
                            break;
                    }
                }
                disConnectNavButton(type, butComp) {
                    switch (type) {
                        case CONST_6.CONST.NEXTSCENE:
                            if (this._nextButton) {
                                this[butComp].off(CONST_6.CONST.BUTTON_CLICK, this._nextButton);
                                this._nextButton = null;
                            }
                            break;
                        case CONST_6.CONST.PREVSCENE:
                            if (this._prevButton) {
                                this[butComp].off(CONST_6.CONST.BUTTON_CLICK, this._prevButton);
                                this._prevButton = null;
                            }
                            break;
                    }
                }
                setNavigationTarget(behavior) {
                    if (behavior.toUpperCase() === "TUTOR")
                        this.tutorNavigator.buttonBehavior = CONST_6.CONST.GOTONEXTSCENE;
                    else
                        this.tutorNavigator.buttonBehavior = CONST_6.CONST.GOTONEXTTRACK;
                }
                hideAllAssets() {
                    this.disConnectNavButton(CONST_6.CONST.NEXTSCENE, "Snext");
                    this.disConnectNavButton(CONST_6.CONST.PREVSCENE, "Sback");
                    this.showHideNavButton(CONST_6.CONST.NEXTSCENE, false);
                    this.showHideNavButton(CONST_6.CONST.PREVSCENE, false);
                    this.Smask0.hide();
                    this.Smask1.hide();
                    this.Smask2.hide();
                    this.Smask3.hide();
                }
                setNavMode(modeID, navTar) {
                    this.hideAllAssets();
                    this.setNavigationTarget(navTar);
                    switch (modeID) {
                        case CONST_6.CONST.NAVNONE:
                            this.Smask0.show();
                            break;
                        case CONST_6.CONST.NAVBACK:
                            this.connectNavButton(CONST_6.CONST.PREVSCENE, "Sback");
                            this.Sback.show();
                            this.Smask1.show();
                            break;
                        case CONST_6.CONST.NAVNEXT:
                            this.connectNavButton(CONST_6.CONST.NEXTSCENE, "Snext");
                            this.Snext.show();
                            this.Smask2.show();
                            break;
                        case CONST_6.CONST.NAVBOTH:
                            this.connectNavButton(CONST_6.CONST.NEXTSCENE, "Snext");
                            this.connectNavButton(CONST_6.CONST.PREVSCENE, "Sback");
                            this.Sback.show();
                            this.Snext.show();
                            this.Smask3.show();
                            break;
                    }
                }
            };
            exports_55("TNavPanel", TNavPanel);
        }
    };
});
System.register("tutorgraph/CTutorHistoryNode", [], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var CTutorHistoryNode;
    return {
        setters: [],
        execute: function () {
            CTutorHistoryNode = class CTutorHistoryNode extends Object {
                constructor(_node, _scene) {
                    super();
                    this.node = _node;
                    this.scene = _scene;
                }
            };
            exports_56("CTutorHistoryNode", CTutorHistoryNode);
        }
    };
});
System.register("tutorgraph/CTutorHistory", ["tutorgraph/CTutorHistoryNode"], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var CTutorHistoryNode_1, CTutorHistory;
    return {
        setters: [
            function (CTutorHistoryNode_1_1) {
                CTutorHistoryNode_1 = CTutorHistoryNode_1_1;
            }
        ],
        execute: function () {
            CTutorHistory = class CTutorHistory extends Object {
                constructor(_tutorDoc) {
                    super();
                    this._history = new Array();
                    this._volatile = false;
                    this.tutorDoc = _tutorDoc;
                    this._ndx = 0;
                }
                push(node, scene) {
                    if (scene != null) {
                        this._history.push(new CTutorHistoryNode_1.CTutorHistoryNode(node, scene));
                        this._ndx = this._history.length;
                    }
                }
                next() {
                    let next = null;
                    if (this._ndx < this._history.length) {
                        this._ndx = this._ndx + 1;
                        next = this._history[this._ndx - 1];
                    }
                    return next;
                }
                back() {
                    let prev = null;
                    if (this._ndx > 1) {
                        this._ndx = this._ndx - 1;
                        if (this._volatile)
                            this._history.pop();
                        prev = this._history[this._ndx - 1];
                    }
                    return prev;
                }
                set volatile(newState) {
                    this._volatile = newState;
                }
                get isVolatile() {
                    return this._volatile;
                }
            };
            exports_57("CTutorHistory", CTutorHistory);
        }
    };
});
System.register("tutorgraph/CTutorGraphNavigator", ["tutorgraph/CTutorGraph", "tutorgraph/CTutorHistory", "core/CEFNavigator", "events/CEFEvent", "util/CONST", "util/CUtil", "core/CEFTimer"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var CTutorGraph_1, CTutorHistory_1, CEFNavigator_1, CEFEvent_7, CONST_7, CUtil_33, CEFTimer_2, Event, CTutorGraphNavigator;
    return {
        setters: [
            function (CTutorGraph_1_1) {
                CTutorGraph_1 = CTutorGraph_1_1;
            },
            function (CTutorHistory_1_1) {
                CTutorHistory_1 = CTutorHistory_1_1;
            },
            function (CEFNavigator_1_1) {
                CEFNavigator_1 = CEFNavigator_1_1;
            },
            function (CEFEvent_7_1) {
                CEFEvent_7 = CEFEvent_7_1;
            },
            function (CONST_7_1) {
                CONST_7 = CONST_7_1;
            },
            function (CUtil_33_1) {
                CUtil_33 = CUtil_33_1;
            },
            function (CEFTimer_2_1) {
                CEFTimer_2 = CEFTimer_2_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CTutorGraphNavigator = class CTutorGraphNavigator extends CEFNavigator_1.CEFNavigator {
                constructor(_tutorDoc) {
                    super(_tutorDoc);
                    this._fTutorGraph = true;
                    this._iterations = {};
                    this._asyncTimer = new CEFTimer_2.CEFTimer(0);
                }
                get sceneObj() {
                    return this._rootGraph.sceneInstance();
                }
                get iteration() {
                    let iCount;
                    try {
                        iCount = this._iterations[this._currScene.scenename].toString();
                    }
                    catch (err) {
                        iCount = "uninitialized";
                    }
                    return iCount;
                }
                updateSceneIteration() {
                    if (this._iterations[this._currScene.scenename] == undefined) {
                        this._iterations[this._currScene.scenename] = 1;
                    }
                    else {
                        if (!this.tutorDoc.testFeatureSet("NO_ITER"))
                            this._iterations[this._currScene.scenename]++;
                    }
                }
                static rootFactory(_tutorDoc, factory) {
                    let tutorNav = new CTutorGraphNavigator(_tutorDoc);
                    tutorNav._history = new CTutorHistory_1.CTutorHistory(_tutorDoc);
                    _tutorDoc.tutorNavigator = tutorNav;
                    if (factory['history'] != null) {
                        tutorNav._history.volatile = (factory['history'] == "volatile") ? true : false;
                    }
                    tutorNav._rootGraph = CTutorGraph_1.CTutorGraph.factory(_tutorDoc, null, "root", factory);
                    tutorNav._rootGraph.seekRoot();
                    return tutorNav;
                }
                captureGraph() {
                    return this._rootGraph.captureGraph({});
                }
                restoreGraph(nodeState) {
                    this._rootGraph.restoreGraph(nodeState);
                }
                set buttonBehavior(action) {
                    if (action == CONST_7.CONST.GOTONEXTSCENE)
                        this._fTutorGraph = true;
                    else
                        this._fTutorGraph = false;
                }
                enQueueTerminateEvent() {
                    this.on(CEFEvent_7.CEFEvent.ENTER_FRAME, this._asyncTerminate);
                }
                _asyncTerminate(e) {
                    this.off(CEFEvent_7.CEFEvent.ENTER_FRAME, this._asyncTerminate);
                    this.tutorDoc.log.logTerminateEvent();
                }
                recoverState() {
                    this._xType = "WOZNEXT";
                    this._rootGraph.recoverSkills(this.tutorDoc.sessionAccount.session.profile.stateData.ktSkills);
                    this.tutorDoc._globals = this.tutorDoc.sessionAccount.session.profile.stateData.globals;
                    this.tutorDoc.features = this.tutorDoc.sessionAccount.session.profile.stateData.features;
                    this.tutorDoc._phaseData = this.tutorDoc.sessionAccount.session.profile.stateData.data;
                    this.seekToScene(this._rootGraph.restoreGraph(this.tutorDoc.sessionAccount.session.profile.stateData.tutorGraph));
                }
                gotoNextScene(source) {
                    this.changeRequestorScene = source;
                    this._tickHandler = this._asyncTimer.on(CONST_7.CONST.TIMER, this._asyncNextScene, this);
                    this._asyncTimer.start();
                }
                _asyncNextScene(evt) {
                    this._asyncTimer.stop();
                    this._asyncTimer.off(CONST_7.CONST.TIMER, this._tickHandler);
                    this.traceGraphEdge();
                }
                onButtonNext(evt) {
                    this.changeRequestorScene = "$buttonClick" + evt.currentTarget.name;
                    this.traceGraphEdge();
                }
                traceGraphEdge() {
                    let historyNode;
                    let nextScene;
                    let scene = this._rootGraph.sceneInstance();
                    try {
                        if (this._inNavigation)
                            return;
                        this._inNavigation = true;
                        console.log("TUTORGRAPH: state change: " + this.changeRequestorScene);
                        if (scene)
                            scene.changeRequestorTrack = "$tutorGraph:" + this.changeRequestorScene;
                        if (this._fTutorGraph || scene == null || scene.traceGraphEdge(true) == null) {
                            historyNode = this._history.next();
                            if (historyNode == null) {
                                nextScene = this._rootGraph.nextScene();
                                if (this._currScene != nextScene && nextScene != null) {
                                    this._history.push(this._rootGraph.node, nextScene);
                                }
                                else if (nextScene == null)
                                    this.enQueueTerminateEvent();
                            }
                            else {
                                nextScene = historyNode.scene;
                            }
                            this._xType = "WOZNEXT";
                            if (this._currScene != nextScene && nextScene != null) {
                                this.seekToScene(nextScene);
                            }
                            else if (nextScene == null) {
                                let curScene = this.tutorAutoObj[this._currScene.scenename]._instance;
                                this.tutorDoc.logTutorState(curScene);
                                this.tutorDoc.logTutorProgress(CONST_7.CONST.END_OF_TUTOR);
                            }
                            else {
                                this._inNavigation = false;
                            }
                        }
                        else {
                            this._inNavigation = false;
                        }
                    }
                    catch (err) {
                        this._inNavigation = false;
                        CUtil_33.CUtil.trace("CONST.traceGraphEdge: " + err.toString());
                        let logData = { 'location': 'traceGraphEdge', 'message': err.toString() };
                        this.tutorDoc.log.logErrorEvent(logData);
                    }
                }
                onButtonPrev(evt) {
                    let historyNode;
                    let features;
                    let scene = this._rootGraph.sceneInstance();
                    try {
                        if (this._inNavigation)
                            return;
                        this._inNavigation = true;
                        if (this._fTutorGraph || scene.traceHistory() == null) {
                            do {
                                historyNode = this._history.back();
                                if (historyNode != null) {
                                    features = historyNode.scene.features;
                                    if (features != "") {
                                        if (!this.tutorDoc.testFeatureSet(features)) {
                                            continue;
                                        }
                                    }
                                    if (this._history.isVolatile) {
                                        this._rootGraph.node = historyNode.node;
                                        this._rootGraph.scene = historyNode.scene;
                                    }
                                    this._xType = "WOZBACK";
                                    this.seekToScene(historyNode.scene);
                                    break;
                                }
                                else {
                                    this._inNavigation = false;
                                    this.doEnterScene(new Event("test", true, false));
                                }
                            } while (historyNode != null);
                        }
                        else {
                            this._inNavigation = false;
                        }
                    }
                    catch (err) {
                        CUtil_33.CUtil.trace("CONST.onButtonPrev: " + err.toString());
                        let logData = { 'location': 'onButtonPrev', 'message': err.toString() };
                        this.tutorDoc.log.logErrorEvent(logData);
                    }
                }
                seekToScene(nextScene) {
                    let _progressData;
                    try {
                        this._nextScene = nextScene;
                        let logData;
                        if (this.tutorDoc.fDemo)
                            this.tutorDoc.fDeferDemoClick = true;
                        this._prevScene = this._currScene;
                        if (this._currScene)
                            this.tutorAutoObj[this._currScene.scenename]._instance.preExitScene(this._xType, 0);
                        if (this.tutorAutoObj[this._nextScene.scenename] == undefined) {
                            this._nextScene.instantiateScene();
                        }
                        this.tutorAutoObj[this._nextScene.scenename]._instance.preEnterScene(this.tutorDoc.tutorContainer, this._nextScene.scenename, this._nextScene.title, this._nextScene.page, this._xType);
                        if (this._currScene)
                            logData = { 'curscene': this._currScene.scenename, 'newscene': this._nextScene.scenename };
                        else
                            logData = { 'curscene': 'null', 'newscene': this._nextScene.scenename };
                        this.tutorDoc.log.logNavEvent(logData);
                        if (this._currScene) {
                            let curScene = this.tutorAutoObj[this._currScene.scenename]._instance;
                            curScene.onExitScene();
                            this.tutorDoc.logTutorState(curScene);
                        }
                        if (this._nextScene.isCheckPoint)
                            this.tutorDoc.logTutorProgress(this._nextScene.scenename);
                        if (!this.tutorDoc.log.connectionActive) {
                            this.tutorDoc.dispatchEvent(new Event("CONNECTION_LOST", false, false));
                        }
                        this._currScene = this._nextScene;
                        this.updateSceneIteration();
                        this.xitions.on(CEFEvent_7.CEFEvent.COMPLETE, this.doEnterScene, this);
                        this.xitions.gotoScene(this._nextScene.scenename);
                    }
                    catch (err) {
                        CUtil_33.CUtil.trace("CONST.seekToScene: " + err.toString());
                        let logData = { 'location': 'seekToScene', 'message': err.toString() };
                        this.tutorDoc.log.logErrorEvent(logData);
                    }
                }
                doEnterScene(evt) {
                    try {
                        if (this.traceMode)
                            CUtil_33.CUtil.trace("doEnterScene: ", this._currScene._name);
                        evt.remove();
                        this.tutorDoc.incFrameNdx();
                        if (this._prevScene && !this._prevScene.persist) {
                            this.tutorDoc.tutorContainer.destroyScene(this._prevScene.scenename);
                            this._prevScene.destroyScene();
                        }
                        this.tutorDoc.TutAutomator[this._currScene.scenename]._instance.onEnterScene(this._xType);
                        this.tutorDoc.tutorContainer.timeStamp.createLogAttr("dur_" + this._currScene.scenename, true);
                        this._inNavigation = false;
                    }
                    catch (err) {
                        CUtil_33.CUtil.trace("doEnterScene: " + err.toString());
                        let logData = { 'location': 'doEnterScene', 'message': err.toString() };
                        this.tutorDoc.log.logErrorEvent(logData);
                    }
                }
            };
            exports_58("CTutorGraphNavigator", CTutorGraphNavigator);
        }
    };
});
System.register("network/WebLogger", [], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var WebLogger;
    return {
        setters: [],
        execute: function () {
            WebLogger = class WebLogger {
                constructor() {
                    this.currScene = null;
                    this.currFeatures = "";
                }
                setValues(currScene, currFeatures) {
                    this.currScene = currScene;
                    this.currFeatures = currFeatures;
                    if (currFeatures !== ispAPI.getFeaturesString()) {
                        console.error("features are different");
                    }
                    else {
                        console.log("features are the same");
                    }
                }
                getUserId() {
                    return ispAPI.getUserID();
                }
                getCurrentScene() {
                    console.log("WebLogger.getCurrentScene()", this.currScene);
                    return this.currScene;
                }
                getFeatures() {
                    return ispAPI.getFeaturesString();
                }
                getTutorState(tutorID) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log(`WebLogger::getTutorState("${tutorID}")`);
                        return ispAPI.getAppData(false);
                    });
                }
                logState(scenename, scene, module, tutor) {
                    console.log("WebLogger::logState()");
                    console.log("scenename", scenename);
                    console.log("scene", scene);
                    console.log("module", module);
                    console.log("tutor", tutor);
                    let buffer = "{\"scene\":" + scene + "," + "\"module\":" + module + "," + "\"tutor\":" + tutor + "}";
                }
                updateTutorState(tutorID, tutorStateJSON) {
                    console.log(`WebLogger::updateTutorState("${tutorID}")`);
                    this.currTutorState = tutorStateJSON;
                    ispAPI.saveAppData(JSON.parse(this.currTutorState))
                        .then(() => console.log("WebLogger::state persisted to db"));
                }
                tutorComplete() {
                    console.log("WebLogger::tutorComplete()");
                    ispAPI.saveAppData(JSON.parse(this.currTutorState))
                        .then(() => ispAPI.saveAppComplete())
                        .then(() => ispAPI.goHomePage())
                        .catch((error) => console.error(error));
                }
                updateScene(sceneName, sceneid) {
                    console.log(`WebLogger::updateScene("${sceneName}", "${sceneid}")`);
                    this.currScene = sceneid;
                    if (sceneName.toLowerCase() == "ssceneend") {
                        this.tutorComplete();
                    }
                    else {
                    }
                }
            };
            exports_59("WebLogger", WebLogger);
        }
    };
});
System.register("core/CEFTutorDoc", ["managers/CLogManager", "network/CURLLoader", "network/CURLRequest", "thermite/TTutorContainer", "events/CEFEvent", "tutorgraph/CTutorGraphNavigator", "util/CONST", "util/CUtil", "network/WebLogger"], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var CLogManager_1, CURLLoader_2, CURLRequest_2, TTutorContainer_1, CEFEvent_8, CTutorGraphNavigator_1, CONST_8, CUtil_34, EventDispatcher, WebLogger_1, CEFTutorDoc;
    return {
        setters: [
            function (CLogManager_1_1) {
                CLogManager_1 = CLogManager_1_1;
            },
            function (CURLLoader_2_1) {
                CURLLoader_2 = CURLLoader_2_1;
            },
            function (CURLRequest_2_1) {
                CURLRequest_2 = CURLRequest_2_1;
            },
            function (TTutorContainer_1_1) {
                TTutorContainer_1 = TTutorContainer_1_1;
            },
            function (CEFEvent_8_1) {
                CEFEvent_8 = CEFEvent_8_1;
            },
            function (CTutorGraphNavigator_1_1) {
                CTutorGraphNavigator_1 = CTutorGraphNavigator_1_1;
            },
            function (CONST_8_1) {
                CONST_8 = CONST_8_1;
            },
            function (CUtil_34_1) {
                CUtil_34 = CUtil_34_1;
            },
            function (WebLogger_1_1) {
                WebLogger_1 = WebLogger_1_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CEFTutorDoc = class CEFTutorDoc extends EventDispatcher {
                constructor() {
                    super();
                    this.logFrameID = 0;
                    this.logStateID = 0;
                    this.userStateData = null;
                    this.language = "en";
                    this.voice = "F0";
                    this._tutorFeatures = "";
                    this._forcedPause = false;
                    this._pFeatures = {};
                    this.designWidth = 1024;
                    this.designHeight = 768;
                    this.STAGEWIDTH = 1024;
                    this.STAGEHEIGHT = 768;
                    this._framendx = 0;
                    this.fRemoteMode = false;
                    this.fDemo = true;
                    this.fDebug = true;
                    this.fLog = false;
                    this.fDeferDemoClick = true;
                    this.fTutorPart = "Intro & Ramp Pre-test";
                    this.fFullSignIn = false;
                    this.fSkipAssess = false;
                    this.fEnableBack = true;
                    this.fForceBackButton = true;
                    this.fSkillometer = false;
                    this.sessionAccount = {};
                    this.serverUserID = 0;
                    this.fPlaybackMode = false;
                    this.sceneState = {};
                    this.moduleState = {};
                    this.tutorState = {};
                    this.sceneChange = {};
                    this.moduleChange = {};
                    this.tutorChange = {};
                    this.TutAutomator = {};
                    this._globals = {};
                    this._sceneData = {};
                    this._phaseData = {};
                    this.fFeatures = {};
                    this.featureID = {};
                    this.fDefaults = {};
                    CUtil_34.CUtil.trace("CEFTutorDoc:Constructor");
                    this.initGlobals();
                    this.isDebug = true;
                    this.sceneGraph = {};
                    this.modules = new Array();
                    this.moduleData = {};
                    this.globalData = {};
                    this.connectFrameCounter(true);
                    this.tutorContainer = new TTutorContainer_1.TTutorContainer();
                    this.tutorContainer.tutorDoc = this;
                    this.tutorContainer.tutorAutoObj = this.TutAutomator;
                    this.tutorContainer.name = CONST_8.CONST.TUTORCONTAINER;
                    EFLoadManager.efStage.addChild(this.tutorContainer);
                    this.setTutorDefaults(this._tutorFeatures);
                    this.log = CLogManager_1.CLogManager.getInstance();
                    this.clickBoundListener = this.clickListener.bind(this);
                }
                launchTutor() {
                    this.hostModule = this.tutorGraph.hostModule;
                    console.log("tutor has been launched and weblogger is about to start up");
                    EFLoadManager.nativeUserMgr = new WebLogger_1.WebLogger();
                    EFLoadManager.nativeUserMgr.setValues(EFLoadManager.efBootNode, EFLoadManager.efFeatures);
                    if (EFLoadManager.nativeUserMgr) {
                        this.userID = EFLoadManager.nativeUserMgr.getUserId();
                        this.graphState = EFLoadManager.nativeUserMgr.getCurrentScene();
                        this.hostFeatures = EFLoadManager.nativeUserMgr.getFeatures();
                        this.restoreTutorState();
                        this.addTutorFeatures(this.hostFeatures);
                    }
                    else {
                        this.userID = "GUESTBL_JAN_1";
                        this.graphState = EFLoadManager.efBootNode;
                        this.hostFeatures = EFLoadManager.efFeatures;
                        this.addTutorFeatures(this.hostFeatures);
                    }
                    this.resetStateFrameID();
                    CTutorGraphNavigator_1.CTutorGraphNavigator.rootFactory(this, this.tutorGraph);
                    this.tutorContainer.initAutomation();
                    if (this.graphState && this.graphState.currNodeID && (this.graphState.currNodeID != "")) {
                        this.tutorNavigator.restoreGraph(this.graphState);
                    }
                    this.tutorNavigator.gotoNextScene("$launchTutor");
                }
                clickListener(e) {
                    if (e.type === "click") {
                        window.removeEventListener("click", this.clickBoundListener);
                        this.tutorNavigator.gotoNextScene("$launchTutor");
                    }
                }
                initializeSceneStateData(scene, name, sceneName, hostModule) {
                    if (name !== sceneName) {
                        alert("TutorDoc Scene name Mismatch: " + name + " != " + sceneName);
                    }
                    this.sceneObj = scene;
                    this.sceneState[name] = {};
                    this.sceneChange[sceneName] = {};
                }
                getTutorState() {
                    let store = {
                        "sceneState": {},
                        "moduleState": {},
                        "tutorState": {},
                        "fFeatures": {},
                        "featureID": {}
                    };
                    Object.assign(store.sceneState, this.sceneState);
                    Object.assign(store.moduleState, this.moduleState);
                    Object.assign(store.tutorState, this.tutorState);
                    delete (store.sceneState.$seq);
                    delete (store.moduleState.$seq);
                    delete (store.tutorState.$seq);
                    Object.assign(store.fFeatures, this.fFeatures);
                    Object.assign(store.featureID, this.featureID);
                    return JSON.stringify(store);
                }
                restoreTutorState() {
                    let result = false;
                    EFLoadManager.nativeUserMgr.getTutorState(this.tutorConfig.tutorStateID)
                        .then((jsonData) => {
                        if (jsonData && jsonData !== "") {
                            let hostTutorData = JSON.parse(jsonData);
                            Object.assign(this.moduleState, hostTutorData.moduleState);
                            Object.assign(this.tutorState = hostTutorData.tutorState);
                            Object.assign(this.fFeatures = hostTutorData.fFeatures);
                            Object.assign(this.featureID = hostTutorData.featureID);
                        }
                    });
                    return result;
                }
                resolveTemplates(selector, ref) {
                    return this.sceneObj.resolveTemplates(selector, ref);
                }
                attachNavPanel(panel) {
                    this.SnavPanel = panel;
                }
                setBreadCrumbs(text) {
                    if (this.SnavPanel)
                        this.SnavPanel.setBreadCrumbs(text);
                }
                hideProgress() {
                    if (this.SnavPanel)
                        this.SnavPanel.hideProgress();
                }
                setProgress(step, state) {
                    if (this.SnavPanel)
                        this.SnavPanel.setProgress(step, state);
                }
                enableNext(fEnable) {
                    if (this.SnavPanel)
                        this.SnavPanel.enableNext(fEnable);
                }
                enableBack(fEnable) {
                    if (this.SnavPanel)
                        this.SnavPanel.enableBack(fEnable);
                }
                setNavMode(navMode, navTarget) {
                    if (this.SnavPanel)
                        this.SnavPanel.setNavMode(navMode, navTarget);
                }
                $preEnterScene(scene) { }
                ;
                $preExitScene(scene) { }
                ;
                $nodeConstraint(nodeName, edgeConstraint) { return false; }
                ;
                getSceneValue(property) {
                    return this.getStateValue(property, CONST_8.CONST.SCENESTATE);
                }
                getModuleValue(property) {
                    return this.getStateValue(property, CONST_8.CONST.MODULESTATE);
                }
                getTutorValue(property) {
                    return this.getStateValue(property, CONST_8.CONST.TUTORSTATE);
                }
                getStateValue(property, target = CONST_8.CONST.MODULESTATE) {
                    let prop;
                    prop = this.getRawStateValue(property, target);
                    return prop;
                }
                getRawStateValue(property, target = CONST_8.CONST.MODULESTATE) {
                    let prop;
                    switch (target) {
                        case CONST_8.CONST.SCENESTATE:
                            prop = this.resolveProperty(this.sceneState[this.name], property);
                            break;
                        case CONST_8.CONST.MODULESTATE:
                            prop = this.resolveProperty(this.moduleState, property);
                            break;
                        case CONST_8.CONST.TUTORSTATE:
                            prop = this.resolveProperty(this.tutorState, property);
                            break;
                    }
                    return prop;
                }
                assignProperty(root, property, value) {
                    let path = property.split(".");
                    let target = root;
                    for (let i1 = 0; i1 < path.length - 1; i1++) {
                        if (target[path[i1]])
                            target = target[path[i1]];
                        else
                            target = target[path[i1]] = {};
                    }
                    target[path[path.length - 1]] = value;
                }
                resolveProperty(root, property) {
                    let path = property.split(".");
                    let target = root;
                    let value;
                    for (let i1 = 0; i1 < path.length - 1; i1++) {
                        if (target[path[i1]])
                            target = target[path[i1]];
                        else
                            target = target[path[i1]] = {};
                    }
                    value = target[path[path.length - 1]];
                    if (value === undefined)
                        value = null;
                    return value;
                }
                pushEvent(root, property, value) {
                    root["$seq"] = root["$seq"] || [];
                    root["$seq"].push({
                        "prop": property,
                        "value": value,
                        "time": Date.now()
                    });
                }
                set extAccount(Obj) {
                    this.sessionAccount = Obj;
                }
                set extFTutorPart(str) {
                }
                set extFFullSignIn(val) {
                    this.fFullSignIn = (val == "true") ? true : false;
                }
                set extFDemo(val) {
                    this.fDemo = val;
                }
                set extFDebug(val) {
                    this.fDebug = val;
                }
                set extFRemoteMode(val) {
                    this.fRemoteMode = val;
                }
                set extFDeferDemoClick(val) {
                    this.fDeferDemoClick = (val == "true") ? true : false;
                }
                set extFSkillometer(val) {
                    this.fSkillometer = (val == "true") ? true : false;
                }
                set extTutorFeatures(ftrStr) {
                    this._tutorFeatures = ftrStr;
                }
                set extmodPath(val) {
                    this._modulePath = val;
                }
                set extLogManager(val) {
                    this.log = val;
                }
                set extForceBackButton(fForce) {
                    if (typeof fForce === 'string')
                        this.gForceBackButton = (fForce == "true") ? true : false;
                    else if (typeof fForce === 'boolean')
                        this.gForceBackButton = fForce;
                }
                get extAspectRatio() {
                    return "STD";
                }
                incFrameNdx() {
                    this._framendx++;
                }
                initGlobals() {
                    this._globals = {};
                }
                incrGlobal(_id, _max = -1, _cycle = 0) {
                    let result;
                    if (this._globals.hasOwnProperty(_id)) {
                        this._globals[_id]++;
                        result = this._globals[_id];
                        if (this._globals[_id] == _max)
                            this._globals[_id] = _cycle;
                    }
                    else
                        result = this._globals[_id] = 1;
                    return result;
                }
                assertGlobal(_id, _value) {
                    this._globals[_id] = _value;
                }
                retractGlobal(_id) {
                    this._globals[_id] = "";
                }
                queryGlobal(_id) {
                    let result;
                    if (this._globals.hasOwnProperty(_id)) {
                        result = this._globals[_id];
                    }
                    else
                        result = "null";
                    return result;
                }
                set globals(gval) {
                    this._globals = gval;
                }
                get globals() {
                    return this._globals;
                }
                resetStateFrameID() {
                    this.frameID = 0;
                    this.stateID = 0;
                }
                get frameID() {
                    return this.logFrameID;
                }
                set frameID(newVal) {
                    this.logFrameID = newVal;
                }
                incFrameID() {
                    this.logFrameID++;
                }
                get stateID() {
                    return this.logStateID;
                }
                set stateID(newVal) {
                    this.logStateID = newVal;
                }
                incStateID() {
                    if (this.traceMode)
                        CUtil_34.CUtil.trace("@@@@@@@@@ logStateID Update : " + this.logStateID);
                    this.logStateID++;
                    this.frameID = 0;
                }
                connectFrameCounter(fCon) {
                    if (fCon)
                        this.on(CEFEvent_8.CEFEvent.ENTER_FRAME, this.doEnterFrame);
                    else
                        this.off(CEFEvent_8.CEFEvent.ENTER_FRAME, this.doEnterFrame);
                }
                doEnterFrame(evt) {
                    this.incFrameID();
                }
                get gData() {
                    return "";
                }
                set gData(dataXML) {
                }
                get gPhase() {
                    return this.fTutorPart;
                }
                set gPhase(phase) {
                    this.fTutorPart = phase;
                }
                get log() {
                    return this._log;
                }
                set log(logr) {
                    this._log = logr;
                }
                resetSceneDataXML() {
                }
                get gForceBackButton() {
                    return this.fForceBackButton;
                }
                set gForceBackButton(fForce) {
                    this.fForceBackButton = fForce;
                }
                get gNavigator() {
                    return this.tutorNavigator;
                }
                setNavButtonBehavior(behavior) {
                    if (behavior == "incrScene")
                        this.tutorNavigator.buttonBehavior = CONST_8.CONST.GOTONEXTSCENE;
                    else
                        this.tutorNavigator.buttonBehavior = CONST_8.CONST.GOTONEXTTRACK;
                }
                buildBootSet(targetTutor) {
                    this.loaderData = [];
                    for (let i1 = 0; i1 < CONST_8.CONST.TUTOR_VARIABLE.length; i1++) {
                        this.loaderData.push({
                            type: CONST_8.CONST.TUTOR_VARIABLE[i1],
                            filePath: CONST_8.CONST.TUTOR_COMMONPATH + targetTutor + "/" + CONST_8.CONST.TUTOR_VARIABLE[i1],
                            onLoad: this.onLoadJson.bind(this),
                            fileName: CONST_8.CONST.TUTOR_VARIABLE[i1],
                            varName: CONST_8.CONST.TUTOR_FACTORIES[i1]
                        });
                    }
                    this.loaderData.push({
                        type: CONST_8.CONST.TUTOR_GLOBALCODE,
                        filePath: CONST_8.CONST.TUTOR_COMMONPATH + targetTutor + CONST_8.CONST.GLOBALS_FILEPATH,
                        onLoad: this.onLoadCode.bind(this),
                        modName: CONST_8.CONST.TUTOR_EXT,
                        debugPath: this.isDebug ? "ISP_Tutor/EFbuild/TUTORCODE" + CONST_8.CONST.GLOBALS_FILEPATH : null
                    });
                    this.loaderData.push({
                        type: CONST_8.CONST.TUTOR_GLOBALDATA,
                        filePath: CONST_8.CONST.TUTOR_COMMONPATH + targetTutor + CONST_8.CONST.GDATA_FILEPATH,
                        onLoad: this.onLoadData.bind(this),
                        modName: CONST_8.CONST.TUTOR_GLOBALDATA,
                        debugPath: this.isDebug ? "ISP_Tutor/EFbuild/TUTORDATA" + CONST_8.CONST.GDATA_FILEPATH : null
                    });
                    this.loaderData.push({
                        type: CONST_8.CONST.TUTOR_GLOBALDATA,
                        filePath: CONST_8.CONST.TUTOR_COMMONPATH + targetTutor + CONST_8.CONST.GLIBR_FILEPATH,
                        onLoad: this.onLoadData.bind(this),
                        modName: CONST_8.CONST.TUTOR_GLOBALDATA,
                        debugPath: this.isDebug ? "ISP_Tutor/EFbuild/TUTORDATA" + CONST_8.CONST.GLIBR_FILEPATH : null
                    });
                }
                buildTutorSet() {
                    this.loaderData = [];
                    for (let moduleName of this.tutorConfig.dependencies) {
                        let moduleNameCS = moduleName;
                        this.loaderData.push({
                            type: "ModuleID",
                            filePath: moduleName + CONST_8.CONST.MODID_FILEPATH,
                            onLoad: this.onLoadModID.bind(this),
                            modName: moduleNameCS
                        });
                        this.loaderData.push({
                            type: "Scene Graph",
                            filePath: moduleName + CONST_8.CONST.GRAPH_FILEPATH,
                            onLoad: this.onLoadSceneGraphs.bind(this),
                            modName: moduleNameCS
                        });
                        this.loaderData.push({
                            type: "Class Extensions",
                            filePath: moduleName + CONST_8.CONST.EXTS_FILEPATH,
                            onLoad: this.onLoadCode.bind(this),
                            modName: moduleNameCS,
                            debugPath: this.isDebug ? "ISP_Tutor/EFbuild/" + moduleName + "/exts.js" : null
                        });
                        this.loaderData.push({
                            type: "Scene Mixins",
                            filePath: moduleName + CONST_8.CONST.MIXINS_FILEPATH,
                            onLoad: this.onLoadCode.bind(this),
                            modName: moduleNameCS,
                            debugPath: this.isDebug ? "ISP_Tutor/EFbuild/" + moduleName + "/mixins.js" : null
                        });
                        this.loaderData.push({
                            type: "Fonts",
                            filePath: moduleName + CONST_8.CONST.FONTFACE_FILEPATH,
                            onLoad: this.onLoadFonts.bind(this),
                            modName: moduleNameCS,
                        });
                        this.loaderData.push({
                            type: CONST_8.CONST.SCENE_DATA,
                            filePath: moduleName + CONST_8.CONST.DATA_FILEPATH,
                            onLoad: this.onLoadData.bind(this),
                            modName: moduleNameCS,
                        });
                        this.loaderData.push({
                            type: CONST_8.CONST.SCENE_DATA,
                            filePath: moduleName + CONST_8.CONST.LIBR_FILEPATH,
                            onLoad: this.onLoadData.bind(this),
                            modName: moduleNameCS,
                        });
                        this.loaderData.push({
                            type: CONST_8.CONST.TRACK_DATA,
                            filePath: moduleName + CONST_8.CONST.TRACKDATA_FILEPATH,
                            onLoad: this.onLoadData.bind(this),
                            modName: moduleNameCS,
                        });
                        this.loaderData.push({
                            type: "AnimateCC",
                            filePath: moduleName + CONST_8.CONST.ANMODULE_FILEPATH,
                            onLoad: this.onLoadCode.bind(this),
                            modName: moduleNameCS,
                            debugPath: this.isDebug ? moduleName + ".js" : null
                        });
                    }
                }
                loadFileSet() {
                    let modulePromises;
                    try {
                        modulePromises = this.loaderData.map((fileLoader, index) => {
                            let loader = new CURLLoader_2.CURLLoader();
                            return loader.load(new CURLRequest_2.CURLRequest(fileLoader.filePath))
                                .then((filetext) => {
                                return fileLoader.onLoad(fileLoader, filetext);
                            });
                        });
                    }
                    catch (error) {
                        console.log("Load-Set failed: " + error);
                    }
                    return modulePromises;
                }
                onLoadJson(fileLoader, filedata) {
                    try {
                        console.log("JSON Loaded: " + fileLoader.fileName);
                        this[fileLoader.varName] = JSON.parse(filedata);
                    }
                    catch (error) {
                        console.log("JSON parse failed: " + error);
                    }
                }
                onLoadModID(fileLoader, filedata) {
                    try {
                        console.log("MODID Loaded: " + fileLoader.modName);
                        Object.assign(fileLoader, JSON.parse(filedata));
                    }
                    catch (error) {
                        console.log("ModID parse failed: " + error);
                    }
                }
                onLoadSceneGraphs(fileLoader, filedata) {
                    try {
                        console.log("SceneGraph Loaded: " + fileLoader.modName);
                        this.sceneGraph[fileLoader.modName] = JSON.parse(filedata);
                    }
                    catch (error) {
                        console.log("Graph parse failed: " + error);
                    }
                }
                onLoadCode(fileLoader, filedata) {
                    try {
                        console.log("Module:" + fileLoader.type + " Loaded: " + fileLoader.modName);
                        let tag = document.createElement("script");
                        if (fileLoader.debugPath)
                            tag.text = filedata + "\n//# sourceURL= http://127.0.0.1/" + fileLoader.debugPath;
                        document.head.appendChild(tag);
                    }
                    catch (error) {
                        console.log("Exts parse failed: " + error);
                    }
                }
                onLoadFonts(fileLoader, filedata) {
                    try {
                        console.log("Fonts Loaded: " + fileLoader.modName);
                        let tag = document.createElement("style");
                        tag.type = 'text/css';
                        tag.appendChild(document.createTextNode(filedata));
                        document.head.appendChild(tag);
                    }
                    catch (error) {
                        console.log("Font parse failed: " + error);
                    }
                }
                onLoadData(fileLoader, filedata) {
                    try {
                        console.log("Data:" + fileLoader.type + " Loaded: " + fileLoader.modName);
                        let data = JSON.parse(filedata);
                        if (fileLoader.type === CONST_8.CONST.TUTOR_GLOBALDATA) {
                            this.globalData = this.globalData || {};
                            CUtil_34.CUtil.mixinDataObject(this.globalData, data);
                        }
                        else {
                            this.moduleData[fileLoader.modName] = this.moduleData[fileLoader.modName] || {};
                            this.moduleData[fileLoader.modName][fileLoader.type] = this.moduleData[fileLoader.modName][fileLoader.type] || {};
                            CUtil_34.CUtil.mixinDataObject(this.moduleData[fileLoader.modName][fileLoader.type], data);
                        }
                    }
                    catch (error) {
                        console.log("Data parse failed: " + error);
                    }
                }
                setTutorDefaults(featSet) {
                    let featArray = featSet.split(":");
                    this.fDefaults = {};
                    for (let feature in featArray) {
                        this.fDefaults[feature] = true;
                    }
                }
                addTutorFeatures(featSet) {
                    let featArray = new Array;
                    if (featSet.length > 0)
                        featArray = featSet.split(":");
                    for (let feature in this.fDefaults) {
                        this.addFeature(feature, null);
                    }
                    for (let feature of featArray) {
                        this.addFeature(feature, null);
                    }
                }
                get features() {
                    return this.fFeatures.join(":");
                }
                set features(ftrSet) {
                    this.fFeatures = ftrSet.split(":");
                }
                addFeature(_feature, _id) {
                    if (_feature && _feature != "") {
                        if (_id) {
                            this.featureID[_id] = this.featureID[_id] || {};
                            this.featureID[_id][_feature] = true;
                        }
                        else {
                            this.fFeatures[_feature] = true;
                        }
                    }
                }
                delFeature(_feature, _id) {
                    if (_id && _id != "") {
                        if (_feature && _feature !== "*") {
                            if (this.featureID[_id] && this.featureID[_id][_feature]) {
                                delete this.featureID[_id][_feature];
                            }
                        }
                        else {
                            if (this.featureID[_id])
                                delete this.featureID[_id];
                        }
                    }
                    else if (_feature && this.fFeatures[_feature]) {
                        delete this.fFeatures[_feature];
                    }
                }
                getFeaturesById(_id) {
                    let cnt = 0;
                    let features = "";
                    for (let ftr in this.featureID[_id]) {
                        if (cnt > 0) {
                            features += ":";
                        }
                        features += ftr;
                    }
                    return features;
                }
                includes(ftrObj, ftr) {
                    let result = false;
                    for (let fElement in ftrObj) {
                        if (fElement === ftr) {
                            result = true;
                            break;
                        }
                    }
                    return result;
                }
                testFeature(element, index, arr) {
                    let testElement = element;
                    let result = false;
                    let invResult = false;
                    if (element.charAt(0) == "!") {
                        testElement = element.substring(1);
                        invResult = true;
                    }
                    if (this.fFeatures[testElement]) {
                        result = true;
                    }
                    else {
                        for (let id in this.featureID) {
                            if (this.featureID[id][testElement]) {
                                result = true;
                                break;
                            }
                        }
                    }
                    return (invResult) ? !result : result;
                }
                testFeatures(features) {
                    let result = false;
                    if (features && features !== "")
                        result = this.testFeatureSet(features);
                    return result;
                }
                testFeatureSet(featSet) {
                    let feature;
                    let disjFeat = featSet.split("|");
                    let conjFeat;
                    if (featSet === "")
                        return true;
                    for (feature of disjFeat) {
                        conjFeat = feature.split(",");
                        if (conjFeat.every(this.testFeature, this))
                            return true;
                    }
                    return false;
                }
                traceFeatures() {
                    CUtil_34.CUtil.trace(this.fFeatures);
                }
                logTutorState(scene) {
                    if (EFLoadManager.nativeUserMgr)
                        EFLoadManager.nativeUserMgr.logState(scene.sceneLogName, JSON.stringify(this.sceneState), JSON.stringify(this.moduleState), JSON.stringify(this.tutorState));
                    if (EFLoadManager.nativeUserMgr)
                        EFLoadManager.nativeUserMgr.updateTutorState(this.tutorConfig.tutorStateID, this.getTutorState());
                }
                logTutorProgress(sceneName) {
                    if (EFLoadManager.nativeUserMgr) {
                        if (sceneName === CONST_8.CONST.END_OF_TUTOR) {
                            EFLoadManager.nativeUserMgr.tutorComplete();
                        }
                        else {
                            let graphState = JSON.stringify(this.tutorNavigator.captureGraph());
                            EFLoadManager.nativeUserMgr.updateScene(sceneName, graphState);
                        }
                    }
                }
            };
            exports_60("CEFTutorDoc", CEFTutorDoc);
        }
    };
});
System.register("thermite/TObjectMask", ["thermite/TObject"], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var TObject_6, TObjectMask;
    return {
        setters: [
            function (TObject_6_1) {
                TObject_6 = TObject_6_1;
            }
        ],
        execute: function () {
            TObjectMask = class TObjectMask extends TObject_6.TObject {
                constructor() {
                    super();
                }
            };
            exports_61("TObjectMask", TObjectMask);
        }
    };
});
System.register("core/CEFTransitions", ["thermite/TObject", "thermite/TObjectMask", "core/CEFTimeLine", "events/CEFEvent", "util/CUtil"], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var TObject_7, TObjectMask_1, CEFTimeLine_3, CEFEvent_9, CUtil_35, Tween, Event, Ease, CEFTransitions;
    return {
        setters: [
            function (TObject_7_1) {
                TObject_7 = TObject_7_1;
            },
            function (TObjectMask_1_1) {
                TObjectMask_1 = TObjectMask_1_1;
            },
            function (CEFTimeLine_3_1) {
                CEFTimeLine_3 = CEFTimeLine_3_1;
            },
            function (CEFEvent_9_1) {
                CEFEvent_9 = CEFEvent_9_1;
            },
            function (CUtil_35_1) {
                CUtil_35 = CUtil_35_1;
            }
        ],
        execute: function () {
            Tween = createjs.Tween;
            Event = createjs.Event;
            Ease = createjs.Ease;
            CEFTransitions = class CEFTransitions extends CEFTimeLine_3.CEFTimeLine {
                constructor(_tutorDoc) {
                    super(null, null, { "useTicks": false, "loop": false, "paused": true }, _tutorDoc);
                    this.currScene = null;
                    this.newScene = null;
                    this.rTime = 350;
                    this.tTime = 350;
                    this.fSingleStep = true;
                    this.activeObjs = {};
                    this.persistObjs = {};
                    this.fSwapObjects = true;
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_35.CUtil.trace("CEFTransitions:Constructor");
                }
                connectToTutor(parentTutor, autoTutor) {
                    this.tutorAutoObj = autoTutor;
                    this.activeObjs = {};
                }
                resetTransitions() {
                    this.activeObjs = {};
                }
                walkTweens() {
                    let i1;
                    if (this.traceMode)
                        CUtil_35.CUtil.trace("Tween Enumeration for Scene: ", this.currScene);
                    for (i1 = 0; i1 < this._tweens.length; i1++) {
                        if (this.traceMode)
                            CUtil_35.CUtil.trace("Object Value: ", this.targets[i1].obj);
                    }
                }
                gotoScene(scn) {
                    if (this.traceMode)
                        CUtil_35.CUtil.trace("Goto Scene: ", scn);
                    this.fSingleStep = false;
                    this.stopTransitions();
                    this.newScene = scn;
                    if (this.currScene != null) {
                        this.setTransitionOUT();
                        if (this.targets.length) {
                            this.startTransition(this.outFinished, this);
                        }
                        else {
                            this.setTransitionIN(this.tutorAutoObj, this.newScene);
                            this.changeScene();
                            if (this._tweens.length > 0) {
                                this.startTransition(this.inFinished, this);
                            }
                            else
                                this.inFinished();
                        }
                    }
                    else {
                        this.setTransitionIN(this.tutorAutoObj, this.newScene);
                        this.changeScene();
                        this.startTransition(this.inFinished, this);
                    }
                }
                setTransitionOUT() {
                    let bMatch;
                    let targObj;
                    let tween;
                    try {
                        if (this.currScene != null)
                            for (let sceneObj in this.tutorAutoObj[this.currScene]) {
                                bMatch = false;
                                if (sceneObj == "_instance")
                                    continue;
                                if (this.newScene != null) {
                                    if (!this.tutorAutoObj[this.newScene]._instance.isAnchor) {
                                        if (this.tutorAutoObj[this.newScene][sceneObj] != undefined) {
                                            if (this.traceMode)
                                                CUtil_35.CUtil.trace("newObject: " + this.tutorAutoObj[this.newScene][sceneObj]._instance.xname);
                                            if (this.traceMode)
                                                CUtil_35.CUtil.trace("oldObject: " + this.tutorAutoObj[this.currScene][sceneObj]._instance.xname);
                                            if (this.tutorAutoObj[this.newScene][sceneObj]._instance.xname ==
                                                this.tutorAutoObj[this.currScene][sceneObj]._instance.xname)
                                                bMatch = true;
                                        }
                                    }
                                }
                                if (!bMatch) {
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("setTransitionOUT: " + this.tutorAutoObj[this.currScene][sceneObj]._instance.name);
                                    targObj = this.tutorAutoObj[this.currScene][sceneObj];
                                    tween = new Tween(targObj._instance).to({ alpha: 0 }, Number(this.rTime), Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + this.currScene + "  named : " + targObj._instance.name + " property: alpha" + " out: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                            }
                    }
                    catch (error) {
                        CUtil_35.CUtil.trace("setTransitionOUT failed: " + error);
                    }
                    this.tutorAutoObj[this.currScene]._instance.hideScene();
                }
                setTransitionIN(objectList, sceneName) {
                    let targObj;
                    let liveObj;
                    let tween;
                    let xname;
                    this.currentObjs = new Array;
                    for (let namedObj in objectList[sceneName]) {
                        if (namedObj != "_instance") {
                            targObj = objectList[sceneName][namedObj];
                            if (targObj._instance instanceof TObject_7.TObject) {
                                if (!targObj._instance.isTweenable())
                                    continue;
                                xname = targObj._instance.xname;
                            }
                            else {
                                xname = targObj._instance.id;
                            }
                            if (targObj._instance.hidden)
                                continue;
                            if (this.tutorAutoObj[this.newScene]._instance.isAnchor)
                                this.activeObjs = {};
                            if (this.activeObjs[xname] != undefined) {
                                liveObj = this.activeObjs[xname];
                                if (this.fSwapObjects) {
                                    let dO1 = this.tutorAutoObj[this.currScene][namedObj]._instance;
                                    let dO2 = this.tutorAutoObj[this.newScene][namedObj]._instance;
                                    let dI1 = this.tutorContainer[this.currScene].getChildIndex(dO1);
                                    let dI2 = this.tutorContainer[this.newScene].getChildIndex(dO2);
                                    this.tutorContainer[this.currScene].addChildAt(dO2, dI1);
                                    this.tutorContainer[this.newScene].addChildAt(dO1, dI2);
                                    this.tutorAutoObj[this.currScene][namedObj]._instance = dO2;
                                    this.tutorAutoObj[this.newScene][namedObj]._instance = dO1;
                                    this.tutorAutoObj[this.currScene]._instance[namedObj] = dO2;
                                    this.tutorAutoObj[this.newScene]._instance[namedObj] = dO1;
                                    this.tutorAutoObj[this.newScene]._instance[namedObj].hostScene = this.tutorAutoObj[this.newScene]._instance;
                                    targObj = objectList[sceneName][namedObj];
                                }
                                else {
                                    if ((liveObj instanceof TObject_7.TObject) && (targObj._instance.tweenID == liveObj.tweenID)) {
                                        targObj._instance.deepStateCopy(liveObj);
                                    }
                                    else
                                        this.shallowStateCopy(targObj._instance, liveObj);
                                }
                                if (targObj.inPlace.x != liveObj.x) {
                                    tween = new Tween(targObj._instance).to({ x: targObj.inPlace.x }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property:x  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.y != liveObj.y) {
                                    tween = new Tween(targObj._instance).to({ y: targObj.inPlace.y }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: y  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.scaleX != liveObj.scaleX) {
                                    tween = new Tween(targObj._instance).to({ scaleX: targObj.inPlace.scaleX }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: scaleX  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.scaleY != liveObj.scaleY) {
                                    tween = new Tween(targObj._instance).to({ scaleY: targObj.inPlace.scaleY }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: scaleY  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.skewX != liveObj.skewX) {
                                    tween = new Tween(targObj._instance).to({ skewX: targObj.inPlace.skewX }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: skewX  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.skewY != liveObj.skewY) {
                                    tween = new Tween(targObj._instance).to({ skewY: targObj.inPlace.skewY }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: skewY  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.regX != liveObj.regX) {
                                    tween = new Tween(targObj._instance).to({ regX: targObj.inPlace.regX }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: regX  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.regY != liveObj.regY) {
                                    tween = new Tween(targObj._instance).to({ regY: targObj.inPlace.regY }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj.name + " property: regY  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.rotation != liveObj.rotation) {
                                    tween = new Tween(targObj._instance).to({ rotation: targObj.inPlace.rotation }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj._instance.name + " property: rotation  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                                if (targObj.inPlace.alpha != liveObj.alpha) {
                                    tween = new Tween(targObj._instance).to({ alpha: targObj.inPlace.alpha }, this.tTime, Ease.cubicInOut);
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj._instance.name + " property: alpha  in: " + tween.duration + "msecs");
                                    this.addTween(tween);
                                }
                            }
                            else {
                                if (targObj._instance.addHTMLControls)
                                    targObj._instance.addHTMLControls();
                                if (!(targObj._instance instanceof TObjectMask_1.TObjectMask))
                                    targObj._instance.alpha = 0;
                                tween = new Tween(targObj._instance).to({ alpha: targObj.inPlace.alpha }, this.tTime, Ease.cubicInOut);
                                if (this.traceMode)
                                    CUtil_35.CUtil.trace("Tweening obj in scene: " + sceneName + "  named : " + targObj._instance.name + " property: alpha" + " in: " + tween.duration + "msecs");
                                this.addTween(tween);
                            }
                            if (targObj._instance instanceof TObject_7.TObject) {
                                if (!targObj._instance.hidden)
                                    targObj._instance.visible = true;
                                if (targObj._instance.bPersist) {
                                    this.persistObjs[xname] = targObj._instance;
                                }
                                else {
                                    this.currentObjs.push(new Array(xname, targObj._instance));
                                }
                                if (targObj._instance.isSubTweenable()) {
                                    if (this.traceMode)
                                        CUtil_35.CUtil.trace("SubTweening : " + targObj._instance.name);
                                    this.setTransitionIN(objectList[sceneName], namedObj);
                                }
                            }
                            else {
                                targObj._instance.visible = true;
                                this.currentObjs.push(new Array(xname, targObj._instance));
                            }
                        }
                    }
                    this.activeObjs = {};
                    for (let objRec of this.currentObjs) {
                        this.activeObjs[objRec[0]] = objRec[1];
                    }
                    for (let perObj in this.persistObjs) {
                        this.activeObjs[this.persistObjs[perObj].xname] = this.persistObjs[perObj];
                    }
                    this.tutorAutoObj[this.newScene]._instance.showScene();
                }
                changeScene() {
                    if (this.currScene)
                        this.tutorAutoObj[this.currScene]._instance.visible = false;
                    this.tutorAutoObj[this.newScene]._instance.visible = true;
                    this.currScene = this.newScene;
                }
                shallowStateCopy(tar, src) {
                    tar.x = src.x;
                    tar.y = src.y;
                    tar.alpha = src.alpha;
                }
                outFinished() {
                    CUtil_35.CUtil.trace("outFinished");
                    if (!this.fSingleStep) {
                        if (this.newScene) {
                            if (this.tutorAutoObj[this.newScene]._instance.visible == false) {
                                this.setTransitionIN(this.tutorAutoObj, this.newScene);
                            }
                            this.changeScene();
                            this.startTransition(this.inFinished, this);
                        }
                    }
                    else
                        this.dispatchEvent(new Event(CEFEvent_9.CEFEvent.CHANGE, false, false));
                }
                inFinished() {
                    CUtil_35.CUtil.trace("inFinished");
                    this.currScene = this.newScene;
                    this.dispatchEvent(new Event(CEFEvent_9.CEFEvent.COMPLETE, false, false));
                }
            };
            exports_62("CEFTransitions", CEFTransitions);
        }
    };
});
System.register("core/CEFNavigator", ["core/CEFTransitions", "events/CEFEvent", "util/CONST", "util/CUtil"], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var CEFTransitions_1, CEFEvent_10, CONST_9, CUtil_36, Event, EventDispatcher, CEFNavigator;
    return {
        setters: [
            function (CEFTransitions_1_1) {
                CEFTransitions_1 = CEFTransitions_1_1;
            },
            function (CEFEvent_10_1) {
                CEFEvent_10 = CEFEvent_10_1;
            },
            function (CONST_9_1) {
                CONST_9 = CONST_9_1;
            },
            function (CUtil_36_1) {
                CUtil_36 = CUtil_36_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            EventDispatcher = createjs.EventDispatcher;
            CEFNavigator = class CEFNavigator extends EventDispatcher {
                constructor(_tutorDoc) {
                    super();
                    this.traceMode = false;
                    this.sceneCnt = 0;
                    this._inNavigation = false;
                    this.traceMode = true;
                    this.tutorDoc = _tutorDoc;
                    this.tutorAutoObj = _tutorDoc.TutAutomator;
                    this.xitions = new CEFTransitions_1.CEFTransitions(_tutorDoc);
                }
                get iteration() {
                    return "null";
                }
                get sceneObj() {
                    return null;
                }
                addScene(SceneTitle, ScenePage, SceneName, SceneClass, ScenePersist, SceneFeatures = "null") {
                }
                connectToTutor(parentTutor, autoTutor) {
                    this.tutorDoc.tutorContainer = parentTutor;
                    this.tutorDoc.TutAutomator = autoTutor;
                }
                get scenePrev() {
                    return 0;
                }
                set scenePrev(scenePrevINT) {
                }
                get sceneCurr() {
                    return 0;
                }
                set sceneCurr(sceneCurrINT) {
                }
                get sceneCurrINC() {
                    return 0;
                }
                get sceneCurrDEC() {
                    return 0;
                }
                get sceneTitle() {
                    return new Array();
                }
                set sceneTitle(sceneTitleARRAY) {
                }
                get sceneSeq() {
                    return new Array();
                }
                set sceneSeq(sceneSeqARRAY) {
                }
                get scenePage() {
                    return new Array();
                }
                set scenePage(scenePageARRAY) {
                }
                get sceneName() {
                    return new Array();
                }
                set sceneName(sceneSeqARRAY) {
                }
                get sceneClass() {
                    return new Array();
                }
                set sceneClass(sceneSeqARRAY) {
                }
                get scenePersist() {
                    return new Array();
                }
                set scenePersist(sceneSeqARRAY) {
                }
                findSceneOrd(tarScene) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("findSceneOrd: " + tarScene);
                    let i1;
                    let ordScene = 0;
                    let newScene;
                    for (i1 = 0; i1 < this.sceneCnt; i1++) {
                        if (this.sceneSeq[i1] == tarScene) {
                            ordScene = i1;
                            break;
                        }
                    }
                    return ordScene;
                }
                goToScene(tarScene) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("Nav To: " + tarScene);
                    let ordScene = -1;
                    let newScene = "";
                    let redScene = "";
                    if (this._inNavigation)
                        return;
                    this._inNavigation = true;
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.fDeferDemoClick = true;
                    ordScene = this.findSceneOrd(tarScene);
                    if (ordScene >= 0) {
                        if (this.traceMode)
                            CUtil_36.CUtil.trace("Nav GoTo Found: " + tarScene);
                        this.scenePrev = this.sceneCurr;
                        if (tarScene == "SdemoScene") {
                            this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preExitScene("WOZGOTO", this.sceneCurr);
                            this.sceneCurr = ordScene;
                        }
                        else
                            switch (redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preExitScene("WOZGOTO", this.sceneCurr)) {
                                case CONST_9.CONST.CANCELNAV:
                                    if (this.tutorDoc.fDemo)
                                        this.tutorDoc.fDeferDemoClick = false;
                                    this._inNavigation = false;
                                    return;
                                case CONST_9.CONST.OKNAV:
                                    this.sceneCurr = ordScene;
                                    break;
                                default:
                                    this.sceneCurr = this.findSceneOrd(redScene);
                            }
                        for (redScene = this.sceneSeq[this.sceneCurr]; redScene != newScene;) {
                            if (this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]] == undefined) {
                                this.tutorDoc.tutorContainer.instantiateScenePath(this.sceneName[this.sceneCurr], this.sceneClass[this.sceneCurr]);
                            }
                            newScene = redScene;
                            redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preEnterScene(this.tutorDoc.tutorContainer, newScene, this.sceneTitle[this.sceneCurr], this.scenePage[this.sceneCurr], "WOZGOTO");
                            if (redScene == "WOZNEXT") {
                                this.sceneCurrINC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            if (redScene == "WOZBACK") {
                                this.sceneCurrDEC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            else
                                this.sceneCurr = this.findSceneOrd(redScene);
                        }
                        let logData = { 'navevent': 'navgoto', 'curscene': this.scenePrev, 'newscene': redScene };
                        this.tutorDoc.log.logNavEvent(logData);
                        this.tutorDoc.TutAutomator[this.sceneSeq[this.scenePrev]]._instance.onExitScene();
                        this.tutorDoc.tutorContainer.xitions.addEventListener(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterScene);
                        this.tutorDoc.tutorContainer.xitions.gotoScene(redScene);
                    }
                }
                onButtonNext(evt) {
                    this.gotoNextScene("$buttonClick");
                }
                recoverState() {
                }
                gotoNextScene(source) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("Nav Next: ");
                    let newScene;
                    let redScene = "";
                    if (this._inNavigation)
                        return;
                    this._inNavigation = true;
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.fDeferDemoClick = true;
                    if (this.sceneCurr < this.sceneCnt) {
                        if (this.traceMode)
                            CUtil_36.CUtil.trace("this.scenePrev: " + this.scenePrev + "  - this.sceneCurr: " + this.sceneCurr);
                        this.scenePrev = this.sceneCurr;
                        if (this.traceMode)
                            CUtil_36.CUtil.trace("this.sceneSeq[this.sceneCurr]: " + this.sceneSeq[this.sceneCurr]);
                        switch (redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preExitScene("WOZNEXT", this.sceneCurr)) {
                            case CONST_9.CONST.CANCELNAV:
                                if (this.tutorDoc.fDemo)
                                    this.tutorDoc.fDeferDemoClick = false;
                                this._inNavigation = false;
                                return;
                            case CONST_9.CONST.OKNAV:
                                this.sceneCurrINC;
                                break;
                            default:
                                this.sceneCurr = this.findSceneOrd(redScene);
                        }
                        for (redScene = this.sceneSeq[this.sceneCurr]; redScene != newScene;) {
                            CUtil_36.CUtil.trace(this.sceneSeq[this.sceneCurr]);
                            CUtil_36.CUtil.trace(this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]);
                            if (this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]] == undefined) {
                                this.tutorDoc.tutorContainer.instantiateScenePath(this.sceneName[this.sceneCurr], this.sceneClass[this.sceneCurr]);
                            }
                            newScene = redScene;
                            redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preEnterScene(this.tutorDoc.tutorContainer, newScene, this.sceneTitle[this.sceneCurr], this.scenePage[this.sceneCurr], "WOZNEXT");
                            if (redScene == "WOZNEXT") {
                                this.sceneCurrINC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            if (redScene == "WOZBACK") {
                                this.sceneCurrDEC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            else
                                this.sceneCurr = this.findSceneOrd(redScene);
                        }
                        let logData = { 'navevent': 'navnext', 'curscene': this.scenePrev, 'newscene': redScene };
                        this.tutorDoc.log.logNavEvent(logData);
                        this.tutorDoc.TutAutomator[this.sceneSeq[this.scenePrev]]._instance.onExitScene();
                        this.tutorDoc.tutorContainer.xitions.on(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterNext);
                        this.tutorDoc.tutorContainer.xitions.gotoScene(redScene);
                    }
                }
                onButtonPrev(evt) {
                    this.gotoPrevScene();
                }
                gotoPrevScene() {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("Nav Back: ");
                    let newScene = "";
                    let redScene = "";
                    if (this._inNavigation)
                        return;
                    this._inNavigation = true;
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.fDeferDemoClick = true;
                    if (this.sceneCurr >= 1) {
                        this.scenePrev = this.sceneCurr;
                        switch (redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preExitScene("WOZBACK", this.sceneCurr)) {
                            case CONST_9.CONST.CANCELNAV:
                                if (this.tutorDoc.fDemo)
                                    this.tutorDoc.fDeferDemoClick = false;
                                this._inNavigation = false;
                                return;
                            case CONST_9.CONST.OKNAV:
                                this.sceneCurrDEC;
                                break;
                            default:
                                this.sceneCurr = this.findSceneOrd(redScene);
                        }
                        for (redScene = this.sceneSeq[this.sceneCurr]; redScene != newScene;) {
                            newScene = redScene;
                            redScene = this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.preEnterScene(this.tutorDoc.tutorContainer, newScene, this.sceneTitle[this.sceneCurr], this.scenePage[this.sceneCurr], "WOZBACK");
                            if (redScene == "WOZNEXT") {
                                this.sceneCurrINC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            if (redScene == "WOZBACK") {
                                this.sceneCurrDEC;
                                redScene = this.sceneSeq[this.sceneCurr];
                            }
                            else
                                this.sceneCurr = this.findSceneOrd(redScene);
                        }
                        let logData = { 'navevent': 'navback', 'curscene': this.scenePrev, 'newscene': redScene };
                        this.tutorDoc.log.logNavEvent(logData);
                        this.tutorDoc.TutAutomator[this.sceneSeq[this.scenePrev]]._instance.onExitScene();
                        this.tutorDoc.tutorContainer.xitions.addEventListener(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterBack);
                        this.tutorDoc.tutorContainer.xitions.gotoScene(redScene);
                    }
                }
                doEnterNext(evt) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("this.doEnterNext: ", this.sceneCurr);
                    this.tutorDoc.tutorContainer.xitions.off(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterNext);
                    if (!this.scenePersist[this.scenePrev]) {
                        this.tutorDoc.tutorContainer.destroyScene(this.sceneName[this.scenePrev]);
                    }
                    this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.onEnterScene("WOZNEXT");
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.tutorContainer.dispatchEvent(new Event("deferedDemoCheck", false, false));
                    this._inNavigation = false;
                }
                doEnterBack(evt) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("doEnterBack: ", this.sceneCurr);
                    this.tutorDoc.tutorContainer.xitions.off(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterBack);
                    if (!this.scenePersist[this.scenePrev]) {
                        this.tutorDoc.tutorContainer.destroyScene(this.sceneName[this.scenePrev]);
                    }
                    this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.onEnterScene("WOZBACK");
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.tutorContainer.dispatchEvent(new Event("deferedDemoCheck", false, false));
                    this._inNavigation = false;
                }
                doEnterScene(evt) {
                    if (this.traceMode)
                        CUtil_36.CUtil.trace("this.doEnterScene: ", this.sceneCurr);
                    this.tutorDoc.tutorContainer.xitions.off(CEFEvent_10.CEFEvent.COMPLETE, this.doEnterScene);
                    if (!this.scenePersist[this.scenePrev]) {
                        this.tutorDoc.tutorContainer.destroyScene(this.sceneName[this.scenePrev]);
                    }
                    this.tutorDoc.TutAutomator[this.sceneSeq[this.sceneCurr]]._instance.onEnterScene("WOZGOTO");
                    if (this.tutorDoc.fDemo)
                        this.tutorDoc.tutorContainer.dispatchEvent(new Event("deferedDemoCheck", false, false));
                    this._inNavigation = false;
                }
            };
            exports_63("CEFNavigator", CEFNavigator);
        }
    };
});
System.register("bkt/CBKTSkill", [], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var CBKTSkill;
    return {
        setters: [],
        execute: function () {
            CBKTSkill = class CBKTSkill {
                constructor(_tutorDoc) {
                    this.tutorDoc = _tutorDoc;
                }
                static factory(_tutorDoc, factory) {
                    var node = new CBKTSkill(_tutorDoc);
                    node.Bel = 0;
                    node.pL = factory.pL;
                    node.pT = factory.pT;
                    node.pG = factory.pG;
                    node.pS = factory.pS;
                    return node;
                }
                updateBelief(ans) {
                    if (ans == true)
                        this.Bel = this.calcTRUE();
                    else
                        this.Bel = this.calcFALSE();
                    this.pL = this.updatePrior(this.Bel);
                }
                calcTRUE() {
                    return (this.pL * (1 - this.pS)) / ((this.pL * (1 - this.pS)) + ((1 - this.pL) * this.pG));
                }
                calcFALSE() {
                    return (this.pL * this.pS) / ((this.pL * this.pS) + ((1 - this.pL) * (1 - this.pG)));
                }
                updatePrior(Bel) {
                    return Bel + ((1 - Bel) * this.pT);
                }
                queryBelief() {
                    return this.Bel;
                }
            };
            exports_64("CBKTSkill", CBKTSkill);
        }
    };
});
System.register("tutorgraph/CTutorGraph", ["tutorgraph/CTutorNode", "tutorgraph/CTutorConstraint", "tutorgraph/CTutorAction", "tutorgraph/CTutorModule", "tutorgraph/CTutorModuleGroup", "bkt/CBKTSkill", "util/CUtil"], function (exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var CTutorNode_4, CTutorConstraint_1, CTutorAction_1, CTutorModule_2, CTutorModuleGroup_1, CBKTSkill_1, CUtil_37, CTutorGraph;
    return {
        setters: [
            function (CTutorNode_4_1) {
                CTutorNode_4 = CTutorNode_4_1;
            },
            function (CTutorConstraint_1_1) {
                CTutorConstraint_1 = CTutorConstraint_1_1;
            },
            function (CTutorAction_1_1) {
                CTutorAction_1 = CTutorAction_1_1;
            },
            function (CTutorModule_2_1) {
                CTutorModule_2 = CTutorModule_2_1;
            },
            function (CTutorModuleGroup_1_1) {
                CTutorModuleGroup_1 = CTutorModuleGroup_1_1;
            },
            function (CBKTSkill_1_1) {
                CBKTSkill_1 = CBKTSkill_1_1;
            },
            function (CUtil_37_1) {
                CUtil_37 = CUtil_37_1;
            }
        ],
        execute: function () {
            CTutorGraph = class CTutorGraph extends CTutorNode_4.CTutorNode {
                constructor(_tutorDoc, factory) {
                    super(_tutorDoc);
                    this._nodes = {};
                    this._modules = {};
                    this._actions = {};
                    this._graphs = {};
                    this._constraints = {};
                    this._skillSet = {};
                    this._pFeatures = {};
                    this._pConstraints = {};
                    this._factory = factory;
                }
                static factory(_tutorDoc, parent, id, factory) {
                    let tutorgraph = new CTutorGraph(_tutorDoc, factory);
                    tutorgraph.parseNodes();
                    tutorgraph.parseConstraints();
                    tutorgraph.parseSkills();
                    return tutorgraph;
                }
                captureGraph(obj) {
                    obj['currNodeID'] = this._currNode.name;
                    obj['currNode'] = this._currNode.captureGraph({});
                    return obj;
                }
                restoreGraph(obj) {
                    this._currNode = this.findNodeByName(obj['currNodeID']);
                    this._currScene = this._currNode.restoreGraph(obj['currNode']);
                    this._prevScene = this._currScene;
                    return this._currScene;
                }
                sceneInstance() {
                    let objInstance = null;
                    try {
                        if (this._currScene) {
                            objInstance = this.tutorDoc.TutAutomator[this._currScene.scenename]._instance;
                        }
                    }
                    catch (err) {
                        CUtil_37.CUtil.trace("CONST.sceneInstance: " + err.toString());
                        objInstance = null;
                    }
                    return objInstance;
                }
                queryPFeature(pid, size, cycle) {
                    let iter = 0;
                    if (this._pFeatures[pid] != undefined) {
                        iter = this._pFeatures[pid] + 1;
                        if (iter >= size) {
                            iter = size - cycle;
                        }
                        this._pFeatures[pid] = iter;
                    }
                    else
                        this._pFeatures[pid] = 0;
                    return iter;
                }
                queryPConstraint(pid, size, cycle) {
                    let iter = 0;
                    if (this._pConstraints[pid] != undefined) {
                        iter = this._pConstraints[pid] + 1;
                        if (iter >= size) {
                            iter = size - cycle;
                        }
                        this._pConstraints[pid] = iter;
                    }
                    else
                        this._pConstraints[pid] = 0;
                    return iter;
                }
                seekTo(nxtScene) {
                    return null;
                }
                seekEnd() {
                    return null;
                }
                applyNode() {
                    return this._currNode.applyNode();
                }
                seekBack() {
                    return null;
                }
                seekRoot() {
                    this._currNode = this._nodes["root"];
                }
                nextScene() {
                    let nextNode;
                    if (this._currNode)
                        do {
                            this._currScene = this._currNode.nextScene();
                            if (this._currScene == null) {
                                nextNode = this._currNode.nextNode();
                                this._currNode = nextNode;
                                if (this._currNode != null)
                                    this._currNode.applyNode();
                            }
                            else
                                this._currScene.incIteration();
                        } while ((this._currScene == null) && (this._currNode != null));
                    this._prevScene = this._currScene;
                    return this._currScene;
                }
                parseNodes() {
                    let nodeList = this._factory.CNodes;
                    for (let name in nodeList) {
                        if (!(name.startsWith("COMMENT"))) {
                            CUtil_37.CUtil.trace("TutorGraph - generating node: " + name);
                            switch (nodeList[name].type) {
                                case "action":
                                    this._nodes[name] = CTutorAction_1.CTutorAction.factory(this.tutorDoc, this, name, this._factory);
                                    break;
                                case "module":
                                    this._nodes[name] = CTutorModule_2.CTutorModule.factory(this.tutorDoc, this, name, nodeList[name], this._factory);
                                    break;
                                case "modulegroup":
                                    this._nodes[name] = CTutorModuleGroup_1.CTutorModuleGroup.factory(this.tutorDoc, this, name, nodeList[name], this._factory);
                                    break;
                                case "subgraph":
                                    break;
                                case "external":
                                    break;
                            }
                        }
                    }
                    return true;
                }
                parseConstraints() {
                    let constFactory = this._factory.CConstraints;
                    for (let name in constFactory) {
                        if (!(name.startsWith("COMMENT")))
                            this._constraints[name] = CTutorConstraint_1.CTutorConstraint.factory(this.tutorDoc, this, constFactory[name]);
                    }
                    return true;
                }
                recoverSkills(recoveredSkills) {
                    this._factory.CSkills = recoveredSkills;
                    return this.parseSkills();
                }
                parseSkills() {
                    let skillsFactory = this._factory.CSkills;
                    for (let name in skillsFactory) {
                        if (!(name.startsWith("COMMENT")))
                            this._skillSet[name] = CBKTSkill_1.CBKTSkill.factory(this.tutorDoc, skillsFactory[name]);
                    }
                    this.tutorDoc.ktSkills = this._skillSet;
                    return true;
                }
                findNodeByName(name) {
                    return this._nodes[name];
                }
                findConstraintByName(name) {
                    return this._constraints[name];
                }
                get node() {
                    return this._currNode;
                }
                set node(newNode) {
                    if (this._currNode != newNode)
                        this._currNode.resetNode();
                    this._currNode = newNode;
                }
                set scene(seekScene) {
                    this._currScene = this._currNode.seekToScene(seekScene);
                }
            };
            exports_65("CTutorGraph", CTutorGraph);
        }
    };
});
System.register("tutorgraph/CTutorScene", [], function (exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var CTutorScene;
    return {
        setters: [],
        execute: function () {
            CTutorScene = class CTutorScene {
                constructor(_tutorDoc, factory, parent) {
                    this._iteration = 0;
                    this.tutorDoc = _tutorDoc;
                    this.tutorContainer = _tutorDoc.tutorContainer;
                    this._parent = parent;
                    let namespace = factory.classname.split(".");
                    this._name = factory.name;
                    this._classPath = factory.classname;
                    this._hostModule = factory.hostname || namespace[0];
                    this._ownerModule = namespace[0];
                    this._className = namespace[1];
                    this._title = factory.title;
                    this._page = factory.page;
                    this._isAnchor = factory.isanchor || false;
                    this._copyOf = factory.copyof || "";
                    this._features = factory.features;
                    this._enqueue = (factory.enqueue === "true") ? true : false;
                    this._create = (factory.create === "true") ? true : false;
                    this._visible = (factory.visible === "true") ? true : false;
                    this._persist = (factory.persist === "true") ? true : false;
                    this._checkpnt = (factory.ischeckpnt === "true") ? true : false;
                    if (factory.$P != undefined) {
                        this._pid = factory.pid;
                        this._prob = factory.$P.split('|');
                        this._cycle = Number(factory.cycle);
                    }
                    if (this._create)
                        this.instantiateScene();
                }
                instantiateScene() {
                    this._scene = this.tutorContainer.instantiateScene(this);
                    this.features = this._features;
                }
                destroyScene() {
                    this._scene = null;
                }
                set features(newFTR) {
                    this._scene.features = newFTR;
                }
                get features() {
                    if (this._scene != null)
                        return this._scene.features;
                    else
                        return this._features;
                }
                get hasPFeature() {
                    return (this._pid != null);
                }
                testPFeature() {
                    let iter = this._parent.queryPFeature(this._pid, this._prob.length, this._cycle);
                    let rand = Math.random();
                    return (rand < this._prob[iter]);
                }
                get scenename() {
                    return this._name;
                }
                get classname() {
                    return this._className;
                }
                get classpath() {
                    return this._classPath;
                }
                get ownermodule() {
                    return this._ownerModule;
                }
                get hostmodule() {
                    return this._hostModule;
                }
                get title() {
                    return this._title;
                }
                get isCheckPoint() {
                    return this._checkpnt;
                }
                get page() {
                    return this._page;
                }
                get visible() {
                    return this._visible;
                }
                get isAnchor() {
                    return this._isAnchor;
                }
                get copyOf() {
                    return this._copyOf;
                }
                get persist() {
                    return this._persist;
                }
                get iteration() {
                    return this._iteration;
                }
                incIteration() {
                    this._iteration++;
                    return this._iteration;
                }
                enumDisplayList() {
                    this.tutorContainer.enumChildren(this.tutorContainer, 0);
                }
                get sceneLogName() {
                    return this.scenename + "_" + this.iteration;
                }
            };
            exports_66("CTutorScene", CTutorScene);
        }
    };
});
System.register("thermite/TTutorContainer", ["thermite/TRoot", "thermite/TObject", "thermite/TSceneBase", "thermite/TCursorProxy", "thermite/events/TMouseEvent", "core/CEFTimeStamp", "events/CEFEvent", "events/CEFNavEvent", "events/CEFKeyboardEvent", "util/CONST", "util/CUtil"], function (exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var TRoot_2, TObject_8, TSceneBase_2, TCursorProxy_1, TMouseEvent_2, CEFTimeStamp_1, CEFEvent_11, CEFNavEvent_1, CEFKeyboardEvent_1, CONST_10, CUtil_38, MovieClip, DisplayObjectContainer, Tween, Rectangle, Shape, TTutorContainer;
    return {
        setters: [
            function (TRoot_2_1) {
                TRoot_2 = TRoot_2_1;
            },
            function (TObject_8_1) {
                TObject_8 = TObject_8_1;
            },
            function (TSceneBase_2_1) {
                TSceneBase_2 = TSceneBase_2_1;
            },
            function (TCursorProxy_1_1) {
                TCursorProxy_1 = TCursorProxy_1_1;
            },
            function (TMouseEvent_2_1) {
                TMouseEvent_2 = TMouseEvent_2_1;
            },
            function (CEFTimeStamp_1_1) {
                CEFTimeStamp_1 = CEFTimeStamp_1_1;
            },
            function (CEFEvent_11_1) {
                CEFEvent_11 = CEFEvent_11_1;
            },
            function (CEFNavEvent_1_1) {
                CEFNavEvent_1 = CEFNavEvent_1_1;
            },
            function (CEFKeyboardEvent_1_1) {
                CEFKeyboardEvent_1 = CEFKeyboardEvent_1_1;
            },
            function (CONST_10_1) {
                CONST_10 = CONST_10_1;
            },
            function (CUtil_38_1) {
                CUtil_38 = CUtil_38_1;
            }
        ],
        execute: function () {
            MovieClip = createjs.MovieClip;
            DisplayObjectContainer = createjs.Container;
            Tween = createjs.Tween;
            Rectangle = createjs.Rectangle;
            Shape = createjs.Shape;
            TTutorContainer = class TTutorContainer extends TRoot_2.TRoot {
                constructor() {
                    super();
                    this.fIntroVideo = false;
                    this.fCVSIntro = true;
                    this.fRampsIntro = true;
                    this.fRampPreTest = false;
                    this.fFreeResponse = 0;
                    this.fStepByStep0 = false;
                    this.fStepByStep1 = false;
                    this.fEIA = true;
                    this.fEIB = true;
                    this.fEIC = true;
                    this.fSummaryVideo = false;
                    this.fRampPostTest = true;
                    this.timeStamp = new CEFTimeStamp_1.CEFTimeStamp;
                    this.playing = new Array();
                    this.isPaused = false;
                    this.scenePtr = new Array;
                    this.stateStack = new Array();
                    this.sceneCnt = 0;
                    this.replayIndex = new Array;
                    this.replayTime = 0;
                    this.Running = new Array();
                    this.runCount = 0;
                    this.sceneGraph = "<sceneGraph/>";
                    this.init1();
                }
                TTutorContainerInitialize() {
                    this.TRootInitialize();
                    this.init1();
                }
                initialize() {
                    this.TRootInitialize();
                    this.init1();
                }
                init1() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("TTutorContainer:Constructor");
                    this.containerBounds = new Shape();
                    this.containerBounds.graphics.f("rgba(255,0,0,0)").s("rgba(0,0,0,0)").ss(1, 1, 1).dr(0, 0, 1920, 1200);
                    this.containerBounds.setTransform(0, 0);
                    this.timeline.addTween(Tween.get(this.containerBounds).wait(1));
                    this.nominalBounds = new Rectangle(0, 0, 1920, 1200);
                }
                Destructor() {
                    super.Destructor();
                }
                captureLOGState() {
                    let obj = super.captureLOGState();
                    return obj;
                }
                loadXML(stringSrc) {
                    super.loadXML(stringSrc);
                }
                saveXML() {
                    let propVector;
                    return propVector;
                }
                captureSceneGraph() {
                }
                instantiateScenePath(sceneName, classPath, sceneVisible = false) {
                    console.error("ERROR: Use of Deprecated Function");
                    let namespace = classPath.split(".");
                }
                instantiateScene(factory) {
                    let i1;
                    let tarScene;
                    let subScene;
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Creating Scene : " + factory.scenename + " : Class : " + factory.classname);
                    tarScene = CUtil_38.CUtil.instantiateThermiteObject(factory.ownermodule, factory.classname);
                    tarScene.factory = factory;
                    tarScene.name = factory.scenename;
                    tarScene.sceneName = factory.scenename;
                    tarScene.sceneLogName = factory.scenename + "_" + factory.iteration;
                    tarScene.hostModule = factory.hostmodule;
                    tarScene.ownerModule = factory.ownermodule;
                    tarScene.classPath = factory.classname;
                    tarScene.isAnchor = factory.isAnchor;
                    tarScene.copyOf = factory.copyOf;
                    tarScene.navigator = this.tutorDoc.tutorNavigator;
                    tarScene.tutorDoc = this.tutorDoc;
                    tarScene.tutorAutoObj = this.tutorAutoObj;
                    tarScene.visible = false;
                    try {
                        CUtil_38.CUtil.mixinCodeSuppliments(tarScene, EFTut_Suppl[factory.hostmodule][CONST_10.CONST.COMMON_CODE], CONST_10.CONST.EXT_SIG);
                    }
                    catch (err) {
                        console.log("Error: missing $Common mixin");
                    }
                    try {
                        CUtil_38.CUtil.mixinCodeSuppliments(tarScene, EFTut_Suppl[factory.hostmodule][factory.scenename], CONST_10.CONST.EXT_SIG);
                    }
                    catch (err) {
                        console.log("Error: missing Scene mixin");
                    }
                    CUtil_38.CUtil.initSceneTick(tarScene);
                    this.addChild(tarScene);
                    tarScene.connectSceneGraph(factory.hostmodule, factory.scenename);
                    tarScene.stop();
                    if (factory.visible) {
                        this[factory.scenename] = tarScene;
                        tarScene.visible = true;
                    }
                    this.automateScene(factory.scenename, tarScene);
                    tarScene.addEventListener("Start", this.questionStart);
                    tarScene.addEventListener("Done", this.questionComplete);
                    tarScene.addEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVBACK, this.goBackScene);
                    tarScene.addEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVNEXT, this.goNextScene);
                    tarScene.addEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVTO, this.goToScene);
                    for (i1 = 0; i1 < tarScene.numChildren; i1++) {
                        subScene = tarScene.getChildAt(i1);
                        if (subScene instanceof MovieClip)
                            subScene.gotoAndStop(0);
                    }
                    return tarScene;
                }
                destroyScene(sceneName) {
                    let sceneObj = this.getChildByName(sceneName);
                    let wozObj;
                    if (sceneObj != null) {
                        sceneObj.removeEventListener("Start", this.questionStart);
                        sceneObj.removeEventListener("Done", this.questionComplete);
                        sceneObj.removeEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVBACK, this.goBackScene);
                        sceneObj.removeEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVNEXT, this.goNextScene);
                        sceneObj.removeEventListener(CEFNavEvent_1.CEFNavEvent.WOZNAVTO, this.goToScene);
                        if (sceneObj instanceof TObject_8.TObject) {
                            wozObj = sceneObj;
                            wozObj.Destructor();
                        }
                        this.removeChild(sceneObj);
                    }
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Destroying Scene : " + sceneName);
                    if (this.hasOwnProperty(sceneName)) {
                        this[sceneName] = null;
                        if (this.tutorAutoObj.hasOwnProperty(sceneName)) {
                            this.tutorAutoObj[sceneName]._instance = null;
                            delete this.tutorAutoObj[sceneName];
                        }
                    }
                }
                automateScene(sceneName, sceneObj, nameObj = true) {
                    this[sceneName] = sceneObj;
                    if (nameObj)
                        this[sceneName].name = sceneName;
                    this.tutorAutoObj[sceneName] = {};
                    this.tutorAutoObj[sceneName]._instance = sceneObj;
                    sceneObj.initAutomation(sceneObj, this.tutorAutoObj[sceneName], "", this.tutorDoc.log, this);
                    sceneObj.captureDefState(this.tutorAutoObj[sceneName]);
                    sceneObj.restoreDefState(this.tutorAutoObj[sceneName]);
                }
                wozReplay() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" wozReplay : ", this.playing.length);
                    this.wozStopPlay();
                    dispatchEvent(new Event(CONST_10.CONST.EF_CANCEL));
                    dispatchEvent(new Event(CONST_10.CONST.EF_REPLAY));
                }
                wozStopPlay() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" wozStopPlay : ", this.playing.length);
                    let tCount = this.playing.length;
                    for (let i1 = 0; i1 < tCount; i1++) {
                        this.playing.pop();
                    }
                }
                wozPause() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" wozPause : ", this.playing.length);
                    this.isPaused = true;
                    this.dispatchEvent(new Event(CONST_10.CONST.EF_PAUSING));
                    for (let i1 = 0; i1 < this.playing.length; i1++) {
                    }
                }
                wozPlay() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" wozPlay : ", this.playing.length);
                    this.isPaused = false;
                    this.dispatchEvent(new Event(CONST_10.CONST.EF_PLAYING));
                    for (let i1 = 0; i1 < this.playing.length; i1++) {
                    }
                }
                playRemoveThis(wozObj) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" playRemoveThis : ", wozObj.name, this.playing.length);
                    for (let i1 = 0; i1 < this.playing.length; i1++) {
                        if (this.playing[i1] == wozObj) {
                            this.tutorDoc.incStateID();
                            this.playing.splice(i1, 1);
                            break;
                        }
                    }
                }
                playAddThis(wozObj) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace(" playAddThis : ", wozObj.name, this.playing.length);
                    let fAdd = true;
                    for (let i1 = 0; i1 < this.playing.length; i1++) {
                        if (this.playing[i1] == wozObj) {
                            fAdd = false;
                            break;
                        }
                    }
                    if (fAdd)
                        this.playing.push(wozObj);
                }
                showPPlay(fShow) {
                }
                showReplay(fShow) {
                }
                setCursor(sMode) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("switching mouse ownership");
                    if (this.cCursor) {
                        this.cCursor.initWOZCursor(sMode);
                    }
                }
                replaceCursor() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Creating Mouse Pointer");
                    if (!this.cCursor) {
                        this.cCursor = new TCursorProxy_1.TCursorProxy;
                        this.cCursor.visible = false;
                        this.addChild(this.cCursor);
                    }
                    this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZLIVE);
                    this.cCursor.show(false);
                }
                initAutomation() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Init Automation:");
                    if (this.xitions)
                        this.xitions.connectToTutor(this, this.tutorAutoObj);
                }
                captureDefState(Tutor) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** Start Capture - Walking Scenes***");
                    for (let scene in Tutor) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("\tSCENE : " + scene);
                        if (scene != "_instance" && Tutor[scene]._instance instanceof TSceneBase_2.TSceneBase) {
                            Tutor[scene]._instance.captureDefState(Tutor[scene]);
                        }
                    }
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** End Capture - Walking Scenes***");
                }
                restoreDefState(Tutor) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** Start Restore - Walking Scenes***");
                    for (let scene in Tutor) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("\tSCENE : " + scene);
                        if (scene != "_instance" && Tutor[scene]._instance instanceof TSceneBase_2.TSceneBase) {
                            if (this.traceMode)
                                CUtil_38.CUtil.trace("reseting: " + scene);
                            Tutor[scene]._instance.restoreDefState(Tutor[scene]);
                        }
                    }
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** End Restore - Walking Scenes***");
                }
                doPlayBack(pbSource) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** Start - Playback Stream ***");
                    this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZREPLAY);
                    this.cCursor.setCursorStyle("Sautomate");
                    this.cCursor.setTopMost();
                    this.cCursor.show(true);
                    this.cCursor.initPlayBack();
                    this.stateStack.push(this.baseTime);
                    this.stateStack.push(this.tutorDoc.stateID);
                    this.stateStack.push(this.tutorDoc.frameID);
                    this.stateStack.push(this.tutorDoc.log.fLogging);
                    this.tutorDoc.log.fLogging = CONST_10.CONST.RECLOGNONE;
                    this.tutorDoc.log.setPlayBackSource(pbSource);
                    if (pbSource[0].version == "1") {
                        this.tutorDoc.log.normalizePlayBackTime();
                        this.baseTime = CUtil_38.CUtil.getTimer();
                        addEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByTime);
                        if (this.tutorDoc.fDemo) {
                            this.stage.addEventListener(CEFKeyboardEvent_1.CEFKeyboardEvent.KEY_UP, this.abortPlayBack);
                            this.stage.addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.abortPlayBack2);
                        }
                    }
                    else if (pbSource[0].version == "2") {
                        this.tutorDoc.log.normalizePlayBack();
                        this.tutorDoc.connectFrameCounter(false);
                        addEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByFrame);
                    }
                }
                replayStream(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** Start - Replay Stream ***");
                    this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZREPLAY);
                    this.cCursor.show(true);
                    this.cCursor.initPlayBack();
                    this.restoreDefState(this.tutorAutoObj);
                    this.stateStack.push(this.baseTime);
                    this.stateStack.push(this.tutorDoc.stateID);
                    this.stateStack.push(this.tutorDoc.frameID);
                    this.stateStack.push(this.tutorDoc.log.fLogging);
                    this.tutorDoc.log.fLogging = CONST_10.CONST.RECLOGNONE;
                    this.tutorDoc.log.setPlayBackSource(null);
                    this.tutorDoc.log.normalizePlayBack();
                    this.tutorDoc.connectFrameCounter(false);
                    this.SnavPanel.goToScene("Sscene0");
                    addEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByFrame);
                }
                replayLiveStream() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\t*** Start - Replay Live Stream ***");
                    this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZREPLAY);
                    this.cCursor.setCursorStyle("Sautomate");
                    this.cCursor.setTopMost();
                    this.cCursor.show(true);
                    this.cCursor.initPlayBack();
                    this.restoreDefState(this.tutorAutoObj);
                    this.stateStack.push(this.baseTime);
                    this.stateStack.push(this.tutorDoc.stateID);
                    this.stateStack.push(this.tutorDoc.frameID);
                    this.stateStack.push(this.tutorDoc.log.fLogging);
                    this.tutorDoc.log.fLogging = CONST_10.CONST.RECLOGNONE;
                    this.tutorDoc.log.setPlayBackSource(null);
                    this.tutorDoc.log.normalizePlayBack();
                    this.tutorDoc.connectFrameCounter(false);
                    this.SnavPanel.goToScene("SstartSplash");
                    addEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByFrame);
                }
                abortPlayBack(evt) {
                    this.tutorDoc.log.setPlayBackDone(true);
                    dispatchEvent(new Event("interruptPlayBack"));
                }
                abortPlayBack2(evt) {
                    this.tutorDoc.log.setPlayBackDone(true);
                    dispatchEvent(new Event("interruptPlayBack"));
                }
                playBackByFrame(evt) {
                    let wozEvt = null;
                    let nextEventState;
                    if (this.tutorDoc.log.playBackDone()) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("-- Playback Completed -- ");
                        removeEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByFrame);
                        this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZLIVE);
                        this.cCursor.setCursorStyle("Sstandard");
                        this.cCursor.show(false);
                        dispatchEvent(new Event("endPlayBack"));
                        this.tutorDoc.log.fLogging = this.stateStack.pop();
                        this.tutorDoc.frameID = this.stateStack.pop();
                        this.tutorDoc.stateID = this.stateStack.pop();
                        this.baseTime = this.stateStack.pop();
                        this.tutorDoc.connectFrameCounter(true);
                    }
                    else {
                        nextEventState = this.tutorDoc.log.getNextEventState();
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("this.tutorDoc.stateID: " + this.tutorDoc.stateID + "  - nextEventState:" + nextEventState);
                        {
                            do {
                                wozEvt = this.tutorDoc.log.getNextEvent(this.tutorDoc.stateID, this.tutorDoc.frameID);
                                if (wozEvt != null) {
                                    if (this.traceMode)
                                        CUtil_38.CUtil.trace("-- Executing Frame:" + this.tutorDoc.frameID + " -- EVT -- " + wozEvt);
                                    this.cCursor.playBackAction(wozEvt);
                                }
                            } while (wozEvt != null);
                            this.tutorDoc.incFrameID();
                        }
                    }
                }
                playBackByTime(evt) {
                    let frameTime = CUtil_38.CUtil.getTimer() - this.baseTime;
                    let wozEvt;
                    do {
                        wozEvt = this.tutorDoc.log.getActionEvent(frameTime);
                        if (wozEvt != null) {
                            this.cCursor.playBackAction(wozEvt);
                            if (this.traceMode)
                                CUtil_38.CUtil.trace("-- Executing Frame:" + frameTime + " -- EVT -- " + wozEvt);
                        }
                    } while (wozEvt != null);
                    wozEvt = this.tutorDoc.log.getMoveEvent(frameTime);
                    if (wozEvt != null)
                        this.cCursor.playBackMove(wozEvt, frameTime);
                    if (this.tutorDoc.log.playBackDone()) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("-- Playback Completed -- ");
                        removeEventListener(CEFEvent_11.CEFEvent.ENTER_FRAME, this.playBackByTime);
                        this.cCursor.initWOZCursor(TCursorProxy_1.TCursorProxy.WOZLIVE);
                        this.cCursor.setCursorStyle("Sstandard");
                        this.cCursor.show(false);
                        dispatchEvent(new Event("endPlayBack"));
                        this.tutorDoc.log.fLogging = this.stateStack.pop();
                        this.tutorDoc.frameID = this.stateStack.pop();
                        this.tutorDoc.stateID = this.stateStack.pop();
                        this.baseTime = this.stateStack.pop();
                        this.tutorDoc.connectFrameCounter(true);
                        if (this.tutorDoc.fDemo) {
                            this.stage.removeEventListener(CEFKeyboardEvent_1.CEFKeyboardEvent.KEY_UP, this.abortPlayBack);
                            this.stage.removeEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.abortPlayBack2);
                        }
                    }
                }
                dumpScenes(Tutor) {
                    for (let scene in Tutor) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("\tSCENE : " + scene);
                        if (scene != "_instance" && Tutor[scene]._instance instanceof TObject_8.TObject) {
                            if (this.traceMode)
                                CUtil_38.CUtil.trace("\tCEF***");
                            Tutor[scene]._instance.dumpSceneObjs(Tutor[scene]);
                        }
                    }
                }
                enumScenes() {
                    let sceneObj;
                    for (let i1 = 0; i1 < this.numChildren; i1++) {
                        sceneObj = this.getChildAt(i1);
                        CUtil_38.CUtil.trace(sceneObj.name + " is visible : " + ((sceneObj.visible) ? " true" : " false"));
                    }
                }
                enumChildren(scene, indentCnt) {
                    let sceneObj;
                    let indent = "";
                    for (let i2 = 0; i2 < indentCnt; i2++)
                        indent += "\t";
                    for (let i1 = 0; i1 < scene.numChildren; i1++) {
                        sceneObj = scene.getChildAt(i1);
                        CUtil_38.CUtil.trace(indent + sceneObj.name + " is visible : " + ((sceneObj.visible) ? " true" : " false") + " -alpha : " + sceneObj.alpha.toString() + "- x : " + sceneObj.x.toString() + " -y : " + sceneObj.y.toString() + " -width : " + sceneObj.width.toString() + " -height : " + sceneObj.height.toString());
                        if (sceneObj instanceof DisplayObjectContainer)
                            this.enumChildren(sceneObj, indentCnt + 1);
                    }
                }
                showNext(fshow) {
                }
                enableNext(fEnable) {
                }
                enableBack(fEnable) {
                }
                questionStart(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Start of Question: ");
                }
                questionComplete(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Question Complete: ");
                }
                goBackScene(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Force Decrement Question: ");
                    this.SnavPanel.onButtonPrev(null);
                }
                goNextScene(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Force Increment Question: ");
                    this.SnavPanel.gotoNextScene();
                }
                goToScene(evt) {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("Force Increment Question: ");
                    this.SnavPanel.goToScene(evt.wozNavTarget);
                }
                dumpTutors() {
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("\n*** Start root dump ALL tutors ***");
                    for (let tutor of this.tutorAutoObj) {
                        if (this.traceMode)
                            CUtil_38.CUtil.trace("TUTOR : " + tutor);
                        if (this.tutorAutoObj[tutor]._instance instanceof TTutorContainer) {
                            if (this.traceMode)
                                CUtil_38.CUtil.trace("CEF***");
                            this.tutorAutoObj[tutor]._instance.dumpScenes(this.tutorAutoObj[tutor]);
                        }
                    }
                    if (this.traceMode)
                        CUtil_38.CUtil.trace("*** End root dump tutor structure ***");
                }
            };
            exports_67("TTutorContainer", TTutorContainer);
        }
    };
});
System.register("scenegraph/CSceneTrack", ["core/CEFTimer", "events/CEFSceneCueEvent", "scenegraph/CSceneChoiceSet", "util/CONST", "util/CUtil"], function (exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var CEFTimer_3, CEFSceneCueEvent_1, CSceneChoiceSet_1, CONST_11, EventDispatcher, CUtil_39, CSceneTrack;
    return {
        setters: [
            function (CEFTimer_3_1) {
                CEFTimer_3 = CEFTimer_3_1;
            },
            function (CEFSceneCueEvent_1_1) {
                CEFSceneCueEvent_1 = CEFSceneCueEvent_1_1;
            },
            function (CSceneChoiceSet_1_1) {
                CSceneChoiceSet_1 = CSceneChoiceSet_1_1;
            },
            function (CONST_11_1) {
                CONST_11 = CONST_11_1;
            },
            function (CUtil_39_1) {
                CUtil_39 = CUtil_39_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CSceneTrack = class CSceneTrack extends EventDispatcher {
                constructor(_tutorDoc, factory, parent) {
                    super();
                    this._chosen = false;
                    this.segNdx = 0;
                    this.trackLoaded = false;
                    this.hasAudio = false;
                    this.isPlaying = false;
                    this.isPaused = false;
                    this.RX_DELIMITERS = /[_|]/g;
                    this.RX_SSML = /<[^>]*>([^<]*)/g;
                    this.RX_DOT = /(\.[\s+\r+])/g;
                    this.assetPath = "";
                    this.newSounds = [];
                    this.tutorDoc = _tutorDoc;
                    this._parent = parent;
                    this.hostScene = parent.sceneInstance;
                    this.sceneName = this.hostScene.name;
                    this.hostModule = this.hostScene.hostModule;
                    this.ownerModule = this.hostScene.ownerModule;
                    this.language = this.tutorDoc.language;
                    this.voice = this.tutorDoc.voice;
                    if (factory.choiceset != undefined) {
                        this._type = CONST_11.CONST.SCENE_CHOICESET;
                        this._name = factory.choiceset;
                        this._choiceset = CSceneChoiceSet_1.CSceneChoiceSet.factory(_tutorDoc, this._parent, factory.choiceset, this._parent._graphFactory.CChoiceSets[factory.choiceset]);
                    }
                    else if (factory.trackname != undefined) {
                        this._type = CONST_11.CONST.SCENE_TRACK;
                        this._name = factory.trackname;
                        this._trackname = factory.trackname;
                    }
                    else if (factory.actionname != undefined) {
                        this._type = CONST_11.CONST.SCENE_ACTION;
                        this._name = factory.actionname;
                        this._actionname = factory.actionname;
                    }
                    if (factory.enqueue === false) {
                        console.log("rtest");
                    }
                    this._enqueue = typeof factory.enqueue == "undefined" ? true : factory.enqueue;
                    this._autostep = factory.autostep || false;
                    this._stepdelay = factory.stepdelay || 0.0;
                    this._odds = factory.odds;
                    this._features = factory.features || "";
                    this._isgroup = factory.isgroup || false;
                    if (factory.$P != undefined) {
                        this._pid = factory.pid;
                        this._prob = factory.$P.split('|');
                        this._cycle = Number(factory.cycle);
                    }
                }
                resolve() {
                    let sceneTrack = null;
                    switch (this._type) {
                        case CONST_11.CONST.SCENE_ACTION:
                            sceneTrack = this;
                            break;
                        case CONST_11.CONST.SCENE_TRACK:
                            sceneTrack = this;
                            this.registerTrack();
                            break;
                        case CONST_11.CONST.SCENE_CHOICESET:
                            sceneTrack = this._choiceset.choose();
                            sceneTrack.resolve();
                            break;
                    }
                    return sceneTrack;
                }
                get isHistoric() {
                    return this._enqueue;
                }
                get isGroup() {
                    return this._isgroup;
                }
                get isAutoStep() {
                    return this._autostep;
                }
                resolveSegmentKey(selector, templateRef) {
                    if (templateRef) {
                        let ontologyRef = templateRef[selector] || templateRef["*"];
                        if (!ontologyRef) {
                            if (selector.includes("?"))
                                console.error("SCENETRACK: ERROR: missing Template Reference for:" + selector);
                        }
                        else {
                            this._ontologyRef = this.hostScene.resolveRawSelector(ontologyRef, null);
                            if (!this._ontologyRef) {
                                console.error("SCENETRACK: Error: missing Ontology Value:" + ontologyRef);
                            }
                        }
                    }
                    this.hostScene.resolveRawSelector(selector, this._ontologyRef);
                    return this.hostScene.ontologyPath;
                }
                registerTrack() {
                    createjs.Sound.removeAllSounds();
                    this.assetPath = [this.hostModule] + CONST_11.CONST.TRACKASSETS_FILEPATH + this.language + "/";
                    this.newSounds = [];
                    let segvalue;
                    let SSML = "";
                    let TrackID = CUtil_39.CUtil.getTimer().toString();
                    this.segSequence = [];
                    try {
                        Object.assign(this, this.tutorDoc.moduleData[this.hostModule][CONST_11.CONST.TRACK_DATA][this.sceneName].tracks[this._trackname][this.language]);
                        for (let segment of this.segments) {
                            let selector = segment.templateVar;
                            let selectorType = CONST_11.CONST.TRACK_SELECTOR;
                            switch (selector) {
                                case CONST_11.CONST.NOVAR:
                                    segvalue = segment[selector];
                                    SSML += segvalue.SSML + " ";
                                    segvalue.filepath = this.sceneName + "/" + this._trackname + CONST_11.CONST.SEGMENT_PREFIX + segvalue.fileid + CONST_11.CONST.VOICE_PREFIX + this.voice + CONST_11.CONST.TYPE_MP3;
                                    break;
                                default:
                                    this._ontologyPath = this.resolveSegmentKey(selector, this.templateRef);
                                    let selectorTag = this._ontologyPath.replace(this.RX_DELIMITERS, "");
                                    segvalue = segment[selectorTag];
                                    SSML += segvalue.SSML + " ";
                                    if (segvalue) {
                                        segvalue.filepath = CONST_11.CONST.COMMONAUDIO + selectorTag + CONST_11.CONST.VOICE_PREFIX + this.voice + CONST_11.CONST.TYPE_MP3;
                                    }
                                    else {
                                        console.log("ERROR: Missing ontology selector TAG: " + selectorTag);
                                    }
                                    break;
                            }
                            console.log("SCENEGRAPH: Loading: " + this._trackname + segvalue.fileid + " => " + segvalue.SSML);
                            this.newSounds.push({ src: segvalue.filepath, id: segvalue.fileid });
                            this.segSequence.push(segvalue);
                        }
                        if (this.newSounds.length > 0) {
                            if (EFLoadManager.nativeSpeech) {
                                var noTags = SSML.replace(this.RX_SSML, '$1');
                                noTags = noTags.replace(this.RX_DOT, '$1\n ');
                                EFLoadManager.nativeSpeech.registerSpeech(noTags, TrackID);
                                this.hasAudio = true;
                                this.trackLoaded = true;
                            }
                            else if (EFLoadManager.nativeAudio) {
                                EFLoadManager.nativeAudio.clearAllSounds();
                                this.newSounds.forEach(sound => {
                                    EFLoadManager.nativeAudio.registerSounds(sound.src, sound.id, this.assetPath);
                                });
                                this.hasAudio = true;
                                this.trackLoaded = true;
                            }
                            else {
                                this._soundCount = this.newSounds.length;
                                createjs.Sound.on("fileload", this.onTrackLoaded, this);
                                createjs.Sound.registerSounds(this.newSounds, this.assetPath);
                                this.hasAudio = true;
                                this.trackLoaded = false;
                            }
                        }
                    }
                    catch (err) {
                        console.error("SCENETRACK: ERROR: " + err);
                    }
                }
                onTrackLoaded(event) {
                    this._soundCount--;
                    console.log("SCENETRACK: Segment Loaded: " + event.id + ": " + event.src);
                    if (!this._soundCount) {
                        this.trackLoaded = true;
                        console.log("SCENETRACK: Track Loaded: ");
                    }
                }
                playTrack() {
                    if (this.isPlaying) {
                        let segment = this.segSequence[this.segNdx];
                        if (this.trackLoaded) {
                            if (this._asyncPlayTimer) {
                                this._asyncPlayTimer.stop();
                                this._asyncPlayTimer.off(CONST_11.CONST.TIMER, this._playHandler);
                                this._asyncPlayTimer = null;
                                console.log("SCENEGRAPH: Async Play: " + this._trackname + segment.fileid + " => " + segment.SSML);
                            }
                            else {
                                console.log("SCENEGRAPH: Loaded Play: " + this._trackname + segment.fileid + " => " + segment.SSML);
                            }
                            if (EFLoadManager.nativeSpeech) {
                                EFLoadManager.trackOwner = this;
                                EFLoadManager.trackEvent = this.speechComplete;
                                EFLoadManager.nativeSpeech.playTrack();
                            }
                            else if (EFLoadManager.nativeAudio) {
                                EFLoadManager.nativeAudio.play(segment.fileid);
                                EFLoadManager.trackOwner = this;
                                EFLoadManager.trackEvent = this.segmentComplete;
                            }
                            else {
                                var props = new createjs.PlayPropsConfig().set({ interrupt: createjs.Sound.INTERRUPT_ANY, volume: segment.volume });
                                this.trackAudio = this.segSequence[this.segNdx].track = createjs.Sound.play(segment.fileid, props);
                                if (this.trackAudio.playState === CONST_11.CONST.PLAY_FAILED) {
                                    console.log("SCENEGRAPH: Play Failed: " + this._trackname + segment.fileid + " => " + segment.SSML);
                                    alert("Track Play Failed: " + this._trackname + segment.fileid + " => " + segment.SSML);
                                }
                                if (segment.trim) {
                                    this._asyncTrimTimer = new CEFTimer_3.CEFTimer(segment.duration + segment.trim);
                                    this._trimHandler = this._asyncTrimTimer.on(CONST_11.CONST.TIMER, this.segmentComplete, this);
                                    this._asyncTrimTimer.start();
                                }
                                else {
                                    this.trackAudio.on("complete", this.segmentComplete, this);
                                }
                            }
                            this.hostScene.$cuePoints(this._name, CONST_11.CONST.START_CUEPOINT);
                            this.hostScene.$updateNav();
                            this.setCuePoints(segment);
                        }
                        else {
                            if (!this._asyncPlayTimer) {
                                this._asyncPlayTimer = new CEFTimer_3.CEFTimer(0);
                                this._playHandler = this._asyncPlayTimer.on(CONST_11.CONST.TIMER, this.playTrack, this);
                                this._asyncPlayTimer.start();
                            }
                        }
                    }
                }
                setCuePoints(segment) {
                    this._cueTimers = new Array();
                    for (let cue of segment.cues) {
                        console.log("SCENETRACK: Configure cue: " + cue.name);
                        this._cueTimers.push(CEFTimer_3.CEFTimer.startTimer(cue.relTime, this.cueHandler, this, new CustomEvent(CEFSceneCueEvent_1.CEFSceneCueEvent.CUEPOINT, { detail: { id: cue.name, track: this._name } })));
                    }
                }
                cueHandler(evt, _timer) {
                    this.dispatchEvent(evt);
                    _timer.stop();
                    let index = this._cueTimers.indexOf(_timer);
                    this._cueTimers.splice(index, 1);
                }
                ensureFireCues() {
                    if (this._cueTimers) {
                        this._cueTimers.forEach(timer => {
                            timer.stop();
                        });
                        this._cueTimers.forEach(timer => {
                            this.dispatchEvent(timer.publicEvent);
                            let index = this._cueTimers.indexOf(timer);
                            this._cueTimers.splice(index, 1);
                        });
                    }
                }
                segmentComplete(event) {
                    if (this._asyncTrimTimer) {
                        this._asyncTrimTimer.stop();
                        this._asyncTrimTimer.off(CONST_11.CONST.TIMER, this._trimHandler);
                        this._asyncTrimTimer = null;
                        console.log("SCENETRACK: Async Track Segment Completion: " + this._name);
                    }
                    else {
                        console.log("SCENETRACK: Normal Track Segment Completion: " + this._name);
                    }
                    this.segNdx++;
                    if (this.segNdx < this.segSequence.length) {
                        this.playTrack();
                    }
                    else {
                        this.segNdx = 0;
                        this.speechComplete(null);
                    }
                }
                speechComplete(event) {
                    this.hostScene.$cuePoints(this._name, CONST_11.CONST.END_CUEPOINT);
                    this.hostScene.$updateNav();
                    this.autoStep();
                }
                autoStep() {
                    if (this._autostep) {
                        if (this._stepdelay && this._stepdelay > 0) {
                            this._autoPlayTimer = new CEFTimer_3.CEFTimer(this._stepdelay);
                            this._autoPlayHandler = this._autoPlayTimer.on(CONST_11.CONST.TIMER, this._asyncAutoPlay, this);
                            this._autoPlayTimer.start();
                        }
                        else
                            this.hostScene.nextTrack("$autoPlay");
                    }
                }
                _asyncAutoPlay(evt) {
                    this.killAutoPlayTimer();
                    this.hostScene.nextTrack("$asyncAutoPlay");
                }
                killAutoPlayTimer() {
                    if (this._autoPlayTimer) {
                        this._autoPlayTimer.stop();
                        this._autoPlayTimer.off(CONST_11.CONST.TIMER, this._autoPlayHandler);
                        this._autoPlayTimer = null;
                    }
                }
                play() {
                    this.killAutoPlayTimer();
                    switch (this._type) {
                        case CONST_11.CONST.SCENE_ACTION:
                            this.hostScene.$nodeAction(this._actionname);
                            this.hostScene.$updateNav();
                            this.autoStep();
                            break;
                        case CONST_11.CONST.SCENE_TRACK:
                            if (!this.isPlaying) {
                                if (this.hasAudio) {
                                    this.isPaused = false;
                                    this.isPlaying = true;
                                    this.playTrack();
                                }
                                else {
                                    console.log("SCENETRACK: Null audio track:)");
                                    this.autoStep();
                                }
                            }
                            break;
                        case CONST_11.CONST.SCENE_CHOICESET:
                            break;
                    }
                }
                pause() {
                    this.isPlaying = false;
                    this.isPaused = true;
                    this.trackAudio.paused = true;
                }
                stop() {
                    this.isPlaying = false;
                    createjs.Sound.stop();
                    this.killAutoPlayTimer();
                }
                gotoAndStop(time) {
                }
                bindPlay(container) {
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playAddThis(this);
                    this.play();
                }
                get trackID() {
                    return this._name;
                }
                testPFeature() {
                    let iter = this._parent.queryPFeature(this._pid, this._prob.length, this._cycle);
                    let rand = Math.random();
                    return (rand < this._prob[iter]);
                }
                get hasPFeature() {
                    return (this._pid != null);
                }
                get type() {
                    return this._type;
                }
                set features(newFTR) {
                    this._features = newFTR;
                }
                get features() {
                    return this._features;
                }
                get trackName() {
                    return this._trackname;
                }
                get actionName() {
                    return this._actionname;
                }
                getOdds(ndx) {
                    let result;
                    if (this._chosen)
                        result = 0;
                    else
                        result = this._odds[ndx];
                    return result;
                }
                get count() {
                    return this._odds.length;
                }
                replace() {
                    this._chosen = false;
                }
                choose() {
                    this._chosen = true;
                }
            };
            CSceneTrack.lastLoaded = "";
            exports_68("CSceneTrack", CSceneTrack);
        }
    };
});
System.register("thermite/TScene", ["thermite/TSceneBase", "core/CEFTimer", "scenegraph/CSceneGraph", "scenegraph/CSceneHistory", "events/CEFSceneCueEvent", "events/CEFEvent", "util/CUtil", "util/CONST"], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var TSceneBase_3, CEFTimer_4, CSceneGraph_1, CSceneHistory_1, CEFSceneCueEvent_2, CEFEvent_12, CUtil_40, CONST_12, TScene;
    return {
        setters: [
            function (TSceneBase_3_1) {
                TSceneBase_3 = TSceneBase_3_1;
            },
            function (CEFTimer_4_1) {
                CEFTimer_4 = CEFTimer_4_1;
            },
            function (CSceneGraph_1_1) {
                CSceneGraph_1 = CSceneGraph_1_1;
            },
            function (CSceneHistory_1_1) {
                CSceneHistory_1 = CSceneHistory_1_1;
            },
            function (CEFSceneCueEvent_2_1) {
                CEFSceneCueEvent_2 = CEFSceneCueEvent_2_1;
            },
            function (CEFEvent_12_1) {
                CEFEvent_12 = CEFEvent_12_1;
            },
            function (CUtil_40_1) {
                CUtil_40 = CUtil_40_1;
            },
            function (CONST_12_1) {
                CONST_12 = CONST_12_1;
            }
        ],
        execute: function () {
            TScene = class TScene extends TSceneBase_3.TSceneBase {
                constructor() {
                    super();
                    this._interval = TScene.DEFAULT_MONITOR_INTERVAL;
                    this.cueListener = null;
                    this.ktUpdated = false;
                    this.sceneGraph = null;
                    this.init4();
                }
                TSceneInitialize() {
                    this.TSceneBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.TSceneBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    this._asyncPlayTimer = new CEFTimer_4.CEFTimer(0);
                    this._asyncGraphTimer = new CEFTimer_4.CEFTimer(0);
                    this._history = new CSceneHistory_1.CSceneHistory(this.tutorDoc);
                    this._deferPlay = false;
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("TScene:Constructor");
                }
                Destructor() {
                    this.disConnectTrack(this.STrack);
                    this._asyncPlayTimer.off("timer", this._playHandler);
                    this._asyncGraphTimer.off("timer", this._trackHandler);
                    super.Destructor();
                }
                trackPlay() {
                    this._playHandler = this._asyncPlayTimer.on(CONST_12.CONST.TIMER, this._asyncPlayTrack, this);
                    this._asyncPlayTimer.start();
                }
                _asyncPlayTrack(evt) {
                    this._asyncPlayTimer.stop();
                    this._asyncPlayTimer.off(CONST_12.CONST.TIMER, this._playHandler);
                    this._asyncPlayTimer.reset();
                    if (this.STrack)
                        this.STrack.play();
                }
                connectTrack(track) {
                    CUtil_40.CUtil.trace("Connect Audio Cue Behaviors");
                    this.cueListener = track.on(CEFSceneCueEvent_2.CEFSceneCueEvent.CUEPOINT, this.doSceneCue, this);
                }
                disConnectTrack(track) {
                    CUtil_40.CUtil.trace("Disconnect Audio Cue Behaviors");
                    if (track) {
                        track.stop();
                        track.ensureFireCues();
                        track.off(CEFSceneCueEvent_2.CEFSceneCueEvent.CUEPOINT, this.cueListener);
                    }
                }
                nextScene(event) {
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("navNext: " + event);
                    this.navigator.gotoNextScene("$scriptAction");
                }
                doSceneCue(evt) {
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("SceneCue: " + evt.detail.id + " - track: " + evt.detail.track);
                    this.$cuePoints(evt.detail.track, evt.detail.id);
                    this.$updateNav();
                }
                connectSceneGraph(hostModule, sceneName) {
                    try {
                        this.sceneGraph = CSceneGraph_1.CSceneGraph.factory(this.tutorDoc, this, hostModule, sceneName);
                    }
                    catch (err) {
                        console.error("Error: scenegraph connect Failed: " + err);
                    }
                }
                nextTrack(source) {
                    this.changeRequestorTrack = source;
                    this._trackHandler = this._asyncGraphTimer.on(CONST_12.CONST.TIMER, this._asyncNextTrack, this);
                    this._asyncGraphTimer.start();
                }
                _asyncNextTrack(evt) {
                    this._asyncGraphTimer.stop();
                    this._asyncGraphTimer.off(CONST_12.CONST.TIMER, this._trackHandler);
                    this.traceGraphEdge(false);
                }
                traceGraphEdge(bUserNavEvent = false) {
                    let historyNode;
                    let nextTrack;
                    console.log("SCENEGRAPH: state change: " + this.changeRequestorTrack);
                    if (this.sceneGraph != null) {
                        if (this.STrack) {
                            this.disConnectTrack(this.STrack);
                            this.STrack = null;
                        }
                        historyNode = this._history.next();
                        if (historyNode == null) {
                            nextTrack = this.sceneGraph.gotoNextTrack(bUserNavEvent);
                            if (!this.sceneGraph.volatile && nextTrack != null) {
                                this._history.push(this.sceneGraph.node, nextTrack);
                            }
                        }
                        else {
                            nextTrack = this.sceneGraph.seekToTrack(historyNode);
                        }
                        if (nextTrack != null) {
                            this.STrack = nextTrack;
                            this.connectTrack(nextTrack);
                            if (!this._deferPlay)
                                this.STrack.play();
                        }
                        else if (!bUserNavEvent) {
                            this.navigator.gotoNextScene("$endOfTracks");
                        }
                    }
                    return nextTrack;
                }
                traceHistory() {
                    let historyNode;
                    let features;
                    if (this.STrack) {
                        this.disConnectTrack(this.STrack);
                        this.STrack = null;
                    }
                    do {
                        historyNode = this._history.back();
                        if (historyNode != null) {
                            if (!historyNode.track.isHistoric)
                                continue;
                            features = historyNode.track.features;
                            if (features != "") {
                                if (!this.tutorDoc.testFeatureSet(features)) {
                                    continue;
                                }
                            }
                            this.STrack = this.sceneGraph.seekToTrack(historyNode);
                            this.connectTrack(historyNode.track);
                            if (!this._deferPlay)
                                this.STrack.play();
                            break;
                        }
                    } while (historyNode != null);
                    if (!historyNode) {
                        this.STrack = this.sceneGraph.rootTrack;
                        this.connectTrack(this.STrack);
                        this.sceneGraph.resetRoot();
                    }
                    return historyNode;
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    let result;
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("TScene preenter Scene Behavior: " + this.name);
                    result = super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this._deferPlay = true;
                    this.nextTrack("$preEnterScene");
                    return result;
                }
                onEnterScene(Direction) {
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("TScene onenter Scene Behavior:" + this.name);
                    this._deferPlay = false;
                    this.trackPlay();
                    super.onEnterScene(Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    return (super.preExitScene(Direction, sceneCurr));
                }
                onExitScene() {
                    if (this.traceMode)
                        CUtil_40.CUtil.trace("TScene onexit Behavior:" + this.name);
                    this.disConnectTrack(this.STrack);
                    this.STrack = null;
                    this.tutorDoc._sceneData = {};
                    this.updateKT();
                    super.onExitScene();
                }
                enQueueTerminateEvent() {
                    addEventListener(CEFEvent_12.CEFEvent.ENTER_FRAME, this._asyncTerminate);
                }
                _asyncTerminate(e) {
                    removeEventListener(CEFEvent_12.CEFEvent.ENTER_FRAME, this._asyncTerminate);
                    this.tutorDoc.log.logTerminateEvent();
                }
                updateKT() {
                    if (!this.ktUpdated) {
                        this.ktUpdated = true;
                    }
                }
            };
            TScene.DEFAULT_MONITOR_INTERVAL = 3000;
            exports_69("TScene", TScene);
        }
    };
});
System.register("thermite/TRoot", ["util/CONST", "util/CUtil"], function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var CONST_13, CUtil_41, MovieClip, TRoot;
    return {
        setters: [
            function (CONST_13_1) {
                CONST_13 = CONST_13_1;
            },
            function (CUtil_41_1) {
                CUtil_41 = CUtil_41_1;
            }
        ],
        execute: function () {
            MovieClip = createjs.MovieClip;
            TRoot = class TRoot extends MovieClip {
                constructor() {
                    super();
                    this.init0();
                }
                TRootInitialize() {
                    MovieClip.call(this, MovieClip.INDEPENDENT, 0, CONST_13.CONST.MC_NOLOOP, null);
                    this.init0();
                }
                initialize() {
                    MovieClip.call(this);
                    this.init0();
                }
                init0() {
                    this._listenerArr = new Array;
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_41.CUtil.trace("TRoot:Constructor");
                    this.xname = this.nextXname();
                    this.clickBoundListener = this.clickListener.bind(this);
                    this.changeBoundListener = this.changeListener.bind(this);
                    this.completeListener = this.completeListener.bind(this);
                }
                set hostScene(scene) {
                    this._hostScene = scene;
                }
                get hostScene() {
                    return this._hostScene;
                }
                addListener(target, type) {
                    let listener;
                    switch (type) {
                        case "click":
                            listener = this.clickBoundListener;
                            break;
                        case "change":
                            listener = this.changeBoundListener;
                            break;
                    }
                    target.addEventListener(type, listener);
                }
                removeListener(target, type) {
                    let listener;
                    switch (type) {
                        case "click":
                            listener = this.clickBoundListener;
                            break;
                        case "change":
                            listener = this.changeBoundListener;
                            break;
                    }
                    target.removeEventListener(type, listener);
                }
                clickListener(e) {
                }
                changeListener(e) {
                }
                completeListener(e) {
                }
                nextXname() {
                    let Xname = CONST_13.CONST.XNAME_SIG + TRoot.xInstID.toString();
                    TRoot.xInstID++;
                    return Xname;
                }
                Destructor() {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace("TRoot Destructor:");
                    let subObj;
                    for (let i1 = 0; i1 < this.numChildren; i1++) {
                        subObj = this.getChildAt(i1);
                        if (subObj instanceof TRoot) {
                            subObj.Destructor();
                        }
                    }
                }
                testFeatures(features) {
                    let result = false;
                    if (features && features !== "")
                        result = this.tutorDoc.testFeatureSet(features);
                    return result;
                }
                captureXMLStructure(parentXML, iDepth) {
                    let element;
                    let elementOBJ = {};
                    let elClass;
                    let elxname;
                    for (let i1 = 0; i1 < this.numChildren; i1++) {
                        element = this.getChildAt(i1);
                        if (this.traceMode)
                            CUtil_41.CUtil.trace("\t\tCEFScene found subObject named:" + element.name + " ... in-place: ");
                        if (element instanceof TRoot) {
                            elxname = element.xname;
                        }
                        else {
                            elxname = "null";
                        }
                        elementOBJ = new String("<obj " + " class=\"" + elClass + "\" name=\"" + element.name + "\" x=\"" + element.x + "\" y=\"" + element.y + "\" w=\"" + element.width + "\" h=\"" + element.height + "\" r=\"" + element.rotation + "\" a=\"" + element.alpha + "\"/>");
                        if ((iDepth < 1) && (element instanceof TRoot))
                            element.captureXMLStructure(elementOBJ, iDepth + 1);
                    }
                }
                resetXML() {
                }
                saveXML() {
                    let stateVector;
                    return stateVector;
                }
                getSymbolClone(_cloneOf, _named) {
                    let xClone = "";
                    CUtil_41.CUtil.trace(xClone);
                    return xClone;
                }
                logState() {
                    return "<null/>";
                }
                IsUserDefined() {
                    let iResult = 0;
                    return iResult;
                }
                get captureLOGString() {
                    return "";
                }
                captureLOGState() {
                    return "<null />";
                }
                isDefined(prop) {
                    let fResult;
                    try {
                        if (this.hasOwnProperty(prop)) {
                            fResult = true;
                        }
                    }
                    catch (err) {
                        if (this.traceMode)
                            CUtil_41.CUtil.trace(prop + " is Undefined");
                        fResult = false;
                    }
                    return fResult;
                }
                superPlay() {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " Super Play");
                    if (this.name == "SgenericPrompt")
                        CUtil_41.CUtil.trace("SgenericPrompt Play Found in superPlay");
                    super.play();
                }
                superStop() {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " Super Stop");
                    super.stop();
                }
                gotoAndStop(frame) {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " is stopped at : " + frame);
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playRemoveThis(this);
                    super.gotoAndStop(frame);
                }
                stop() {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " is stopped");
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playRemoveThis(this);
                    super.stop();
                }
                gotoAndPlay(frame, scene = null) {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " is playing at : " + frame + ":" + scene);
                    if (this.name == "SgenericPrompt")
                        CUtil_41.CUtil.trace("SgenericPrompt Play Found in gotoAndPlay");
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playAddThis(this);
                    super.gotoAndPlay(frame + ":" + scene);
                }
                play() {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " is playing");
                    if (this.name == "SgenericPrompt")
                        CUtil_41.CUtil.trace("SgenericPrompt Play Found in Play");
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playAddThis(this);
                    super.play();
                }
                bindPlay(tutor) {
                    if (this.traceMode)
                        CUtil_41.CUtil.trace(this.name + " is playing");
                    if (this.name == "SgenericPrompt")
                        CUtil_41.CUtil.trace("SgenericPrompt Play Found in BindPlay");
                    if (this.tutorDoc.tutorContainer)
                        this.tutorDoc.tutorContainer.playAddThis(this);
                    super.play();
                }
                setTopMost() {
                    let topPosition;
                    try {
                        if (this.tutorDoc.tutorContainer) {
                            topPosition = this.tutorDoc.tutorContainer.numChildren - 1;
                            this.tutorDoc.tutorContainer.setChildIndex(this, topPosition);
                        }
                    }
                    catch (err) {
                    }
                }
                startSession() {
                    this.tutorDoc.fSessionTime = CUtil_41.CUtil.getTimer();
                }
                get sessionTime() {
                    let curTime;
                    curTime = (CUtil_41.CUtil.getTimer() - this.tutorDoc.fSessionTime) / 1000.0;
                    return curTime.toString();
                }
                dumpStage(_obj, _path) {
                    let sceneObj;
                    for (let i1 = 0; i1 < _obj.numChildren; i1++) {
                        sceneObj = _obj.getChildAt(i1);
                        if (sceneObj) {
                            CUtil_41.CUtil.trace(_path + "." + sceneObj["name"] + " visible : " + ((sceneObj.visible) ? " true" : " false"));
                            if (sceneObj)
                                this.dumpStage(sceneObj, _path + "." + sceneObj["name"]);
                        }
                    }
                }
                initObjfromHtmlData(objData) {
                }
                resolveReferences(...dataElement) {
                    let objData;
                    dataElement.forEach(datasource => {
                        objData = this.hostScene.resolveSelector(datasource, this._ontologyKey);
                        this.deSerializeObj(objData);
                    });
                }
                resetInitState() {
                    if (this._InitData)
                        this.deSerializeObj(this._InitData);
                }
                initFromDataSource(datasource) {
                    let data = this.hostScene.resolveSelector(datasource, this._ontologyKey);
                    this.deSerializeObj(data);
                }
                setContext(_hostModule, _ownerModule, _hostScene) {
                    this.hostModule = _hostModule;
                    this.ownerModule = _ownerModule;
                    this.hostScene = _hostScene;
                }
                deSerializeObj(objData) {
                    this._InitData = this._InitData || Object.assign({}, objData);
                    if (objData.templateRef)
                        this._templateRef = objData.templateRef;
                    if (objData.layoutsource) {
                        this.resolveReferences(objData.layoutsource);
                    }
                    if (objData.htmlData) {
                        this.initObjfromHtmlData(objData);
                    }
                    if (objData.datasource) {
                        if (Array.isArray(objData.datasource)) {
                            for (let i1 = 0; i1 < objData.datasource.length; i1++) {
                                if (this.tutorDoc.testFeatureSet(objData.datasource[i1].features)) {
                                    this.initFromDataSource(objData.datasource[i1].src);
                                    break;
                                }
                            }
                        }
                        else
                            this.initFromDataSource(objData.datasource);
                    }
                }
            };
            TRoot.xInstID = 1;
            exports_70("TRoot", TRoot);
        }
    };
});
System.register("thermite/TObjectDyno", ["thermite/TRoot", "thermite/TObject", "util/CUtil"], function (exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var TRoot_3, TObject_9, CUtil_42, TObjectDyno;
    return {
        setters: [
            function (TRoot_3_1) {
                TRoot_3 = TRoot_3_1;
            },
            function (TObject_9_1) {
                TObject_9 = TObject_9_1;
            },
            function (CUtil_42_1) {
                CUtil_42 = CUtil_42_1;
            }
        ],
        execute: function () {
            TObjectDyno = class TObjectDyno extends TRoot_3.TRoot {
                constructor() {
                    super();
                }
                TObjectDynoInitialize() {
                    this.TRootInitialize.call(this);
                    this.init1();
                }
                initialize() {
                    this.TRootInitialize.call(this);
                    this.init1();
                }
                init1() {
                }
                initAutomation(_parentScene, sceneObj, ObjIdRef, lLogger, lTutor) {
                    if (this.traceMode)
                        CUtil_42.CUtil.trace("CEFObjectDyno initAutomation:");
                    var subObj;
                    var wozObj;
                    this.objID = ObjIdRef + name;
                    for (var i1 = 0; i1 < this.numChildren; i1++) {
                        subObj = this.getChildAt(i1);
                        if (subObj instanceof TObject_9.TObject || subObj instanceof TObjectDyno) {
                            subObj.parentScene = _parentScene;
                        }
                    }
                }
            };
            exports_71("TObjectDyno", TObjectDyno);
        }
    };
});
System.register("thermite/TSelector", [], function (exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var TSelector;
    return {
        setters: [],
        execute: function () {
            TSelector = class TSelector {
                constructor(host, selectorStr) {
                    this.selectors = selectorStr.split("|");
                    this.regex = [];
                    this.targets = [];
                    for (let i1 = 0; i1 < this.selectors.length; i1++) {
                        let selectorGrp = this.selectors[i1].split(",");
                        if (selectorGrp.length > 1) {
                            let regexGrp = [];
                            for (let i1 = 0; i1 < selectorGrp.length; i1++) {
                                regexGrp.push(new RegExp(selectorGrp[i1]));
                            }
                            this.regex.push(regexGrp);
                        }
                        else {
                            this.regex.push(new RegExp(this.selectors[i1]));
                        }
                    }
                    this.resolveSelectors(host, this.regex);
                }
                testSelector(currRegEx, element) {
                    return currRegEx.test(element);
                }
                resolveSelectors(host, regex) {
                    let currRegEx = regex[0];
                    if (Array.isArray(currRegEx)) {
                        currRegEx.forEach(innerRegEx => {
                            for (let element in host) {
                                if (innerRegEx.test(element)) {
                                    if (regex.length > 1) {
                                        this.resolveSelectors(host[element], regex.slice(1));
                                    }
                                    else {
                                        this.targets.push(host[element]);
                                    }
                                }
                            }
                        });
                    }
                    else
                        for (let element in host) {
                            if (currRegEx.test(element)) {
                                if (regex.length > 1) {
                                    this.resolveSelectors(host[element], regex.slice(1));
                                }
                                else {
                                    this.targets.push(host[element]);
                                }
                            }
                        }
                }
                hide() {
                    this.targets.forEach(component => {
                        if (component.hide instanceof Function) {
                            component.hide();
                        }
                    });
                }
                hideAll() {
                    this.targets.forEach(component => {
                        if (component.hideAll instanceof Function) {
                            component.hideAll();
                        }
                    });
                }
                show() {
                    this.targets.forEach(component => {
                        if (component.show instanceof Function) {
                            component.show();
                        }
                    });
                }
                enable() {
                    this.targets.forEach(component => {
                        if (component.enable instanceof Function) {
                            component.enable(true);
                        }
                    });
                }
                disable() {
                    this.targets.forEach(component => {
                        if (component.enable instanceof Function) {
                            component.enable(false);
                        }
                    });
                }
                play() {
                    this.targets.forEach(component => {
                        if (component.playMC instanceof Function) {
                            component.playMC();
                        }
                    });
                }
                exec(func, ...vars) {
                    this.targets.forEach(component => {
                        if (component[func] instanceof Function) {
                            component[func](vars);
                        }
                    });
                }
            };
            exports_72("TSelector", TSelector);
        }
    };
});
System.register("thermite/events/TEvent", [], function (exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var Event, TEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            TEvent = class TEvent extends Event {
                constructor(type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                }
            };
            exports_73("TEvent", TEvent);
        }
    };
});
System.register("thermite/TObject", ["thermite/TRoot", "thermite/TObjectDyno", "thermite/TSelector", "events/CEFEvent", "util/CONST", "util/CUtil", "thermite/events/TEvent"], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var TRoot_4, TObjectDyno_1, TSelector_1, CEFEvent_13, CONST_14, CUtil_43, Tween, ColorMatrixFilter, BlurFilter, Ease, TEvent_1, TObject;
    return {
        setters: [
            function (TRoot_4_1) {
                TRoot_4 = TRoot_4_1;
            },
            function (TObjectDyno_1_1) {
                TObjectDyno_1 = TObjectDyno_1_1;
            },
            function (TSelector_1_1) {
                TSelector_1 = TSelector_1_1;
            },
            function (CEFEvent_13_1) {
                CEFEvent_13 = CEFEvent_13_1;
            },
            function (CONST_14_1) {
                CONST_14 = CONST_14_1;
            },
            function (CUtil_43_1) {
                CUtil_43 = CUtil_43_1;
            },
            function (TEvent_1_1) {
                TEvent_1 = TEvent_1_1;
            }
        ],
        execute: function () {
            Tween = createjs.Tween;
            ColorMatrixFilter = createjs.ColorMatrixFilter;
            BlurFilter = createjs.BlurFilter;
            Ease = createjs.Ease;
            TObject = class TObject extends TRoot_4.TRoot {
                constructor() {
                    super();
                    this.sAuto = "UNKNOWN";
                    this.satFrames = 8;
                    this.satIncrement = 1 / this.satFrames;
                    this.curSat = 1.0;
                    this.curBlur = 1.0;
                    this.blurFrames = 8;
                    this.blurIncrement = 1 / this.blurFrames;
                    this.curGlow = 1.0;
                    this.glowFrames = 8;
                    this.glowIncrement = 1 / this.glowFrames;
                    this._isvalid = "false";
                    this._ischecked = "false";
                    this._activeFeature = "";
                    this._validFeature = "";
                    this._invalidFeature = "";
                    this._hasClickMask = false;
                    this.init2();
                }
                TObjectInitialize() {
                    this.TRootInitialize.call(this);
                    this.init2();
                }
                initialize() {
                    this.TRootInitialize.call(this);
                    this.init2();
                }
                init2() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("TObject:Constructor");
                    this.tweenID = 1;
                    this.bTweenable = true;
                    this.bSubTweenable = false;
                    this.bPersist = false;
                }
                onCreate() {
                }
                onAddedToStage(evt) {
                }
                Destructor() {
                    this.off(CEFEvent_13.CEFEvent.COMPLETE, this.doAction);
                    super.Destructor();
                }
                get ontologyPath() {
                    return this._ontologyPath;
                }
                addHTMLControls() { }
                playMC() {
                    this.timeline.on(CEFEvent_13.CEFEvent.CHANGE, this.checkMCcomplete, this);
                    this.gotoAndPlay(0);
                }
                checkMCcomplete(evt) {
                    if (this.timeline.position >= this.timeline.duration) {
                        this.timeline.off(CEFEvent_13.CEFEvent.CHANGE, this.checkMCcomplete);
                        this.doAction(new TEvent_1.TEvent("complete"));
                    }
                }
                doAction(evt) {
                    try {
                        if (this.hostScene)
                            this.hostScene.onAction(this.name, evt.type);
                    }
                    catch (e) {
                        CUtil_43.CUtil.trace("Error in onClick script: " + e);
                    }
                }
                set hidden(hide) {
                    if (this._hidden !== hide) {
                        this._hidden = hide;
                        if (this._hidden) {
                            this._shownVisibility = this.visible;
                            this._shownAlpha = this.alpha;
                            this.visible = false;
                            this.alpha = 0;
                        }
                        else {
                            this.visible = this._shownVisibility || this.visible;
                            this.alpha = this._shownAlpha || this.alpha;
                        }
                    }
                }
                get hidden() {
                    return this._hidden;
                }
                hide() {
                    this.hidden = true;
                }
                show() {
                    this.hidden = false;
                }
                set features(newFTR) {
                    this._features = newFTR;
                }
                get features() {
                    return this._features;
                }
                setANDFeature(newFTR) {
                    if (this._features.length != 0)
                        this._features += ",";
                    this._features += newFTR;
                }
                setORFeature(newFTR) {
                    if (this._features.length != 0)
                        this._features += ":";
                    this._features += newFTR;
                }
                unSetFeature(ftr) {
                    let feature;
                    let featArray = new Array;
                    let updatedFTRset = "";
                    if (this._features.length > 0)
                        featArray = this._features.split(":");
                    for (let feature of featArray) {
                        if (feature != ftr) {
                            if (updatedFTRset.length != 0)
                                updatedFTRset += ":";
                            updatedFTRset += ftr;
                        }
                    }
                    this._features = updatedFTRset;
                }
                resolveOntologyKey(selector, templateRef) {
                    if (templateRef) {
                        if (typeof templateRef === 'string') {
                            this._ontologyRef = templateRef;
                        }
                        else {
                            let ontologyRef = templateRef[selector] || templateRef["*"];
                            if (!ontologyRef) {
                                if (selector.includes("?"))
                                    console.error("SELECTOR ERROR: missing Template Reference for:" + selector);
                            }
                            else {
                                this._ontologyRef = this.resolveRawSelector(ontologyRef, null);
                            }
                        }
                        if (this._ontologyRef) {
                            let objSelector = this._ontologyRef.split("|");
                            this._ontologyKey = objSelector[0].split("_");
                        }
                        else {
                            this._ontologyKey = [];
                        }
                    }
                }
                buildObject(hostModule, objectClass, objectName) {
                    let newObject;
                    let maskDim;
                    console.error("Error: Use of incomplete Function");
                    newObject = CUtil_43.CUtil.instantiateThermiteObject(hostModule, objectClass);
                    newObject.name = objectName;
                    newObject.onCreate();
                    this.addChild(newObject);
                    if (newObject._hasClickMask) {
                        maskDim = newObject.globalToLocal(0, 0);
                        newObject.SclickMask.x = maskDim.x;
                        newObject.SclickMask.y = maskDim.y;
                        newObject.SclickMask.graphics.setStrokeStyle(0);
                        newObject.SclickMask.graphics.beginFill(newObject._maskColor);
                        newObject.SclickMask.graphics.drawRect(0, 0, this.tutorDoc.STAGEWIDTH, this.tutorDoc.STAGEHEIGHT);
                        newObject.SclickMask.graphics.endFill();
                    }
                    return newObject;
                }
                buildMask() {
                }
                get activeFeature() {
                    return "";
                }
                set activeFeature(value) {
                }
                clearAllEffects(fHide = true) {
                    this.stopTransitions();
                    removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                    removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.blurTimer);
                    removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.flashTimer);
                    this.filters = null;
                    if (fHide)
                        this.alpha = 0;
                }
                moveChild(tarObj, moveX, moveY, duration = "0.5") {
                    if (moveX != "")
                        this.Running.push(new Tween(this[tarObj]).to({ x: moveX }, Number(duration), Ease.cubicInOut));
                    if (moveY != "")
                        this.Running.push(new Tween(this[tarObj]).to({ y: moveY }, Number(duration), Ease.cubicInOut));
                }
                moveOriginChild(tarObj, regx, regy, duration = "0.5") {
                    if (regx != "")
                        this.Running.push(new Tween(this[tarObj]).to({ regX: regx }, Number(duration), Ease.cubicInOut));
                    if (regy != "")
                        this.Running.push(new Tween(this[tarObj]).to({ regY: regy }, Number(duration), Ease.cubicInOut));
                }
                scaleChild(tarObj, scalex, scaley, duration = "0.5") {
                    if (scalex != "")
                        this.Running.push(new Tween(this[tarObj]).to({ scaleX: scalex }, Number(duration), Ease.cubicInOut));
                    if (scaley != "")
                        this.Running.push(new Tween(this[tarObj]).to({ scaleY: scaley }, Number(duration), Ease.cubicInOut));
                }
                saturateChild(tarObj, newState, duration = "0.08") {
                    this[tarObj].saturateObj(newState, duration);
                }
                saturateChildTo(tarObj, newSat, duration = "0.08") {
                    this[tarObj].saturateObjTo(newSat, duration);
                }
                saturateObj(newState, duration = "0.08") {
                    this.newSaturation = newState;
                    if (this.newSaturation == "mono") {
                        this.curSat = 1.0;
                        this.newSat = 0.0;
                    }
                    else {
                        this.curSat = 0.0;
                        this.newSat = 1.0;
                    }
                    this.satIncrement = 1.0 / 12;
                    addEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                }
                saturateObjTo(_newSat, duration = "0.08") {
                    let dynRange;
                    if (_newSat > this.curSat) {
                        this.newSaturation = "color";
                    }
                    else {
                        this.newSaturation = "mono";
                    }
                    this.newSat = _newSat;
                    dynRange = Math.abs(_newSat - this.curSat);
                    this.satIncrement = dynRange / 12;
                    addEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                }
                saturationTimer(evt) {
                    if (this.newSaturation == "color") {
                        this.curSat += this.satIncrement;
                        if (this.curSat >= this.newSat) {
                            this.curSat = this.newSat;
                            removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                        }
                    }
                    else if (this.newSaturation == "mono") {
                        this.curSat -= this.satIncrement;
                        if (this.curSat <= this.newSat) {
                            this.curSat = this.newSat;
                            removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                        }
                    }
                    else {
                        this.curSat = 1.0;
                        removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.saturationTimer);
                    }
                    this.filters = new Array(this.adjustSaturation(Number(this.curSat)));
                }
                adjustSaturation(s = 1) {
                    let sInv;
                    let irlum;
                    let iglum;
                    let iblum;
                    sInv = (1 - s);
                    irlum = (sInv * CONST_14.CONST.LUMA_R);
                    iglum = (sInv * CONST_14.CONST.LUMA_G);
                    iblum = (sInv * CONST_14.CONST.LUMA_B);
                    return new ColorMatrixFilter([(irlum + s), iglum, iblum, 0, 0,
                        irlum, (iglum + s), iblum, 0, 0,
                        irlum, iglum, (iblum + s), 0, 0,
                        0, 0, 0, 1, 0]);
                }
                blurChild(tarObj, duration = "12") {
                    this[tarObj].blurObj(duration);
                }
                blurObj(duration = "12") {
                    this.blurIncrement = 255.0 / Number(duration);
                    this.curBlur = 0;
                    addEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.blurTimer);
                }
                blurTimer(evt) {
                    this.curBlur += this.blurIncrement;
                    if (this.curBlur >= 255) {
                        removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.blurTimer);
                        dispatchEvent(new Event("blur_complete"));
                        this.filters = null;
                        this.alpha = 0;
                    }
                    else
                        this.filters = new Array(new BlurFilter(this.curBlur, this.curBlur));
                }
                flashChild(tarObj, _glowColor, duration = "8") {
                    this[tarObj].flashObj(_glowColor, duration);
                }
                flashObj(_glowColor, duration = "8") {
                    this.glowStage = "color";
                    this.glowColor = _glowColor;
                    this.glowStrength = 2.0;
                    this.glowAlpha = 1.0;
                    this.glowIncrement = 175.0 / Number(duration);
                    this.curGlow = 0;
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("start Object Flash");
                    addEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.flashTimer);
                }
                flashTimer(evt) {
                    if (this.glowStage == "color") {
                        this.curGlow += this.glowIncrement;
                        this.glowStrength += .1;
                        if (this.curGlow >= 175) {
                            this.glowStage = "alpha";
                        }
                    }
                    else if (this.glowStage == "alpha") {
                        if (this.glowAlpha <= 0.0) {
                            if (this.traceMode)
                                CUtil_43.CUtil.trace("end Object Flash");
                            removeEventListener(CEFEvent_13.CEFEvent.ENTER_FRAME, this.flashTimer);
                            dispatchEvent(new Event("glow_complete"));
                            this.glowStage = "done";
                            this.filters = null;
                        }
                        this.glowAlpha -= .05;
                    }
                }
                showChild(tarObj, alphaTo = -1, autoStart = false) {
                    this[tarObj].visible = true;
                    if (alphaTo != -1)
                        this[tarObj].alpha = alphaTo;
                }
                hideChild(tarObj) {
                    this[tarObj].visible = false;
                }
                fadeChildOff(tarObj, autoStart = false, duration = "0.5") {
                    this._tarObj = tarObj;
                    this.Running.push(new Tween(this[tarObj]).to({ alpha: 0 }, Number(duration), Ease.cubicInOut));
                    if (autoStart)
                        this.startTransition(this.hideDone);
                }
                hideDone() {
                    this[this._tarObj].visible = false;
                }
                fadeChild(tarObj, alphaTo, autoStart = false, duration = "0.5") {
                    this[tarObj].visible = true;
                    switch (alphaTo) {
                        case "off":
                        case "on":
                            if (this.traceMode)
                                CUtil_43.CUtil.trace("Fading : ", tarObj, alphaTo);
                            this.Running.push(new Tween(this[tarObj]).to({ alpha: (alphaTo == "on") ? 1 : 0 }, Number(duration), Ease.cubicInOut));
                            if (autoStart == true)
                                this.startTransition(this.twnDone);
                            break;
                        default:
                            if (this.traceMode)
                                CUtil_43.CUtil.trace("fadeChild: Parameter error - should be 'on' or 'off' - is: ", alphaTo);
                            break;
                    }
                }
                fadeChildTo(tarObj, alphaTo, autoStart = false, duration = "0.5") {
                    this[tarObj].visible = true;
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("Fading To: ", tarObj, alphaTo);
                    this.Running.push(new Tween(this[tarObj]).to({ alpha: alphaTo }, Number(duration), Ease.cubicInOut));
                    if (autoStart == true)
                        this.startTransition(this.twnDone);
                }
                twnDone() {
                }
                startTween(xnF = this.twnDone) {
                    if (this.Running.length > 0)
                        this.startTransition((xnF == null) ? this.twnDone : xnF);
                }
                deepStateCopy(src) {
                    this.rotation = src.rotation;
                    this.x = src.x;
                    this.y = src.y;
                    this.scaleX = src.scaleX;
                    this.scaleY = src.scaleY;
                    this.alpha = src.alpha;
                    this.visible = src.visible;
                    this.bPersist = src.bPersist;
                    this.activeFeature = src.activeFeature;
                }
                shallowStateCopy(tar, src) {
                    tar.rotation = src.rotation;
                    tar.x = src.x;
                    tar.y = src.y;
                    tar.scaleX = src.scaleX;
                    tar.scaleY = src.scaleY;
                    tar.alpha = src.alpha;
                    tar.visible = src.visible;
                }
                captureDefState(tutObject) {
                    this.defRot = this.rotation;
                    this.defX = this.x;
                    this.defY = this.y;
                    this.defWidth = this.scaleX;
                    this.defHeight = this.scaleY;
                    this.defAlpha = this.alpha;
                    for (let subObject in tutObject) {
                        if (subObject != "_instance" && tutObject[subObject]._instance instanceof TObject) {
                            if (this.traceMode)
                                CUtil_43.CUtil.trace("capturing: " + tutObject[subObject]._instance.name);
                            tutObject[subObject]._instance.captureDefState(tutObject[subObject]);
                        }
                    }
                }
                restoreDefState(tutObject) {
                    this.rotation = this.defRot;
                    this.scaleX = this.defWidth;
                    this.scaleY = this.defHeight;
                    this.x = this.defX;
                    this.y = this.defY;
                    this.alpha = this.defAlpha;
                    for (let subObject in tutObject) {
                        if (subObject != "_instance" && tutObject[subObject]._instance instanceof TObject) {
                            if (this.traceMode)
                                CUtil_43.CUtil.trace("restoring: " + tutObject[subObject]._instance.name);
                            tutObject[subObject]._instance.restoreDefState(tutObject[subObject]);
                        }
                    }
                }
                isTweenable() {
                    return this.bTweenable;
                }
                isSubTweenable() {
                    return this.bSubTweenable;
                }
                captureLogState(obj = null) {
                    if (obj == null)
                        obj = {};
                    return obj;
                }
                captureXMLState() {
                    let nullXML = '<null/>';
                    return nullXML;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    return false;
                }
                createLogAttr(objprop, restart = false) {
                    let sResult;
                    if (!this.hasOwnProperty(objprop))
                        sResult = "undefined";
                    else
                        sResult = this[objprop];
                    return sResult;
                }
                measure() {
                }
                initAutomation(_parentScene, sceneObj, ObjIdRef, lLogger, lTutor) {
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("TObject initAutomation:");
                    let subObj;
                    let wozObj;
                    this.objID = ObjIdRef + name;
                    for (let i1 = 0; i1 < this.numChildren; i1++) {
                        subObj = this.getChildAt(i1);
                        sceneObj[subObj.name] = {};
                        sceneObj[subObj.name]._instance = subObj;
                        if (subObj instanceof TObject || subObj instanceof TObjectDyno_1.TObjectDyno) {
                            subObj.parentScene = _parentScene;
                            if (subObj instanceof TObject)
                                subObj.measure();
                        }
                        sceneObj[subObj.name]['inPlace'] = { X: subObj.x, Y: subObj.y, Width: subObj.scaleX, Height: subObj.scaleY, Alpha: subObj.alpha };
                        if (this.traceMode)
                            CUtil_43.CUtil.trace("\t\tTObject found subObject named:" + subObj.name);
                        if (subObj instanceof TObject) {
                            wozObj = subObj;
                            wozObj.initAutomation(_parentScene, sceneObj[subObj.name], this.objID + ".", lLogger, lTutor);
                        }
                        if (subObj instanceof TObjectDyno_1.TObjectDyno) {
                            let wozDynoObj = subObj;
                            wozDynoObj.initAutomation(_parentScene, sceneObj[subObj.name], this.objID + ".", lLogger, lTutor);
                        }
                    }
                }
                setAutomationMode(sceneObj, sMode) {
                    this.sAuto = sMode;
                    for (let subObj in sceneObj) {
                        if (subObj != "_instance" && sceneObj[subObj]._instance instanceof TObject) {
                            sceneObj[subObj]._instance.setAutomationMode(sceneObj[subObj], sMode);
                        }
                    }
                }
                dumpSubObjs(sceneObj, Indent) {
                    for (let subObj in sceneObj) {
                        if (this.traceMode)
                            CUtil_43.CUtil.trace(Indent + "\tsubObj : " + subObj);
                        if (subObj != "_instance") {
                            let ObjData = sceneObj[subObj];
                            if (sceneObj[subObj]._instance instanceof TObject) {
                                if (this.traceMode)
                                    CUtil_43.CUtil.trace(Indent + "\t");
                                let wozObj = sceneObj[subObj]._instance;
                                if (ObjData['inPlace'] != undefined) {
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace(Indent + "\tCEF* Object: " + " x: " + wozObj.x + " y: " + wozObj.y + " width: " + wozObj.scaleX + " height: " + wozObj.scaleY + " alpha: " + wozObj.alpha + " visible: " + wozObj.visible + " name: " + wozObj.name);
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace(Indent + "\tIn-Place Pos: " + " X: " + ObjData['inPlace'].X + " Y: " + ObjData['inPlace'].Y + " Width: " + ObjData['inPlace'].scaleX + " Height: " + ObjData['inPlace'].scaleY + " Alpha: " + ObjData['inPlace'].Alpha);
                                }
                                sceneObj[subObj]._instance.dumpSubObjs(sceneObj[subObj], Indent + "\t");
                            }
                            else {
                                let disObj = sceneObj[subObj]._instance;
                                if (ObjData['inPlace'] != undefined) {
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace(Indent + "\tFlash Object: " + " x: " + disObj.x + " y: " + disObj.y + " width: " + disObj.scaleX + " height: " + disObj.scaleY + " alpha: " + disObj.alpha + " visible: " + disObj.visible + " name: " + disObj.name);
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace(Indent + "\tIn-Place Pos: " + " X: " + ObjData['inPlace'].X + " Y: " + ObjData['inPlace'].Y + " Width: " + ObjData['inPlace'].scaleX + " Height: " + ObjData['inPlace'].scaleY + " Alpha: " + ObjData['inPlace'].Alpha);
                                }
                            }
                        }
                        else {
                            if (this.traceMode)
                                CUtil_43.CUtil.trace(Indent + "Parent Object : " + sceneObj + " visible: " + sceneObj[subObj].visible);
                        }
                    }
                }
                set isChecked(sval) {
                    this._ischecked = sval;
                }
                get isChecked() {
                    return this._ischecked;
                }
                set checked(bval) {
                    this._ischecked = (bval) ? "true" : "false";
                }
                get checked() {
                    return (this._ischecked == "true") ? true : false;
                }
                set isValid(sval) {
                    this._isvalid = sval;
                }
                get isValid() {
                    return this._isvalid;
                }
                assertFeatures() {
                    return "";
                }
                retractFeatures() {
                }
                get tallyValid() {
                    return "0";
                }
                addFeature(_feature, _name) {
                    this.assertFeature(_feature, _name);
                }
                delFeature(_feature, _name) {
                    this.retractFeature(_feature, _name);
                }
                getFeaturesById(_id) {
                    return this.tutorDoc.getFeaturesById(_id);
                }
                assertFeature(_feature, _name) {
                    this.tutorDoc.addFeature(_feature, _name);
                }
                retractFeature(_feature, _name) {
                    this.tutorDoc.delFeature(_feature, _name);
                }
                set valid(bval) {
                    this._isvalid = (bval) ? "true" : "false";
                }
                get valid() {
                    return (this._isvalid == "true") ? true : false;
                }
                wozMouseClick(evt) {
                    this.dispatchEvent(evt);
                }
                wozMouseMove(evt) {
                    this.dispatchEvent(evt);
                }
                wozMouseDown(evt) {
                    this.dispatchEvent(evt);
                }
                wozMouseUp(evt) {
                    this.dispatchEvent(evt);
                }
                wozMouseOver(evt) {
                    this.dispatchEvent(evt);
                }
                wozMouseOut(evt) {
                    this.dispatchEvent(evt);
                }
                wozKeyDown(evt) {
                    this.dispatchEvent(evt);
                }
                wozKeyUp(evt) {
                    this.dispatchEvent(evt);
                }
                decodeTarget(baseObj, objArray) {
                    let tmpObject = baseObj;
                    let subObject;
                    subObject = objArray.shift();
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("decoding: " + subObject);
                    if (subObject != "this") {
                        tmpObject = baseObj[subObject];
                        if (objArray.length)
                            tmpObject = this.decodeTarget(tmpObject, objArray);
                    }
                    return tmpObject;
                }
                parseOBJLog(tarObj, element) {
                    let objArray;
                    let dataStr;
                    let attrName;
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("Processing: " + element.localName() + " - named: " + element.named);
                    objArray = element.objname.split(".");
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("Target Array: " + objArray[0]);
                    if (objArray.length)
                        tarObj = this.decodeTarget(tarObj, objArray);
                    if (element.objprop != undefined) {
                        dataStr = tarObj.createLogAttr(element.objprop);
                    }
                    else if (element.objmethod != undefined) {
                        dataStr = tarObj.runXMLFunction(tarObj, element);
                    }
                    attrName = this.constructLogName(element.logattr);
                    this.tutorDoc._phaseData[attrName] = {};
                    this.tutorDoc._phaseData[attrName]['value'] = dataStr;
                    this.tutorDoc._phaseData[attrName]["start"] = this.tutorDoc.tutorContainer.timeStamp.getStartTime("dur_" + name);
                    this.tutorDoc._phaseData[attrName]["duration"] = this.tutorDoc.tutorContainer.timeStamp.createLogAttr("dur_" + name);
                    this.tutorDoc._sceneData[element.logattr] = dataStr;
                    this.tutorDoc._sceneData['phasename'] = element.logid.toString();
                    try {
                        this.tutorDoc._sceneData['Rule0'] = this.tutorDoc.tutorContainer.ktSkills['rule0'].queryBelief();
                        this.tutorDoc._sceneData['Rule1'] = this.tutorDoc.tutorContainer.ktSkills['rule1'].queryBelief();
                        this.tutorDoc._sceneData['Rule2'] = this.tutorDoc.tutorContainer.ktSkills['rule2'].queryBelief();
                    }
                    catch (err) {
                        CUtil_43.CUtil.trace("Error - CVS Skills not defined:" + err);
                    }
                    return;
                }
                constructLogName(attr) {
                    let attrName = "L00000";
                    let frame;
                    frame = this.tutorDoc._framendx.toString();
                    attrName = name + "_" + attr + "_" + this.tutorDoc.tutorContainer.gNavigator.iteration.toString();
                    return attrName;
                }
                setXMLProperty(tarObj, tarXML) {
                    if (this.traceMode)
                        CUtil_43.CUtil.trace("Processing: " + tarXML.localName() + " - named: " + tarXML.named + "- value: " + tarXML.value);
                    if (tarObj.hasOwnProperty(tarXML.prop)) {
                        let parmDef = tarXML.value.split(":");
                        if (parmDef[1] != "null") {
                            if (parmDef[1] == "Array") {
                                tarObj[tarXML.prop] = parmDef[0].split(",");
                            }
                            else {
                                let tClass = CUtil_43.CUtil.getConstructorByName("moduleName", parmDef[1]);
                                let value = parmDef[0];
                                tarObj[tarXML.prop] = new tClass(value);
                            }
                        }
                        else
                            tarObj[tarXML.prop] = null;
                    }
                }
                runXMLFunction(tarObj, tarXML) {
                    let i1 = 1;
                    let tClass;
                    let value;
                    let objArray;
                    let parmDef;
                    let parms = new Array;
                    while (tarXML["parm" + i1] != undefined) {
                        parmDef = tarXML["parm" + i1].split(":");
                        if (parmDef[1] == "symbol") {
                            objArray = parmDef[0].split(".");
                            if (objArray.length)
                                parms.push(this.decodeTarget(tarObj, objArray));
                        }
                        else if (parmDef[1] != "null") {
                            tClass = CUtil_43.CUtil.getConstructorByName("moduleName", parmDef[1]);
                            value = parmDef[0];
                            parms.push(new tClass(value));
                        }
                        else
                            parms.push(null);
                        i1++;
                    }
                    if (tarXML.cmnd != undefined)
                        return tarObj[tarXML.cmnd].apply(tarObj, (parms));
                    if (tarXML.objmethod != undefined)
                        return tarObj[tarXML.objmethod].apply(tarObj, (parms));
                }
                parseOBJ(tarObj, factoryOBJ, factoryType) {
                    let tarObject;
                    let childList;
                    let objArray;
                    let propName;
                    for (propName in factoryOBJ) {
                        tarObject = tarObj;
                        if (factoryOBJ[propName].features != undefined) {
                            if (!this.tutorDoc.tutorContainer.testFeatureSet(factoryOBJ[propName].features))
                                continue;
                        }
                        try {
                            switch (propName) {
                                case "common":
                                    break;
                                case "log":
                                    this.parseOBJLog(tarObject, propName);
                                    break;
                                case "obj":
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace("Processing: " + propName + " - named: " + propName.named);
                                    try {
                                        objArray = propName.named.split(".");
                                        if (this.traceMode)
                                            CUtil_43.CUtil.trace("Target Array: " + objArray[0]);
                                        if (objArray.length)
                                            tarObject = this.decodeTarget(tarObject, objArray);
                                        childList = propName.children();
                                        if (childList.length > 0)
                                            this.parseOBJ(tarObject, childList, "obj");
                                        if (propName.prop != undefined) {
                                            this.setXMLProperty(tarObject, propName);
                                        }
                                        else if (propName.cmnd != undefined) {
                                            this.runXMLFunction(tarObject, propName);
                                        }
                                    }
                                    catch (err) {
                                        if (this.traceMode)
                                            CUtil_43.CUtil.trace("Invalid 'obj' target");
                                    }
                                    break;
                                case "props":
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace("Processing: " + propName + " - named: " + propName.named + "- value: " + propName.value);
                                    this.setXMLProperty(tarObject, propName);
                                    break;
                                case "cmnds":
                                    if (this.traceMode)
                                        CUtil_43.CUtil.trace("Processing: " + propName + " - named: " + propName.named + "- value: " + propName.value);
                                    this.runXMLFunction(tarObject, propName);
                                    break;
                                case "symbol":
                                    try {
                                        objArray = propName.named.split(".");
                                        if (this.traceMode)
                                            CUtil_43.CUtil.trace("Target Array: " + objArray[0]);
                                        if (objArray.length)
                                            tarObject = this.decodeTarget(tarObject, objArray);
                                    }
                                    catch (err) {
                                        CUtil_43.CUtil.trace("ParseXML Symbol named: " + propName.named + " not found.");
                                        tarObject = null;
                                    }
                                    if (tarObject != null) {
                                        tarObject.loadXML(propName);
                                    }
                                    break;
                                case "object":
                                    break;
                                case "initself":
                                    this.loadXML(propName);
                                    break;
                            }
                        }
                        catch (err) {
                            CUtil_43.CUtil.trace("TObject:parseXML: " + err);
                        }
                    }
                }
                $(selector) {
                    selector = this.tutorDoc.resolveTemplates(selector, null);
                    return new TSelector_1.TSelector(this, selector);
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    this.xname = objData.xname || this.xname;
                    this.x = objData.x || this.x;
                    this.y = objData.y || this.y;
                    this.visible = objData.visible || this.visible;
                    this.alpha = objData.alpha || this.alpha;
                    if (objData.mask != undefined) {
                        this._hasClickMask = true;
                        this.addChildAt(this.SclickMask, 0);
                    }
                }
            };
            exports_74("TObject", TObject);
        }
    };
});
System.register("events/CEFActionEvent", [], function (exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var Event, CEFActionEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFActionEvent = class CEFActionEvent extends Event {
                constructor(type, Prop1, Prop2 = null, Prop3 = null, Prop4 = null, Prop5 = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.prop1 = Prop1;
                    this.prop2 = Prop2;
                    this.prop3 = Prop3;
                    this.prop4 = Prop4;
                    this.prop5 = Prop5;
                }
                clone() {
                    return new CEFActionEvent(this.type, this.prop1, this.prop2, this.prop3, this.prop4, this.prop5, this.bubbles, this.cancelable);
                }
            };
            CEFActionEvent.CHKCMD = "chkcmd";
            CEFActionEvent.STCCMD = "stccmd";
            CEFActionEvent.INDCMD = "indcmd";
            CEFActionEvent.RMPCMD = "rmpcmd";
            CEFActionEvent.PMTCMD = "pmtcmd";
            CEFActionEvent.NAVCMD = "navcmd";
            CEFActionEvent.EFFECT = "effect";
            exports_75("CEFActionEvent", CEFActionEvent);
        }
    };
});
System.register("events/CEFScriptEvent", [], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var Event, CEFScriptEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFScriptEvent = class CEFScriptEvent extends Event {
                constructor(type, _script, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.script = _script;
                }
                clone() {
                    return new CEFScriptEvent(this.type, this.script, this.bubbles, this.cancelable);
                }
            };
            CEFScriptEvent.SCRIPT = "script";
            exports_76("CEFScriptEvent", CEFScriptEvent);
        }
    };
});
System.register("events/CEFSeekEvent", ["util/CUtil"], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var Event, CUtil_44, CEFSeekEvent;
    return {
        setters: [
            function (CUtil_44_1) {
                CUtil_44 = CUtil_44_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFSeekEvent = class CEFSeekEvent extends Event {
                constructor(type, SeekSeq, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.wozSeekSeq = SeekSeq;
                }
                clone() {
                    CUtil_44.CUtil.trace("cloning CEFSeekEvent:");
                    return new CEFSeekEvent(this.type, this.wozSeekSeq, this.bubbles, this.cancelable);
                }
            };
            CEFSeekEvent.SEEKFORWARD = "WOZSEEKF";
            CEFSeekEvent.SEEKBACKWARD = "WOZSEEKB";
            exports_77("CEFSeekEvent", CEFSeekEvent);
        }
    };
});
System.register("thermite/TSceneBase", ["thermite/TObject", "thermite/TTutorContainer", "util/CONST", "util/CUtil"], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var TObject_10, TTutorContainer_2, CONST_15, CUtil_45, DisplayObject, TSceneBase;
    return {
        setters: [
            function (TObject_10_1) {
                TObject_10 = TObject_10_1;
            },
            function (TTutorContainer_2_1) {
                TTutorContainer_2 = TTutorContainer_2_1;
            },
            function (CONST_15_1) {
                CONST_15 = CONST_15_1;
            },
            function (CUtil_45_1) {
                CUtil_45 = CUtil_45_1;
            }
        ],
        execute: function () {
            DisplayObject = createjs.DisplayObject;
            TSceneBase = class TSceneBase extends TObject_10.TObject {
                constructor() {
                    super();
                    this.fComplete = false;
                    this.sceneAttempt = 1;
                    this._nextButton = null;
                    this._prevButton = null;
                    this.NDX_RAWTEMPLATE = 0;
                    this.NDX_RAWSELECTOR = 1;
                    this.NDX_SELECTORSIG = 2;
                    this.NDX_SELECTOR = 3;
                    this.NDX_OBJSELECTOR = 4;
                    this.NDX_PROPSELECTOR = 5;
                    this.init3();
                }
                TSceneBaseInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("TSceneBase:Constructor");
                    this.sceneState = {};
                    this.RX_SELECTOR = /(\$EF\w*?_)(.*)/;
                    this.RX_TEMPLATES = /\{\{[^\}]*\}\}/g;
                    this.RX_TEMPLTAGS = /\{\{|\}\}/g;
                    this.RX_TEMPLATE = /{{[\$\w\.\?_\|]*}}/;
                    this.RX_ONTQUERY = /{{\$EFO_([\w\.\?]*\|\w*)}}/;
                    this.RX_SSML = /<[^>]*>([^<]*)/g;
                    this.RX_GENSELECTOR = /{{((\$EF\w*?_)(([\w_\.\?]*)(\|?([\w_\?]*))*))}}/g;
                    this.RX_GENTEMPLATE = /\{\{((\$EF\w*?_)(([\w_\?]*)\|([\w_\?]*)))\}\}/g;
                    this.NDX_RAWTEMPLATE = 0;
                    this.NDX_RAWSELECTOR = 1;
                    this.NDX_SELECTORSIG = 2;
                    this.NDX_SELECTOR = 3;
                    this.NDX_OBJSELECTOR = 4;
                    this.NDX_PROPSELECTOR = 5;
                }
                onCreate() {
                    let dataElement;
                    try {
                        this.moduleData = this.tutorDoc.moduleData[this.hostModule][CONST_15.CONST.SCENE_DATA];
                        this.sceneData = this.moduleData[this.sceneName];
                        this.tutorNavigator = this.tutorDoc.tutorNavigator;
                        this.tutorDoc.initializeSceneStateData(this, this.name, this.sceneName, this.hostModule);
                        this.$preCreateScene();
                        for (let element in this.sceneData) {
                            dataElement = this.sceneData[element];
                            if (this[element] && this[element].deSerializeObj) {
                                this[element].setContext(this.hostModule, this.ownerModule, this);
                                this[element].deSerializeObj(dataElement);
                                this[element].onCreate();
                            }
                            else {
                                console.log(`Error: ObjData mismatch: Module-${this.hostModule}  Scene-${this.sceneName}  Element-${element}`);
                            }
                        }
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace(`Error in TSceneBase onCreate: ${this.sceneName} -- ${error}`);
                    }
                }
                initUI() {
                }
                setBreadCrumbs(text) {
                    this.tutorDoc.setBreadCrumbs(text);
                }
                hideProgress() {
                    this.tutorDoc.hideProgress();
                }
                setProgress(step, state) {
                    this.tutorDoc.setProgress(step, state);
                }
                enableNext(fEnable) {
                    this.tutorDoc.enableNext(fEnable);
                }
                enableBack(fEnable) {
                    this.tutorDoc.enableBack(fEnable);
                }
                setNavMode(navMode, navTarget) {
                    this.tutorDoc.setNavMode(navMode, navTarget);
                }
                setSceneValue(property, value) {
                    this.setStateValue(property, value, CONST_15.CONST.SCENESTATE);
                }
                setModuleValue(property, value) {
                    this.setStateValue(property, value, CONST_15.CONST.MODULESTATE);
                }
                setTutorValue(property, value) {
                    this.setStateValue(property, value, CONST_15.CONST.TUTORSTATE);
                }
                setStateValue(property, value, target = CONST_15.CONST.MODULESTATE) {
                    switch (target) {
                        case CONST_15.CONST.SCENESTATE:
                            this.tutorDoc.assignProperty(this.tutorDoc.sceneState[this.name], property, value);
                            this.tutorDoc.sceneChange[this.name][property] = true;
                            break;
                        case CONST_15.CONST.MODULESTATE:
                            this.tutorDoc.assignProperty(this.tutorDoc.moduleState, property, value);
                            this.tutorDoc.moduleChange[property] = true;
                            break;
                        case CONST_15.CONST.TUTORSTATE:
                            this.tutorDoc.assignProperty(this.tutorDoc.tutorState, property, value);
                            this.tutorDoc.tutorChange[property] = true;
                            break;
                    }
                    this.pushStateEvent(property, value, target);
                }
                pushSceneEvent(property, value) {
                    this.pushStateEvent(property, value, CONST_15.CONST.SCENESTATE);
                }
                pushModuleEvent(property, value) {
                    this.pushStateEvent(property, value, CONST_15.CONST.MODULESTATE);
                }
                pushTutorEvent(property, value) {
                    this.pushStateEvent(property, value, CONST_15.CONST.TUTORSTATE);
                }
                pushStateEvent(property, value, target = CONST_15.CONST.MODULESTATE) {
                    switch (target) {
                        case CONST_15.CONST.SCENESTATE:
                            this.tutorDoc.pushEvent(this.tutorDoc.sceneState[this.name], property, value);
                            break;
                        case CONST_15.CONST.MODULESTATE:
                            this.tutorDoc.pushEvent(this.tutorDoc.moduleState, property, value);
                            break;
                        case CONST_15.CONST.TUTORSTATE:
                            this.tutorDoc.pushEvent(this.tutorDoc.tutorState, property, value);
                            break;
                    }
                }
                getRawSceneValue(property) {
                    return this.getRawStateValue(property, CONST_15.CONST.SCENESTATE);
                }
                getRawModuleValue(property) {
                    return this.getRawStateValue(property, CONST_15.CONST.MODULESTATE);
                }
                getRawTutorValue(property) {
                    return this.getRawStateValue(property, CONST_15.CONST.TUTORSTATE);
                }
                getRawStateValue(property, target = CONST_15.CONST.MODULESTATE) {
                    let prop;
                    switch (target) {
                        case CONST_15.CONST.SCENESTATE:
                            prop = this.tutorDoc.resolveProperty(this.tutorDoc.sceneState[this.name], property);
                            break;
                        case CONST_15.CONST.MODULESTATE:
                            prop = this.tutorDoc.resolveProperty(this.tutorDoc.moduleState, property);
                            break;
                        case CONST_15.CONST.TUTORSTATE:
                            prop = this.tutorDoc.resolveProperty(this.tutorDoc.tutorState, property);
                            break;
                    }
                    return prop;
                }
                getSceneValue(property) {
                    return this.getStateValue(property, CONST_15.CONST.SCENESTATE);
                }
                getModuleValue(property) {
                    return this.getStateValue(property, CONST_15.CONST.MODULESTATE);
                }
                getTutorValue(property) {
                    return this.getStateValue(property, CONST_15.CONST.TUTORSTATE);
                }
                getStateValue(property, target = CONST_15.CONST.MODULESTATE) {
                    let prop;
                    prop = this.getRawStateValue(property, target);
                    prop = this.resolveTemplates(prop, null);
                    return prop;
                }
                querySceneChange(property) {
                    return this.queryValueChanged(property, CONST_15.CONST.SCENESTATE);
                }
                queryModuleChange(property) {
                    return this.queryValueChanged(property, CONST_15.CONST.MODULESTATE);
                }
                queryTutorChange(property) {
                    return this.queryValueChanged(property, CONST_15.CONST.TUTORSTATE);
                }
                queryValueChanged(property, target = CONST_15.CONST.MODULESTATE) {
                    let prop;
                    prop = this.getRawStateValue(property, target);
                    return prop.changed;
                }
                testSceneValue(property, value) {
                    return this.testStateValue(property, value, CONST_15.CONST.SCENESTATE);
                }
                testModuleValue(property, value) {
                    return this.testStateValue(property, value, CONST_15.CONST.MODULESTATE);
                }
                testTutorValue(property, value) {
                    return this.testStateValue(property, value, CONST_15.CONST.TUTORSTATE);
                }
                testStateValue(property, value, target = CONST_15.CONST.MODULESTATE) {
                    let result = false;
                    let prop;
                    prop = this.getRawStateValue(property, target);
                    result = prop === value;
                    return result;
                }
                querySceneProp(property) {
                    return this.queryStateProp(property, CONST_15.CONST.SCENESTATE);
                }
                queryModuleProp(property) {
                    return this.queryStateProp(property, CONST_15.CONST.MODULESTATE);
                }
                queryTutorProp(property) {
                    return this.queryStateProp(property, CONST_15.CONST.TUTORSTATE);
                }
                queryStateProp(property, target = CONST_15.CONST.MODULESTATE) {
                    let prop;
                    let valid = null;
                    for (let i1 = 0; i1 < property.length; i1++) {
                        prop = this.getRawStateValue(property[i1], target);
                        valid = prop;
                        if (!valid)
                            break;
                    }
                    return valid ? true : false;
                }
                resolveTemplates(sourceStr, templateRef) {
                    let result = sourceStr;
                    let templArray;
                    templArray = this.enumerateTemplates(this.RX_GENSELECTOR, sourceStr);
                    if (templArray.length > 0) {
                        result = this.composeScript(sourceStr, templArray, templateRef);
                    }
                    else {
                        result = this.resolveSelector(sourceStr, templateRef) || sourceStr;
                    }
                    return result;
                }
                enumerateTemplates(regex, text) {
                    let templArray = [];
                    let templ;
                    while ((templ = regex.exec(text)) !== null) {
                        templArray.push(templ);
                        templ.endIndex = regex.lastIndex;
                    }
                    return templArray;
                }
                composeScript(inst, templArray, templateRef) {
                    let start = 0;
                    let end = inst.length;
                    let composition = "";
                    if (templArray.length) {
                        start = 0;
                        for (let templ of templArray) {
                            end = templ.index;
                            if (start < end) {
                                if (start > 0)
                                    composition += " ";
                                composition += inst.substring(start, end);
                            }
                            start = templ.index;
                            end = templ.endIndex;
                            if (start > 0)
                                composition += " ";
                            composition += this.resolveSelector(templ[this.NDX_RAWSELECTOR], templateRef);
                            start = end;
                        }
                    }
                    end = inst.length;
                    if (start < end) {
                        if (start > 0)
                            composition += " ";
                        composition += inst.substring(start, end);
                    }
                    return composition;
                }
                resolveSelector(selector, templateRef, targetThis = null) {
                    let result = null;
                    let selectorVal = this.RX_SELECTOR.exec(selector);
                    if (selectorVal) {
                        result = this.resolveRawSelector(selector, templateRef, targetThis);
                        switch (selectorVal[1]) {
                            case CONST_15.CONST.SCENESTATE_SELECTOR:
                            case CONST_15.CONST.MODULESTATE_SELECTOR:
                            case CONST_15.CONST.TUTORSTATE_SELECTOR:
                                if (selector !== result)
                                    result = this.resolveSelector(result, null);
                                break;
                        }
                    }
                    else {
                        result = selector;
                    }
                    return result;
                }
                resolveRawSelector(selector, templateRef, targetThis = null) {
                    let dataPath;
                    let result = null;
                    let selectorVal = this.RX_SELECTOR.exec(selector);
                    if (selectorVal) {
                        switch (selectorVal[1]) {
                            case CONST_15.CONST.MODULEONTOLOGY_SELECTOR:
                                result = this.resolveOntologyObject(selectorVal[2], this.tutorDoc.moduleData[this.hostModule][CONST_15.CONST.SCENE_DATA]._ONTOLOGY, templateRef);
                                break;
                            case CONST_15.CONST.GLOBALONTOLOGY_SELECTOR:
                                result = this.resolveOntologyObject(selectorVal[2], this.tutorDoc.globalData._ONTOLOGY, templateRef);
                                break;
                            case CONST_15.CONST.TRACK_SELECTOR:
                                result = targetThis[selectorVal[2]];
                                break;
                            case CONST_15.CONST.SCENESTATE_SELECTOR:
                                result = this.getRawStateValue(selectorVal[2], CONST_15.CONST.SCENESTATE);
                                break;
                            case CONST_15.CONST.MODULESTATE_SELECTOR:
                                result = this.getRawStateValue(selectorVal[2], CONST_15.CONST.MODULESTATE);
                                break;
                            case CONST_15.CONST.TUTORSTATE_SELECTOR:
                                result = this.getRawStateValue(selectorVal[2], CONST_15.CONST.TUTORSTATE);
                                break;
                            case CONST_15.CONST.FOREIGNMODULE_SELECTOR:
                                dataPath = selectorVal[2].split(".");
                                let forMod = this.tutorDoc.moduleData[dataPath[1]];
                                if (!forMod) {
                                    console.log("Error: module for Foreign-Reference missing!");
                                    throw ("missing module");
                                }
                                result = forMod[CONST_15.CONST.SCENE_DATA]._LIBRARY[dataPath[2]][dataPath[3]];
                                break;
                            case CONST_15.CONST.MODULELIBRARY_SELECTOR:
                                result = this.resolveObject(this.tutorDoc.moduleData[this.hostModule][CONST_15.CONST.SCENE_DATA]._LIBRARY, selectorVal[2]);
                                break;
                            case CONST_15.CONST.GLOBALLIBRARY_SELECTOR:
                                break;
                        }
                    }
                    return result;
                }
                resolveObject(baseObj, objPath) {
                    let dataPath = objPath.split(".");
                    try {
                        dataPath.forEach((element) => {
                            baseObj = baseObj[element];
                        });
                    }
                    catch (err) {
                        console.log("Object Resolution Error: " + err);
                    }
                    return baseObj;
                }
                resolveOntologyObject(oSelector, ontologyRoot, templateRef) {
                    let result = oSelector;
                    let ontologyPath = [];
                    if (oSelector) {
                        this.resolveOntologyKey(oSelector, templateRef);
                        let vArray = oSelector.split("|");
                        let qArray = vArray[0].split("_");
                        for (let index = 0; index < qArray.length; index++) {
                            let pathEl = qArray[index].includes("?") ? this._ontologyKey[index] : qArray[index];
                            ontologyPath.push(pathEl);
                            ontologyRoot = ontologyRoot[pathEl];
                        }
                        this._ontologyPath = ontologyPath.join("_");
                        if (vArray[1]) {
                            result = ontologyRoot[vArray[1]];
                            this._ontologyPath += "|" + vArray[1];
                        }
                        else {
                            result = ontologyRoot;
                        }
                    }
                    return result;
                }
                addFeaturebyQuery(_selector, _name) {
                    let value = this.resolveOntologyObject(_selector, this.tutorDoc.moduleData[this.hostModule][CONST_15.CONST.SCENE_DATA]._ONTOLOGY, "");
                    this.addFeature(value, _name);
                }
                effectHandler(evt) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Effect Event: " + evt);
                    this[evt.prop1](evt.prop2, evt.prop3, evt.prop4, evt.prop5);
                }
                scriptHandler(evt) {
                    var fTest = true;
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Effect Event: " + evt);
                    if (evt.script.features != undefined) {
                        fTest = this.tutorDoc.tutorContainer.testFeatureSet(String(evt.script.features));
                    }
                    if (fTest)
                        this.parseOBJ(this, evt.script.children(), "script");
                }
                logSceneTag() {
                    return { 'scenetag': this.sceneTag, 'attempt': this.sceneAttempt++ };
                }
                initAutomation(_parentScene, sceneAutoObj, ObjIdRef, lLogger, lTutor) {
                    let propName;
                    let childName;
                    let childObj;
                    let wozObj;
                    this.onCreate();
                    let nonTObj = Object.getOwnPropertyNames(_parentScene);
                    for (propName of nonTObj) {
                        childObj = _parentScene[propName];
                        if (childObj instanceof TTutorContainer_2.TTutorContainer)
                            continue;
                        if (childObj instanceof TObject_10.TObject) {
                            childObj.parentScene = _parentScene;
                            childObj.measure();
                        }
                        if (childObj instanceof DisplayObject) {
                            if (!childObj.xname || childObj.xname.startsWith(CONST_15.CONST.XNAME_SIG)) {
                                if (this.isAnchor) {
                                    childObj.xname = this.name + (childObj.name ? childObj.name : childObj.id);
                                }
                                else if (this.copyOf && this.copyOf !== "") {
                                    childObj.xname = this.copyOf + (childObj.name ? childObj.name : childObj.id);
                                }
                            }
                            if (childObj.name)
                                childName = childObj.name;
                            else
                                childName = propName;
                            sceneAutoObj[childName] = {};
                            sceneAutoObj[childName]._instance = childObj;
                            sceneAutoObj[childName].inPlace = childObj._cloneProps({});
                            if (this.traceMode)
                                CUtil_45.CUtil.trace("\t\tTScene found subObject named:" + childName + " ... in-place: ");
                            if (childObj instanceof TObject_10.TObject) {
                                wozObj = childObj;
                                wozObj.initAutomation(_parentScene, sceneAutoObj[childName], name + ".", lLogger, lTutor);
                            }
                            if (this.traceMode)
                                for (var id in sceneAutoObj[childName].inPlace) {
                                    CUtil_45.CUtil.trace("\t\t\t\t" + id + " : " + sceneAutoObj[childName].inPlace[id]);
                                }
                        }
                    }
                    this.$onCreateScene();
                    this.$updateNav();
                }
                captureDefState(TutScene) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** Start Capture - Walking Top Level Objects***");
                    for (var sceneObj in TutScene) {
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_10.TObject) {
                            if (this.traceMode)
                                CUtil_45.CUtil.trace("capturing: " + TutScene[sceneObj]._instance.name);
                            TutScene[sceneObj]._instance.captureDefState(TutScene[sceneObj]);
                        }
                    }
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** End Capture - Walking Top Level Objects***");
                }
                restoreDefState(TutScene) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** Start Restore - Walking Top Level Objects***");
                    for (var sceneObj in TutScene) {
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_10.TObject) {
                            if (this.traceMode)
                                CUtil_45.CUtil.trace("restoring: " + TutScene[sceneObj]._instance.name);
                            TutScene[sceneObj]._instance.restoreDefState(TutScene[sceneObj]);
                        }
                    }
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** End Restore - Walking Top Level Objects***");
                }
                setObjMode(TutScene, sMode) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** Start - Walking Top Level Objects***");
                    for (var sceneObj in TutScene) {
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_10.TObject) {
                            TutScene[sceneObj]._instance.setAutomationMode(TutScene[sceneObj], sMode);
                        }
                    }
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("\t*** End - Walking Top Level Objects***");
                }
                dumpSceneObjs(TutScene) {
                    for (var sceneObj in TutScene) {
                        if (this.traceMode)
                            CUtil_45.CUtil.trace("\tSceneObj : " + sceneObj);
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_10.TObject) {
                            if (this.traceMode)
                                CUtil_45.CUtil.trace("\tCEF***");
                            TutScene[sceneObj]._instance.dumpSubObjs(TutScene[sceneObj], "\t");
                        }
                    }
                }
                handleEvent(target) {
                    this.$handleEvent(target);
                    this.$updateNav();
                }
                onSelect(target) {
                    this.$onSelect(target);
                    this.$updateNav();
                }
                onAction(target, evt) {
                    this.$onAction(target, evt);
                    this.$updateNav();
                }
                sceneReplay(evt) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("sceneReplay: " + evt);
                    this.rewindScene();
                    try {
                        this.$preEnterScene();
                        this.tutorDoc.$preEnterScene(this);
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("sceneReplay preenter error on scene: " + this.name + " - " + error);
                    }
                    this.trackPlay();
                }
                trackPlay() {
                }
                rewindScene() {
                    try {
                        this.$rewindScene();
                        this.$demoIinitScene();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("Error in rewindScene script: ");
                    }
                }
                showScene() {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base showScene Behavior: " + this.name);
                    try {
                        this.$preShowScene();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("preShowScene error on scene: " + this.name + " - " + error);
                    }
                }
                hideScene() {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base showScene Behavior: " + this.name);
                    try {
                        this.$preHideScene();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("preHideScene error on scene: " + this.name + " - " + error);
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base preenter Scene Behavior: " + this.name);
                    try {
                        this.$preEnterScene();
                        this.tutorDoc.$preEnterScene(this);
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("preenter error on scene: " + this.name + " - " + error);
                    }
                    return sceneLabel;
                }
                onEnterScene(Direction) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base onenter Scene Behavior:" + this.name);
                    try {
                        this.$onEnterScene();
                        this.$updateNav();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("onenter error on scene: " + this.name + " - " + error);
                    }
                }
                preExitScene(Direction, sceneCurr) {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base preexit Scene Behavior:" + this.name);
                    try {
                        this.$preExitScene();
                        this.tutorDoc.$preExitScene(this);
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("preexit error on scene: " + this.name + " - " + error);
                    }
                    return (CONST_15.CONST.OKNAV);
                }
                onExitScene() {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Base onexit Scene Behavior:" + this.name);
                    try {
                        if (this.$terminateScene) {
                            if (this.tutorDoc.testFeatureSet(this.$features)) {
                                this.enQueueTerminateEvent();
                            }
                            else {
                                this.enQueueTerminateEvent();
                            }
                        }
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("enQueueTerminateEvent error on scene: " + this.name + " - " + error);
                    }
                    try {
                        this.$logScene();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("logging error on scene: " + this.name + " - " + error);
                    }
                    try {
                        this.$onExitScene();
                    }
                    catch (error) {
                        CUtil_45.CUtil.trace("onexit error on scene: " + this.name + " - " + error);
                    }
                }
                demoBehavior() {
                    if (this.traceMode)
                        CUtil_45.CUtil.trace("Default demoBehavior: ");
                }
                initSeekArrays() {
                }
                doSeekForward(evt) {
                    switch (evt.wozSeekSeq) {
                    }
                }
                doSeekBackward(evt) {
                }
            };
            exports_78("TSceneBase", TSceneBase);
        }
    };
});
System.register("core/IEFTutorDoc", [], function (exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("TutorEngineOne", ["core/CEFTutorDoc", "util/CONST", "util/CUtil"], function (exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var CEFTutorDoc_1, CONST_16, CUtil_46, CEngine;
    return {
        setters: [
            function (CEFTutorDoc_1_1) {
                CEFTutorDoc_1 = CEFTutorDoc_1_1;
            },
            function (CONST_16_1) {
                CONST_16 = CONST_16_1;
            },
            function (CUtil_46_1) {
                CUtil_46 = CUtil_46_1;
            }
        ],
        execute: function () {
            CEngine = class CEngine {
                constructor() { }
                start(_bootTutorID) {
                    this.bootTutor = _bootTutorID;
                    console.log("In TutorEngineOne startup: " + _bootTutorID);
                    var frequency = 30;
                    EFLoadManager.efStage.enableMouseOver(frequency);
                    EFLoadManager.efStage.snapToPixel = true;
                    if (_bootTutorID) {
                        this.tutorDoc = new CEFTutorDoc_1.CEFTutorDoc();
                        this.tutorDoc.name = this.bootTutor;
                        this.loadBootImage();
                    }
                    if (EFLoadManager.NOLOG === true) {
                        window['console']['log'] = function () { };
                    }
                }
                loadBootImage() {
                    let loaderPromises = [];
                    this.tutorDoc.buildBootSet(this.bootTutor);
                    loaderPromises = this.tutorDoc.loadFileSet();
                    Promise.all(loaderPromises)
                        .then(() => {
                        console.log("Tutor Boot Image Complete");
                        CUtil_46.CUtil.mixinCodeSuppliments(this.tutorDoc, EFTut_Suppl[CONST_16.CONST.GLOBAL_MODULE][CONST_16.CONST.GLOBAL_CODE], CONST_16.CONST.EXT_SIG);
                        this.loadTutorImage();
                    });
                }
                loadTutorImage() {
                    let loaderPromises = [];
                    this.tutorDoc.buildTutorSet();
                    loaderPromises = this.tutorDoc.loadFileSet();
                    Promise.all(loaderPromises)
                        .then(() => {
                        console.log("Tutor Image Complete");
                        this.loadCreateJSResources();
                    });
                }
                loadCreateJSResources() {
                    let loaderPromises = [];
                    let engine = this;
                    for (let fileLoader of this.tutorDoc.loaderData) {
                        try {
                            if (fileLoader.compID) {
                                let comp = AdobeAn.getComposition(fileLoader.compID);
                                let lib = comp.getLibrary();
                                let loader = new createjs.LoadQueue(false);
                                loaderPromises.push(new Promise((resolve, reject) => {
                                    loader.addEventListener("complete", function (evt) { engine.handleComplete(evt, comp, resolve, reject); });
                                    loader.addEventListener("error", function (evt) { engine.handleError(evt, comp, reject); });
                                    loader.loadManifest(lib.properties.manifest);
                                }));
                            }
                        }
                        catch (err) {
                            console.log("Error: CompID mismatch: " + fileLoader.filePath + "  :   " + err);
                        }
                    }
                    Promise.all(loaderPromises)
                        .then((values) => {
                        console.log("Tutor init Complete:" + values);
                        this.mapForeignClasses();
                        this.startTutor();
                    });
                }
                handleComplete(evt, comp, resolve, reject) {
                    let lib = comp.getLibrary();
                    let ss = comp.getSpriteSheet();
                    let queue = evt.target;
                    let ssMetadata = lib.ssMetadata;
                    for (let compName in lib) {
                        let moduleName = compName;
                        if (moduleName.startsWith("EFMod_")) {
                            lib._ANmoduleName = moduleName;
                            EFLoadManager.modules[moduleName] = lib;
                            EFLoadManager.classLib[moduleName] = {};
                            break;
                        }
                    }
                    for (let i = 0; i < ssMetadata.length; i++) {
                        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames });
                    }
                    this.mapThermiteClasses(lib, resolve, reject);
                    AdobeAn.compositionLoaded(lib.properties.id);
                }
                handleError(evt, comp, reject) {
                    reject("AnimateCC Resource Load Failed:");
                }
                mapThermiteClasses(AnLib, resolve, reject) {
                    let engine = this;
                    let importPromises = new Array();
                    for (let compName in AnLib) {
                        if (compName.startsWith(CONST_16.CONST.THERMITE_PREFIX)) {
                            let varPath = compName.split("__");
                            let classPath = varPath[0].split("_");
                            let comPath = varPath[0].replace("_", "/");
                            comPath = comPath.replace("TC/", "thermite/");
                            importPromises.push(this.importAndMap(AnLib._ANmoduleName, AnLib[compName], comPath, classPath[classPath.length - 1], varPath[1]));
                        }
                    }
                    Promise.all(importPromises)
                        .then((values) => {
                        console.log("Thermite mapping complete:" + values);
                        if (resolve)
                            resolve();
                    }).catch((Error) => {
                        console.log("Thermite mapping failed:" + Error);
                        if (reject)
                            reject();
                    });
                }
                importAndMap(AnModuleName, AnObject, classPath, className, variant) {
                    console.log("Import and Map: " + AnModuleName + " => " + classPath + " : " + variant);
                    return SystemJS.import(classPath).then((ClassObj) => {
                        let temp1 = {};
                        temp1.constructor = AnObject.prototype.constructor;
                        temp1.clone = AnObject.prototype.clone;
                        temp1.nominalBounds = AnObject.prototype.nominalBounds;
                        temp1.frameBounds = AnObject.prototype.frameBounds;
                        AnObject.prototype = Object.create(ClassObj[className].prototype);
                        AnObject.prototype.clone = temp1.clone;
                        AnObject.prototype.nominalBounds = temp1.nominalBounds;
                        AnObject.prototype.frameBounds = temp1.frameBounds;
                        AnObject.prototype.tutorDoc = this.tutorDoc;
                        AnObject.prototype.tutorContainer = this.tutorDoc.tutorContainer;
                        if (EFLoadManager.classLib[AnModuleName][variant]) {
                            console.error(`ERROR: Name Collision: module- ${AnModuleName}  variant- ${variant}`);
                            throw ("NameCollision");
                        }
                        else {
                            EFLoadManager.classLib[AnModuleName][variant] = AnObject;
                        }
                    });
                }
                mapForeignClasses() {
                    let modules = EFLoadManager.modules;
                    for (let AnLib in modules) {
                        let library = modules[AnLib];
                        for (let compName in library) {
                            if (compName.startsWith(CONST_16.CONST.MODLINK_PREFIX)) {
                                let varPath = compName.split("__");
                                let modPath = varPath[0].split("_");
                                let AnModuleName = (CONST_16.CONST.EFMODULE_PREFIX + modPath[1]);
                                let temp1 = {};
                                let foreignObject = EFLoadManager.classLib[AnModuleName][varPath[1]];
                                library[compName] = foreignObject;
                            }
                        }
                    }
                }
                startTutor() {
                    console.log("module load complete: ");
                    this.constructTutor();
                    CUtil_46.CUtil.preLoader(false);
                }
                constructTutor() {
                    try {
                        this.tutorDoc.launchTutor();
                        console.log("Tutor Construction Complete");
                    }
                    catch (error) {
                        console.log("Tutor Construction Failed: " + error.toString());
                    }
                }
            };
            exports_80("CEngine", CEngine);
        }
    };
});
System.register("thermite/TButton", ["thermite/TObject", "events/CEFEvent", "thermite/events/TMouseEvent", "thermite/events/TEvent", "util/CONST", "util/CUtil"], function (exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var TObject_11, CEFEvent_14, TMouseEvent_3, TEvent_2, CONST_17, CUtil_47, Timeline, TButton;
    return {
        setters: [
            function (TObject_11_1) {
                TObject_11 = TObject_11_1;
            },
            function (CEFEvent_14_1) {
                CEFEvent_14 = CEFEvent_14_1;
            },
            function (TMouseEvent_3_1) {
                TMouseEvent_3 = TMouseEvent_3_1;
            },
            function (TEvent_2_1) {
                TEvent_2 = TEvent_2_1;
            },
            function (CONST_17_1) {
                CONST_17 = CONST_17_1;
            },
            function (CUtil_47_1) {
                CUtil_47 = CUtil_47_1;
            }
        ],
        execute: function () {
            Timeline = createjs.Timeline;
            TButton = class TButton extends TObject_11.TObject {
                constructor() {
                    super();
                    this.onClickScript = null;
                    this.init3();
                }
                TButtonInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_47.CUtil.trace("TButton:Constructor");
                    this.on(CEFEvent_14.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                    this.curState = "unknown";
                    this.fPressed = false;
                    this.fEnabled = true;
                    this.fOver = false;
                }
                Destructor() {
                    this.removeEventListener(TMouseEvent_3.TMouseEvent.WOZCLICKED, this.doMouseClicked);
                    this.removeEventListener(TMouseEvent_3.TMouseEvent.WOZOVER, this.doMouseOver);
                    this.removeEventListener(TMouseEvent_3.TMouseEvent.WOZOUT, this.doMouseOut);
                    this.removeEventListener(TMouseEvent_3.TMouseEvent.WOZDOWN, this.doMouseDown);
                    this.removeEventListener(TMouseEvent_3.TMouseEvent.WOZUP, this.doMouseUp);
                    super.Destructor();
                }
                onAddedToStage(evt) {
                    console.log("Button On Stage");
                    this.mouseChildren = false;
                    this.timeline = new Timeline(null, null, null);
                    this.decomposeButton();
                    this.addChild(this[this.STATE_UP]);
                    this.addChild(this[this.STATE_OVER]);
                    this.addChild(this[this.STATE_DOWN]);
                    this.addChild(this[this.STATE_DISABLED]);
                    if (this.Slabel)
                        this.addChild(this.Slabel);
                    this.resetState();
                    this[this.STATE_UP].visible = true;
                }
                decomposeButton() {
                    this.STATE_UP = this[CONST_17.CONST.INSTANCE_UP] ? CONST_17.CONST.INSTANCE_UP : CONST_17.CONST.SHAPE_UP;
                    this.STATE_OVER = this[CONST_17.CONST.INSTANCE_OVER] ? CONST_17.CONST.INSTANCE_OVER : CONST_17.CONST.SHAPE_OVER;
                    this.STATE_DOWN = this[CONST_17.CONST.INSTANCE_DOWN] ? CONST_17.CONST.INSTANCE_DOWN : CONST_17.CONST.SHAPE_DOWN;
                    this.STATE_DISABLED = this[CONST_17.CONST.INSTANCE_DISABLED] ? CONST_17.CONST.INSTANCE_DISABLED : CONST_17.CONST.SHAPE_DISABLED;
                    this.curState = this.STATE_UP;
                }
                captureDefState(thisObj) {
                    super.captureDefState(thisObj);
                    thisObj.defState = {
                        "curState": this.curState,
                        "fPressed": this.fPressed,
                        "fEnabled": this.fEnabled,
                        "fOver": this.fOver
                    };
                }
                restoreDefState(thisObj) {
                    if (this.traceMode)
                        CUtil_47.CUtil.trace("Button Reseting: " + this.name);
                    this.curState = thisObj.defState.curState;
                    this.fPressed = thisObj.defState.fPressed;
                    this.fEnabled = thisObj.defState.fEnabled;
                    this.fOver = thisObj.defState.fOver;
                    this.enable(this.fEnabled);
                    super.restoreDefState(thisObj);
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['target'] = 'button';
                    obj['name'] = this.name;
                    obj['state'] = this.curState;
                    obj['pressed'] = this.fPressed.toString();
                    obj['enabled'] = this.fEnabled.toString();
                    obj['over'] = this.fOver.toString();
                    return obj;
                }
                capturestringState() {
                    let stringVal = "<button this.name={this.name} state={curState} pressed={fPressed.toString()} enabled={fEnabled.toString()} over={fOver.toString()}/>";
                    return stringVal;
                }
                resetState() {
                    this[this.STATE_UP].visible = false;
                    this[this.STATE_OVER].visible = false;
                    this[this.STATE_DOWN].visible = false;
                    this[this.STATE_DISABLED].visible = false;
                }
                gotoState(sState) {
                    if (this.traceMode)
                        CUtil_47.CUtil.trace("Button.gotoState: ", this.name + " " + sState);
                    this.resetState();
                    this.curState = sState;
                    switch (sState) {
                        case this.STATE_DOWN:
                            this[this.STATE_DOWN].visible = true;
                            this.fPressed = true;
                            break;
                        case this.STATE_UP:
                            if (this.fOver)
                                this[this.STATE_OVER].visible = true;
                            else
                                this[this.STATE_UP].visible = true;
                            this.fPressed = false;
                            break;
                        case this.STATE_OVER:
                            if (!this.fPressed)
                                this[this.STATE_OVER].visible = true;
                            else
                                this[this.STATE_DOWN].visible = true;
                            this.fOver = true;
                            break;
                        case CONST_17.CONST.STATE_OUT:
                            this[this.STATE_UP].visible = true;
                            this.fOver = false;
                            this.fPressed = false;
                            break;
                    }
                    if (!this.fEnabled) {
                        this.resetState();
                        this[this.STATE_UP].visible = false;
                        this[this.STATE_DISABLED].visible = true;
                    }
                }
                muteButton(bMute) {
                    if (bMute) {
                        if (this.traceMode)
                            CUtil_47.CUtil.trace("Button Muted: " + this.name);
                        this.off(TMouseEvent_3.TMouseEvent.MOUSE_CLICK, this.doMouseClicked);
                        this.off(TMouseEvent_3.TMouseEvent.MOUSE_OVER, this.doMouseOver);
                        this.off(TMouseEvent_3.TMouseEvent.MOUSE_OUT, this.doMouseOut);
                        this.off(TMouseEvent_3.TMouseEvent.MOUSE_DOWN, this.doMouseDown);
                        this.off(TMouseEvent_3.TMouseEvent.MOUSE_UP, this.doMouseUp);
                    }
                    else {
                        if (this.traceMode)
                            CUtil_47.CUtil.trace("Button UnMuted: " + this.name);
                        this.on(TMouseEvent_3.TMouseEvent.MOUSE_CLICK, this.doMouseClicked, this);
                        this.on(TMouseEvent_3.TMouseEvent.MOUSE_OVER, this.doMouseOver, this);
                        this.on(TMouseEvent_3.TMouseEvent.MOUSE_OUT, this.doMouseOut, this);
                        this.on(TMouseEvent_3.TMouseEvent.MOUSE_DOWN, this.doMouseDown, this);
                        this.on(TMouseEvent_3.TMouseEvent.MOUSE_UP, this.doMouseUp, this);
                    }
                }
                enable(bFlag) {
                    this.fEnabled = bFlag;
                    if (!bFlag) {
                        if (this.traceMode)
                            CUtil_47.CUtil.trace("Button Disabled: " + this.name);
                        this.gotoState(this.curState);
                        this.muteButton(true);
                    }
                    else {
                        if (this.traceMode)
                            CUtil_47.CUtil.trace("Button Enabled: " + this.name);
                        this.gotoState(this.curState);
                        this.muteButton(false);
                    }
                }
                doMouseClicked(evt) {
                    if (this.fPressed && this.fEnabled) {
                        this.doClickActions(evt);
                    }
                    this.gotoState(this.STATE_UP);
                }
                doClickActions(evt) {
                    if (this.traceMode)
                        CUtil_47.CUtil.trace("dispatch CLICK");
                    this.doAction(evt);
                    let logData = { 'action': 'button_click', 'targetid': this.name };
                    this.dispatchEvent(new TEvent_2.TEvent(CONST_17.CONST.BUTTON_CLICK));
                    this.tutorDoc.log.logActionEvent(logData);
                }
                doMouseOver(evt) {
                    this.gotoState(this.STATE_OVER);
                }
                doMouseOut(evt) {
                    this.gotoState(CONST_17.CONST.STATE_OUT);
                }
                doMouseDown(evt) {
                    this.gotoState(this.STATE_DOWN);
                }
                doMouseUp(evt) {
                    this.gotoState(this.STATE_UP);
                }
                showButton(fShow) {
                    this.visible = fShow;
                    if (fShow) {
                        if (this.traceMode)
                            CUtil_47.CUtil.trace("testing init state: " + this.name);
                        try {
                            if (this.tutorDoc.tutorContainer.cCursor.stateHelper(this)) {
                                if (this.traceMode)
                                    CUtil_47.CUtil.trace("setting init state Over");
                                this.doMouseOver(null);
                            }
                        }
                        catch (Error) {
                            if (this.traceMode)
                                CUtil_47.CUtil.trace("cCursor not yet instantiated");
                        }
                    }
                }
                addBtnElementsFromData(elementData) {
                    elementData.forEach((element) => {
                        try {
                            this.addChildAt(this[element.name], this.getChildIndex(this.getChildByName(element.sibling)));
                        }
                        catch (err) {
                            console.error("ERROR: Button Data Error");
                        }
                    });
                }
                initBtnFromData(btnData) {
                    if (btnData.elements)
                        this.addBtnElementsFromData(btnData.elements);
                    if (this.Slabel) {
                        this.Slabel.text = btnData.label ? this.hostScene.resolveTemplates(btnData.label, this._templateRef) : "";
                    }
                    this.type = btnData.type || CONST_17.CONST.SIMPLE_BUTTON;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: Button Control");
                    super.deSerializeObj(objData);
                    if (objData.btnData)
                        this.initBtnFromData(objData.btnData);
                }
            };
            exports_81("TButton", TButton);
        }
    };
});
System.register("controls/CEFLabelButton", ["thermite/TButton"], function (exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var TButton_1, CEFLabelButton;
    return {
        setters: [
            function (TButton_1_1) {
                TButton_1 = TButton_1_1;
            }
        ],
        execute: function () {
            CEFLabelButton = class CEFLabelButton extends TButton_1.TButton {
                CEFLabelButton() {
                }
                setLabel(newLabel) {
                }
            };
            exports_82("CEFLabelButton", CEFLabelButton);
        }
    };
});
System.register("controls/CEFLabelControl", ["thermite/TObject"], function (exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var TObject_12, CEFLabelControl;
    return {
        setters: [
            function (TObject_12_1) {
                TObject_12 = TObject_12_1;
            }
        ],
        execute: function () {
            CEFLabelControl = class CEFLabelControl extends TObject_12.TObject {
                constructor() {
                    super();
                }
                setLabel(newLabel, colour = 0x000000) {
                }
            };
            exports_83("CEFLabelControl", CEFLabelControl);
        }
    };
});
System.register("controls/CEFSkillBar", ["thermite/TObject"], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var TObject_13, CEFSkillBar;
    return {
        setters: [
            function (TObject_13_1) {
                TObject_13 = TObject_13_1;
            }
        ],
        execute: function () {
            CEFSkillBar = class CEFSkillBar extends TObject_13.TObject {
                constructor() {
                    super();
                    this.level = 0;
                }
                set skillName(newName) {
                    this._name = newName;
                }
                get skillName() {
                    return this._name;
                }
                set level(newLevel) {
                    this._invlevel = 1 - newLevel;
                    this._level = newLevel;
                    this.Smask.x = -(this.SprogBar['width'] * this._invlevel);
                    this._level *= 100;
                    this.Stext.text = this._level.toFixed(0) + '%';
                }
                get level() {
                    return this._level;
                }
            };
            exports_84("CEFSkillBar", CEFSkillBar);
        }
    };
});
System.register("controls/CEFSkilloMeter", ["thermite/TObject", "events/CEFMouseEvent"], function (exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var TObject_14, CEFMouseEvent_2, CEFSkilloMeter;
    return {
        setters: [
            function (TObject_14_1) {
                TObject_14 = TObject_14_1;
            },
            function (CEFMouseEvent_2_1) {
                CEFMouseEvent_2 = CEFMouseEvent_2_1;
            }
        ],
        execute: function () {
            CEFSkilloMeter = class CEFSkilloMeter extends TObject_14.TObject {
                constructor() {
                    super();
                    this.tfValue = new Array(6);
                    let i1;
                    super();
                    for (i1 = 0; i1 < 6; i1++)
                        this.updateSkill(i1 + 1, 0, "");
                    this.addEventListener(CEFMouseEvent_2.TMouseEvent.CLICK, this.skillClick);
                }
                Destructor() {
                    super.Destructor();
                }
                updateSkill(index, newValue, tfVal) {
                    this["Sskill" + index].level = newValue;
                    this.tfValue[index - 1] = tfVal;
                }
                updateName(index, newName) {
                    this["Sskill" + index].skillName = newName;
                }
                set title(newTitle) {
                    this.Stitle.text = newTitle;
                }
                skillClick(evt) {
                    let i1;
                    let SkillData = "";
                    for (i1 = 1; i1 <= 6; i1++) {
                        SkillData += this["Sskill" + i1].skillName;
                        SkillData += ": ";
                        SkillData += this["Sskill" + i1].level;
                        SkillData += ": ";
                        SkillData += this.tfValue[i1 - 1];
                        SkillData += "\n";
                    }
                }
            };
            exports_85("CEFSkilloMeter", CEFSkilloMeter);
        }
    };
});
System.register("thermite/TMouseMask", ["thermite/TObject", "events/CEFMouseEvent", "util/CUtil"], function (exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var TObject_15, CEFMouseEvent_3, CUtil_48, TMouseMask;
    return {
        setters: [
            function (TObject_15_1) {
                TObject_15 = TObject_15_1;
            },
            function (CEFMouseEvent_3_1) {
                CEFMouseEvent_3 = CEFMouseEvent_3_1;
            },
            function (CUtil_48_1) {
                CUtil_48 = CUtil_48_1;
            }
        ],
        execute: function () {
            TMouseMask = class TMouseMask extends TObject_15.TObject {
                constructor() {
                    super();
                    this.traceMode = true;
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZCLICKED, this.discardEvent);
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZMOVE, this.discardEvent);
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZOVER, this.discardEvent);
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZOUT, this.discardEvent);
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZDOWN, this.discardEvent);
                    this.addEventListener(CEFMouseEvent_3.TMouseEvent.WOZUP, this.discardEvent);
                }
                discardEvent(evt) {
                    if (this.traceMode)
                        CUtil_48.CUtil.trace("Attempting to stop Propogation", evt.target, evt.type);
                    evt.stopPropagation();
                }
                setObjMode(dlgPanel, sMode) {
                    if (this.traceMode)
                        CUtil_48.CUtil.trace("\t*** Start - Walking Dialog Objects***");
                    for (var dialogObj in dlgPanel) {
                        if (dialogObj != "_instance" && dlgPanel[dialogObj].instance instanceof TObject_15.TObject) {
                            dlgPanel[dialogObj].instance.setAutomationMode(dlgPanel[dialogObj], sMode);
                        }
                    }
                    if (this.traceMode)
                        CUtil_48.CUtil.trace("\t*** End - Walking Dialog Objects***");
                }
                dumpSceneObjs(dlgPanel) {
                    for (var dialogObj in dlgPanel) {
                        if (this.traceMode)
                            CUtil_48.CUtil.trace("\tNavPanelObj : " + dialogObj);
                        if (dialogObj != "_instance" && dlgPanel[dialogObj].instance instanceof TObject_15.TObject) {
                            if (this.traceMode)
                                CUtil_48.CUtil.trace("\tCEF***");
                            dlgPanel[dialogObj].instance.dumpSubObjs(dlgPanel[dialogObj], "\t");
                        }
                    }
                }
            };
            exports_86("TMouseMask", TMouseMask);
        }
    };
});
System.register("events/CEFDialogEvent", [], function (exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var Event, CEFDialogEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFDialogEvent = class CEFDialogEvent extends Event {
                constructor(Result, type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.result = Result;
                }
                clone() {
                    return new CEFDialogEvent(this.result, this.type, this.bubbles, this.cancelable);
                }
            };
            CEFDialogEvent.ENDMODAL = "ENDMODAL";
            CEFDialogEvent.DLGOK = "DialogOK";
            CEFDialogEvent.DLGCANCEL = "DialogCancel";
            exports_87("CEFDialogEvent", CEFDialogEvent);
        }
    };
});
System.register("dialogs/CEFDialogBox", ["thermite/TObject", "thermite/TMouseMask", "events/CEFDialogEvent", "util/CUtil"], function (exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var TObject_16, TMouseMask_1, CEFDialogEvent_1, CUtil_49, CEFDialogBox;
    return {
        setters: [
            function (TObject_16_1) {
                TObject_16 = TObject_16_1;
            },
            function (TMouseMask_1_1) {
                TMouseMask_1 = TMouseMask_1_1;
            },
            function (CEFDialogEvent_1_1) {
                CEFDialogEvent_1 = CEFDialogEvent_1_1;
            },
            function (CUtil_49_1) {
                CUtil_49 = CUtil_49_1;
            }
        ],
        execute: function () {
            CEFDialogBox = class CEFDialogBox extends TObject_16.TObject {
                CEFDialogBox() {
                }
                setTitle(txt) {
                    this.Stitle.text = txt;
                }
                moveDialog(X, Y) {
                    this.x = X;
                    this.y = Y;
                }
                centerDialog() {
                }
                doModal(accounts = null, Alpha = 1, fAdd = true) {
                    this.fAddDlg = fAdd;
                    if (fAdd) {
                        this.sMask = new TMouseMask_1.TMouseMask();
                        this.sMask.x = 0;
                        this.sMask.y = 0;
                        this.sMask.alpha = Alpha;
                        this.sMask.visible = true;
                        this.visible = true;
                        this.tutorDoc.tutorContainer.addChild(this.sMask);
                        this.tutorDoc.tutorContainer.addChild(this);
                    }
                    else {
                        this.sMask.x = 0;
                        this.sMask.y = 0;
                        this.sMask.alpha = Alpha;
                        this.sMask.visible = true;
                        this.visible = true;
                        this.sMask.setTopMost();
                        this.setTopMost();
                    }
                    if (this.tutorDoc.tutorContainer.cCursor)
                        this.tutorDoc.tutorContainer.cCursor.setTopMost();
                }
                endModal(result) {
                    if (this.fAddDlg) {
                        this.visible = false;
                        this.tutorDoc.tutorContainer.removeChild(this.sMask);
                        this.tutorDoc.tutorContainer.removeChild(this);
                        this.sMask = null;
                    }
                    else {
                        this.visible = false;
                        this.sMask.visible = false;
                    }
                    this.dispatchEvent(new CEFDialogEvent_1.CEFDialogEvent(result, CEFDialogEvent_1.CEFDialogEvent.ENDMODAL));
                }
                setObjMode(dlgPanel, sMode) {
                    if (this.traceMode)
                        CUtil_49.CUtil.trace("\t*** Start - Walking Dialog Objects***");
                    for (let dialogObj in dlgPanel) {
                        if (dialogObj != "_instance" && dlgPanel[dialogObj].instance instanceof TObject_16.TObject) {
                            dlgPanel[dialogObj].instance.setAutomationMode(dlgPanel[dialogObj], sMode);
                        }
                    }
                    if (this.traceMode)
                        CUtil_49.CUtil.trace("\t*** End - Walking Dialog Objects***");
                }
                dumpSceneObjs(dlgPanel) {
                    for (let dialogObj in dlgPanel) {
                        if (this.traceMode)
                            CUtil_49.CUtil.trace("\tNavPanelObj : " + dialogObj);
                        if (dialogObj != "_instance" && dlgPanel[dialogObj].instance instanceof TObject_16.TObject) {
                            if (this.traceMode)
                                CUtil_49.CUtil.trace("\tCEF***");
                            dlgPanel[dialogObj].instance.dumpSubObjs(dlgPanel[dialogObj], "\t");
                        }
                    }
                }
            };
            exports_88("CEFDialogBox", CEFDialogBox);
        }
    };
});
System.register("dialogs/CDialogDesignPrompt1", ["dialogs/CEFDialogBox", "events/CEFMouseEvent", "util/CONST"], function (exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var CEFDialogBox_1, CEFMouseEvent_4, CONST_18, CDialogDesignPrompt1;
    return {
        setters: [
            function (CEFDialogBox_1_1) {
                CEFDialogBox_1 = CEFDialogBox_1_1;
            },
            function (CEFMouseEvent_4_1) {
                CEFMouseEvent_4 = CEFMouseEvent_4_1;
            },
            function (CONST_18_1) {
                CONST_18 = CONST_18_1;
            }
        ],
        execute: function () {
            CDialogDesignPrompt1 = class CDialogDesignPrompt1 extends CEFDialogBox_1.CEFDialogBox {
                CDialogDesignPrompt1() {
                    this.setTitle("Notice");
                    this.Scancel.setLabel("Cancel");
                }
                Destructor() {
                    this.Scancel.removeEventListener(CEFMouseEvent_4.TMouseEvent.WOZCLICK, this.doCancel);
                    super.Destructor();
                }
                doCancel(evt) {
                    this.endModal(CONST_18.CONST.DLGSTAY);
                }
                doModal(accounts = null, Alpha = 1, fAdd = true) {
                    super.doModal(accounts, Alpha, fAdd);
                    this.Scancel.addEventListener(CEFMouseEvent_4.TMouseEvent.WOZCLICK, this.doCancel);
                }
                endModal(Result) {
                    super.endModal(Result);
                    this.Scancel.removeEventListener(CEFMouseEvent_4.TMouseEvent.WOZCLICK, this.doCancel);
                }
            };
            exports_89("CDialogDesignPrompt1", CDialogDesignPrompt1);
        }
    };
});
System.register("events/CAuthEvent", ["util/CUtil"], function (exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var CUtil_50, Event, CAuthEvent;
    return {
        setters: [
            function (CUtil_50_1) {
                CUtil_50 = CUtil_50_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CAuthEvent = class CAuthEvent extends Event {
                constructor(type = CAuthEvent.SUCCESS, _subType = null, _dataPacket = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.traceMode = false;
                    this.subType = _subType;
                    this.dataPacket = _dataPacket;
                }
                clone() {
                    if (this.traceMode)
                        CUtil_50.CUtil.trace("cloning CAuthEvent:");
                    return new CAuthEvent(this.type, this.subType, this.dataPacket, this.bubbles, this.cancelable);
                }
            };
            CAuthEvent.AUTH_STATUS = "auth_status";
            CAuthEvent.AUTH_ADMIN = "auth_admin";
            CAuthEvent.AUTH_USER = "auth_user";
            CAuthEvent.BOOTLDR_SUCCESS = "bootldr_success";
            CAuthEvent.BOOTLDR_FAILED = "bootldr_failed";
            CAuthEvent.BOOTLDR_CANCELLED = "bootldr_cancelled";
            CAuthEvent.GROUPID_SUCCESS = "groupid_success";
            CAuthEvent.GROUPID_FAILED = "groupid_failed";
            CAuthEvent.GROUPID_CANCELLED = "groupid_cancelled";
            CAuthEvent.AUTH_SUCCESS = "auth_success";
            CAuthEvent.AUTH_FAILED = "auth_failed";
            CAuthEvent.AUTH_CANCELLED = "auth_cancelled";
            CAuthEvent.LOADER_SUCCESS = "loader_success";
            CAuthEvent.LOADER_FAILED = "loader_failed";
            CAuthEvent.LOADER_CANCELLED = "loader_cancelled";
            CAuthEvent.SUCCESS = "success";
            CAuthEvent.VALIDATE = "validate";
            CAuthEvent.FAIL = "fail";
            exports_90("CAuthEvent", CAuthEvent);
        }
    };
});
System.register("events/CCacheEvent", ["util/CUtil"], function (exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    var CUtil_51, Event, CCacheEvent;
    return {
        setters: [
            function (CUtil_51_1) {
                CUtil_51 = CUtil_51_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CCacheEvent = class CCacheEvent extends Event {
                constructor(type, _target, _id, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.collection = _target;
                    this.query_id = _id;
                }
                clone() {
                    CUtil_51.CUtil.trace("cloning WOZEvent:");
                    return new CCacheEvent(this.type, this.collection, this.query_id, this.bubbles, this.cancelable);
                }
            };
            CCacheEvent.READY = "READY";
            CCacheEvent.ERROR = "ERROR";
            exports_91("CCacheEvent", CCacheEvent);
        }
    };
});
System.register("events/CEFAutomationEvent", [], function (exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    var Event, CEFAutomationEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFAutomationEvent = class CEFAutomationEvent extends Event {
                constructor(type, Result, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this._result = Result;
                }
                clone() {
                    return new CEFAutomationEvent(this.type, this._result, this.bubbles, this.cancelable);
                }
            };
            CEFAutomationEvent.ENDPROMPT = "ENDPROMPT";
            exports_92("CEFAutomationEvent", CEFAutomationEvent);
        }
    };
});
System.register("events/CEFButtonEvent", [], function (exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var Event, CEFButtonEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFButtonEvent = class CEFButtonEvent extends Event {
                constructor(type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                }
            };
            CEFButtonEvent.WOZCHECKED = "wozchecked";
            CEFButtonEvent.WOZUNCHECKED = "wozunchecked";
            exports_93("CEFButtonEvent", CEFButtonEvent);
        }
    };
});
System.register("events/CEFCaptionEvent", ["util/CUtil"], function (exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var Event, CUtil_52, CEFCaptionEvent;
    return {
        setters: [
            function (CUtil_52_1) {
                CUtil_52 = CUtil_52_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFCaptionEvent = class CEFCaptionEvent extends Event {
                constructor(CapIndex, type = CEFCaptionEvent.WOZCAP, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this._CapIndex = CapIndex;
                }
                clone() {
                    CUtil_52.CUtil.trace("cloning WOZEvent:");
                    return new CEFCaptionEvent(this._CapIndex, this.type, this.bubbles, this.cancelable);
                }
            };
            CEFCaptionEvent.WOZCAP = "WOZCAPTION";
            exports_94("CEFCaptionEvent", CEFCaptionEvent);
        }
    };
});
System.register("events/CEFCommandEvent", [], function (exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    var Event, CEFCommandEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFCommandEvent = class CEFCommandEvent extends Event {
                constructor(type, _objCmd, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.objCmd = _objCmd;
                }
                clone() {
                    return new CEFCommandEvent(this.type, this.objCmd, this.bubbles, this.cancelable);
                }
            };
            CEFCommandEvent.OBJCMD = "objcmd";
            exports_95("CEFCommandEvent", CEFCommandEvent);
        }
    };
});
System.register("events/CEFPropertyChangeEventKind", [], function (exports_96, context_96) {
    "use strict";
    var __moduleName = context_96 && context_96.id;
    var CEFPropertyChangeEventKind;
    return {
        setters: [],
        execute: function () {
            CEFPropertyChangeEventKind = class CEFPropertyChangeEventKind {
            };
            CEFPropertyChangeEventKind.UPDATE = "update";
            CEFPropertyChangeEventKind.DELETE = "delete";
            exports_96("CEFPropertyChangeEventKind", CEFPropertyChangeEventKind);
        }
    };
});
System.register("events/CEFPropertyChangeEvent", ["events/CEFPropertyChangeEventKind"], function (exports_97, context_97) {
    "use strict";
    var __moduleName = context_97 && context_97.id;
    var Event, CEFPropertyChangeEventKind_1, CEFPropertyChangeEvent;
    return {
        setters: [
            function (CEFPropertyChangeEventKind_1_1) {
                CEFPropertyChangeEventKind_1 = CEFPropertyChangeEventKind_1_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFPropertyChangeEvent = class CEFPropertyChangeEvent extends Event {
                constructor(type, bubbles = false, cancelable = false, kind = null, property = null, oldValue = null, newValue = null, source = null) {
                    super(type, bubbles, cancelable);
                    this.kind = kind;
                    this.property = property;
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                    this.source = source;
                }
                static createUpdateEvent(source, property, oldValue, newValue) {
                    let event = new CEFPropertyChangeEvent(CEFPropertyChangeEvent.PROPERTY_CHANGE);
                    event.kind = CEFPropertyChangeEventKind_1.CEFPropertyChangeEventKind.UPDATE;
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    event.source = source;
                    event.property = property;
                    return event;
                }
                clone() {
                    return new CEFPropertyChangeEvent(this.type, this.bubbles, this.cancelable, this.kind, this.property, this.oldValue, this.newValue, this.source);
                }
            };
            CEFPropertyChangeEvent.PROPERTY_CHANGE = "propertyChange";
            exports_97("CEFPropertyChangeEvent", CEFPropertyChangeEvent);
        }
    };
});
System.register("events/CEFSelectEvent", ["util/CUtil"], function (exports_98, context_98) {
    "use strict";
    var __moduleName = context_98 && context_98.id;
    var Event, CUtil_53, CEFSelectEvent;
    return {
        setters: [
            function (CUtil_53_1) {
                CUtil_53 = CUtil_53_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            CEFSelectEvent = class CEFSelectEvent extends Event {
                constructor(target, type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.wozSelection = target;
                }
                clone() {
                    CUtil_53.CUtil.trace("cloning CEFSelectEvent:");
                    return new CEFSelectEvent(this.wozSelection, this.type, this.bubbles, this.cancelable);
                }
            };
            CEFSelectEvent.WOZTABSELECT = "WOZTABSELECT";
            CEFSelectEvent.WOZIMGSELECT = "WOZIMGSELECT";
            exports_98("CEFSelectEvent", CEFSelectEvent);
        }
    };
});
System.register("events/CEFTextEvent", ["events/CEFEvent", "util/CUtil"], function (exports_99, context_99) {
    "use strict";
    var __moduleName = context_99 && context_99.id;
    var CEFEvent_15, CUtil_54, CEFTextEvent;
    return {
        setters: [
            function (CEFEvent_15_1) {
                CEFEvent_15 = CEFEvent_15_1;
            },
            function (CUtil_54_1) {
                CUtil_54 = CUtil_54_1;
            }
        ],
        execute: function () {
            CEFTextEvent = class CEFTextEvent extends CEFEvent_15.CEFEvent {
                constructor(TarObjID, Type, Index1 = 0, Index2 = 0, TextData = "", Bubbles = false, Cancelable = false) {
                    super(TarObjID, Type, Bubbles, Cancelable);
                    this.textdata = TextData;
                    this.index1 = Index1;
                    this.index2 = Index2;
                }
                clone() {
                    CUtil_54.CUtil.trace("cloning CEFTextEvent:");
                    return new CEFTextEvent(this.tarObjID, this.type, this.index1, this.index2, this.textdata, this.bubbles, this.cancelable);
                }
            };
            CEFTextEvent.WOZSETSELECTION = "wozSetSelection";
            CEFTextEvent.WOZSETSCROLL = "wozSetScroll";
            CEFTextEvent.WOZINPUTTEXT = "wozInputText";
            CEFTextEvent.WOZCAPTUREFOCUS = "wozCaptureFocus";
            CEFTextEvent.WOZRELEASEFOCUS = "wozReleaseFocus";
            exports_99("CEFTextEvent", CEFTextEvent);
        }
    };
});
System.register("events/CEFTimerEvent", [], function (exports_100, context_100) {
    "use strict";
    var __moduleName = context_100 && context_100.id;
    var Event, CEFTimerEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            CEFTimerEvent = class CEFTimerEvent extends Event {
                constructor(type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                }
            };
            CEFTimerEvent.TIMER_COMPLETE = "complete";
            exports_100("CEFTimerEvent", CEFTimerEvent);
        }
    };
});
System.register("kt/CEFBNode", [], function (exports_101, context_101) {
    "use strict";
    var __moduleName = context_101 && context_101.id;
    var CEFBNode;
    return {
        setters: [],
        execute: function () {
            CEFBNode = class CEFBNode {
                constructor() {
                    this._aritytags = new Array;
                    this._vector = new Array;
                }
                getValue(row, col) {
                    return this._vector[row][col];
                }
                setValue(row, col, newVal) {
                    this._vector[row][col] = newVal;
                }
                normalize() {
                    let sum;
                    let i1;
                    let i2;
                    let width = this._vector[0].length;
                    for (i2 = 0; i2 < width; i2++) {
                        sum = 0;
                        for (i1 = 0; i1 < this._arity; i1++)
                            sum += this._vector[i1][i2];
                        for (i1 = 0; i1 < this._arity; i1++)
                            this._vector[i1][i2] /= sum;
                    }
                }
                tagToNdx(tag) {
                    let i1;
                    for (i1 = 0; i1 < this._arity; i1++) {
                        if (this._aritytags[i1] == tag)
                            return i1;
                    }
                    return -1;
                }
                loadXML(xmlSrc) {
                    let i1;
                    this._name = xmlSrc.name;
                    this._arity = xmlSrc.arity;
                    this._aritytags = xmlSrc.aritytags[0].split(',');
                    for (i1 = 0; i1 < this._arity; i1++) {
                        this._vector.push(xmlSrc.values[i1].split(','));
                    }
                }
                saveXML() {
                    let propVector;
                    return propVector;
                }
            };
            exports_101("CEFBNode", CEFBNode);
        }
    };
});
System.register("kt/CEFKTNode", ["kt/CEFBNode", "events/CEFPropertyChangeEvent"], function (exports_102, context_102) {
    "use strict";
    var __moduleName = context_102 && context_102.id;
    var CEFBNode_1, CEFPropertyChangeEvent_1, EventDispatcher, CEFKTNode;
    return {
        setters: [
            function (CEFBNode_1_1) {
                CEFBNode_1 = CEFBNode_1_1;
            },
            function (CEFPropertyChangeEvent_1_1) {
                CEFPropertyChangeEvent_1 = CEFPropertyChangeEvent_1_1;
            }
        ],
        execute: function () {
            EventDispatcher = createjs.EventDispatcher;
            CEFKTNode = class CEFKTNode extends EventDispatcher {
                CEFKTNode() {
                    this._hypoNode = new CEFBNode_1.CEFBNode;
                    this._evidNode = new CEFBNode_1.CEFBNode;
                }
                set newEvid(evid) {
                    let oldValue = this._hypoNode.getValue(0, 0);
                    let evidNdx = this._evidNode.tagToNdx(evid);
                    let i1;
                    for (i1 = 0; i1 < this._arity; i1++) {
                        this._hypoNode.setValue(i1, 0, this._evidNode.getValue(evidNdx, i1) * this._hypoNode.getValue(i1, 0));
                    }
                    this._hypoNode.normalize();
                    this.dispatchBeliefChangedEvent(oldValue);
                }
                get predValue() {
                    let prediction = 0;
                    prediction += this._evidNode.getValue(0, 0) * this._hypoNode.getValue(0, 0);
                    prediction += this._evidNode.getValue(0, 1) * this._hypoNode.getValue(1, 0);
                    return prediction;
                }
                dispatchBeliefChangedEvent(oldValue) {
                    if (this.hasEventListener("propertyChange"))
                        this.dispatchEvent(CEFPropertyChangeEvent_1.CEFPropertyChangeEvent.createUpdateEvent(this._hypoNode, "value", oldValue, this._hypoNode.getValue(0, 0)));
                }
                get BeliefName() {
                    return this._hypoNode._name;
                }
                get BeliefValue() {
                    return this._hypoNode.getValue(0, 0);
                }
                loadXML(xmlSrc) {
                    this._name = xmlSrc.name;
                    this._pT = xmlSrc.pt;
                    this._hypoNode.loadXML(xmlSrc.hyponode[0]);
                    this._evidNode.loadXML(xmlSrc.evidnode[0]);
                    this._arity = this._hypoNode._arity;
                }
                saveXML() {
                    let propVector;
                    return propVector;
                }
            };
            exports_102("CEFKTNode", CEFKTNode);
        }
    };
});
System.register("kt/CEFProdSys", [], function (exports_103, context_103) {
    "use strict";
    var __moduleName = context_103 && context_103.id;
    var CEFProdSys;
    return {
        setters: [],
        execute: function () {
            CEFProdSys = class CEFProdSys {
                constructor() {
                    this.resetWorkMem();
                }
                resetWorkMem() {
                    this.wm = {};
                }
                setWorkMem(prop, value) {
                    this.wm[prop] = value;
                }
                prop(_prop) {
                    return this.wm[_prop].toString();
                }
                value(_prop) {
                    return this.wm[_prop];
                }
                execRules() {
                    this.wm.rule0 = false;
                    this.wm.rule1 = false;
                    this.wm.rule2 = false;
                    this.wm.ruleTOV = false;
                    this.wm.ruleVVFAR = false;
                    this.wm.ruleCVSLOG = false;
                    if (this.wm.ramp == "NC") {
                        if (this.wm.reasoning == "PHRASE3") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "CVS") {
                        if (this.wm.reasoning == "PHRASE1") {
                            if (this.wm.CVSLogic == "TYPEA") {
                                this.wm.rule0 = true;
                                this.wm.rule1 = true;
                                this.wm.rule2 = true;
                                this.wm.ruleTOV = true;
                                this.wm.ruleVVFAR = true;
                            }
                            else if (this.wm.CVSLogic == "TYPEB") {
                                this.wm.rule0 = true;
                                this.wm.rule1 = true;
                                this.wm.rule2 = true;
                                this.wm.ruleTOV = true;
                                this.wm.ruleVVFAR = true;
                                this.wm.ruleCVSLOG = true;
                            }
                            else if (this.wm.CVSLogic == "TYPEC") {
                                this.wm.rule0 = true;
                                this.wm.rule1 = true;
                                this.wm.rule2 = true;
                            }
                        }
                        else if (this.wm.reasoning == "PHRASE3") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                                this.wm.rule1 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "CVS_WV") {
                        if (this.wm.reasoning == "PHRASE1") {
                            if (this.wm.CVSWVLogic == "TYPEA") {
                                this.wm.rule2 = true;
                            }
                            else if (this.wm.CVSWVLogic == "TYPEB") {
                                this.wm.rule1 = true;
                                this.wm.rule2 = true;
                                this.wm.ruleTOV = true;
                                this.wm.ruleVVFAR = true;
                                this.wm.ruleCVSLOG = true;
                            }
                            else if (this.wm.CVSWVLogic == "TYPEC") {
                                this.wm.rule1 = true;
                                this.wm.rule2 = true;
                            }
                        }
                        else if (this.wm.reasoning == "PHRASE3") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                            }
                            this.wm.ruleTOV = true;
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "SC") {
                        if (this.wm.reasoning == "PHRASE4") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                            }
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "SC_WV") {
                        if (this.wm.reasoning == "PHRASE4") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                            }
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "DC") {
                        if (this.wm.reasoning == "PHRASE4") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                            }
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                        }
                    }
                    else if (this.wm.ramp == "MC") {
                        if (this.wm.reasoning == "PHRASE2") {
                            this.wm.rule1 = true;
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE3") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            this.wm.rule1 = true;
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            this.wm.rule1 = true;
                            this.wm.ruleVVFAR = true;
                        }
                    }
                    else if (this.wm.ramp == "HOTAT") {
                        if (this.wm.reasoning == "PHRASE4") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                            }
                            this.wm.ruleVVFAR = true;
                        }
                        else if (this.wm.reasoning == "PHRASE6") {
                            if (this.wm.corrTYPE1 == "true") {
                                this.wm.rule0 = true;
                            }
                            if (this.wm.corrTYPE2 == "true") {
                                this.wm.ruleTOV = true;
                            }
                            if (this.wm.corrTYPE3 == "true") {
                                this.wm.rule1 = true;
                                this.wm.ruleVVFAR = true;
                            }
                        }
                    }
                }
            };
            exports_103("CEFProdSys", CEFProdSys);
        }
    };
});
System.register("thermite/IThermiteTypes", [], function (exports_104, context_104) {
    "use strict";
    var __moduleName = context_104 && context_104.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("thermite/TCheckButton", ["thermite/TButton", "util/CONST", "util/CUtil"], function (exports_105, context_105) {
    "use strict";
    var __moduleName = context_105 && context_105.id;
    var TButton_2, CONST_19, CUtil_55, TCheckButton;
    return {
        setters: [
            function (TButton_2_1) {
                TButton_2 = TButton_2_1;
            },
            function (CONST_19_1) {
                CONST_19 = CONST_19_1;
            },
            function (CUtil_55_1) {
                CUtil_55 = CUtil_55_1;
            }
        ],
        execute: function () {
            TCheckButton = class TCheckButton extends TButton_2.TButton {
                constructor() {
                    super();
                    this.fChecked = false;
                    this._ftrChecked = "";
                    this._ftrUnchecked = "";
                    this.init4();
                }
                TCheckButtonInitialize() {
                    this.TButtonInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.TButtonInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_55.CUtil.trace("TCheckButton:Constructor");
                    this.STATE_CHECKED = "Schecked";
                }
                Destructor() {
                    super.Destructor();
                }
                onAddedToStage(evt) {
                    super.onAddedToStage(evt);
                    this.addChild(this[this.STATE_CHECKED]);
                    this[this.STATE_CHECKED].visible = false;
                }
                highLight(color) {
                    this.Slabel.color = color;
                }
                set label(newLabel) {
                    this.Slabel.text = newLabel;
                }
                get label() {
                    return this.Slabel.text;
                }
                set showLabel(bVisible) {
                    this.Slabel.visible = bVisible;
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    this.fChecked = false;
                    super.restoreDefState(TutScene);
                }
                deepStateCopy(src) {
                    this.fChecked = src["fChecked"];
                    this.curState = src["curState"];
                    this._isvalid = src["_isvalid"];
                    this.label = src["Slabel"].label.text;
                    this.Slabel.visible = src["Slabel"].visible;
                    this.gotoState(this.curState);
                    super.deepStateCopy(src);
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['checked'] = this.fChecked.toString();
                    return obj;
                }
                captureXMLState() {
                    let xmlVal = super.captureXMLState();
                    xmlVal.checked = this.fChecked.toString();
                    return xmlVal;
                }
                resetState() {
                    super.resetState();
                    this[this.STATE_CHECKED].visible = false;
                }
                gotoState(sState) {
                    if (this.traceMode)
                        CUtil_55.CUtil.trace("Button.gotoState: ", name + " " + sState);
                    this.resetState();
                    this.curState = sState;
                    if (!this.fEnabled) {
                        this[this.STATE_UP].visible = false;
                        this[this.STATE_DISABLED].visible = true;
                        this.fPressed = false;
                    }
                    else
                        switch (sState) {
                            case this.STATE_DOWN:
                                this[this.STATE_DOWN].visible = true;
                                this.fPressed = true;
                                break;
                            case this.STATE_UP:
                                if (this.fChecked)
                                    this[this.STATE_CHECKED].visible = true;
                                else
                                    this[this.STATE_UP].visible = true;
                                this.fPressed = false;
                                break;
                            case this.STATE_OVER:
                                if (!this.fPressed) {
                                    if (this.fChecked)
                                        this[this.STATE_CHECKED].visible = true;
                                    else
                                        this[this.STATE_OVER].visible = true;
                                }
                                else
                                    this[this.STATE_DOWN].visible = true;
                                this.fOver = true;
                                break;
                            case CONST_19.CONST.STATE_OUT:
                                if (this.fChecked)
                                    this[this.STATE_CHECKED].visible = true;
                                else
                                    this[this.STATE_UP].visible = true;
                                this.fOver = false;
                                this.fPressed = false;
                                break;
                        }
                }
                doMouseClicked(evt) {
                    this.setCheck(!this.fChecked);
                    if (this.traceMode)
                        CUtil_55.CUtil.trace("Setting Checked State: " + this.fChecked + " on button: " + name);
                    this.doClickActions(evt);
                }
                setCheck(bCheck) {
                    this.fChecked = bCheck;
                    this.gotoState(this.STATE_UP);
                }
                getChecked() {
                    return this.fChecked;
                }
                assertFeatures() {
                    if (this.fChecked) {
                        this._activeFeature = this._ftrChecked;
                    }
                    else {
                        this._activeFeature = this._ftrUnchecked;
                    }
                    if (this._activeFeature != "") {
                        this.tutorDoc.addFeature(this._activeFeature);
                    }
                    return this.activeFeature;
                }
                retractFeatures() {
                    if (this._ftrChecked != "") {
                        this.tutorDoc.delFeature(this._ftrChecked);
                    }
                    if (this._ftrUnchecked != "") {
                        this.tutorDoc.delFeature(this._ftrUnchecked);
                    }
                }
                loadXML(xmlSrc) {
                    super.loadXML(xmlSrc);
                    if (xmlSrc.valid != undefined)
                        this._isvalid = xmlSrc.valid;
                    if (xmlSrc.ftrChecked != undefined)
                        this._ftrChecked = xmlSrc.ftrChecked;
                    if (xmlSrc.ftrUnchecked != undefined)
                        this._ftrUnchecked = xmlSrc.ftrUnchecked;
                    if (xmlSrc.checked != undefined)
                        this.setCheck(Boolean(xmlSrc.checked == "true" ? true : false));
                    if (xmlSrc.label != undefined)
                        this.setLabel(xmlSrc.label);
                    if (xmlSrc.showlabel != undefined)
                        this.showLabel = (Boolean(xmlSrc.showlabel == "true" ? true : false));
                }
                saveXML() {
                    let propVector;
                    return propVector;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: CheckButton Control");
                    super.deSerializeObj(objData);
                }
            };
            exports_105("TCheckButton", TCheckButton);
        }
    };
});
System.register("thermite/events/TButtonEvent", [], function (exports_106, context_106) {
    "use strict";
    var __moduleName = context_106 && context_106.id;
    var Event, TButtonEvent;
    return {
        setters: [],
        execute: function () {
            Event = createjs.Event;
            TButtonEvent = class TButtonEvent extends Event {
                constructor(type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                }
            };
            TButtonEvent.WOZCHECKED = "wozchecked";
            TButtonEvent.WOZUNCHECKED = "wozunchecked";
            exports_106("TButtonEvent", TButtonEvent);
        }
    };
});
System.register("thermite/TButtonGroup", ["thermite/TObject", "thermite/events/TButtonEvent", "util/CONST", "util/CUtil", "events/CEFEvent"], function (exports_107, context_107) {
    "use strict";
    var __moduleName = context_107 && context_107.id;
    var TObject_17, TButtonEvent_1, CONST_20, CUtil_56, CEFEvent_16, TButtonGroup;
    return {
        setters: [
            function (TObject_17_1) {
                TObject_17 = TObject_17_1;
            },
            function (TButtonEvent_1_1) {
                TButtonEvent_1 = TButtonEvent_1_1;
            },
            function (CONST_20_1) {
                CONST_20 = CONST_20_1;
            },
            function (CUtil_56_1) {
                CUtil_56 = CUtil_56_1;
            },
            function (CEFEvent_16_1) {
                CEFEvent_16 = CEFEvent_16_1;
            }
        ],
        execute: function () {
            TButtonGroup = class TButtonGroup extends TObject_17.TObject {
                constructor() {
                    super();
                    this.buttonType = new Array();
                    this._fRadioGroup = true;
                    this._inited = false;
                    this.onChangeScript = null;
                    this.init3();
                }
                TButtonGroupInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_56.CUtil.trace("TButtonGroup:Constructor");
                    this.buttons = new Array();
                    this.buttonType = new Array();
                    this.on(CEFEvent_16.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                    this._fRadioGroup = true;
                    this._inited = false;
                    this.onChangeScript = null;
                }
                onAddedToStage(evt) {
                    console.log("ButtonGroup On Stage");
                    this.mouseChildren = false;
                    this.Sborder.visible = false;
                    this.Sborder.hidden = true;
                }
                addButton(newButton, bType = "") {
                    this.buttons.push(newButton);
                    this.buttonType.push(bType);
                    newButton.on(CONST_20.CONST.BUTTON_CLICK, this.updateGroupChk, this);
                }
                removeButton(newButton) {
                    newButton.off(CONST_20.CONST.BUTTON_CLICK, this.updateGroupChk);
                }
                updateGroupChk(evt) {
                    let i1;
                    let _radioReset = false;
                    this.doAction(evt);
                    let logData = { 'action': 'button_click', 'targetid': this.name };
                    dispatchEvent(new Event(TButtonGroup.CHECKED));
                    this.tutorDoc.log.logActionEvent(logData);
                    for (i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1] == evt.target) {
                            if (this.buttonType[i1] == "radio")
                                _radioReset = true;
                        }
                    }
                    if (this._fRadioGroup || _radioReset) {
                        for (i1 = 0; i1 < this.buttons.length; i1++) {
                            if (this.buttons[i1] != evt.target) {
                                this.buttons[i1].setCheck(false);
                            }
                        }
                    }
                    else {
                        for (i1 = 0; i1 < this.buttons.length; i1++) {
                            if ((this.buttons[i1] != evt.target) && (this.buttonType[i1] == "radio")) {
                                this.buttons[i1].setCheck(false);
                            }
                        }
                    }
                }
                updateGroupUnChk(evt) {
                    this.dispatchEvent(new Event(TButtonEvent_1.TButtonEvent.WOZCHECKED));
                }
                set radioType(fRadioGroup) {
                    this._fRadioGroup = fRadioGroup;
                }
                get isComplete() {
                    let sResult = "false";
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked()) {
                            sResult = "true";
                            break;
                        }
                    }
                    return sResult;
                }
                querySelectedValid() {
                    let sResult = "true";
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked()) {
                            if (this.buttons[i1].isValid == "false") {
                                sResult = "false";
                                break;
                            }
                        }
                        else {
                            if (this.buttons[i1].isValid == "true") {
                                sResult = "false";
                                break;
                            }
                        }
                    }
                    return sResult;
                }
                resetAll() {
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        this.buttons[i1].resetState();
                    }
                }
                highLightRightOnly() {
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].isValid == "true")
                            this.buttons[i1].setCheck2(true);
                        else
                            this.buttons[i1].resetState();
                    }
                }
                highLightRightLabel(hColor) {
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].isValid == "true")
                            this.buttons[i1].highLight(hColor);
                    }
                }
                highLightWrong() {
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked()) {
                            if (this.buttons[i1].isValid != "true") {
                                this.buttons[i1].setCheck3(true);
                            }
                        }
                    }
                }
                get isValid() {
                    let sResult = "true";
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked() == true) {
                            if (this.buttons[i1].isValid != "true") {
                                sResult = "false";
                                break;
                            }
                        }
                        else {
                            if (this.buttons[i1].isValid == "true") {
                                sResult = "false";
                                break;
                            }
                        }
                    }
                    return sResult;
                }
                assertFeatures() {
                    let _feature;
                    if (this.isValid == "true") {
                        _feature = this._validFeature;
                    }
                    else {
                        _feature = this._invalidFeature;
                    }
                    if (_feature != "")
                        this.tutorDoc.addFeature(_feature);
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        this.buttons[i1].assertFeatures();
                    }
                    return _feature;
                }
                retractFeatures() {
                    let _feature;
                    if (this.isValid == "true") {
                        _feature = this._validFeature;
                    }
                    else {
                        _feature = this._invalidFeature;
                    }
                    if (_feature != "")
                        this.tutorDoc.delFeature(_feature);
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        this.buttons[i1].retractFeatures();
                    }
                }
                get tallyValid() {
                    let iResult = 0;
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked() == true) {
                            if (this.buttons[i1].isValid != "true") {
                                iResult = 0;
                                break;
                            }
                            else
                                iResult++;
                        }
                    }
                    return iResult.toString();
                }
                get tallySelected() {
                    let iResult = 0;
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked() == true) {
                            iResult++;
                        }
                    }
                    return iResult.toString();
                }
                get ansText() {
                    let sResult = "";
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked()) {
                            if (sResult.length > 0)
                                sResult += ",";
                            sResult += this.buttons[i1].getLabel();
                        }
                    }
                    return sResult;
                }
                get inUse() {
                    return this._inited;
                }
                logState() {
                    let groupState;
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (this.buttons[i1].getChecked()) {
                            break;
                        }
                    }
                    return groupState;
                }
                querylogGroup() {
                    let groupState = "";
                    for (let i1 = 0; i1 < this.buttons.length; i1++) {
                        if (i1 > 0)
                            groupState += ",";
                        if (this.buttons[i1].getChecked())
                            groupState += "B" + i1 + "_Checked";
                        else
                            groupState += "B" + i1 + "_Unchecked";
                    }
                    return groupState;
                }
                loadXML(xmlSrc) {
                    let tarButton;
                    let objArray;
                    super.loadXML(xmlSrc);
                    for (let butInst of xmlSrc.button) {
                        CUtil_56.CUtil.trace(butInst.name);
                        try {
                            objArray = butInst.name.split(".");
                            if (this.traceMode)
                                CUtil_56.CUtil.trace("Target Array: " + objArray[0]);
                            if (objArray.length)
                                tarButton = this.decodeTarget(this.parent, objArray);
                        }
                        catch (err) {
                            tarButton = null;
                        }
                        if (tarButton) {
                            if (butInst.type != undefined)
                                this.addButton(tarButton, butInst.type);
                            else
                                this.addButton(tarButton);
                        }
                    }
                    if (xmlSrc.xname != undefined)
                        this.xname = xmlSrc.xname;
                    if (xmlSrc.radioType != undefined)
                        this.radioType = (Boolean(xmlSrc.radioType == "true" ? true : false));
                    if (xmlSrc.validftr != undefined)
                        this._validFeature = xmlSrc.validftr;
                    if (xmlSrc.invalidftr != undefined)
                        this._invalidFeature = xmlSrc.invalidftr;
                    if (xmlSrc.onchange != undefined) {
                        this.onChangeScript = xmlSrc.onchange;
                    }
                    this._inited = true;
                }
                saveXML() {
                    let propVector;
                    return propVector;
                }
                initGroupFromData(objData) {
                    let btnOwner = this.parent;
                    objData.members.forEach((btnName) => {
                        this.addButton(btnOwner[btnName], objData.type || "radio");
                    });
                }
                deSerializeObj(objData) {
                    console.log("deserializing: ButtonGroup");
                    super.deSerializeObj(objData);
                    if (objData.grpData)
                        this.initGroupFromData(objData.grpData);
                }
            };
            TButtonGroup.CHECKED = "ischecked";
            exports_107("TButtonGroup", TButtonGroup);
        }
    };
});
System.register("thermite/TRadioButton", ["thermite/TCheckButton", "thermite/events/TButtonEvent", "util/CUtil"], function (exports_108, context_108) {
    "use strict";
    var __moduleName = context_108 && context_108.id;
    var TCheckButton_1, TButtonEvent_2, CUtil_57, TRadioButton;
    return {
        setters: [
            function (TCheckButton_1_1) {
                TCheckButton_1 = TCheckButton_1_1;
            },
            function (TButtonEvent_2_1) {
                TButtonEvent_2 = TButtonEvent_2_1;
            },
            function (CUtil_57_1) {
                CUtil_57 = CUtil_57_1;
            }
        ],
        execute: function () {
            TRadioButton = class TRadioButton extends TCheckButton_1.TCheckButton {
                constructor() {
                    super();
                    this.init5();
                }
                TRadioButtonInitialize() {
                    this.TCheckButtonInitialize.call(this);
                    this.init5();
                }
                initialize() {
                    this.TCheckButtonInitialize.call(this);
                    this.init5();
                }
                init5() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_57.CUtil.trace("TRadioButton:Constructor");
                }
                doMouseClicked(evt) {
                    this.setCheck(true);
                    if (this.traceMode)
                        CUtil_57.CUtil.trace("Setting Checked State: " + this.fChecked + " on button: " + name);
                    this.doClickActions(evt);
                }
                setCheck(bCheck) {
                    super.setCheck(bCheck);
                    if (this.fChecked)
                        this.dispatchEvent(new TButtonEvent_2.TButtonEvent(TButtonEvent_2.TButtonEvent.WOZCHECKED));
                    else
                        this.dispatchEvent(new TButtonEvent_2.TButtonEvent(TButtonEvent_2.TButtonEvent.WOZUNCHECKED));
                }
            };
            exports_108("TRadioButton", TRadioButton);
        }
    };
});
System.register("thermite/TCheckBox", ["thermite/TRadioButton", "events/CEFEvent", "util/CUtil"], function (exports_109, context_109) {
    "use strict";
    var __moduleName = context_109 && context_109.id;
    var TRadioButton_1, CEFEvent_17, CUtil_58, TCheckBox;
    return {
        setters: [
            function (TRadioButton_1_1) {
                TRadioButton_1 = TRadioButton_1_1;
            },
            function (CEFEvent_17_1) {
                CEFEvent_17 = CEFEvent_17_1;
            },
            function (CUtil_58_1) {
                CUtil_58 = CUtil_58_1;
            }
        ],
        execute: function () {
            TCheckBox = class TCheckBox extends TRadioButton_1.TRadioButton {
                constructor() {
                    super();
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_58.CUtil.trace("CheckBox:Constructor");
                }
                doMouseClick(evt) {
                    this.setCheck(!this.fChecked);
                    if (this.traceMode)
                        CUtil_58.CUtil.trace("Setting Checked State: " + this.fChecked + " on button: " + name);
                }
                setCheck(bCheck) {
                    super.setCheck(bCheck);
                    this.dispatchEvent(new Event(CEFEvent_17.CEFEvent.CHANGE));
                }
                setCheck2(bCheck) {
                    this.resetState();
                    this["Scheck2"].visible = bCheck;
                }
                setCheck3(bCheck) {
                    this.resetState();
                    this["Scheck3"].visible = bCheck;
                }
                resetState() {
                    super.resetState();
                    this["Scheck2"].visible = false;
                    this["Scheck3"].visible = false;
                }
                deepStateCopy(src) {
                    this.fChecked = src["fChecked"];
                    this.curState = src["curState"];
                    this._isvalid = src["_isvalid"];
                    this["Schecked"].visible = src["Schecked"].visible;
                    this["Scheck2"].visible = src["Scheck2"].visible;
                    this["Scheck3"].visible = src["Scheck3"].visible;
                    this.label = src["Slabel"].label.text;
                }
            };
            exports_109("TCheckBox", TCheckBox);
        }
    };
});
System.register("thermite/TClickMask", ["thermite/TObject", "events/CEFEvent", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_110, context_110) {
    "use strict";
    var __moduleName = context_110 && context_110.id;
    var TObject_18, CEFEvent_18, TMouseEvent_4, CUtil_59, TClickMask;
    return {
        setters: [
            function (TObject_18_1) {
                TObject_18 = TObject_18_1;
            },
            function (CEFEvent_18_1) {
                CEFEvent_18 = CEFEvent_18_1;
            },
            function (TMouseEvent_4_1) {
                TMouseEvent_4 = TMouseEvent_4_1;
            },
            function (CUtil_59_1) {
                CUtil_59 = CUtil_59_1;
            }
        ],
        execute: function () {
            TClickMask = class TClickMask extends TObject_18.TObject {
                constructor() {
                    super();
                    this.init3();
                }
                TClickMaskInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_59.CUtil.trace("TClickMask:Constructor");
                    this.on(CEFEvent_18.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                }
                Destructor() {
                    super.Destructor();
                }
                onAddedToStage(evt) {
                    console.log("ClickMask On Stage");
                    this.mouseChildren = false;
                    this.on(TMouseEvent_4.TMouseEvent.MOUSE_CLICK, this.doMouseEvent, this);
                    this.on(TMouseEvent_4.TMouseEvent.MOUSE_OVER, this.doMouseEvent, this);
                    this.on(TMouseEvent_4.TMouseEvent.MOUSE_OUT, this.doMouseEvent, this);
                    this.on(TMouseEvent_4.TMouseEvent.MOUSE_DOWN, this.doMouseEvent, this);
                    this.on(TMouseEvent_4.TMouseEvent.MOUSE_UP, this.doMouseEvent, this);
                }
                doMouseEvent(evt) {
                    evt.stopImmediatePropagation();
                    console.log("NOTICE: Event Masked by TClickMask Object");
                }
            };
            exports_110("TClickMask", TClickMask);
        }
    };
});
System.register("thermite/THtmlButton", ["thermite/TButton", "util/CUtil"], function (exports_111, context_111) {
    "use strict";
    var __moduleName = context_111 && context_111.id;
    var TButton_3, CUtil_60, THtmlButton;
    return {
        setters: [
            function (TButton_3_1) {
                TButton_3 = TButton_3_1;
            },
            function (CUtil_60_1) {
                CUtil_60 = CUtil_60_1;
            }
        ],
        execute: function () {
            THtmlButton = class THtmlButton extends TButton_3.TButton {
                constructor() {
                    super();
                    this.init4();
                }
                THtmlButtonInitialize() {
                    this.TButtonInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.TButtonInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_60.CUtil.trace("THtmlButton:Constructor");
                }
                Destructor() {
                    if (this.fAdded && this.stage) {
                        this.stage.removeEventListener('drawstart', this._updateVisibilityCbk);
                        this.stage.removeEventListener('drawend', this._updateComponentCbk);
                    }
                    this.Stext.Destructor();
                    super.Destructor();
                    this.fAdded = false;
                }
                onAddedToStage(evt) {
                    let stage;
                    console.log("THtmlButton On Stage");
                    super.onAddedToStage(evt);
                    if (!this.fAdded) {
                        this.fAdded = true;
                        if (stage = this.getStage()) {
                            this._updateVisibilityCbk = stage.on('drawstart', this._handleDrawStart, this, false);
                            this._updateComponentCbk = stage.on('drawend', this._handleDrawEnd, this, false);
                        }
                    }
                    this.Stext.onAddedToStage(evt);
                }
                _handleDrawStart(evt) {
                }
                _handleDrawEnd(evt) {
                    if (this.fAdded && !this.HTMLmute) {
                        this.Stext.alpha = this.alpha;
                    }
                }
                addHTMLControls() {
                    this.Stext.addHTMLControls();
                }
                setContext(_hostModule, _ownerModule, _hostScene) {
                    super.setContext(_hostModule, _ownerModule, _hostScene);
                    this.Stext.setContext(_hostModule, _ownerModule, _hostScene);
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: Text Control");
                    if (objData.buttonHTML)
                        this.Stext.deSerializeObj(objData.buttonHTML);
                }
            };
            exports_111("THtmlButton", THtmlButton);
        }
    };
});
System.register("thermite/THtmlInput", ["thermite/THtmlBase", "util/CUtil", "util/CONST"], function (exports_112, context_112) {
    "use strict";
    var __moduleName = context_112 && context_112.id;
    var THtmlBase_2, CUtil_61, CONST_21, THtmlInput;
    return {
        setters: [
            function (THtmlBase_2_1) {
                THtmlBase_2 = THtmlBase_2_1;
            },
            function (CUtil_61_1) {
                CUtil_61 = CUtil_61_1;
            },
            function (CONST_21_1) {
                CONST_21 = CONST_21_1;
            }
        ],
        execute: function () {
            THtmlInput = class THtmlInput extends THtmlBase_2.THtmlBase {
                constructor() {
                    super();
                }
                THtmlInputInitialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_61.CUtil.trace("THtmlInput:Constructor");
                    this.cssSheet = {
                        "[efinput].outerContainer": {
                            "position": "absolute",
                            "box-sizing": "border-box",
                            "resize": "none",
                            "border": "none",
                            "left": "0px",
                            "top": "0px",
                            "width": "0px",
                            "height": "0px",
                            "pointer-events": "all",
                            "font-Family": "verdana",
                            "font-Size": "10px",
                            "font-Style": "normal",
                            "font-Weight": "normal",
                            "padding": "0px",
                            "margin": "0px",
                            "visibility": "hidden"
                        },
                        "[efinput] .input": {
                            "box-sizing": "border-box",
                            "resize": "inherit",
                            "border": "inherit",
                            "left": "inherit",
                            "top": "inherit",
                            "width": "inherit",
                            "height": "inherit",
                            "pointer-events": "all",
                            "font-Family": "verdana",
                            "font-Size": "inherit",
                            "font-Style": "normal",
                            "font-Weight": "normal",
                        }
                    };
                }
                onAddedToStage(evt) {
                    console.log("HTMLInput On Stage");
                    if (!this.fAdded) {
                        this.dimContainer = this.SControlContainer;
                        this.SControlContainer.visible = false;
                        this.outerContainer = document.createElement("div");
                        this.outerContainer.className = "outerContainer";
                        this.outerContainer.setAttribute(CONST_21.CONST.EFINPUT_TYPE, "");
                        this.outerContainer.setAttribute(this.name, "");
                        this.controlContainer = this.outerContainer;
                        super.onAddedToStage(evt);
                    }
                }
                hasMinWords(cnt = 0, minLen = 8) {
                    var regEx;
                    var regStr;
                    var i1;
                    var fResult = false;
                    if (cnt == 0) {
                        if (this.getText().length >= 1)
                            fResult = true;
                    }
                    else if (this.getText().length >= minLen) {
                        regStr = "^(.+";
                        for (i1 = 1; i1 < cnt; i1++) {
                            regStr += "\\s+.+";
                        }
                        regStr += "(\b|\.))";
                        regEx = new RegExp(regStr, "i");
                        fResult = (this.getText().search(regEx) != -1);
                    }
                    return fResult;
                }
                setFocus(focus) {
                }
                setEnabled(enabled) {
                }
                fontContainsElement(attr, candidates) {
                    let result = null;
                    let match = null;
                    for (let candidate of candidates) {
                        if (match = attr.match(candidate)) {
                            result = match[0];
                            break;
                        }
                    }
                    return result;
                }
                decomposeFont(fontSpec, fontStr) {
                    let match = null;
                    let styles = ["normal", "italic", "oblique", "initial", "inherit"];
                    let weights = ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900", "initial", "inherit"];
                    let sizes = [/\d*px/];
                    if (fontStr) {
                        if (match = fontStr.match(/'[\w\s]*'/))
                            fontSpec.fontFamily = match[0];
                        fontSpec.fontStyle = this.fontContainsElement(fontStr, styles) || fontSpec.fontStyle;
                        fontSpec.fontWeight = this.fontContainsElement(fontStr, weights) || fontSpec.fontWeight;
                        fontSpec.fontSize = this.fontContainsElement(fontStr, sizes) || fontSpec.fontSize;
                    }
                    return fontSpec;
                }
                createFont(size, attributes, formatting, style, link) {
                    let font = Object.assign({}, this.defaultFont);
                    font.size = size;
                    font.text = String(size) + "pt " + font.name;
                    font.attributes = attributes;
                    font.formatting = formatting;
                    font.link = link;
                    font.style = style ? style : 'black';
                    if (font.attributes) {
                        if (font.attributes.bold)
                            font.text = "bold " + font.text;
                        if (font.attributes.italic)
                            font.text = "italic " + font.text;
                    }
                    return font;
                }
                ;
                setOnKeyPress() {
                    document.onkeypress = (event) => {
                        if (this.hasFocus()) {
                            let code = event.keyCode;
                            if (code !== 8 && code !== 13 && code != 9) {
                                let text = String.fromCharCode(code);
                                this.textInput(text);
                            }
                            event.preventDefault();
                        }
                    };
                }
                setOnKeyDown() {
                    document.onkeydown = (event) => {
                        if (this.hasFocus()) {
                            let keyCode = event.keyCode;
                            let keyText = "";
                            if (keyCode === 13)
                                keyText = "Enter";
                            else if (keyCode === 8)
                                keyText = "Backspace";
                            else if (keyCode === 37)
                                keyText = "ArrowLeft";
                            else if (keyCode === 38)
                                keyText = "ArrowUp";
                            else if (keyCode === 39)
                                keyText = "ArrowRight";
                            else if (keyCode === 40)
                                keyText = "ArrowDown";
                            if (keyText) {
                                this.keyDown(keyText);
                                event.preventDefault();
                            }
                        }
                    };
                }
                setOnCut() {
                    window.addEventListener('cut', function (event) {
                        if (event.clipboardData) {
                            let out = this.export("text", true);
                            if (out) {
                                this.deleteSelection();
                                event.clipboardData.setData('text/plain', out);
                                event.preventDefault();
                            }
                        }
                    });
                }
                setOnCopy() {
                    window.addEventListener('copy', function (event) {
                        if (event.clipboardData) {
                            let out = this.export("text", true);
                            if (out) {
                                event.clipboardData.setData('text/plain', out);
                                event.preventDefault();
                            }
                        }
                    });
                }
                setOnPaste() {
                    window.addEventListener('paste', function (event) {
                        if (event.clipboardData) {
                            let text = event.clipboardData.getData('text/plain');
                            if (text) {
                                this.deleteSelection();
                                this.textInput(text);
                                this.update();
                                event.preventDefault();
                            }
                        }
                    });
                }
                _handleDrawEnd(evt) {
                    super._handleDrawEnd(evt);
                }
                deSerializeObj(objData) {
                    this.fontSize = objData.fontSize || this.fontSize;
                    super.deSerializeObj(objData);
                    console.log("deserializing: Input Custom Control");
                }
            };
            exports_112("THtmlInput", THtmlInput);
        }
    };
});
System.register("thermite/THtmlList", ["thermite/THtmlBase", "util/CUtil", "util/CONST"], function (exports_113, context_113) {
    "use strict";
    var __moduleName = context_113 && context_113.id;
    var THtmlBase_3, CUtil_62, CONST_22, THtmlList;
    return {
        setters: [
            function (THtmlBase_3_1) {
                THtmlBase_3 = THtmlBase_3_1;
            },
            function (CUtil_62_1) {
                CUtil_62 = CUtil_62_1;
            },
            function (CONST_22_1) {
                CONST_22 = CONST_22_1;
            }
        ],
        execute: function () {
            THtmlList = class THtmlList extends THtmlBase_3.THtmlBase {
                constructor() {
                    super();
                }
                THtmlListInitialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_62.CUtil.trace("THtmlList:Constructor");
                    this.cssSheet = {
                        ".outerContainer": {
                            "position": "absolute",
                            "box-sizing": "border-box",
                            "visibility": "hidden"
                        },
                        ".tablecell": {
                            "display": "table-cell",
                            "box-sizing": "border-box",
                            "height": "inherit",
                            "width": "inherit",
                            "vertical-align": "middle",
                            "user-select": "none"
                        },
                        "p": {
                            "margin": "0px"
                        }
                    };
                }
                onAddedToStage(evt) {
                    console.log("HTMLList On Stage");
                    if (!this.fAdded) {
                        this.dimContainer = this.SControlContainer;
                        this.SControlContainer.visible = false;
                        this.outerContainer = document.createElement("div");
                        this.outerContainer.className = "outerContainer";
                        this.outerContainer.setAttribute(CONST_22.CONST.EFLISTBOX_TYPE, "");
                        this.outerContainer.setAttribute(this.name, "");
                        this.controlContainer = document.createElement("div");
                        this.controlContainer.className = "tablecell";
                        this.outerContainer.appendChild(this.controlContainer);
                        super.onAddedToStage(evt);
                    }
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: Input Custom Control");
                }
            };
            exports_113("THtmlList", THtmlList);
        }
    };
});
System.register("thermite/THtmlList1", ["thermite/THtmlBase", "util/CUtil", "util/CONST"], function (exports_114, context_114) {
    "use strict";
    var __moduleName = context_114 && context_114.id;
    var THtmlBase_4, CUtil_63, CONST_23, THtmlList1;
    return {
        setters: [
            function (THtmlBase_4_1) {
                THtmlBase_4 = THtmlBase_4_1;
            },
            function (CUtil_63_1) {
                CUtil_63 = CUtil_63_1;
            },
            function (CONST_23_1) {
                CONST_23 = CONST_23_1;
            }
        ],
        execute: function () {
            THtmlList1 = class THtmlList1 extends THtmlBase_4.THtmlBase {
                constructor() {
                    super();
                }
                THtmlList1Initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_63.CUtil.trace("THtmlList1:Constructor");
                    this.arrowScale = 4.5;
                    this.selected = null;
                    this.ARROWNORMAL = "[eflist] .listbox::after";
                    this.ARROWACTIVE = "[eflist] .listbox.active::after";
                    this.cssSheet = {
                        "[eflist].outerContainer": {
                            "position": "absolute",
                            "visibility": "hidden",
                            "top": "0px",
                            "left": "0px",
                            "height": "44px",
                            "width": "400px",
                            "font-family": "Arial",
                            "font-size": "14px",
                            "pointer-events": "all"
                        },
                        "[eflist].outerContainer select": {
                            "display": "none",
                        },
                        "[eflist] .listbox": {
                            "display": "table-cell",
                            "height": "inherit",
                            "width": "inherit",
                            "box-sizing": "border-box",
                            "vertical-align": "middle",
                        },
                        "[eflist] .listoptions div, [eflist] .listbox": {
                            "color": "#ffffff",
                            "padding": "8px 16px",
                            "border": "1px solid transparent",
                            "border-color": "transparent transparent rgba(0, 0, 0, 0.1) transparent",
                            "cursor": "pointer",
                            "user-select": "none",
                        },
                        "[eflist] .listoptions": {
                            "position": "absolute",
                            "top": "100%",
                            "left": "0",
                            "right": "0",
                            "z-index": "99",
                        },
                        "[eflist] .color": {
                            "background-color": "DodgerBlue",
                        },
                        "[eflist] .hideoptions": {
                            "display": "none",
                        },
                        "[eflist] .listoptions div:hover, [eflist] .isselected": {
                            "background-color": "rgba(0, 0, 0, 0.1)"
                        },
                        "[eflist] .listbox::after": {
                            "position": "absolute",
                            "box-sizing": "border-box",
                            "content": "",
                            "top": "12px",
                            "right": "10px",
                            "width": "32",
                            "border": " solid transparent",
                            "border-color": "#fff transparent transparent transparent"
                        },
                        "[eflist] .listbox.active::after": {
                            "border-color": "transparent transparent #fff transparent",
                            "top": "-4px"
                        }
                    };
                }
                onAddedToStage(evt) {
                    console.log("HTMLList On Stage");
                    if (!this.fAdded) {
                        this.dimContainer = this.SControlContainer;
                        this.SControlContainer.visible = false;
                        this.outerContainer = document.createElement("div");
                        this.outerContainer.className = "outerContainer";
                        this.outerContainer.setAttribute(CONST_23.CONST.EFLISTBOX_TYPE, "");
                        this.outerContainer.setAttribute(this.name, "");
                        this.efListBox = document.createElement("DIV");
                        this.efListBox.setAttribute("class", "listbox color");
                        this.outerContainer.appendChild(this.efListBox);
                        let host = this;
                        this.efListBox.addEventListener("click", function (e) {
                            if (host.fEnabled) {
                                e.stopPropagation();
                                host.closeAllSelect(this);
                                host.efListBox.nextElementSibling.classList.toggle("hideoptions");
                                host.efListBox.classList.toggle("active");
                            }
                        });
                        this.efListOptions = document.createElement("DIV");
                        this.efListOptions.setAttribute("class", "listoptions color hideoptions");
                        this.efList = new Array();
                        this.controlContainer = this.outerContainer;
                        this.controlContainer.appendChild(this.efListOptions);
                        super.onAddedToStage(evt);
                        document.addEventListener("click", function (e) {
                            host.closeAllSelect(null);
                        });
                    }
                }
                setColor(bgcolor) {
                    this.efListBox.setAttribute("style", "background-color:" + bgcolor);
                }
                selectObjectByElement(tar) {
                    let selOption = this.getSelectionByName(tar.innerHTML);
                    this.selected = Object.assign({}, selOption);
                    this.hostScene.onSelect(this.name);
                }
                getSelectionByName(itemName) {
                    let result;
                    let options = this.listData.options;
                    for (let i1 = 0; i1 < options.length; i1++) {
                        if (itemName === this.hostScene.resolveTemplates(options[i1].name, this._templateRef)) {
                            result = options[i1];
                            break;
                        }
                    }
                    return result;
                }
                onOptionClick(evt, tar) {
                    var currSel;
                    this.selectObjectByElement(tar);
                    this.efListBox.innerHTML = tar.innerHTML;
                    currSel = this.efListOptions.getElementsByClassName("isselected");
                    for (let k = 0; k < currSel.length; k++) {
                        currSel[k].removeAttribute("class");
                    }
                    tar.setAttribute("class", "isselected");
                }
                closeAllSelect(tar) {
                    let x, y, i, arrNo = [];
                    x = document.getElementsByClassName("listoptions");
                    y = document.getElementsByClassName("listbox");
                    for (i = 0; i < y.length; i++) {
                        if (tar == y[i]) {
                            arrNo.push(i);
                        }
                        else {
                            y[i].classList.remove("active");
                        }
                    }
                    for (i = 0; i < x.length; i++) {
                        if (arrNo.indexOf(i)) {
                            x[i].classList.add("hideoptions");
                        }
                    }
                }
                clearOptionList() {
                    this.efList.forEach((option) => {
                        this.efListOptions.removeChild(option);
                    });
                    this.efList = new Array();
                }
                initListFromData(element) {
                    let efOption = document.createElement("DIV");
                    let name = this.hostScene.resolveTemplates(element.name, this._templateRef);
                    efOption.innerHTML = name;
                    if (element.selected) {
                        efOption.setAttribute("class", "isselected");
                    }
                    let host = this;
                    efOption.addEventListener("click", function (evt) {
                        host.onOptionClick.call(host, evt, this);
                    });
                    this.efListOptions.appendChild(efOption);
                    this.efList.push(efOption);
                }
                initObjfromHtmlData(objData) {
                    if (objData.htmlData) {
                        if (objData.htmlData.style) {
                            this.addCustomStyles(objData.htmlData.style, this.cssSheet);
                        }
                        this.invertScale();
                    }
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: Input Custom Control");
                    if (objData.listdata) {
                        this.listData = objData.listdata;
                        this.clearOptionList();
                        objData.listdata.options.forEach((element) => {
                            this.initListFromData(element);
                        });
                        this.efListBox.innerHTML = this.hostScene.resolveTemplates(objData.listdata.placeHolder, this._templateRef);
                    }
                }
            };
            exports_114("THtmlList1", THtmlList1);
        }
    };
});
System.register("thermite/THtmlTable", ["thermite/THtmlBase", "util/CUtil", "util/CONST"], function (exports_115, context_115) {
    "use strict";
    var __moduleName = context_115 && context_115.id;
    var THtmlBase_5, CUtil_64, CONST_24, THtmlTable;
    return {
        setters: [
            function (THtmlBase_5_1) {
                THtmlBase_5 = THtmlBase_5_1;
            },
            function (CUtil_64_1) {
                CUtil_64 = CUtil_64_1;
            },
            function (CONST_24_1) {
                CONST_24 = CONST_24_1;
            }
        ],
        execute: function () {
            THtmlTable = class THtmlTable extends THtmlBase_5.THtmlBase {
                constructor() {
                    super();
                }
                THtmlTableInitialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                initialize() {
                    this.THtmlBaseInitialize.call(this);
                    this.init4();
                }
                init4() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_64.CUtil.trace("THtmlTable:Constructor");
                    this.RX_CELLID = /(\d*)\.(\d*)\.(.*)/;
                    this.cssSheet = {
                        "[eftable].outerContainer": {
                            "table-layout": "fixed",
                            "position": "absolute",
                            "box-sizing": "border-box",
                            "border": "3px solid black",
                            "border-radius": "6px",
                            "border-spacing": "0px",
                            "font-family": "arial",
                            "font-size": "12px",
                            "pointer-events": "all",
                            "width": "500px",
                            "height": "300px",
                            "user-select": "none",
                            "background-color": "white",
                            "box-shadow": "6px 6px 4px 4px #3a2c2c66",
                            "visibility": "hidden"
                        },
                        "[eftable] th, [eftable] td": {
                            "display": "table-cell",
                            "padding": "10px",
                            "border-right": "2px solid rgba(128, 128, 128, 0.486)",
                            "border-bottom": "2px solid rgba(128, 128, 128, 0.486)",
                            "text-align": "center",
                            "transition": "color 300ms"
                        },
                        "[eftable] th:last-child, [eftable] td:last-child": {
                            "border-right": "none",
                        },
                        "[eftable] tr:last-child td": {
                            "border-bottom": "none",
                        },
                        "[eftable] .list": {
                            "font-weight": "bold",
                            "width": "100%",
                            "border": "0px",
                            "background-color": "white",
                            "color": "rgb(0, 0, 0)"
                        },
                        "[eftable] option": {
                            "background-color": "white",
                            "color": "rgb(0, 0, 0)",
                            "font-size": "2.0em",
                            "font-weight": "bold"
                        },
                        "input, textarea, select, button": {
                            "font-size": "inherit"
                        }
                    };
                }
                Destructor() {
                    super.Destructor();
                }
                onAddedToStage(evt) {
                    console.log("HTMLTable On Stage");
                    if (!this.fAdded) {
                        this.dimContainer = this.SControlContainer;
                        this.SControlContainer.visible = false;
                        this.outerContainer = document.createElement("table");
                        this.outerContainer.className = "outerContainer";
                        this.table = this.outerContainer;
                        this.outerContainer.setAttribute(CONST_24.CONST.EFTABLE_TYPE, "");
                        this.outerContainer.setAttribute(this.name, "");
                        this.controlContainer = this.outerContainer;
                        super.onAddedToStage(evt);
                    }
                }
                getCell(row, col) {
                    return this.cellData[row][col];
                }
                getRows() {
                    return this.cellData.length;
                }
                getCols() {
                    return this.cellData[0].length;
                }
                setColWidth(col, width) {
                    this.getCell(0, col).cell.classList.toggle("hidden");
                }
                findCell(cell) {
                    loop1: for (let row = 0; row < this.cellData.length; row++) {
                        for (let col = 0; col < this.cellData[row].length; col++) {
                            if (this.cellData[row][col].cell === cell) {
                                this.selectedCell = this.cellData[row][col];
                                break loop1;
                            }
                        }
                    }
                }
                clickListener(e) {
                    this.changeListener(e);
                }
                getParentCell(control) {
                    let found = false;
                    do {
                        switch (control.tagName.toLowerCase()) {
                            case "td":
                            case "th":
                                found = true;
                                break;
                        }
                        if (found)
                            break;
                        control = control.parentElement;
                    } while (1);
                    return control;
                }
                changeListener(e) {
                    let target = e.currentTarget;
                    let select = null;
                    e.stopPropagation();
                    if (e.currentTarget instanceof HTMLSelectElement) {
                        select = e.currentTarget;
                        target = this.getParentCell(select);
                    }
                    else {
                        select = target.getElementsByTagName("select")[0];
                        if (select)
                            target = this.getParentCell(select);
                    }
                    this.findCell(target);
                    if (select) {
                        this.selectedCell.selectedIndex = select.selectedIndex;
                        this.selectedCell.selectedValue = select.options[select.selectedIndex].text;
                    }
                    this.hostScene.onSelect(this.name);
                }
                captureContent() {
                    this.cellContent = new Array(this.cellData.length);
                    for (let row = 0; row < this.cellData.length; row++) {
                        this.cellContent[row] = new Array(this.cellData[row].length);
                        for (let col = 0; col < this.cellData[row].length; col++) {
                            let content = this.cellData[row][col].cell.innerHTML;
                            this.cellContent[row][col] = content !== "" ? content : null;
                        }
                    }
                }
                showCells(left, top, right, bottom) {
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            let cell = this.cellData[row][col].cell;
                            let content = this.cellContent[row][col];
                            if (content !== "") {
                                cell.innerHTML = content;
                            }
                        }
                    }
                }
                hideCells(left, top, right, bottom) {
                    this.captureContent();
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            let cell = this.cellData[row][col].cell;
                            cell.innerHTML = "";
                        }
                    }
                }
                getInnerComponent(cell) {
                    let result;
                    result = cell.getElementsByTagName("select")[0];
                    return result ? result : cell;
                }
                listenToCells(type, left, top, right, bottom) {
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            let cell = this.getInnerComponent(this.cellData[row][col].cell);
                            this.addListener(cell, type);
                        }
                    }
                }
                clearListeners(type) {
                    for (let row = 0; row < this.cellData.length; row++) {
                        for (let col = 0; col < this.cellData[row].length; col++) {
                            let cell = this.getInnerComponent(this.cellData[row][col].cell);
                            this.removeListener(cell, type);
                        }
                    }
                }
                cellsHaveValues(left, top, right, bottom) {
                    let result = true;
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            if (!this.cellData[row][col].selectedValue) {
                                result = false;
                                break;
                            }
                        }
                    }
                    return result;
                }
                setCellValue(row, col, value) {
                    this.cellData[row][col].cell.innerHTML = value;
                    this.cellData[row][col].selectedValue = value;
                }
                getCellValue(row, col) {
                    return this.cellData[row][col].selectedValue;
                }
                highlightNone() {
                    for (let row = 0; row < this.cellData.length; row++) {
                        for (let col = 0; col < this.cellData[row].length; col++) {
                            this.cellData[row][col].cell.setAttribute("style", "background-color:");
                        }
                    }
                }
                highlightSelected(bgcolor) {
                    let row = this.selectedCell.row;
                    let col = this.selectedCell.col;
                    this.highlightCells(bgcolor, col, row, col, row);
                }
                highlightRow(bgcolor, row, flashCount = 0, flashRate = 0) {
                    this.highlightCells(bgcolor, 0, row, this.getCols() - 1, row);
                }
                highlightCells(bgcolor, left, top, right, bottom, flashCount = 0, flashRate = 0) {
                    for (let row = top; row <= bottom; row++) {
                        for (let col = left; col <= right; col++) {
                            let cell = this.cellData[row][col].cell;
                            bgcolor = bgcolor.slice(0, 7);
                            this.cellData[row][col].cell.setAttribute("style", "background-color:" + bgcolor);
                        }
                    }
                }
                highlightCellBorders(color, flashCount, flashRate, left, top, right, bottom) {
                    for (let row = top; row <= bottom; row++) {
                        this.cellData[row][left].cell.style.borderLeftColor = color;
                        this.cellData[row][right].cell.style.borderLeftColor = color;
                    }
                    for (let col = left; col <= right; col++) {
                        this.cellData[top][col].cell.style.borderTopColor = color;
                        this.cellData[bottom][col].cell.style.borderBottomColor = color;
                    }
                }
                reifyTable() {
                    for (let row = 0; row < this.cellData.length; row++) {
                        for (let col = 0; col < this.cellData[row].length; col++) {
                            let cellData = this.cellData[row][col];
                            if (cellData.isList) {
                                this.setCellValue(row, col, cellData.selectedValue);
                            }
                        }
                    }
                }
                resolvePlaceHolderElement(selector, cellData) {
                    let element = `<option hidden>${this.hostScene.resolveTemplates(selector, this._templateRef)}</option>`;
                    cellData.placeHolder = this.hostScene.ontologyPath;
                    return element;
                }
                resolveOptionElements(options, cellData) {
                    let optionStr = "";
                    cellData.options = [];
                    options.forEach((selector) => {
                        optionStr += `<option value="">${this.hostScene.resolveTemplates(selector, this._templateRef)}</option>`;
                        cellData.options.push[this.hostScene.ontologyPath];
                    });
                    return optionStr;
                }
                initElementFromData(rowindex, colindex, element) {
                    let cell = this.table.rows[rowindex].cells.item(colindex);
                    let value = this.hostScene.resolveTemplates(element.value, this._templateRef);
                    let path = this.hostScene.ontologyPath;
                    let cellData = this.cellData[rowindex][colindex] =
                        {
                            row: rowindex,
                            col: colindex,
                            ontologyKey: path
                        };
                    switch (value) {
                        case "$LIST":
                            cellData.isList = true;
                            cell.innerHTML = `<div><select class="list">
                    ${this.resolvePlaceHolderElement(element.placeHolder, cellData)}
                    ${this.resolveOptionElements(element.options, cellData)}
                </select></div>`;
                            break;
                        default:
                            cellData.isText = true;
                            cell.innerHTML = `<div>${value}</div>`;
                            cellData.selectedValue = value;
                            break;
                    }
                    if (element.initialValue) {
                        let value = this.hostScene.resolveTemplates(element.initialValue, this._templateRef);
                        let select = this.getInnerComponent(cell);
                        select.selectedIndex = parseInt(value);
                        cellData.selectedIndex = select.selectedIndex;
                        cellData.selectedValue = select.options[select.selectedIndex].text;
                    }
                    cellData.cell = cell;
                }
                deSerializeObj(objData) {
                    super.deSerializeObj(objData);
                    console.log("deserializing: Table Control");
                    if (objData.tabledata) {
                        this.cellData = [];
                        objData.tabledata.rowdata.forEach((coldata, rowindex) => {
                            this.cellData.push([]);
                            coldata.forEach((element, colindex) => {
                                this.initElementFromData(rowindex, colindex, element);
                            });
                        });
                    }
                }
            };
            exports_115("THtmlTable", THtmlTable);
        }
    };
});
System.register("thermite/TProgressEl", ["core/CEFTimeLine", "thermite/TObject", "util/CUtil"], function (exports_116, context_116) {
    "use strict";
    var __moduleName = context_116 && context_116.id;
    var CEFTimeLine_4, TObject_19, CUtil_65, TProgressEl;
    return {
        setters: [
            function (CEFTimeLine_4_1) {
                CEFTimeLine_4 = CEFTimeLine_4_1;
            },
            function (TObject_19_1) {
                TObject_19 = TObject_19_1;
            },
            function (CUtil_65_1) {
                CUtil_65 = CUtil_65_1;
            }
        ],
        execute: function () {
            TProgressEl = class TProgressEl extends TObject_19.TObject {
                constructor() {
                    super();
                    this.SHOW = true;
                    this.HIDE = false;
                    this.MAXSTATE = 1000;
                    this.init3();
                }
                TProgressElInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_65.CUtil.trace("TProgressEl:Constructor");
                    this.effectTimeLine = new CEFTimeLine_4.CEFTimeLine(null, null, { "useTicks": false, "loop": false, "paused": true }, this.tutorDoc);
                    this.effectTweens = new Array();
                }
                Destructor() {
                    super.Destructor();
                }
                addHTMLControls() {
                }
                set hostScene(scene) {
                    this._hostScene = scene;
                }
                showStates(item, newState, show) {
                    let state;
                    let id = 1;
                    while (true) {
                        state = "Sstate" + id;
                        if (this[item][state]) {
                            this[item][state].visible = show;
                        }
                        else {
                            break;
                        }
                        id++;
                    }
                }
                showAll(show) {
                    let item;
                    let id = 1;
                    while (true) {
                        item = "Sprog" + id;
                        if (this[item]) {
                            this.showStates(item, this.MAXSTATE, show);
                        }
                        else {
                            break;
                        }
                        id++;
                    }
                }
                gotoStepState(step, state) {
                    let item;
                    item = "Sprog" + step;
                    this.showStates(item, state, this.SHOW);
                }
                gotoState(step, state) {
                    if (state == 0) {
                        this.visible = false;
                    }
                    else {
                        this.visible = true;
                        this.showAll(this.HIDE);
                        this.currStep = step;
                        this.currState = state;
                        for (let i1 = 1; i1 < step; i1++)
                            this.gotoStepState(i1, this.MAXSTATE);
                        this.gotoStepState(step, state);
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    return obj;
                }
                captureXMLState() {
                    let stateVal = { progress: {} };
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                }
                compareXMLState(stateVal) {
                    var bTest = true;
                    return bTest;
                }
                deSerializeObj(objData) {
                    console.log("deserializing: TProgressEl Custom Control");
                    super.deSerializeObj(objData);
                }
            };
            exports_116("TProgressEl", TProgressEl);
        }
    };
});
System.register("thermite/TTitleBar", ["thermite/TObject", "thermite/TSceneBase", "events/CEFMouseEvent", "events/CEFNavEvent", "util/CUtil"], function (exports_117, context_117) {
    "use strict";
    var __moduleName = context_117 && context_117.id;
    var TObject_20, TSceneBase_4, CEFMouseEvent_5, CEFNavEvent_2, CUtil_66, TTitleBar;
    return {
        setters: [
            function (TObject_20_1) {
                TObject_20 = TObject_20_1;
            },
            function (TSceneBase_4_1) {
                TSceneBase_4 = TSceneBase_4_1;
            },
            function (CEFMouseEvent_5_1) {
                CEFMouseEvent_5 = CEFMouseEvent_5_1;
            },
            function (CEFNavEvent_2_1) {
                CEFNavEvent_2 = CEFNavEvent_2_1;
            },
            function (CUtil_66_1) {
                CUtil_66 = CUtil_66_1;
            }
        ],
        execute: function () {
            TTitleBar = class TTitleBar extends TSceneBase_4.TSceneBase {
                constructor() {
                    super(...arguments);
                    this._demoInhibit = false;
                    this._demoClicked = false;
                }
                CEFTitleBar() {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("CEFTitleBar:Constructor");
                    try {
                        this.Splay.addEventListener(CEFMouseEvent_5.TMouseEvent.WOZCLICK, this.onTutorPlay);
                        this.Spause.addEventListener(CEFMouseEvent_5.TMouseEvent.WOZCLICK, this.onTutorPause);
                        this.Sreplay.addEventListener(CEFMouseEvent_5.TMouseEvent.WOZCLICK, this.onTutorReplay);
                        this.Splay.visible = false;
                        this.Sskill.visible = this.tutorDoc.fSkillometer;
                        this.Sskill.title = "skills";
                        this.Sskill.updateName(1, "rule0");
                        this.Sskill.updateName(2, "rule1");
                        this.Sskill.updateName(3, "rule2");
                        this.Sskill.updateName(4, "rule_vvfar");
                        this.Sskill.updateName(5, "rule_tov");
                        this.Sskill.updateName(6, "rule_cvslog");
                    }
                    catch (err) {
                    }
                }
                configDemoButton(_Tutor) {
                    if (this.tutorDoc.fDemo) {
                        if (this.traceMode)
                            CUtil_66.CUtil.trace("Title in Demo Mode");
                        this.SdemoButton.addEventListener(CEFMouseEvent_5.TMouseEvent.WOZCLICKED, this.doDemoClick);
                        _Tutor.addEventListener("deferedDemoCheck", this.doDeferedDemoClick);
                    }
                    else {
                        this.SdemoButton.visible = false;
                        this.addEventListener(CEFMouseEvent_5.TMouseEvent.WOZCLICKED, this.doTitleClick);
                    }
                }
                doTitleClick(evt) {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("TitleClick");
                }
                doDemoClick(evt) {
                    if (this.tutorDoc.fDeferDemoClick)
                        this._demoClicked = true;
                    else
                        this.tutorDoc.tutorContainer.goToScene(new CEFNavEvent_2.CEFNavEvent(CEFNavEvent_2.CEFNavEvent.WOZNAVTO, "SdemoScene"));
                }
                doDeferedDemoClick(evt) {
                    this.tutorDoc.fDeferDemoClick = false;
                    if (this._demoClicked) {
                        this._demoClicked = false;
                        this.tutorDoc.tutorContainer.goToScene(new CEFNavEvent_2.CEFNavEvent(CEFNavEvent_2.CEFNavEvent.WOZNAVTO, "SdemoScene"));
                    }
                }
                onTutorPlay(evt) {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("onTutorPlay: ");
                    this.tutorDoc.tutorContainer.wozPlay();
                    this.Splay.visible = false;
                    this.Spause.visible = true;
                }
                onTutorPause(evt) {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("onTutorPause: ");
                    this.tutorDoc.tutorContainer.wozPause();
                    this.Spause.visible = false;
                    this.Splay.visible = true;
                }
                onTutorReplay(evt) {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("onTutorReplay: ");
                    this.tutorDoc.tutorContainer.wozReplay();
                }
                setObjMode(TutScene, sMode) {
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("\t*** Start - Walking Top Level Nav Objects***");
                    for (let sceneObj in TutScene) {
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_20.TObject) {
                            TutScene[sceneObj]._instance.setAutomationMode(TutScene[sceneObj], sMode);
                        }
                    }
                    if (this.traceMode)
                        CUtil_66.CUtil.trace("\t*** End - Walking Top Level Nav Objects***");
                }
                dumpSceneObjs(TutScene) {
                    for (let sceneObj in TutScene) {
                        if (this.traceMode)
                            CUtil_66.CUtil.trace("\tNavPanelObj : " + sceneObj);
                        if (sceneObj != "_instance" && TutScene[sceneObj]._instance instanceof TObject_20.TObject) {
                            if (this.traceMode)
                                CUtil_66.CUtil.trace("\tCEF***");
                            TutScene[sceneObj]._instance.dumpSubObjs(TutScene[sceneObj], "\t");
                        }
                    }
                }
            };
            exports_117("TTitleBar", TTitleBar);
        }
    };
});
System.register("thermite/TVirtual", ["thermite/TObject", "events/CEFEvent", "util/CUtil"], function (exports_118, context_118) {
    "use strict";
    var __moduleName = context_118 && context_118.id;
    var TObject_21, CEFEvent_19, CUtil_67, TVirtual;
    return {
        setters: [
            function (TObject_21_1) {
                TObject_21 = TObject_21_1;
            },
            function (CEFEvent_19_1) {
                CEFEvent_19 = CEFEvent_19_1;
            },
            function (CUtil_67_1) {
                CUtil_67 = CUtil_67_1;
            }
        ],
        execute: function () {
            TVirtual = class TVirtual extends TObject_21.TObject {
                constructor() {
                    super();
                    this.init3();
                }
                TVirtualInitialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                initialize() {
                    this.TObjectInitialize.call(this);
                    this.init3();
                }
                init3() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_67.CUtil.trace("TVirtual:Constructor");
                    this.on(CEFEvent_19.CEFEvent.ADDED_TO_STAGE, this.onAddedToStage);
                }
                Destructor() {
                    super.Destructor();
                }
                onAddedToStage(evt) {
                    console.log("Button On Stage");
                    this.mouseChildren = false;
                    this.hidden = true;
                    this.visible = false;
                }
            };
            exports_118("TVirtual", TVirtual);
        }
    };
});
System.register("thermite/events/TNavEvent", ["util/CUtil"], function (exports_119, context_119) {
    "use strict";
    var __moduleName = context_119 && context_119.id;
    var CUtil_68, Event, TNavEvent;
    return {
        setters: [
            function (CUtil_68_1) {
                CUtil_68 = CUtil_68_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            TNavEvent = class TNavEvent extends Event {
                constructor(type, _target = null, _featureSet = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.wozNavTarget = _target;
                    this.wozFeatures = _featureSet;
                }
                clone() {
                    CUtil_68.CUtil.trace("cloning WOZEvent:");
                    return new TNavEvent(this.type, this.wozNavTarget, this.wozFeatures, this.bubbles, this.cancelable);
                }
            };
            TNavEvent.WOZNAVNEXT = "WOZNAVNEXT";
            TNavEvent.WOZNAVBACK = "WOZNAVBACK";
            TNavEvent.WOZNAVTO = "WOZNAVTO";
            TNavEvent.WOZNAVINC = "WOZNAVINC";
            TNavEvent.WOZNAVREPLAY = "WOZNAVREPLAY";
            exports_119("TNavEvent", TNavEvent);
        }
    };
});
System.register("thermite/events/TSelectEvent", ["util/CUtil"], function (exports_120, context_120) {
    "use strict";
    var __moduleName = context_120 && context_120.id;
    var CUtil_69, Event, TSelectEvent;
    return {
        setters: [
            function (CUtil_69_1) {
                CUtil_69 = CUtil_69_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            TSelectEvent = class TSelectEvent extends Event {
                constructor(target, type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.selection = target;
                }
                clone() {
                    CUtil_69.CUtil.trace("cloning WOZEvent:");
                    return new TSelectEvent(this.selection, this.type, this.bubbles, this.cancelable);
                }
            };
            TSelectEvent.WOZTABSELECT = "WOZTABSELECT";
            TSelectEvent.WOZIMGSELECT = "WOZIMGSELECT";
            exports_120("TSelectEvent", TSelectEvent);
        }
    };
});
System.register("thermite/scenes/CEFEndCloak", ["thermite/TScene", "util/CUtil"], function (exports_121, context_121) {
    "use strict";
    var __moduleName = context_121 && context_121.id;
    var TScene_2, CUtil_70, CEFEndCloak;
    return {
        setters: [
            function (TScene_2_1) {
                TScene_2 = TScene_2_1;
            },
            function (CUtil_70_1) {
                CUtil_70 = CUtil_70_1;
            }
        ],
        execute: function () {
            CEFEndCloak = class CEFEndCloak extends TScene_2.TScene {
                constructor() {
                    super();
                    if (this.traceMode)
                        CUtil_70.CUtil.trace("CEFEndCloak:Constructor");
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    super.restoreDefState(TutScene);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    if (this.traceMode)
                        CUtil_70.CUtil.trace("CEFEndCloak Pre-Enter Scene Behavior: " + sceneTitle);
                    this.tutorDoc.tutorContainer.showPPlay(false);
                    this.tutorDoc.tutorContainer.showReplay(false);
                    this.tutorDoc.tutorContainer.SnavPanel.SnextButton.enable(false);
                    this.tutorDoc.tutorContainer.SnavPanel.SbackButton.enable(false);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
            };
            exports_121("CEFEndCloak", CEFEndCloak);
        }
    };
});
System.register("thermite/scenes/CEFEndScene", ["thermite/TScene", "events/CEFNavEvent", "util/CUtil"], function (exports_122, context_122) {
    "use strict";
    var __moduleName = context_122 && context_122.id;
    var TScene_3, CEFNavEvent_3, CUtil_71, CEFEndScene;
    return {
        setters: [
            function (TScene_3_1) {
                TScene_3 = TScene_3_1;
            },
            function (CEFNavEvent_3_1) {
                CEFNavEvent_3 = CEFNavEvent_3_1;
            },
            function (CUtil_71_1) {
                CUtil_71 = CUtil_71_1;
            }
        ],
        execute: function () {
            CEFEndScene = class CEFEndScene extends TScene_3.TScene {
                CEFEndScene() {
                    CUtil_71.CUtil.trace("CEFEndScene:Constructor");
                    this.fComplete = true;
                }
                onDoneClick(evt) {
                    this.dispatchEvent(new CEFNavEvent_3.CEFNavEvent(CEFNavEvent_3.CEFNavEvent.WOZNAVREPLAY));
                }
                onPostTest(evt) {
                }
                onUploadClick(evt) {
                    dispatchEvent(new Event("pushlog"));
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    super.restoreDefState(TutScene);
                }
            };
            exports_122("CEFEndScene", CEFEndScene);
        }
    };
});
System.register("thermite/scenes/CEFNavDemo", ["thermite/TScene", "events/CEFNavEvent", "util/CUtil"], function (exports_123, context_123) {
    "use strict";
    var __moduleName = context_123 && context_123.id;
    var TScene_4, CEFNavEvent_4, CUtil_72, CEFNavDemo;
    return {
        setters: [
            function (TScene_4_1) {
                TScene_4 = TScene_4_1;
            },
            function (CEFNavEvent_4_1) {
                CEFNavEvent_4 = CEFNavEvent_4_1;
            },
            function (CUtil_72_1) {
                CUtil_72 = CUtil_72_1;
            }
        ],
        execute: function () {
            CEFNavDemo = class CEFNavDemo extends TScene_4.TScene {
                constructor() {
                    super();
                    this._scenesShown = false;
                    if (this.traceMode)
                        CUtil_72.CUtil.trace("CEFNavDemo:Constructor");
                    this._demoPanel = CUtil_72.CUtil.instantiateThermiteObject("unknownModule", "CDemoPanel");
                    this._demoPanel.x = 0;
                    this._demoPanel.y = 0;
                    this._demoPanel.alpha = 1.0;
                    this._demoPanel.visible = true;
                    this._demoPanel.name = "SdemoPanel";
                    this._demoPanel["demoPath"] = this.tutorDoc["_modulePath"];
                    this.addChild(this._demoPanel);
                    this._demoPanel.addEventListener(CEFNavEvent_4.CEFNavEvent.WOZNAVTO, this.gotoScene);
                    this.tutorDoc.tutorContainer.automateScene("SdemoScene", this);
                }
                gotoScene(evt) {
                    var features;
                    var featVect = new Array();
                    var subFeature;
                    if (evt.wozFeatures != null)
                        this.tutorDoc.tutorContainer.setTutorFeatures(evt.wozFeatures);
                    if (!this._scenesShown) {
                        this.tutorDoc.tutorContainer.SnavPanel.visible = true;
                        this.tutorDoc.tutorContainer.StitleBar.visible = true;
                        this._scenesShown = true;
                    }
                    this.tutorDoc.tutorContainer.xitions.resetTransitions();
                    this.tutorDoc.tutorContainer.goToScene(new CEFNavEvent_4.CEFNavEvent(CEFNavEvent_4.CEFNavEvent.WOZNAVTO, evt.wozNavTarget));
                }
            };
            exports_123("CEFNavDemo", CEFNavDemo);
        }
    };
});
System.register("thermite/scenes/CEFScene0", ["thermite/TScene", "util/CUtil"], function (exports_124, context_124) {
    "use strict";
    var __moduleName = context_124 && context_124.id;
    var TScene_5, CUtil_73, CEFScene0;
    return {
        setters: [
            function (TScene_5_1) {
                TScene_5 = TScene_5_1;
            },
            function (CUtil_73_1) {
                CUtil_73 = CUtil_73_1;
            }
        ],
        execute: function () {
            CEFScene0 = class CEFScene0 extends TScene_5.TScene {
                constructor() {
                    super();
                    CUtil_73.CUtil.trace("CEFScene0:Constructor");
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    super.restoreDefState(TutScene);
                }
            };
            exports_124("CEFScene0", CEFScene0);
        }
    };
});
System.register("thermite/scenes/CEFSceneN", ["thermite/events/TMouseEvent", "thermite/TScene", "util/CUtil"], function (exports_125, context_125) {
    "use strict";
    var __moduleName = context_125 && context_125.id;
    var TMouseEvent_5, TScene_6, CUtil_74, CEFSceneN;
    return {
        setters: [
            function (TMouseEvent_5_1) {
                TMouseEvent_5 = TMouseEvent_5_1;
            },
            function (TScene_6_1) {
                TScene_6 = TScene_6_1;
            },
            function (CUtil_74_1) {
                CUtil_74 = CUtil_74_1;
            }
        ],
        execute: function () {
            CEFSceneN = class CEFSceneN extends TScene_6.TScene {
                CEFSceneN() {
                    CUtil_74.CUtil.trace("CEFSceneN:Constructor");
                    this.SreplaySession.addEventListener(TMouseEvent_5.TMouseEvent.WOZCLICK, this.doReplay);
                }
                doReplay(evt) {
                    this.tutorDoc.tutorContainer.replayLiveStream();
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    super.restoreDefState(TutScene);
                }
            };
            exports_125("CEFSceneN", CEFSceneN);
        }
    };
});
System.register("thermite/scenes/CEFStartScene", ["thermite/TScene", "util/CUtil"], function (exports_126, context_126) {
    "use strict";
    var __moduleName = context_126 && context_126.id;
    var TScene_7, CUtil_75, CEFStartScene;
    return {
        setters: [
            function (TScene_7_1) {
                TScene_7 = TScene_7_1;
            },
            function (CUtil_75_1) {
                CUtil_75 = CUtil_75_1;
            }
        ],
        execute: function () {
            CEFStartScene = class CEFStartScene extends TScene_7.TScene {
                CEFStartScene() {
                    this.traceMode = true;
                    if (this.traceMode)
                        CUtil_75.CUtil.trace("CEFStartScene:Constructor");
                    this.fComplete = true;
                }
                captureDefState(TutScene) {
                    super.captureDefState(TutScene);
                }
                restoreDefState(TutScene) {
                    super.restoreDefState(TutScene);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    if (this.traceMode)
                        CUtil_75.CUtil.trace("CEFStartScene Pre-Enter Scene Behavior: " + sceneTitle);
                    this.tutorDoc.tutorContainer.showReplay(false);
                    this.tutorDoc.tutorContainer.showPPlay(false);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    if (this.traceMode)
                        CUtil_75.CUtil.trace("CEFStartScene Enter Scene Behavior: CEFRampScene0");
                }
                preExitScene(Direction, sceneCurr) {
                    if (this.traceMode)
                        CUtil_75.CUtil.trace("CEFStartScene Pre-Exit Scene Behavior:");
                    this.tutorDoc.tutorContainer.showReplay(false);
                    this.tutorDoc.tutorContainer.showPPlay(true);
                    return ("OK");
                }
            };
            exports_126("CEFStartScene", CEFStartScene);
        }
    };
});
//# sourceMappingURL=TutorEngineOne.js.map