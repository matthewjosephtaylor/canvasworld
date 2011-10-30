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
		this.textureImageURL = null;
		this._modelViewMatrix = new J3DIMatrix4();
		this._modelViewMatrixFloat32 = null;
		// this.updateModelViewMatrix();
	};

	MjtWebGlBlock.prototype.setSolidColor = function setSolidColor(colorArray)
	{
		this.frontColor = colorArray;
		this.rightColor = colorArray;
		this.topColor = colorArray;
		this.leftColor = colorArray;
		this.bottomColor = colorArray;
		this.backColor = colorArray;
	};

	MjtWebGlBlock.prototype.updateModelViewMatrix = function updateModelViewMatrix()
	{
		this._modelViewMatrix.makeIdentity();
		// this._modelViewMatrix = new J3DIMatrix4();
		this._modelViewMatrix.translate(this.positionArray);
		if (this.scaleArray)
		{
			this._modelViewMatrix.scale(this.scaleArray);
		}
		if (this.rotationArray)
		{
			this._modelViewMatrix.rotate(this.rotationArray[0], 1, 0, 0);
			this._modelViewMatrix.rotate(this.rotationArray[1], 0, 1, 0);
			this._modelViewMatrix.rotate(this.rotationArray[2], 0, 0, 1);
		}
		this.updateModelViewMatrixFloat32();
	};

	MjtWebGlBlock.prototype.updateModelViewMatrixFloat32 = function updateModelViewMatrixFloat32()
	{
		this._modelViewMatrixFloat32 = this._modelViewMatrix.getAsFloat32Array();
	};

	MjtWebGlBlock.prototype.getModelViewMatrixFloat32 = function getModelViewMatrixFloat32()
	{
		if (!this._modelViewMatrixFloat32)
		{
			this.updateModelViewMatrix();
		}
		return this._modelViewMatrixFloat32;
	};

	MjtWebGlBlock.prototype.getColorObject = function getColorObject(context)
	{
		if (!this._colorObject)
		{
			this.updateColorObject(context);
		}
		return this._colorObject;
	};

	MjtWebGlCube.getInstance()._modelMutationMatrixCache = {};
	
	MjtWebGlBlock.prototype.getModelMutationMatrix = function getModelMutationMatrix(elapsedTime)
	{
		var rotationAmount = elapsedTime * 0.01;
		
		var modelMutationMatrix = MjtWebGlCube.getInstance()._modelMutationMatrixCache[elapsedTime];
		if(typeof modelMutationMatrix == 'undefined')
		{
			modelMutationMatrix = new J3DIMatrix4();
			modelMutationMatrix.rotate(rotationAmount, 1, 1, 1);
			MjtWebGlCube.getInstance()._modelMutationMatrixCache[elapsedTime] = modelMutationMatrix;
		}	
		return modelMutationMatrix;
		
	};
	
	MjtWebGlBlock.prototype.move = function move(elapsedTime)
	{
		if (this.textureImageURL)
		{
			return;
		}
		this.getModelViewMatrixFloat32();
//		var rotationAmount = elapsedTime * 0.01;
//		this._modelViewMatrix.rotate(rotationAmount, 1, 1, 1);
		
		var modelMutationMatrix = this.getModelMutationMatrix(elapsedTime);
		this._modelViewMatrix.multiply(modelMutationMatrix);
		
		this.updateModelViewMatrixFloat32();

		// if(this.rotationArray)
		// {
		// //console.log(this.rotationArray[0]);
		// this.rotationArray[0] += rotationAmount;
		// this.rotationArray[1] += rotationAmount;
		// this.rotationArray[2] += rotationAmount;
		//			
		// if(this.rotationArray[0] > 360)
		// {
		// this.rotationArray[0] -= 360;
		// }
		// if(this.rotationArray[1] > 360)
		// {
		// this.rotationArray[1] -= 360;
		// }
		// if(this.rotationArray[2] > 360)
		// {
		// this.rotationArray[2] -= 360;
		// }
		//			
		// this.updateModelViewMatrix();
		// }
	};

	MjtWebGlBlock.prototype.paint = function paint(context, elapsedTime)
	{
//		this.move(elapsedTime);
		this.setupTexture(context);
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

	MjtWebGlBlock.prototype.setupTexture = function setupTexture(context)
	{

		if (this.textureImageURL && !this.texture)
		{
			this._texture = MjtWebGlToolkit.getInstance().getTexture(this.textureImageURL);
		}

		var matrixLocation = MjtWebGlToolkit.getInstance().getUniformLocation("u_useTexture");

		if (this._texture)
		{
			context.bindTexture(context.TEXTURE_2D, this._texture);
			context.uniform1i(matrixLocation, 1);
		}
		else
		{
			// context.bindTexture(context.TEXTURE_2D, null);
			context.uniform1i(matrixLocation, 0);
		}
	};

	MjtWebGlBlock.prototype.setupColorBuffer = function setupColorBuffer(context)
	{
		if (this.textureImageURL == null)
		{
			var colorObject = this.getColorObject(context);
			MjtWebGlToolkit.getInstance().updateVertexShaderAttribute("vColor", colorObject, context.FLOAT, 4);
		}
	};

});