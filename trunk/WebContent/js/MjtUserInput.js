


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
		console.log("initing MjtUserInput v0")
		document.onkeydown = this.handleKeyDown;
		document.onkeyup = this.handleKeyUp;
		console.log("initting MjtUserInput")
	};
	this.init();
}

//mjtUserInput = new MjtUserInput();
//
//
//$(document).ready(mjtUserInput.init);