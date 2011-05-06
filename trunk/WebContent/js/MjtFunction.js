/**
 * 
 * @param {Object} parameters
 * @returns {MjtFunction}
 */
function MjtFunction(task)
{
	this.parameterMap = {};

	this.task = task;
	
	console.log("I was called");
}


MjtFunction.prototype = new Function();

MjtFunction.prototype.constructor = Function.prototype.constructor;

MjtFunction.prototype.task = function task(){};

MjtFunction.prototype.test = function test()
{
	//console.log("performing MjtFunction test")
	var performTask = false;

	for ( var parameterName in this.parameterMap)
	{
		console.log("parameterName: " + parameterName);
		var parameterValue = this.parameterMap[parameterName];
		console.log("parameterValue: " + parameterValue);
		performTask = parameterValue !== MjtFunction.EMPTY_VALUE;
		if (!performTask)
		{
			break;
		}
	}
	
	if (performTask)
	{
		this.task(this.parameterMap);
	}
};

MjtFunction.prototype.EMPTY_VALUE = MjtFunction;

MjtFunction.prototype.addParameter = function addParameter(parameterName, parameterFunction)
{
	this.parameterMap[parameterName] = MjtFunction.EMPTY_VALUE;
	var mjtFunction = this;
	var setterFunction = function setterFunction()
	{
		mjtFunction.parameterMap[parameterName] = parameterFunction(arguments);
		mjtFunction.test();
	};
	setterFunction();
};

MjtFunction.prototype._result = null; // TODO replace with 'NoResult' object?

MjtFunction.prototype.getResult = function getResult()
{
	for ( var i in this.parameters)
	{
		var parameter = this.parameters[i];
		

	}
};