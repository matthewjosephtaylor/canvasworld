
function MjtConditional(then)
{
	this.then = then;
	this.equalMap = {};
	this.notEqualMap = {};
	this.existMap = {};
	this.valueMap = {};
}

MjtConditional.prototype.then = function then()
{
};

MjtConditional.prototype.exist = function exist(valueName)
{
	this.existMap[valueName] = true;
};

MjtConditional.prototype.equal = function equal(valueName, value)
{
	this.equalMap[valueName] = value;
};

MjtConditional.prototype.notEqual = function notEqual(valueName, value)
{
	this.notEqualMap[valueName] = value;
};

/**
 * Create a function (SF) that will set the given valueName on this MjtConditional objet to the result of the handlerFunction
 * handlerFunction will be called when SF function is called and will be passed the arguments
 * that the SF function was called with.
 * Condition will be tested afterwards to see if the then() method can be called.
 * @param valueName
 * @param handlerFunction
 */
MjtConditional.prototype.createSetFunction = function createSetFunction(valueName, handlerFunction)
{
	var mjtConditional = this;
	return function setterFunction()
	{
		mjtConditional.valueMap[valueName] = handlerFunction(arguments);
		mjtConditional.test();
	};
};




MjtConditional.prototype.test = function test()
{
	console.log("performing MjtConditional test")
	var doThen = false;

	for ( var valueName in this.existMap)
	{
		console.log("valueName: " + valueName);
		var value = this.valueMap[valueName];
		console.log("value: " + value);
		doThen = value != 'undefined';
		if (!doThen)
		{
			break;
		}
	}

	for ( var valueName in this.equalMap)
	{
		var leftSide = this.valueMap[valueName];
		var rightSide = this.equalMap[valueName];
		doThen = leftSide == rightSide;
		if (!doThen)
		{
			break;
		}
	}
	for ( var valueName in this.notEqualMap)
	{
		var leftSide = this.valueMap[valueName];
		var rightSide = this.notEqualMap[valueName];
		doThen = leftSide != rightSide;
		if (!doThen)
		{
			break;
		}
	}

	console.log("doThen:" + doThen);
	
	if (doThen)
	{
		this.then();
	}
};



