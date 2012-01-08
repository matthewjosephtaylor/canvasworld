
mjt.require("MjtWebGlBlock", "MjtWebGlScene");

mjt.require("MjtUserInput",  function defineMjtActorCallback()
{
	MjtActor = function MjtActor()
	{
	};
	
	MjtActor.prototype.degToRad = function degToRad(degrees)
	{
		return degrees * Math.PI / 180;
	};

	
	MjtActor.prototype.act = function act(elapsedTime)
	{
		this.addBlock1();
		this.addBlock2();
		this.addObject();
		this.load();
		this.clear();
		this.save();
		this.createTerrain();
	};
	MjtActor.prototype.addObject = function addObject()
	{
		var keyPressTime = MjtUserInput.getInstance().grabKeyPress(55);
		if(keyPressTime)
		{
			var object 
			//TODO MJT do something here :)
		}
	};
	
	MjtActor.prototype.addBlock1 = function addBlock()
	{
		var spaceKeyPressTime = MjtUserInput.getInstance().grabKeyPress(70);
		if(spaceKeyPressTime)
		{
			var camera = MjtWebGlCamera.getInstance();
//			console.log("got keypress");
//			console.log("Current Camera Coords: " + camera);
			var x = camera.posx + Math.cos(this.degToRad(-camera.yaw));
			var z = camera.posz + Math.sin(this.degToRad(-camera.yaw));
			var y = camera.posy;
			var block = new MjtWebGlBlock([ x,y,z ], [0,camera.yaw,0]);
			block.frontColor = [0.1,0.5,0.5,1];
			//block.textureImageURL="img/block_texture.png";

//			console.log("block pos: " + JSON.stringify(block.positionArray));
			MjtWebGlToolkit.getInstance().geometricObjects.push(block);
			MjtStats.getInstance().update("cubeCount", MjtWebGlToolkit.getInstance().geometricObjects.length);
			//document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
		}	
	};

	MjtActor.prototype.addBlock2 = function addBlock()
	{
		var spaceKeyPressTime = MjtUserInput.getInstance().grabKeyPress(32);
		if(spaceKeyPressTime)
		{
			var camera = MjtWebGlCamera.getInstance();
//			console.log("got keypress");
//			console.log("Current Camera Coords: " + camera);
			var x = camera.posx + Math.cos(this.degToRad(-camera.yaw));
			var z = camera.posz + Math.sin(this.degToRad(-camera.yaw));
			var y = camera.posy;
			var block = new MjtWebGlBlock([ x,y,z ], [0,camera.yaw,0]);
			block.frontColor = [0.1,0.5,0.5,1];
			block.textureImageURL="img/block_texture.png";

//			console.log("block pos: " + JSON.stringify(block.positionArray));
			MjtWebGlToolkit.getInstance().geometricObjects.push(block);
			MjtStats.getInstance().update("cubeCount", MjtWebGlToolkit.getInstance().geometricObjects.length);
			//document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
		}	
	};

	MjtActor.prototype.save = function save()
	{
		var keyPress = MjtUserInput.getInstance().grabKeyPress(49);
		if(keyPress)
		{
			MjtWebGlScene.getInstance().save();
		}	
	};

	MjtActor.prototype.load = function load()
	{
		var keyPress = MjtUserInput.getInstance().grabKeyPress(50);
		if(keyPress)
		{
			MjtWebGlScene.getInstance().load();
		}	
	};
	
	MjtActor.prototype.clear = function clear()
	{
		var keyPress = MjtUserInput.getInstance().grabKeyPress(51);
		if(keyPress)
		{
			MjtWebGlScene.getInstance().clear();
		}	
	};

	MjtActor.prototype.createTerrain = function createTerrain()
	{
		var keyPress = MjtUserInput.getInstance().grabKeyPress(52);
		if(keyPress)
		{
			MjtWebGlScene.getInstance().createTerrain();
		}	
	};

	
	mjt.singletonify(MjtActor);
});
