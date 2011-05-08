mjt.register("J3DIVector3", "J3DIMath.js");
mjt.register("J3DIMatrix4", "J3DIMath.js");
mjt.register("initWebGL", "J3DI.js");
mjt.register("window.requestAnimFrame", "webgl-utils.js");

mjt.require("initWebGL", "J3DIVector3", "J3DIMatrix4", "window.requestAnimFrame", "MjtUserInput", "MjtWebGlCamera", function defineMjtWebGlToolkitCallback()
{

	MjtWebGlToolkit = function MjtWebGlToolkit()
	{
		this.canvasId = "mjtCanvas";
		this.VERTEX_ATTRIBUTES = [ "vNormal", "vColor", "vPosition" ];

		this.width = -1;
		this.height = -1;
		this.gl = null;

		this.mjtWebGlCamera = new MjtWebGlCamera();

		this.protoCube = null;

		this.perspectiveMatrix = new J3DIMatrix4();

		this.currentAngle = 0;
		this.incAngle = 1;

		this.geometricObjects = [];

		this.normalMatrix = new J3DIMatrix4();
		this.modelViewMatrix = new J3DIMatrix4();
		this.cameraTranslationMatrix = new J3DIMatrix4();

		this.init();
		this.start();

	};

	MjtWebGlToolkit.prototype.log = function log(message)
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

	MjtWebGlToolkit.prototype.addVertexShaderAttribute = function addVertexShaderAttribute(attributeName, bufferObject, componentPrimitiveType, vertexDimensions)
	{
		var attributeIdx = this.gl.getAttribLocation(this.gl.program, attributeName);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferObject);
		this.gl.vertexAttribPointer(attributeIdx, vertexDimensions, componentPrimitiveType, false, 0, 0);
		this.gl.enableVertexAttribArray(attributeIdx);
	};

	MjtWebGlToolkit.prototype.init = function init()
	{
		this.log("Starting init with canvas: " + this.canvasId);
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
		[ 0, 0, 0, 0 ], 10000);
		if (!this.gl)
		{
			throw "Unable to initialize WebGL";
		}

		// Set up light direction uniform
		this.gl.uniform3f(this.gl.getUniformLocation(this.gl.program, "lightDir"), 0, 0, 1);

		this.u_modelViewMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_modelViewMatrix");
		this.u_projMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_projMatrix");
		this.u_normalMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_normalMatrix");

		this.framerate = new Framerate("framerate");

		this.log("Finished init.");
	};


	MjtWebGlToolkit.prototype.reshape = function reshape()
	{
		var canvas = document.getElementById(this.canvasId);
		var windowWidth = window.innerWidth - 16;
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

	MjtWebGlToolkit.prototype.drawPicture = function drawPicture()
	{
		// Clear the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// var cameraTranslationMatrix = new J3DIMatrix4();
		this.cameraTranslationMatrix.makeIdentity();
		this.cameraTranslationMatrix.rotate(-this.mjtWebGlCamera.pitch, 1, 0, 0);
		this.cameraTranslationMatrix.rotate(-this.mjtWebGlCamera.yaw, 0, 1, 0);
		this.cameraTranslationMatrix.translate(-this.mjtWebGlCamera.posx, -this.mjtWebGlCamera.posy, -this.mjtWebGlCamera.posz);
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
		normalMatrix.setUniform(this.gl, this.u_normalMatrixLoc, false);

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

	MjtWebGlToolkit.prototype.start = function start()
	{
		var c = document.getElementById(this.canvasId);
		var w = Math.floor(window.innerWidth * 0.9);
		var h = Math.floor(window.innerHeight * 0.9);

		c.width = w;
		c.height = h;

		tk = this;
		tk.lastTime = new Date().getTime();
		(function f()
		{
			var currentTime = new Date().getTime();
			tk.mjtWebGlCamera.move(currentTime - tk.lastTime);
			tk.drawPicture();
			tk.lastTime = currentTime;
			setTimeout(f, 1000 / 30);
			// window.requestAnimFrame(f, c);
		})();

	};

	mjt.singletonify(MjtWebGlToolkit);
});