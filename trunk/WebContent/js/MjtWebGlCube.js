mjt.require("MjtWebGlToolkit", function defineMjtWebGlCubeCallback()
{

	MjtWebGlCube = function MjtWebGlCube()
	{
		this.init(MjtWebGlToolkit.getInstance().gl);
	};

	MjtWebGlCube.prototype.init = function init(context)
	{
		this.protoCube = makeBox(context);
		// Set up the array of colors for the cube's faces
		var colors = new Uint8Array([ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, // v0-v1-v2-v3 front
		1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, // v0-v3-v4-v5 right
		0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, // v0-v5-v6-v1 top
		1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, // v1-v6-v7-v2 left
		1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, // v7-v4-v3-v2 bottom
		0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ] // v4-v7-v6-v5 back
		);

		// Set up the vertex buffer for the colors
		var colorObject = context.createBuffer();

		context.bindBuffer(context.ARRAY_BUFFER, colorObject);
		context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);

		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vColor", colorObject, context.UNSIGNED_BYTE, 4);
		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vNormal", this.protoCube.normalObject, context.FLOAT, 3);
		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vPosition", this.protoCube.vertexObject, context.FLOAT, 3);
		context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.protoCube.indexObject);
	};

	MjtWebGlCube.prototype.paint = function paint(context)
	{
		context.uniformMatrix4fv(MjtWebGlToolkit.getInstance().u_modelViewMatrixLoc, false, this.modelViewMatrixFloat32);
		context.drawElements(context.TRIANGLES, this.protoCube.numIndices, context.UNSIGNED_BYTE, 0);
	};

	mjt.singletonify(MjtWebGlCube);

});