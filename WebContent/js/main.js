//mjt.require("MjtWebGlScene", "MjtWebGlToolkit", "MjtLogger", function mainCallback()
mjt.require("MjtLogger", function mainCallback() {

	console.log("start main...");
	// MjtWebGlToolkit.getInstance();
	// mjtWebGlScene
	// =
	// MjtWebGlScene.getInstance();
	// mjtWebGlScene.createNew();

	console.log("end main.");

	var f = function(foo) {
		var logger = new MjtLogger();
		//logger.log("hello");
		logger.trace();
	};
	
	f("bar");

}

);
