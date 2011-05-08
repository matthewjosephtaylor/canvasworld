
mjt.require("MjtUserInput", function defineMjtActorCallback()
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
		var spaceKeyPressTime = MjtUserInput.getInstance().grabKeyPress(32);
		if(spaceKeyPressTime)
		{
			var camera = MjtWebGlCamera.getInstance();
			console.log("got keypress");
			console.log("Current Camera Coords: " + camera);

			var x = camera.posx + Math.cos(this.degToRad(-camera.yaw));
			var z = camera.posz + Math.sin(this.degToRad(-camera.yaw));
			var y = camera.posy;
			
			var block = new MjtWebGlBlock([ x,y,z ], [0,camera.yaw,0]);

			console.log("block pos: " + JSON.stringify(block.positionArray));
			MjtWebGlToolkit.getInstance().geometricObjects.push(block);
			document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
		}	
	};
	
	mjt.singletonify(MjtActor);
});
