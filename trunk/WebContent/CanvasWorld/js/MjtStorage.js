
mjt.require("MjtObjectPool");


/**
 * WebSQL exists on Chrome and Safari.
 * IndexDB exists on Firefox (and maybe IE in future).
 * FileAPI exists on Chrome and Firefox (Safari in future).
 * WebStoreage is text only, and limited to 5mb.
 * @returns
 */
function MjtStorage()
{
}

/*
 * @param {object} key of object to be returned.
 * @returned {object} object corresponding to key.
 */
MjtStorage.prototype.get = function get(key)
{
	
	
};

/*
 * @param {object} key of object.
 * @param {object} object javascript object to be persisted.
 * @returned {boolean} true of set was successful. 
 */
MjtStorage.prototype.set = function set(key, object)
{
	
};

MjtStorage.prototype.errorHandler = function errorHandler(error)
{
	console.log("MJTStorage Error: " + error);
	console.log(error);
};
