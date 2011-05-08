mjt.require("MjtWebGlCube", function defineMjtWebGlCubeCallback()
{

	MjtWebGlBlock = function MjtWebGlBlock(positionArray, rotationArray, scaleArray)
	{
		this.positionArray = positionArray;
		this.rotationArray = rotationArray;
		this.scaleArray = scaleArray;
		this.frontColor = [ 0, 0, 1, 1 ];
		this.rightColor = [ 1, 0, 0, 1 ];
		this.topColor = [ 0, 1, 0, 1 ];
		this.leftColor = [ 1, 1, 0, 1 ];
		this.bottomColor = [ 1, 0, 1, 1 ];
		this.backColor = [ 0, 1, 1, 1 ];
		this.textureImage = null;

	};

	MjtWebGlBlock.prototype.updateModelViewMatrix = function updateModelViewMatrix()
	{
		var modelViewMatrix = new J3DIMatrix4();
		modelViewMatrix.translate(this.positionArray);
		if (this.scaleArray)
		{
			modelViewMatrix.scale(this.scaleArray);
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
	};
	
	MjtWebGlBlock.prototype.getColorObject = function getColorObject(context)
	{
		if(!this._colorObject)
		{
			this.updateColorObject(context);
		}
		return this._colorObject;
	}


	MjtWebGlBlock.prototype.paint = function paint(context)
	{
		this.setupColorBuffer(context);
		MjtWebGlCube.getInstance().paint(context, this.getModelViewMatrixFloat32());
	};

	MjtWebGlBlock.prototype.updateColorObject = function updateColorObject(context)
	{
		var oneDimensionalColorArray = MjtWebGlCube.getInstance().joinArrays4(this.frontColor, this.rightColor, this.topColor, this.leftColor, this.bottomColor, this.backColor);

		this._colorsArray = new Float32Array(oneDimensionalColorArray);
		this._colorObject = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, this._colorObject);
		context.bufferData(context.ARRAY_BUFFER, this._colorsArray, context.STATIC_DRAW);

	};
	
	
	MjtWebGlBlock.prototype.setupColorBuffer = function setupColorBuffer( context )
	{
		var colorObject = this.getColorObject(context);
		MjtWebGlToolkit.getInstance().updateVertexShaderAttribute("vColor", colorObject, context.FLOAT, 4);
	};

	
});