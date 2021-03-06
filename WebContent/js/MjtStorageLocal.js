mjt.require("MjtStorage", function mjtStorageLocalDefinitionCallback()
{
	MjtStorageLocal = function MjtStorageLocal()
	{
		console.log("Calling constructor on MjtStorageLocal");
		this._retrieve();
	};

	MjtStorageLocal.prototype = MjtStorage.getInstance();

	MjtStorageLocal.prototype._retrieve = function _retrieve()
	{
		var tableString = localStorage.getItem("mjt_store");
		if (!tableString)
		{
			tableString = JSON.stringify([]);
		}
		this.local = JSON.parse(tableString);
//		console.log("retrieved local:");
//		console.log(this.local);
	};

	MjtStorageLocal.prototype.sync = function sync()
	{
		//console.log("persisting local... ")
		localStorage.setItem("mjt_store", JSON.stringify(this.local));
	};
	
	MjtStorageLocal.prototype.clear = function clear(clear)
	{
		this.local = [];
		this.sync();
	}

	// criteria in the form of [object_type: [[attribute_name,value_type, value]]]
	MjtStorageLocal.prototype.get = function get(criteria, cb, matchCountCb)
	{
//		console.log("testing criteria: " + JSON.stringify(criteria));
		var matchCount = 0;
		for ( var i = 0; i < this.local.length; i++)
		{
			var localObject = this.local[i];
			var match = this.objectMatchesCriteria(localObject, criteria)
			if (match == true)
			{
//				console.log("matches: " + JSON.stringify(localObject));
				this.getAssembledObject(localObject, function(assembeledObject)
				{
					cb(assembeledObject);

				});
				matchCount++;
				// result.push(localObject);
			}
		}
		if (matchCountCb)
		{
			matchCountCb(matchCount);
		}
		// cb(result);
	};

	MjtStorageLocal.prototype.set = function set(object, cb)
	{
		var parent = this;
		this.getDigestedObject(object, function(digestedObject)
		{
//			console.log("digestedObject:");
//			console.log(digestedObject);
//			console.log("this:");
//			console.log(this);
			parent.local.push(digestedObject);
			parent.sync();
		});

		if (cb)
		{
			cb(true);
		}
		;
	};

	mjt.singletonify(MjtStorageLocal);

});