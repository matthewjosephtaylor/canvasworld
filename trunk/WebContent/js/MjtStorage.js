mjt.register("Fraction","fraction-0.3.js");
/**
 * WebSQL exists on Chrome and Safari. IndexDB exists on Firefox (and maybe IE in future). FileAPI exists on Chrome and Firefox (Safari in future). WebStoreage is text only, and limited to 5mb.
 * 
 * @returns
 */

mjt.require("Fraction", function mjtStorageDefinitionCallback()
{
	MjtStorage = function MjtStorage()
	{
		this.digesters = {};
		this.assemblers = {};
		this._nextIdx = 0;
	}

	/*
	 * @param {object} key of object to be returned. @returned {object} object corresponding to key.
	 */
	MjtStorage.prototype.get = function get(key)
	{
		throw "Function not implemented.";
	};

	/*
	 * @param {object} object javascript object to be persisted. @returned {boolean} true of set was successful.
	 */
	MjtStorage.prototype.set = function set(object)
	{
		throw "Function not implemented.";
	};

	MjtStorage.prototype.getStringIdx = function getStringIdx(string, cb)
	{
		throw "Function not implemented.";
	};

	MjtStorage.prototype.addAssembler = function addAssembler(clazz, assemblerFunction)
	{
		console.log("adding assembler for: " + clazz);

		if (typeof clazz == 'string')
		{
			clazz = [ clazz ];
		}

		for ( var i in clazz)
		{
			this.assemblers[clazz[i]] = assemblerFunction;
		}
	};

	MjtStorage.prototype.getAssembler = function getAssembler(clazz, cb)
	{
		var result = this.assemblers[clazz];
		if (typeof result != 'function')
		{
			result = this.assemblers["Object"];
			// console.log(this.asemblers);
			// throw "Unrecognized/missing assembler for class: " + clazz + " assembler: " + result;
		}
		cb(result);
	};

	MjtStorage.prototype.getAssembledObject = function getAssembledObject(object, cb)
	{
		this.getAssembler(object.constructor.name, function(assemblerFunction)
		{
			assemblerFunction(object, function(assembledObject)
			{
				cb(assembledObject);
			});

		});
	};

	/**
	 * Digester functions create a simple attribute-only object to be passed to the serializer.
	 * 
	 * @param clazz
	 *            either a string or an array of strings
	 * @param digesterFunction
	 */
	MjtStorage.prototype.addDigester = function addDigester(clazz, digesterFunction)
	{
		console.log("adding digester for: " + clazz);

		if (typeof clazz == 'string')
		{
			clazz = [ clazz ];
		}

		for ( var i in clazz)
		{
			this.digesters[clazz[i]] = digesterFunction;
		}
	};

	MjtStorage.prototype.getDigester = function getDigester(clazz, cb)
	{
		var result = this.digesters[clazz];
		if (typeof result != 'function')
		{
			result = this.digesters["Object"];
			// console.log(this.digesters);
			// throw "Unrecognized/missing digester for class: " + clazz + " digester: " + result;
		}
		cb(result);
	};

	MjtStorage.prototype.getDigestedObject = function getDigestedObject(object, cb)
	{
		this.getDigester(object.constructor.name, function(digesterFunction)
		{
			digesterFunction(object, function(digestedObject)
			{
				cb(digestedObject);
			});

		});
	};

	MjtStorage.prototype.attributeMatchesCriteriaAttribute = function attributeMatchesCriteriaAttribute(objectAttributeArray, criteriaAttributeArray)
	{
		var result = null;
		// only compare matching attributeNames, otherwise return inconclusive match
		if (objectAttributeArray[0] == criteriaAttributeArray[0])
		{
			for ( var i = 1; i < criteriaAttributeArray.length; i++)
			{
				if (objectAttributeArray[i] == criteriaAttributeArray[i])
				{
					result = true;
				}
				else
				{
					console.log("attribute does not match criteria for object/criteria:");
					console.log(objectAttributeArray);
					console.log(criteriaAttributeArray);
					result = false;
					break;
				}
			}
		}
		return result;
	};

	// good use of a worker?
	MjtStorage.prototype.objectMatchesCriteria = function objectMatchesCriteria(object, criteria)
	{
		var result = null;
		var criteriaAttributeArray = criteria[1];
		var objectAttributeArray = object[1];
		if (object[0] == criteria[0])
		{
			for ( var i = 0; i < criteriaAttributeArray.length; i++)
			{
				for ( var j = 0; j < objectAttributeArray.length; j++)
				{
					var match = this.attributeMatchesCriteriaAttribute(objectAttributeArray[j], criteriaAttributeArray[i])
					if (match == null)
					{
						continue;
					}
					else if (match == true)
					{
						result = true;
					}
					else
					{
						result = false;
						break;
					}
				}
			}
		}
		return result;
	};

	MjtStorage.prototype.getTypeNameAsString = function getTypeNameAsString(object)
	{
		var result = null;
		if (object === undefined)
		{
			result = 'undefined';
		}
		else if (object === null)
		{
			result = 'null';
		}
		else
		{
			var result = object.constructor.name;
		}
		return result;
	}

	MjtStorage.prototype.errorHandler = function errorHandler(error)
	{
		console.log("MJTStorage Error: " + error);
		console.log(error);
	};

	mjt.singletonify(MjtStorage);

	MjtStorage.getInstance().addDigester([ "Object" ], function defaultDigester(object, cb)
	{
		var objectTypeName = object.constructor.name;
		var attributes = [];
		for ( var attributeName in object)
		{
			var value = object[attributeName];
			var valueTypeName = MjtStorage.getInstance().getTypeNameAsString(value);
			attributes.push([ attributeName, valueTypeName, value ]);
		}
		var result = [ objectTypeName, attributes ];
		cb(result);
	});

	MjtStorage.getInstance().addAssembler([ "Object" ], function defaultAssembler(digestedObject, cb)
	{
		var objectTypeName = digestedObject[0];
		var attributes = digestedObject[1];
		var valueArray = [];
		for ( var i = 0; i < attributes.length; i++)
		{
			var attributeIdx = attributes[i][0];
			var valueTypeName = attributes[i][1];
			var value = attributes[i][2];
			valueArray[attributeIdx] = window[valueTypeName](value);
		}
		var result = new window[objectTypeName](valueArray);
		cb(result);
	});

	MjtStorage.getInstance().addDigester(Float32Array.prototype.constructor.name, function float32ArrayDigester(object, cb)
	{
		var objectTypeName = object.constructor.name;
		var attributes = [];
		for ( var attributeIdx = 0; attributeIdx < object.length; attributeIdx++)
		{
			var value = object[attributeIdx];
			var valueTypeName = MjtStorage.getInstance().getTypeNameAsString(value);
			attributes.push([ attributeIdx, valueTypeName, value ]);
		}
		var result = [ objectTypeName, attributes ];
		cb(result);
	});

	// [object_type,[[attribute_name,value_type, value]]]
	MjtStorage.getInstance().addAssembler(Float32Array.prototype.constructor.name, function float32ArrayAssembler(digestedObject, cb)
	{
		var objectTypeName = digestedObject[0];
		var attributes = digestedObject[1];
		var valueArray = [];
		for ( var i = 0; i < attributes.length; i++)
		{
			var attributeIdx = attributes[i][0];
			// var valueTypeName = attributes[i][1];
			var value = attributes[i][2];
			valueArray[attributeIdx] = Number(value); // numbers are the only legal value types.
		}
		var result = new window[objectTypeName](valueArray);
		cb(result);
	});
	
	
	MjtStorage.getInstance().addDigester(Fraction.prototype.constructor.name, function fractionDigester(object, cb)
	{
		var objectTypeName = Fraction.prototype.constructor.name;
		var attributes = [];
		attributes.push(["numerator", "Number", object.numerator]);
		attributes.push(["denominator", "Number", object.denominator]);
		var result = [objectTypeName, attributes ];
		cb(result);
	});

	// [object_type,[[attribute_name,value_type, value]]]
	MjtStorage.getInstance().addAssembler(Fraction.prototype.constructor.name, function fractionAssembler(digestedObject, cb)
	{
		var objectTypeName = digestedObject[0];
		var attributes = digestedObject[1];
		var valueArray = [Number(attributes[0][2]),Number(attributes[1][2])];
		var result = new window[objectTypeName](valueArray);
		cb(result);
	});

	
	
	
});
