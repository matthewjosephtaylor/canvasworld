mjt.require("MjtWebGlCube", function defineMjtWebGlCubeCallback()
{

	MjtWebGlBlock = function MjtWebGlBlock(positionArray, scale, rotationArray)
	{
		this.positionArray = positionArray;
		this.rotationArray = rotationArray;
		this.scale = scale;
		this.updateModelViewMatrix();
	};

	MjtWebGlBlock.prototype = MjtWebGlCube.getInstance();

	MjtWebGlBlock.prototype.updateModelViewMatrix = function updateModelViewMatrix()
	{
		this.modelViewMatrix = new J3DIMatrix4();
		this.modelViewMatrix.translate(this.positionArray);
		if (this.scale)
		{
			this.modelViewMatrix.scale(this.scale);
		}
		if (this.rotationArray)
		{
			this.modelViewMatrix.rotate(this.rotationArray[0], 1, 0, 0);
			this.modelViewMatrix.rotate(this.rotationArray[1], 0, 1, 0);
			this.modelViewMatrix.rotate(this.rotationArray[2], 0, 0, 1);
		}
		this.modelViewMatrixFloat32 = this.modelViewMatrix.getAsFloat32Array();
	};

});