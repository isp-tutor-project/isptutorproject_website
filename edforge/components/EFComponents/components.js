{
	"category": "CATEGORY_EF_COMPONENTS",
	"components": [{
			"className": "ef.TutorEngine",
			"displayName": "DISP_NAME_ENGINE",
			"version": "0.9.0",
			"source": "src/ef_engine.js",
			"icon": "assets/SP_Image_Sm",
			"dimensions": [100, 100],
			"dependencies": [
				{"src": "src/ef_loadManager.js"}
			],
			"properties": [
				{"name": "PROP_COMP_ID", "variable": "compositionID", "type": "String", "default": "copy id from init() in Published HTML"},
				{"name": "PROP_ROOT_TUTOR", "variable": "boottutorID", "type": "String", "default": "Name of Boot Tutor-Module"}
			]
		},
		{
			"className": "ef.TutorModule",
			"displayName": "DISP_NAME_MODULE",
			"version": "0.9.0",
			"source": "src/ef_module.js",
			"icon": "assets/SP_Image_Sm",
			"dimensions": [100, 100],
			"dependencies": [
				{"src": "src/ef_loadManager.js"}
			],
			"properties": [
				{"name": "PROP_COMP_ID", "variable": "compositionID", "type": "String", "default": "copy id from init() in Published HTML"}
			]
		}]
}

