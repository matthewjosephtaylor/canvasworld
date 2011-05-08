mjt.require("MjtWebGlToolkit", function defineMjtWebGlCubeCallback()
{

	MjtWebGlCube = function MjtWebGlCube()
	{
		this.init(MjtWebGlToolkit.getInstance().gl);
	};

	MjtWebGlCube.prototype.joinArrays4 = function joinArrays4()
	{
		var result = [];
		for (i in arguments)
		{
			var array = arguments[i];
			for ( var j = 0; j < 4; j++)
			{
				for ( var k = 0; k < array.length; k++)
				{
					result[result.length] = array[k];
				}
			}
		}
		return result;
	};

	MjtWebGlCube.prototype.init = function init(context)
	{
		this.protoCube = makeBox(context);
		// Set up the array of colors for the cube's faces

		//this.setupColorBuffer(context);

		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vNormal", this.protoCube.normalObject, context.FLOAT, 3);
		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vPosition", this.protoCube.vertexObject, context.FLOAT, 3);
		context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.protoCube.indexObject);
	};

//	MjtWebGlCube.prototype.setupColorBuffer = function setupColorBuffer( context )
//	{
//		var frontColor = [ 0, 0, 1, 1 ];
//		var rightColor = [ 1, 0, 0, 1 ];
//		var topColor = [ 0, 1, 0, 1 ];
//		var leftColor = [ 1, 1, 0, 1 ];
//		var bottomColor = [ 1, 0, 1, 1 ];
//		var backColor = [ 0, 1, 1, 1 ];
//
//		var oneDimensionalColorArray = this.joinArrays4(frontColor, rightColor, topColor, leftColor, bottomColor, backColor);
//
//		var colors = new Uint8Array(oneDimensionalColorArray);
//
//		// Set up the vertex buffer for the colors
//		var colorObject = context.createBuffer();
//
//		context.bindBuffer(context.ARRAY_BUFFER, colorObject);
//		context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);
//		MjtWebGlToolkit.getInstance().addVertexShaderAttribute("vColor", colorObject, context.UNSIGNED_BYTE, 4);
//		
//	};
	
	MjtWebGlCube.prototype.paint = function paint(context, modelViewMatrixFloat32)
	{
		context.uniformMatrix4fv(MjtWebGlToolkit.getInstance().u_modelViewMatrixLoc, false, modelViewMatrixFloat32);
		context.drawElements(context.TRIANGLES, this.protoCube.numIndices, context.UNSIGNED_BYTE, 0);
	};

	mjt.singletonify(MjtWebGlCube);

});