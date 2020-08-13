
(function(_EFLoadManager) {    

	// Register a component with the className: my.Image,
	// and prototype with the following overrides 
	// getCreateOptions
	// getCreateString
	// getProperties
	// getAttributes  test
    _EFLoadManager.buildWidget("ef.TutorModule", {
        options: {
			'visible': false,
			'position': 'absolute'
        },
		_props: ["left", "top", "width", "height", "position", "transform-origin", "transform"],
		_attrs: ["id", "src", "alt", "class", "border"],

		_createWidget: function( options, element ) {

			// var comp=AdobeAn.getComposition(options.compositionID);

			// Inject a static property pointing to the Animate library.
			//
			// _EFLoadManager.efLoaderLib = comp.getLibrary();
			// _EFLoadManager.rootTutor = options.moduleID;
			// _EFLoadManager.options   = options;
			// _EFLoadManager.loaded     = true;
		},		
		
		// Add functions required by AnimateCC
		//
		create: function(){},
		attach: function(){},
		setProperty: function(k, v) {},
		update: function(force) {}

	});   

})(EFLoadManager);