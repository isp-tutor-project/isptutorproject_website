
var EFtutorFeatures = EFtutorFeatures || "";
var EFbootNode      = EFbootNode || null;

(function(_EFLoadManager) {    

	// Register a component with the className: my.Image,
	// and prototype with the following overrides 
	// getCreateOptions
	// getCreateString
	// getProperties
	// getAttributes  test
    _EFLoadManager.buildWidget("ef.TutorEngine", {
        options: {
			'visible': false,
			'position': 'absolute'
        },
		_props: ["left", "top", "width", "height", "position", "transform-origin", "transform"],
		_attrs: ["id", "src", "alt", "class", "border"],

		_createWidget: function( options, element ) {

			var comp=AdobeAn.getComposition(options.compositionID);

			if(_EFLoadManager.loaded) {
				console.log("EdForge ERROR: Only one Tutor-Engine may be loaded at a time.");
			}
			else {

				// Keep the AnimateCC preloader on-screen 
				//
				let preloaderDiv;
		
				if(preloaderDiv = document.getElementById("_preload_div_")) 
									preloaderDiv.style.display = 'inline-block';
						
				// Inject a static property pointing to the Animate library.
				//
				_EFLoadManager.efLoaderLib = comp.getLibrary();
				_EFLoadManager.rootTutor   = options.boottutorID;
				_EFLoadManager.classLib    = {};
				_EFLoadManager.options     = options;
                _EFLoadManager.modules     = new Array();
                
				// Extract the module name and assign it as a named property of EFLoadManager.modules
				// which is used for dynamic component creation
				//
				for(let compName in _EFLoadManager.efLoaderLib) {
					if(compName.toUpperCase().startsWith("EFTUTOR" )) {

						_EFLoadManager.tutorName = compName.toUpperCase();
						_EFLoadManager.modules[compName.toUpperCase()] = _EFLoadManager.efLoaderLib;
						break;
					}
				}

				// Replace the CreateJS buttonHelper - Animate automatically instantiates these for each
				// button but EF does not use this functionality.
				// 
				createjs.ButtonHelper = this.buttonHelperNull;

				_EFLoadManager.loaded    = true;
			}
		},		
		
		buttonHelperNull: function(){},


		// Add functions required by AnimateCC
		//
		create: function(){},

		// The attach method is called by the EFTutorLoader(i.e exportRoot) tween to add STutorEngine to
		// the timeline.  this.timeline.addTween(cjs.Tween.get(this.STutorEngine).wait(1));
		// See: EFTutorLoader.js "stage content" section
		//
		attach: function(){

			_EFLoadManager.efStage    = stage;
            _EFLoadManager.efRoot     = exportRoot;	
            _EFLoadManager.efFeatures = EFtutorFeatures;	            			
            _EFLoadManager.efBootNode = EFbootNode;	            			

			System.import('TutorEngineOne').then(function(TutorEngineOne){
                    EFTutorEngine = new TutorEngineOne.CEngine;  
                    
                    var EFRootTutor  = window.EFRootTutor || _EFLoadManager.rootTutor
					EFTutorEngine.start(EFRootTutor);
				});					
		},
		
		setProperty: function(k, v) {},
		update: function(force) {}

	});   

})(EFLoadManager);