//mjt.require("MjtLogger", function mainCallback() {

mjt.require("MjtWebGlScene", "MjtWebGlToolkit", "MjtLogger", function mainCallback() {

	console.log("start main...");
	MjtWebGlToolkit.getInstance();
	mjtWebGlScene = MjtWebGlScene.getInstance();
	mjtWebGlScene.createNew();

	console.log("end main.");

}

);
