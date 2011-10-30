

function MjtWebGlCube(context, positionArray, scale, rotationArray)
{
	this.context = context;
	this.positionArray = positionArray;
	this.rotationArray = rotationArray;
	this.scale = scale;
	
	this.init = function init()
	{
		// Set up the array of colors for the cube's faces
		this.colors = new Uint8Array([ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, // v0-v1-v2-v3 front
		1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, // v0-v3-v4-v5 right
		0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, // v0-v5-v6-v1 top
		1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, // v1-v6-v7-v2 left
		1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, // v7-v4-v3-v2 bottom
		0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ] // v4-v7-v6-v5 back
		);

		// Set up the vertex buffer for the colors
		this.colorObject = context.createBuffer();

		this.context.bindBuffer(context.ARRAY_BUFFER, this.colorObject);
		this.context.bufferData(context.ARRAY_BUFFER, this.colors, context.STATIC_DRAW);
		
		mjtWebGlToolkit.addVertexShaderAttribute("vColor", this.colorObject, context.UNSIGNED_BYTE, 4);

		//mjtWebGlToolkit.addVertexShaderAttribute("vPosition", mjtWebGlToolkit.protoCube.vertexObject, this.context.FLOAT, 3);
		
		// Bind the index array
		//this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, mjtWebGlToolkit.protoCube.indexObject);

		this.modelViewMatrix = new J3DIMatrix4();
		this.modelViewMatrix.translate(this.positionArray);
		this.modelViewMatrixFloat32 = this.modelViewMatrix.getAsFloat32Array();
//		this.modelViewMatrix.scale(this.scale);
//		this.modelViewMatrix.rotate(this.rotationArray[0],1,0,0);
//		this.modelViewMatrix.rotate(this.rotationArray[1],0,1,0);
//		this.modelViewMatrix.rotate(this.rotationArray[2],0,0,1);
		//modelViewMatrix.setUniform(this.context, mjtWebGlToolkit.u_modelViewMatrixLoc, false);

	};
	
	
	this.paint = function paint(context)
	{
		context.uniformMatrix4fv(mjtWebGlToolkit.u_modelViewMatrixLoc, false, this.modelViewMatrixFloat32);
		context.drawElements(context.TRIANGLES, mjtWebGlToolkit.protoCube.numIndices, context.UNSIGNED_BYTE, 0);
	};

	
	this.init();
}