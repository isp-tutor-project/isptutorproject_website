/**
ADOBE SYSTEMS INCORPORATED
 Copyright 2016. Adobe Systems Incorporated
 All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file as stand-alone 
		or as bundled with other components useful to End User, in accordance with 
		the terms of the Adobe license agreement accompanying it. You may not delete 
		or in any manner alter the copyright notices, trademarks, logos or related notices, 
		or other proprietary rights notices of Adobe (and its licensors, if any) appearing 
		on or within such File and include a copyright notice reflecting copyright ownership 
		in any files modified by you. And You agree to indemnify, defend and hold Adobe 
		harmless from any and all liabilities (including attorney's fees) arising from any 
		claims, lawsuits, or other legal proceedings that arise from or are related to the 
		use or distribution of any software application product that you reproduced and/or 
		distributed that incorporates these files. If you have received this file from a 
		source other than Adobe, then your use, modification, or distribution of it requires
		 the prior written permission of Adobe.
*/
 
var _widgetID = 0;

var EFLoadManager   = EFLoadManager   || function(){};
var EFnativeAudio   = EFnativeAudio   || null;
var EFnativeSpeech  = EFnativeSpeech  || null;
var EFnativeUserMgr = EFnativeUserMgr || null;
var EFnativeLogMgr  = EFnativeLogMgr  || null;
var EFloginhibit;

EFLoadManager.window = window;

// Attach to platform specific audio engines e.g. Android
// 
EFLoadManager.nativeAudio   = EFnativeAudio;
EFLoadManager.nativeSpeech  = EFnativeSpeech;
EFLoadManager.nativeUserMgr = EFnativeUserMgr;
EFLoadManager.nativeLogMgr  = EFnativeLogMgr;
EFLoadManager.NOLOG         = EFloginhibit? EFloginhibit:false;

// Send media events from the Java Domain to the JS domain
// trackEvent and trackOwner are initialized by sceneTrack play 
// for each track segment.
// 
var EFSoundEvent = function(evt) {

    if(EFLoadManager.trackEvent)
        EFLoadManager.trackEvent.call(EFLoadManager.trackOwner, evt);
}

// push the tutor state into the running tutor engine
// 
var EFPushState = function(stateData) {

    if(EFLoadManager.pushState)
        EFLoadManager.pushState.call(EFLoadManager.engine, stateData);
}

// push the tutor features into the running tutor engine
// 
var EFPushFeatures = function(featureData) {

    if(EFLoadManager.pushFeatures)
        EFLoadManager.pushFeatures.call(EFLoadManager.engine, featureData);
}

// We impersonate JQuery to get the Adobe loader to call our attach routine.
// 
$ = EFLoadManager;

(function (_EFLoadManager) {
    "use strict";
    
    _EFLoadManager.buildWidget = function( name, prototype ) {

        var existingConstructor, constructor, basePrototype;
			
        var namespace = name.split( "." )[ 0 ];
        name = name.split( "." )[ 1 ];
        var fullName = namespace + "-" + name;

        _EFLoadManager[ namespace ] = _EFLoadManager[ namespace ] || {};
		existingConstructor = _EFLoadManager[ namespace ][ name ];
		
        constructor = _EFLoadManager[ namespace ][ name ] = function( options, element ) {
            if ( arguments.length ) {
                this._createWidget( options, element );
            }
        };        
        
		constructor.prototype = prototype;

		return constructor;
		
    } //$.buildWidget	
	
})(EFLoadManager);
