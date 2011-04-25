
mjt.register("J3DIVector3", "J3DIMath.js");
mjt.register("J3DIMatrix4", "J3DIMath.js");
mjt.register("initWebGL", "J3DI.js");
mjt.register("window.requestAnimFrame", "webgl-utils.js");

// mjt.require("jquery.hotkeys-0.7.9.min");
mjt.require("initWebGL", "J3DIVector3", "J3DIMatrix4", "window.requestAnimFrame", "MjtUserInput", "MjtWebGlCube", main);

var yaw = 0;
var pitch = 0;
var posx = 0;
var posy = 2;
var posz = 10;

function MjtWebGlToolkit()
{
	this.VERTEX_ATTRIBUTES = [ "vNormal", "vColor", "vPosition" ];

	this.width = -1;
	this.height = -1;
	this.gl = null;

	this.log = function log(message)
	{
		if (console && console.log)
		{
			console.log(message);
		}
		else
		{
			alert(message);
		}
	};

	this.addVertexShaderAttribute = function addVertexShaderAttribute(attributeName, bufferObject, componentPrimitiveType, vertexDimensions)
	{
		var attributeIdx = this.gl.getAttribLocation(this.gl.program, attributeName);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferObject);
		this.gl.vertexAttribPointer(attributeIdx, vertexDimensions, componentPrimitiveType, false, 0, 0);
		// this.gl.enableVertexAttribArray(attributeIdx);
	};

	this.protoCube = null;

	this.init = function init()
	{
		this.log("Starting init...");
		// Initialize
		this.gl = initWebGL(
		// The id of the Canvas Element
		this.canvasId,
		// The ids of the vertex and fragment shaders
		"vshader", "fshader",
		// The vertex attribute names used by the shaders.
		// The order they appear here corresponds to their index
		// used later.
		this.VERTEX_ATTRIBUTES,
		// The clear color and depth values
		[ 0, 0, 0, 0.1 ], 10000);
		if (!this.gl)
		{
			throw "Unable to initialize WebGL";
		}

		this.protoCube = makeBox(this.gl);

		// Set up light direction uniform
		this.gl.uniform3f(this.gl.getUniformLocation(this.gl.program, "lightDir"), 0, 0, 1);

		this.u_modelViewMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_modelViewMatrix");
		this.u_projMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_projMatrix");
		this.u_normalMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_normalMatrix");
		// this.u_cameraTranslationMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_cameraTranslationMatrix");

		this.gl.enableVertexAttribArray(0);
		this.gl.enableVertexAttribArray(1);
		this.gl.enableVertexAttribArray(2);
		this.addVertexShaderAttribute("vNormal", this.protoCube.normalObject, this.gl.FLOAT, 3);
		this.addVertexShaderAttribute("vPosition", this.protoCube.vertexObject, this.gl.FLOAT, 3);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mjtWebGlToolkit.protoCube.indexObject);

		this.log("Finished init.");
	};

	this._perspectiveMatrix = null;

	this.updatePerspective = function updatePerspective()
	{
		this._perspectiveMatrix = null;
	};

	this.camera = {};
	this.camera.eye = new J3DIVector3(0, 0, 20);
	this.camera.center = new J3DIVector3(0, 0, 0);
	this.camera.up = new J3DIVector3(0, 1, 0);

	this.perspectiveMatrix = new J3DIMatrix4();

	this.reshape = function reshape()
	{
		var canvas = document.getElementById(this.canvasId);
		var windowWidth = window.innerWidth - 80;
		var windowHeight = window.innerHeight - 80;

		this.width = windowWidth;
		this.height = windowHeight;
		canvas.width = this.width;
		canvas.height = this.height;

		// Set the viewport and projection matrix for the scene
		this.gl.viewport(0, 0, this.width, this.height);
		var perspectiveMatrix = new J3DIMatrix4();
		// this.perspectiveMatrix.makeIdentity();
		// var perspectiveMatrix = this.perspectiveMatrix;

		// fovy (field of view? y), aspect, zNear, zFar
		perspectiveMatrix.perspective(45, this.width / this.height, 0.1, 1000);

		this._perspectiveMatrix = perspectiveMatrix;
		return perspectiveMatrix;
	};

	this.currentAngle = 0;
	this.incAngle = 1;

	this.geometricObjects = [];

	this.modelViewMatrixOldValues = {};

	this.isOldValueDifferent = function testOldValue(valueName, value)
	{
		var oldValue = this.modelViewMatrixOldValues[valueName];
		var result = oldValue != value;
		this.modelViewMatrixOldValues[valueName] = value;
		return result;
	};

	this.isModelViewMatrixUpdateRequired = function isModelViewMatrixUpdateRequired()
	{

		var result = false;

		if (this.isOldValueDifferent("pitch", pitch))
		{
			result = true;
		}
		if (this.isOldValueDifferent("yaw", yaw))
		{
			result = true;
		}
		if (this.isOldValueDifferent("posx", posx))
		{
			result = true;
		}
		if (this.isOldValueDifferent("posy", posy))
		{
			result = true;
		}
		if (this.isOldValueDifferent("posz", posz))
		{
			result = true;
		}
		return result;
	};

	this.normalMatrix = new J3DIMatrix4();
	this.modelViewMatrix = new J3DIMatrix4();
	this.cameraTranslationMatrix = new J3DIMatrix4();

	this.drawPicture = function drawPicture()
	{
		// Clear the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// var cameraTranslationMatrix = new J3DIMatrix4();
		this.cameraTranslationMatrix.makeIdentity();
		this.cameraTranslationMatrix.rotate(-pitch, 1, 0, 0);
		this.cameraTranslationMatrix.rotate(-yaw, 0, 1, 0);
		this.cameraTranslationMatrix.translate(-posx, -posy, -posz);
		// this.cameraTranslationMatrix.setUniform(this.gl, this.u_cameraTranslationMatrixLoc, false);

		// Make sure the canvas is sized correctly.
		var perspectiveMatrix = this.reshape(this.gl);
		perspectiveMatrix.multiply(this.cameraTranslationMatrix);
		perspectiveMatrix.setUniform(this.gl, this.u_projMatrixLoc, false);

		// var modelViewMatrix = this.modelViewMatrix;
		//
		// var mvMatrix = new J3DIMatrix4();

		var normalMatrix = this.normalMatrix;
		normalMatrix.load(this.cameraTranslationMatrix);
		normalMatrix.invert();
		normalMatrix.transpose();
		normalMatrix.setUniform(this.gl, mjtWebGlToolkit.u_normalMatrixLoc, false);

		for ( var i in this.geometricObjects)
		{
			var geometricObject = this.geometricObjects[i];
			geometricObject.paint(this.gl);
		}

		this.gl.flush();

		// Show the framerate
		// console.log("drawing Picture:")
		this.framerate.snapshot();

		this.currentAngle += this.incAngle;
		if (this.currentAngle > 360)
		{
			this.currentAngle -= 360;
		}
	};

	this.canvasId = null;
	this.start = function start(canvasId)
	{
		this.canvasId = canvasId;
		var c = document.getElementById(canvasId);
		var w = Math.floor(window.innerWidth * 0.9);
		var h = Math.floor(window.innerHeight * 0.9);

		c.width = w;
		c.height = h;

		this.init();
		this.framerate = new Framerate("framerate");

		var x = 50;
		var y = 50;

		for ( var j = 0; j <= y; j++)
		{
			for ( var i = -x; i <= x; i++)
			{
				// var cube = this.createCube([ i * 2.1, j * 2.1, 0 ]);
				var cube = new MjtWebGlCube(this.gl, [ i * 2.1, j * 2.1, 0 ], 1 + (0.1 * i), [ 10 * i, 20 * i, 30 * i ]);
				var cube = new MjtWebGlCube(this.gl, [ i * 2.1, j * 2.1, 0 ]);
				// cube.positionArray = [ i * 2.1, j * 2.1, 0 ];
				this.geometricObjects.push(cube);

			}
		}

		tk = this;
		tk.lastTime = new Date().getTime();
		var f = function()
		{
			var currentTime = new Date().getTime();
			window.requestAnimFrame(f, c);
			mjtKeyboardHandler.move(currentTime - tk.lastTime);
			tk.drawPicture();
			tk.lastTime = currentTime;
			// setTimeout(f, 100);
		};
		f();
	};

};


function degToRad(degrees)
{
	return degrees * Math.PI / 180;
}
// cameraStepAmount=0.1;
speed = 0.009;
velocityCoordPerSecond = 0;
function MjtKeyboardHandler()
{
	this.move = function move(elapsed)
	{
		velocityCoordPerSecond = speed * elapsed;
		this.moveForward();
		this.moveBackward();
		this.moveLeft();
		this.moveRight();
		this.moveUp();
		this.moveDown();
		this.lookLeft();
		this.lookRight();
	};

	this.moveForward = function moveForward()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(87);
		if (keyPressTime)
		{
			// console.log("keyPressTime: " + velocityCoordPerSecond);
		}
		// var cameraStepAmount = keyPressTime / velocityCoordPerSecond;
		// var cameraStepAmount = .05;
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond;
		// console.log("cameraStepAmount: " + cameraStepAmount);
		posx -= Math.sin(degToRad(yaw)) * cameraStepAmount;
		posz -= Math.cos(degToRad(yaw)) * cameraStepAmount;
		// console.log("posz: " + posz);

		// mjtWebGlToolkit.drawPicture();
	};
	this.moveBackward = function moveBackward()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(83);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond;
		posx += Math.sin(degToRad(yaw)) * cameraStepAmount;
		posz += Math.cos(degToRad(yaw)) * cameraStepAmount;
		// console.log("moving backward cameraStepAmount: " + cameraStepAmount);
		// mjtWebGlToolkit.drawPicture();
	};
	this.moveLeft = function moveLeft()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(65);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond;
		posx -= Math.cos(degToRad(-yaw)) * cameraStepAmount;
		posz -= Math.sin(degToRad(-yaw)) * cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};
	this.moveRight = function moveRight()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(68);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond;
		posx += Math.cos(degToRad(-yaw)) * cameraStepAmount;
		posz += Math.sin(degToRad(-yaw)) * cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};

	this.moveUp = function moveUp()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(38);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond * 5;
		pitch += cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};

	this.moveDown = function moveDown()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(40);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond * 5;
		pitch -= cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};

	this.lookLeft = function lookLeft()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(37);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond * 5;
		yaw += cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};

	this.lookRight = function lookRight()
	{
		var keyPressTime = mjtUserInput.grabKeyPressTimeMillis(39);
		var cameraStepAmount = keyPressTime * velocityCoordPerSecond * 5;
		yaw -= cameraStepAmount;
		// mjtWebGlToolkit.drawPicture();
	};

};


function main()
{
	mjtUserInput = new MjtUserInput();
	mjtKeyboardHandler = new MjtKeyboardHandler();
	mjtWebGlToolkit = new MjtWebGlToolkit();
	mjtWebGlToolkit.start('mainCanvas');
	// mjtWebGlToolkit.drawPicture();
	// $(document).bind('keyup', 'w',mjtKeyboardHandler.moveForward);
	// $(document).bind('keyup', 's',mjtKeyboardHandler.moveBackward);
	// $(document).bind('keyup', 'a',mjtKeyboardHandler.moveLeft);
	// $(document).bind('keyup', 'd',mjtKeyboardHandler.moveRight);
	//	
	// $(document).bind('keyup', 'up',mjtKeyboardHandler.moveUp);
	// $(document).bind('keyup', 'down',mjtKeyboardHandler.moveDown);
	//
	// $(document).bind('keyup', 'left',mjtKeyboardHandler.lookLeft);
	// $(document).bind('keyup', 'right',mjtKeyboardHandler.lookRight);
}


