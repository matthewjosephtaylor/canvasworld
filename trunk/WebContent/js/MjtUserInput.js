


function MjtUserInput()
{
	this.keyDownMap = {};

	this.handleKeyUp = function handleKeyUp(event)
	{
		this.keyDownMap[event.keyCode] = false;
	};
	
	this.handleKeyDown = function handleKeyDown(event)
	{
		this.keyDownMap[event.keyCode] = true;
	};
	
	this.grabKeyPressTimeMillis = function grabKeyPressTimeMillis(keyCodes)
	{
		var result = 0;
		
		for(var i in arguments)
		{
			var keyCode = arguments[i];
			if(this.keyDownMap[keyCode])
			{
				result = 1;
				break;
			}	
		}
		return result;
	};

	this.init = function init()
	{
		var o = this;
		document.onkeydown = function(event){o.handleKeyDown(event);};
		document.onkeyup = function(event){o.handleKeyUp(event);};
	};
	this.init();
}
