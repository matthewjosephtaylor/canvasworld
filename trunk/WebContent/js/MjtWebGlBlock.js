mjt.require("MjtWebGlCube", function defineMjtWebGlCubeCallback()
{

	MjtWebGlBlock = function MjtWebGlBlock(positionArray, rotationArray, scale)
	{
		this.positionArray = positionArray;
		this.rotationArray = rotationArray;
		this.scale = scale;
	};

	MjtWebGlBlock.prototype.updateModelViewMatrix = function updateModelViewMatrix()
	{
		var modelViewMatrix = new J3DIMatrix4();
		modelViewMatrix.translate(this.positionArray);
		if (this.scale)
		{
			modelViewMatrix.scale(this.scale);
		}
		if (this.rotationArray)
		{
			modelViewMatrix.rotate(this.rotationArray[0], 1, 0, 0);
			modelViewMatrix.rotate(this.rotationArray[1], 0, 1, 0);
			modelViewMatrix.rotate(this.rotationArray[2], 0, 0, 1);
		}
		this._modelViewMatrixFloat32 = modelViewMatrix.getAsFloat32Array();
	};
	
	MjtWebGlBlock.prototype.getModelViewMatrixFloat32 = function getModelViewMatrixFloat32()
	{
		if(!this._modelViewMatrixFloat32)
		{
			this.updateModelViewMatrix();
		}
		return this._modelViewMatrixFloat32;
	}

	MjtWebGlBlock.prototype.paint = function paint(context)
	{
		MjtWebGlCube.getInstance().paint(context, this.getModelViewMatrixFloat32());
	};

	
});