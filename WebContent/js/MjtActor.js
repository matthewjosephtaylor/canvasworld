mjt.require("MjtWebGlBlock", "MjtWebGlScene");

mjt.require("MjtUserInput", function defineMjtActorCallback() {
	MjtActor = function MjtActor() {
		this.phantomBlock = null;
		this.armLength = 30;
		//this.updatePhantomBlock();
	};

	MjtActor.prototype.degToRad = function degToRad(degrees) {
		return degrees * Math.PI / 180;
	};

	MjtActor.prototype.act = function act(elapsedTime) {
		this.moveArmCloser();
		this.moveArmFarther();
		this.updatePhantomBlock();
		this.addBlock1();
		this.addBlock2();
		this.addObject();
		this.load();
		this.clear();
		this.save();
		this.createTerrain();
	};

	MjtActor.prototype.updatePhantomBlock = function updatePhantomBlock() {
		
		//possible this hasn't loaded yet, and each depends on the other
		//TODO MJT clean out dependancies between MjtWebGlBlock and MjtActor
		if(!MjtWebGlBlock.prototype.paint){
			return;
		}
		var camera = MjtWebGlCamera.getInstance();
		var armLength = this.armLength + 0.1;
		var x = camera.posx - (Math.sin(camera.yaw) * armLength);
		var z = camera.posz - (Math.cos(camera.yaw) * armLength);
		var y = camera.posy + (Math.sin(camera.pitch) * armLength);

		if (this.phantomBlock == null) {
			this.phantomBlock = new MjtWebGlBlock([ x, y, z ], [ 0, camera.yaw, 0 ]);
//			this.phantomBlock.frontColor = [ 0.1, 0.5, 0.5, 1 ];
		    this.phantomBlock.textureImageURL="img/clear_rectangle_64x64.png";
			MjtWebGlToolkit.getInstance().geometricObjects.push(this.phantomBlock);
			MjtStats.getInstance().update("cubeCount", MjtWebGlToolkit.getInstance().geometricObjects.length);
		} else {
			this.phantomBlock.positionArray=[x,y,z];
			this.phantomBlock.rotationArray=[0,camera.yaw,0];
			this.phantomBlock.updateModelViewMatrix();
		}
		


	};

	MjtActor.prototype.addObject = function addObject() {
		var keyPressTime = MjtUserInput.getInstance().grabKeyPress(55);
		if (keyPressTime) {
			var object
			// TODO
			// MJT
			// do
			// something
			// here
			// :)
		}
	};
	
	
	MjtActor.prototype.moveArmCloser = function moveArmCloser() {
		
		var keyPressTime = MjtUserInput.getInstance().grabKeyPress(67);
		if(keyPressTime){
			this.armLength -= (keyPressTime*0.1);
		}
	};

	MjtActor.prototype.moveArmFarther = function moveArmFarther() {
		
		var keyPressTime = MjtUserInput.getInstance().grabKeyPress(90);
		if(keyPressTime){
			this.armLength += (keyPressTime*0.1);
		}
	};

	MjtActor.prototype.addBlock1 = function addBlock() {
		var spaceKeyPressTime = MjtUserInput.getInstance().grabKeyPress(70);
		if (spaceKeyPressTime) {

			
			var camera = MjtWebGlCamera.getInstance();
			var armLength = this.armLength;
			var x = camera.posx - (Math.sin(camera.yaw) * armLength);
			var z = camera.posz - (Math.cos(camera.yaw) * armLength);
			var y = camera.posy + (Math.sin(camera.pitch) * armLength);

			var block = new MjtWebGlBlock([ x, y, z ], [ 0, camera.yaw, 0 ]);
//			var block = new MjtWebGlBlock(this.phantomBlock.positionArray, this.phantomBlock.rotationArray);
			block.frontColor = [ 0.1, 0.5, 0.5, 1 ];
			MjtWebGlToolkit.getInstance().geometricObjects.push(block);
			MjtStats.getInstance().update("cubeCount", MjtWebGlToolkit.getInstance().geometricObjects.length);
		}
	};

	MjtActor.prototype.addBlock2 = function addBlock() {
		var spaceKeyPressTime = MjtUserInput.getInstance().grabKeyPress(32);
		if (spaceKeyPressTime) {
			var camera = MjtWebGlCamera.getInstance();
			// console.log("got
			// keypress");
			// console.log("Current
			// Camera
			// Coords:
			// " +
			// camera);

			var armLength = this.armLength;
			var x = camera.posx - (Math.sin(camera.yaw) * armLength);
			var z = camera.posz - (Math.cos(camera.yaw) * armLength);
			var y = camera.posy + (Math.sin(camera.pitch) * armLength);

			var block = new MjtWebGlBlock([ x, y, z ], [ 0, camera.yaw, 0 ]);
			block.frontColor = [ 0.1, 0.5, 0.5, 1 ];
			block.textureImageURL = "img/block_texture.png";

			// console.log("block
			// pos:
			// " +
			// JSON.stringify(block.positionArray));
			MjtWebGlToolkit.getInstance().geometricObjects.push(block);
			MjtStats.getInstance().update("cubeCount", MjtWebGlToolkit.getInstance().geometricObjects.length);
			// document.getElementById("cubeCount").innerHTML
			// =
			// "Cube
			// Count:
			// " +
			// MjtWebGlToolkit.getInstance().geometricObjects.length;
		}
	};

	MjtActor.prototype.save = function save() {
		var keyPress = MjtUserInput.getInstance().grabKeyPress(49);
		if (keyPress) {
			MjtWebGlScene.getInstance().save();
		}
	};

	MjtActor.prototype.load = function load() {
		var keyPress = MjtUserInput.getInstance().grabKeyPress(50);
		if (keyPress) {
			MjtWebGlScene.getInstance().load();
		}
	};

	MjtActor.prototype.clear = function clear() {
		var keyPress = MjtUserInput.getInstance().grabKeyPress(51);
		if (keyPress) {
			MjtWebGlScene.getInstance().clear();
		}
	};

	MjtActor.prototype.createTerrain = function createTerrain() {
		var keyPress = MjtUserInput.getInstance().grabKeyPress(52);
		if (keyPress) {
			MjtWebGlScene.getInstance().createTerrain();
		}
	};

	mjt.singletonify(MjtActor);
});
