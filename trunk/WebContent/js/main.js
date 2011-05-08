//mjt.require("MjtWebGlScene", function mainCallback()
mjt.require("MjtWebGlToolkit", function mainCallback()
// mjt.require("MjtFunction", function()
{

	console.log("start main...");
	MjtWebGlToolkit.getInstance();
//	 mjtWebGlScene = new MjtWebGlScene();
//	 mjtWebGlScene.createNew();
//	 mjtWebGlScene.persist();
	 
//	mjtWebGlScene.load();

	// var mjtF = new MjtFunction({},function(){});
	//	
	// console.log("after creation");
	//	
	// mjtF();

	// console.log("after call");

	// mjtWebGlToolkit = new MjtWebGlToolkit();
	// MjtWebGlToolkit.getInstance().start('mainCanvas');
	//	
	// console.log("got result: 1");
	// var worker = new Worker('js/MjtSandboxWorker.js');
	// console.log("got result: 2");
	//	
	// var result = worker.postMessage("start");
	//	
	// worker.onmessage = function(r)
	// {
	// console.log("got sss: " + r );
	// console.log(r);
	// };

	// mjtWebGlToolkit = new MjtWebGlToolkit();
	// mjtWebGlToolkit.start('mainCanvas');

	// var foo = {x: "hello world"};
	// var store = new MjtStorageLocal();

	// store.set(bar);

//	var store = MjtStorageLocal.getInstance();
//	block = new MjtWebGlBlock([1,2,3]);
//	
//	store.set(block);
//	Foo = function Foo()
//	{
//		console.log("calling Foo constructor with arguments:");
//		console.log(arguments);
//		//this.id = "blah"
//		//this.a = new Array([ 1, 7, 13 ]);
//	};
//
//	var foo = new Foo();
	//this.a = new Array([ 1, 7, 13 ]);
	//store.set(foo);

	// var foo = [0,"test123",6];
	// var foo = new Fraction("1/5");
	// console.log(foo);
	// var store = MjtStorageLocal.getInstance();
	// store.set(foo);

	// store.get([Fraction.prototype.constructor.name,[["numerator","Number",2]]], function(result){
	// console.log("Got result: ");
	// console.log(JSON.stringify(result));
	// });

	// store.get([Array.prototype.constructor.name,[["2","Number",6]]], function(result){
	// console.log("Got result: ");
	// console.log(JSON.stringify(result));
	// });

	// store.get([Foo.prototype.constructor.name,[["id","String","blah"]]], function(result){;

//	var resultArray = [];
//	store.get([ MjtWebGlBlock.prototype.constructor.name, [] ], function(result)
//	{
//		console.log("Got result: ");
//		console.log(JSON.stringify(result));
//		console.log(result);
//		resultArray.push(result);
//	}, function(matchCount)
//	{
//		console.log("matchCount: " + matchCount)
//		console.log("resultArray.length: " + resultArray.length)
//		console.log(resultArray);
//	});

	// store.get([Float32Array.prototype.constructor.name,[[0,"Number",2.978]]], function(result){
	// console.log("Got result: ");
	// console.log(JSON.stringify(result));
	// });
	// store._persist();

	// store.setString(0,"hello");
	// store.getValueForIdx("strings",5,function(value){console.log(value);});

	// store.getIdxForValue("strings",[0,[1,[2,3]]],function(idx){console.log(idx);});

	// var foo = {};
	// foo["1"]="blah";
	// console.log(foo);

	// {a: "abc", b: 1235, c: bar}

	// console.log(foo)

	// var s = JSON.stringify(foo);
	// console.log(s)

	// var o = JSON.parse(s);
	// console.log(o)

	// mjtStorage = new MjtStorageWebSql("1.1");
	// var cb = function(tx, result)
	// {
	// console.log(result);
	// }
	//	 
	// mjtStorage._performInsert("strings", {idx:1, value:"cba"}, cb);
	//	 
	// mjtStorage._performSelect("strings", {equals:{idx:1}}, cb);

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
