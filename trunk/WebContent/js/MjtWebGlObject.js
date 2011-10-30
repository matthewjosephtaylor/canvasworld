

MjtWebGlObject = function MjtWebGlObject()
{
	this._mjtWebGlBlocks = [];
};

MjtWebGlObject.prototype.paint = function paint(context, elapsedTime)
{
	for(var i in this._mjtWebGlBlocks)
	{
		var mjtWebGlBlock = this._mjtWebGlBlocks[i];
		mjtWebGlBlock.paint(context, elapsedTime)
	}	
	
};

