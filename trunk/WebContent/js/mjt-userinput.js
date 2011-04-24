
mjtUserInput = null;

function MjtUserInput()
{
	this.keyDownMap = {};

	this.handleKeyUp = function handleKeyUp(event)
	{
		mjtUserInput.keyDownMap[event.keyCode] = false;
	};
	
	this.handleKeyDown = function handleKeyDown(event)
	{
		mjtUserInput.keyDownMap[event.keyCode] = true;
	};
	
	this.grabKeyPressTimeMillis = function grabKeyPressTimeMillis(keyCodes)
	{
		var result = 0;
		
		for(var i in arguments)
		{
			var keyCode = arguments[i];
			if(mjtUserInput.keyDownMap[keyCode])
			{
				result = 1;
				break;
			}	
		}
		return result;
	};

	this.init = function init()
	{
		document.onkeydown = mjtUserInput.handleKeyDown;
		document.onkeyup = mjtUserInput.handleKeyUp;
		console.log("initting MjtUserInput")
	};

	$(document).ready(this.init);
}

//mjtUserInput = new MjtUserInput();
//
//
//$(document).ready(mjtUserInput.init);