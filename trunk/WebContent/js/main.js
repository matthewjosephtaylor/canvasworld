var yaw =0;
var pitch=0;
var posx=0;
var posy=0;
var posz=10;

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
		var idx = this.gl.getAttribLocation(this.gl.program, attributeName);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferObject);
		this.gl.enableVertexAttribArray(idx);
		this.gl.vertexAttribPointer(idx, vertexDimensions, componentPrimitiveType, false, 0, 0);
	};


	this.protoCube = null;
	
	this.createCube = function createCube(positionArray, scale, color)
	{
		
		if(this.protoCube == null)
		{
			this.protoCube = makeBox(this.gl);
	
			// Set up the array of colors for the cube's faces
			this.protoCube.colors = new Uint8Array([ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, // v0-v1-v2-v3 front
			1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, // v0-v3-v4-v5 right
			0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, // v0-v5-v6-v1 top
			1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, // v1-v6-v7-v2 left
			1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, // v7-v4-v3-v2 bottom
			0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ] // v4-v7-v6-v5 back
			);
	
			// Set up the vertex buffer for the colors
			this.protoCube.colorObject = this.gl.createBuffer();
	
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.protoCube.colorObject);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, this.protoCube.colors, this.gl.STATIC_DRAW);
			
		}

		var result = {};
		
		result.positionArray = positionArray;
		
		
		return result;
	};

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
		[ 0, 0, 0, 1 ], 10000);
		if (!this.gl)
		{
			throw "Unable to initialize WebGL";
		}

		// Set up light direction uniform
		this.gl.uniform3f(this.gl.getUniformLocation(this.gl.program, "lightDir"), 0, 0, 1);

		this.u_modelViewMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_modelViewMatrix");
		this.u_projMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_projMatrix");
		this.u_normalMatrixLoc = this.gl.getUniformLocation(this.gl.program, "u_normalMatrix");

		
		this.log("Finished init.");
	};

	this.drawGeometricObject = function drawCube(perspectiveMatrix, modelViewMatrix, geometricObject)
	{

		//this.log(geometricObject.mvMatrix.toString());
		this.setUniforms(perspectiveMatrix, modelViewMatrix, geometricObject.positionArray);
		// Draw the geometric object
		this.gl.drawElements(this.gl.TRIANGLES, this.protoCube.numIndices, this.gl.UNSIGNED_BYTE, 0);

	};

	this.modelViewMatrix =  new J3DIMatrix4();
	this.normalMatrix = new J3DIMatrix4();
	this.setUniforms = function setUniforms(perspectiveMatrix, modelViewMatrix, positionArray)
	{
		
		modelViewMatrix.translate(positionArray);
		modelViewMatrix.setUniform(this.gl, this.u_modelViewMatrixLoc, false);
		
		
		// Construct the normal matrix from the model-view matrix and pass it in
		// normal is only used for determining color
		var normalMatrix = this.normalMatrix;
		normalMatrix.load(modelViewMatrix);
		normalMatrix.invert();
		normalMatrix.transpose();
		normalMatrix.setUniform(this.gl, this.u_normalMatrixLoc, false);
	};
	
	this._perspectiveMatrix = null;
	
	this.updatePerspective = function updatePerspective()
	{
		this._perspectiveMatrix = null;		
	};


	
	this.camera = {};
	this.camera.eye= new J3DIVector3(0,0,20);
	this.camera.center = new J3DIVector3(0,0,0);
	this.camera.up = new J3DIVector3(0,1,0);
	
	
	this.perspectiveMatrix = new J3DIMatrix4();
	
	this.reshape = function reshape()
	{
		var canvas = document.getElementById(this.canvasId);
		var windowWidth = window.innerWidth - 80;
		var windowHeight = window.innerHeight - 80;
		if (windowWidth == this.width && windowHeight == this.height && this._perspectiveMatrix != null)
		{
			return this._perspectiveMatrix;
		}

		this.width = windowWidth;
		this.height = windowHeight;
		canvas.width = this.width;
		canvas.height = this.height;

		// Set the viewport and projection matrix for the scene
		this.gl.viewport(0, 0, this.width, this.height);
		var perspectiveMatrix = new J3DIMatrix4();

		// fovy (field of view? y), aspect, zNear, zFar
		perspectiveMatrix.perspective(45, this.width / this.height, 0.1, 100);

		// eyex, eyey, eyez, centerx, centery, centerz, upx, upy, upz
//		this.log("eye: "  + this.camera.eye)
//		this.log("center: "  + this.camera.center)
		//perspectiveMatrix.lookat(this.camera.eye.getAsArray(), this.camera.center.getAsArray(), this.camera.up.getAsArray());

		this._perspectiveMatrix = perspectiveMatrix;
		return perspectiveMatrix;
	};

	this.currentAngle = 0;
	this.incAngle = 0.0;

	this.geometricObjects = [];

	this.drawPicture = function drawPicture()
	{

		// Make sure the canvas is sized correctly.
		var perspectiveMatrix = this.reshape(this.gl);
		perspectiveMatrix.setUniform(this.gl, this.u_projMatrixLoc, false);

		// Clear the canvas
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		
		var modelViewMatrix = this.modelViewMatrix;
		modelViewMatrix.makeIdentity();
		modelViewMatrix.rotate(-pitch, 1,0,0);
		modelViewMatrix.rotate(-yaw, 0,1,0);
		modelViewMatrix.translate(-posx, -posy, -posz);

		var mvMatrix = new J3DIMatrix4();

		for ( var i in this.geometricObjects)
		{
			//this.log("drawing object: " + i + "at angle: " + this.currentAngle);
			var geometricObject = this.geometricObjects[i];
			//geometricObject.mvMatrix.rotate(this.currentAngle, 0, 1, 0);
			mvMatrix.load(modelViewMatrix);
			this.addVertexShaderAttribute("vNormal", this.protoCube.normalObject, this.gl.FLOAT, 3);
			this.addVertexShaderAttribute("vColor", this.protoCube.colorObject, this.gl.UNSIGNED_BYTE, 4);
			this.addVertexShaderAttribute("vPosition", this.protoCube.vertexObject, this.gl.FLOAT, 3);
			// Bind the index array
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.protoCube.indexObject);


			this.drawGeometricObject(perspectiveMatrix, mvMatrix, geometricObject);
		}

		// Show the framerate
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

		for ( var i = -2; i <= 2; i++)
		{
			var cube = this.createCube([i*2.1,0,0]);
			this.geometricObjects.push(cube);

		}
		for ( var i = -2; i <= 2; i++)
		{
			var cube = this.createCube([i*2.1,2.1,0]);
			this.geometricObjects.push(cube);

		}
		for ( var i = -2; i <= 2; i++)
		{
			var cube = this.createCube([i*2.1,4.2,0]);
			this.geometricObjects.push(cube);

		}
		
//		{
//			var cube = this.createCube([-4,0,0]);
//			this.geometricObjects.push(cube);
//		}
//		{
//			var cube = this.createCube([4,0,0]);
//			this.geometricObjects.push(cube);
//		}
		{
			var cube = this.createCube([0,0,0]);
//			cube.mvMatrix.scale(0.2,0.2,0.2);
			this.geometricObjects.push(cube);
		}
		{
//			var cube = this.createCube();
//			cube.mvMatrix.scale(20,20,20);
//			this.geometricObjects.push(cube);
		}

		
		
		
		{
//			var cube = this.createCube();
//			cube.mvMatrix.scale(20,20,20);
//			this.geometricObjects.push(cube);
		}

		this.drawPicture();

//		 tk = this;
//		 var f = function()
//		 {
//			 window.requestAnimFrame(f, c);
//			 tk.drawPicture();
//		 };
//		 f();
	};
	
};

mjtWebGlToolkit = new MjtWebGlToolkit();
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
cameraStepAmount=0.1;

function MjtKeyboardHandler()
{
	this.moveForward = function moveForward()
	{
        posx -= Math.sin(degToRad(yaw)) * cameraStepAmount;
        posz -= Math.cos(degToRad(yaw)) * cameraStepAmount;

        
		mjtWebGlToolkit.drawPicture();
	};
	this.moveBackward = function moveBackward()
	{
        posx += Math.sin(degToRad(yaw)) * cameraStepAmount;
        posz += Math.cos(degToRad(yaw)) * cameraStepAmount;
		mjtWebGlToolkit.drawPicture();
	};
	this.moveLeft = function moveLeft()
	{
		yaw+=cameraStepAmount;
		mjtWebGlToolkit.drawPicture();
	};
	this.moveRight = function moveRight()
	{
		yaw-=cameraStepAmount;
		mjtWebGlToolkit.drawPicture();
	};
	
	this.moveUp = function moveUp()
	{
		pitch++;
		mjtWebGlToolkit.drawPicture();
	};

	this.moveDown = function moveDown()
	{
		pitch--;
		mjtWebGlToolkit.drawPicture();
	};
	
	this.lookLeft = function lookLeft()
	{
		yaw+=cameraStepAmount;
		mjtWebGlToolkit.drawPicture();
	};
	
	this.lookRight = function lookRight()
	{
		yaw-=cameraStepAmount;
		mjtWebGlToolkit.drawPicture();
	};
	
	
};

mjtKeyboardHandler = new MjtKeyboardHandler();

function init()
{
	mjtWebGlToolkit.start('mainCanvas');
	mjtWebGlToolkit.drawPicture();
	$(document).bind('keydown', 'w',mjtKeyboardHandler.moveForward);
	$(document).bind('keydown', 's',mjtKeyboardHandler.moveBackward);
	$(document).bind('keydown', 'a',mjtKeyboardHandler.moveLeft);
	$(document).bind('keydown', 'd',mjtKeyboardHandler.moveRight);
	
	$(document).bind('keydown', 'up',mjtKeyboardHandler.moveUp);
	$(document).bind('keydown', 'down',mjtKeyboardHandler.moveDown);

	$(document).bind('keydown', 'left',mjtKeyboardHandler.lookLeft);
	$(document).bind('keydown', 'right',mjtKeyboardHandler.lookRight);
}

$(document).ready(init);


