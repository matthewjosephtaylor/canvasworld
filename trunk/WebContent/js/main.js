
mjt.register("J3DIVector3", "J3DIMath.js");
mjt.register("J3DIMatrix4", "J3DIMath.js");
mjt.register("initWebGL", "J3DI.js");
mjt.register("window.requestAnimFrame", "webgl-utils.js");

// mjt.require("jquery.hotkeys-0.7.9.min");
mjt.require("initWebGL", "J3DIVector3", "J3DIMatrix4", "window.requestAnimFrame", "MjtUserInput", "MjtWebGlCube", "MjtWebGlToolkit", "MjtWebGlCamera", main);



function main()
{
	mjtWebGlToolkit = new MjtWebGlToolkit();
	mjtWebGlToolkit.start('mainCanvas');
}


