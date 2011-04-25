

function Mjt(javascriptPath, cssPath, enableBrowserCaching)
{
	this.enableBrowserCaching = enableBrowserCaching; 
	this.javascriptPath = javascriptPath;
	this.cssPath = cssPath;
	this.JQUERY_FILE_NAME = "jquery-1.5.2.min.js";
	
	this.loaded = {};
	this.javascriptTypeNameToFileNameMap = {};
};

Mjt.prototype.init = function init()
{
	console.log('initializing MJT...');
	mjt.loadJavascript(mjt.JQUERY_FILE_NAME);
	mjt.require("main");
};

Mjt.prototype.loadJavascript = function loadJavascript(fileName)
{
	if(!this.enableBrowserCaching)
	{
		fileName = fileName + "?" + new Date().getTime();
	}	
	var headElement = document.getElementsByTagName('head').item(0);
	var scriptElement = document.createElement('script');
	scriptElement.setAttribute("type", "text/javascript");
	console.log("loading: " + this.javascriptPath + "/" + fileName);
	scriptElement.setAttribute("src", this.javascriptPath + "/" + fileName);
	headElement.appendChild(scriptElement);
	console.log("loaded: " + this.javascriptPath + "/" + fileName);
};

Mjt.prototype.loadCss = function loadCss(fileName)
{
	var headElement = document.getElementsByTagName('head').item(0);
	var stylesheetElement = document.createElement("link");
	stylesheetElement.setAttribute("rel", "stylesheet");
	stylesheetElement.setAttribute("type", "text/css");
	stylesheetElement.setAttribute("href", this.cssPath + "/" + fileName);
	headElement.appendChild(stylesheetElement);
};

Mjt.prototype.register = function register(typeName, fileName)
{
	this.javascriptTypeNameToFileNameMap[typeName] = fileName;
}

Mjt.prototype.getFileNameOfTypeName = function getFileNameOfTypeName(typeName)
{
	var result = this.javascriptTypeNameToFileNameMap[typeName];
	if(!result)
	{
		result = typeName + ".js";
		this.register(typeName, result);
	}
	return result;
};

Mjt.prototype.loadOnce = function loadOnce(typeName)
{
	var fileNameOfType = this.getFileNameOfTypeName(typeName);
	if(!this.loaded[fileNameOfType])
	{
		console.log('loading: ' + name);
		this.loaded[fileNameOfType] = true;
		this.loadJavascript(fileNameOfType);
	}
	
};

Mjt.prototype.callOnceAllTypesExist = function callOnceAllTypesExist(callbackFunction, typeArray)
{
	var callCallback = true;
	for(i in typeArray)
	{
		var type = typeArray[i];
		var evalResult = eval("typeof " + type);
		if(evalResult == "undefined")
		{
			console.log("type doesn't exist yet: " + type)
			callCallback = false;
			break;
		}	
	}
	
	if(callCallback)
	{
		console.log("all types exist calling callback function")
		callbackFunction();
	}	
	else
	{
		var o = this;
		var f = function()
		{
			o.callOnceAllTypesExist(callbackFunction, typeArray);
		};
		setTimeout(f,1000);
	}
};


/**
 * If type is not defined load it from server Assumes type name == file name;
 * 
 * @param {string} name(s) of type(s) to load
 * @param {function} function to call once all types have been loaded. 
 */
Mjt.prototype.require = function require()
{
	var callbackFunction = null;
	var typeArray = [];
	for(i in arguments)
	{
		var argument = arguments[i];
		if(typeof argument == 'function')
		{
			callbackFunction = argument;
		}
		else
		{
			this.loadOnce(argument);
			typeArray.push(argument);
		}	
	}
	if(callbackFunction)
	{
		this.callOnceAllTypesExist(callbackFunction, typeArray);
	}
};

mjt = new Mjt("js", "css", false);

window.onload = mjt.init;
