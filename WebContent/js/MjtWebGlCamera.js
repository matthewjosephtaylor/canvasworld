
mjt.require("MjtUserInput", "MjtStats", function defineMjtWebGlCamera()
{
	MjtWebGlCamera = function MjtWebGlCamera()
	{
		this.yaw = 0;
		this.pitch = 0;
		this.posx = 0;
		this.posy = 2;
		this.posz = 100;
		this.speed = 0.009;
		this.velocityCoordPerSecond = 0;

		this.mjtUserInput = MjtUserInput.getInstance();
		this.move = function move(elapsed)
		{
			this.velocityCoordPerSecond = this.speed * elapsed;
			this.moveForward();
			this.moveBackward();
			this.moveLeft();
			this.moveRight();
			this.moveUp();
			this.moveDown();
			this.lookLeft();
			this.lookRight();
			this.lookUp();
			this.lookDown();
			
			MjtStats.getInstance().update("camera", this.toString()); 
			
		};

		this.degToRad = function degToRad(degrees)
		{
			return degrees * Math.PI / 180;
		};

		this.moveForward = function moveForward()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(87);
			if (keyPressTime)
			{
				// console.log("keyPressTime: " + velocityCoordPerSecond);
			}
			// var cameraStepAmount = keyPressTime / velocityCoordPerSecond;
			// var cameraStepAmount = .05;
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond;
			// console.log("cameraStepAmount: " + cameraStepAmount);
			this.posx -= Math.sin(this.yaw) * cameraStepAmount;
			this.posz -= Math.cos(this.yaw) * cameraStepAmount;
			// console.log("this.posz: " + this.posz);

			// mjtWebGlToolkit.drawPicture();
		};
		this.moveBackward = function moveBackward()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(83);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond;
			this.posx += Math.sin(this.yaw) * cameraStepAmount;
			this.posz += Math.cos(this.yaw) * cameraStepAmount;
			// console.log("moving backward cameraStepAmount: " + cameraStepAmount);
			// mjtWebGlToolkit.drawPicture();
		};
		this.moveLeft = function moveLeft()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(65);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond;
			this.posx -= Math.cos(-this.yaw) * cameraStepAmount;
			this.posz -= Math.sin(-this.yaw) * cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};
		this.moveRight = function moveRight()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(68);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond;
			this.posx += Math.cos(-this.yaw) * cameraStepAmount;
			this.posz += Math.sin(-this.yaw) * cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};

		this.moveUp = function moveUp()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(82);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 1;
			this.posy += cameraStepAmount;
		};

		this.moveDown = function moveDown()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(86);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 1;
			this.posy -= cameraStepAmount;
		};

		this.lookUp = function lookUp()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(38);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 0.1;
			this.pitch += cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};

		this.lookDown = function lookDown()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(40);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 0.1;
			this.pitch -= cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};

		this.lookLeft = function lookLeft()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(37);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 0.1;
			this.yaw += cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};

		this.lookRight = function lookRight()
		{
			var keyPressTime = this.mjtUserInput.grabKeyPress(39);
			var cameraStepAmount = keyPressTime * this.velocityCoordPerSecond * 0.1;
			this.yaw -= cameraStepAmount;
			// mjtWebGlToolkit.drawPicture();
		};

	};
	
	MjtWebGlCamera.prototype.toString = function toString()
	{
		return "x: " + this.posx + " y: " + this.posy + " z: " + this.posz + " yaw: " + this.yaw + " pitch: " + this.pitch;
	};

	mjt.singletonify(MjtWebGlCamera);
});