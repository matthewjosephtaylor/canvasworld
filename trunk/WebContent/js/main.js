// mjt.require("MjtStorageWebSql", main);
// mjt.require("MjtConditional");

mjt.require("MjtWebGlScene", function mainCallback()
//mjt.require("MjtStorageLocal", function()
//mjt.require("MjtFunction", function()
{

	console.log("start main...");

//	var mjtF = new MjtFunction({},function(){});
//	
//	console.log("after creation");
//	
//	mjtF();
	
//	console.log("after call");
	
	//mjtWebGlToolkit = new MjtWebGlToolkit();
	//MjtWebGlToolkit.getInstance().start('mainCanvas');
	mjtWebGlScene = new MjtWebGlScene();
	mjtWebGlScene.load();
//	
//	console.log("got result: 1");
//	var worker = new Worker('js/MjtSandboxWorker.js');
//	console.log("got result: 2");
//	
//	var result = worker.postMessage("start");
//	
//	worker.onmessage = function(r)
//	{
//	console.log("got sss: " + r );
//	console.log(r);
//	};
	
//	mjtWebGlToolkit = new MjtWebGlToolkit();
//	mjtWebGlToolkit.start('mainCanvas');

	//var foo = {x: "hello world"};
	//var store = new MjtStorageLocal();
	//var store = MjtStorageLocal.getInstance();
	
	//store.set(bar);
	
//	Foo = function Foo()
//	{
//		this.a = "blah";
//	};
//	
//	var foo = new Foo();
//	store.set(bar);
	
	//var foo =  [0,"test123",6];
	//var foo = new Fraction("1/5");
	//console.log(foo);
	//var store = MjtStorageLocal.getInstance();
	//store.set(foo);

//	store.get([Fraction.prototype.constructor.name,[["numerator","Number",2]]], function(result){
//	console.log("Got result: ");
//	console.log(JSON.stringify(result));
//	});
	
	
//	store.get([Array.prototype.constructor.name,[["2","Number",6]]], function(result){
//	console.log("Got result: ");
//	console.log(JSON.stringify(result));
//	});

	
//	store.get([Foo.prototype.constructor.name,[["a","String","blah"]]], function(result){
//	console.log("Got result: ");
//	console.log(JSON.stringify(result));
//	});
	
	
//	store.get([Float32Array.prototype.constructor.name,[[0,"Number",2.978]]], function(result){
//		console.log("Got result: ");
//		console.log(JSON.stringify(result));
//	});
//	store._persist();
	
	//store.setString(0,"hello");
	//store.getValueForIdx("strings",5,function(value){console.log(value);});

	//store.getIdxForValue("strings",[0,[1,[2,3]]],function(idx){console.log(idx);});
	
//	var foo = {};
//	foo["1"]="blah";
//	console.log(foo);
	
	//{a: "abc", b: 1235, c: bar}
	
	
//	console.log(foo)
	
//	var s = JSON.stringify(foo);
//	console.log(s)
	
//	var o = JSON.parse(s);
//	console.log(o)
	
//	 mjtStorage = new MjtStorageWebSql("1.1");
//	 var cb = function(tx, result)
//	 {
//		 console.log(result);
//	 }
//	 
//	 mjtStorage._performInsert("strings", {idx:1, value:"cba"}, cb);
//	 
//	 mjtStorage._performSelect("strings", {equals:{idx:1}}, cb);
	 
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

);
