mjt.register("J3DIVector3", "J3DIMath.js");
mjt.register("J3DIMatrix4", "J3DIMath.js");
mjt.register("initWebGL", "J3DI.js");
mjt.register("window.requestAnimFrame", "webgl-utils.js");

// mjt.require("MjtStorageWebSql", main);
// mjt.require("MjtConditional");

//mjt.require("initWebGL", "J3DIVector3", "J3DIMatrix4", "window.requestAnimFrame", "MjtUserInput", "MjtWebGlCube", "MjtWebGlToolkit", "MjtWebGlCamera", "MjtWebGlScene", function()
//mjt.require("MjtStorageWebSql","MjtConditional", function()
{

//	console.log("start main...");
//	
//	console.log("got result: 1");
//	var worker = new Worker('worker.js');
//	console.log("got result: 2");
//	
//	var result = worker.postMessage("start");
//	
//	console.log("got result: " + result );
	
//	mjtWebGlToolkit = new MjtWebGlToolkit();
//	mjtWebGlToolkit.start('mainCanvas');

	// mjtStorage = new MjtStorageWebSql();
	// mjtStorage.serialize(1);
	// mjtStorage.getStringIndex("foo", function(tx,result){console.log(result);});

	// mjtStorage.setStringIndex(1,"foo", function(tx,result){console.log(result);});

	// mjtConditional = new MjtConditional(function()
	// {
	// console.log("THEN called!");
	// });
	// mjtConditional.exist("foo");
	// mjtConditional.notEqual("foo", "barasdf");
	//
	// var sf = mjtConditional.createSetFunction("foo", function()
	// {
	// console.log("handler called.");
	// return "bar"
	// })
	//
	// sf("blah");

	console.log("end main.");
}

//);
