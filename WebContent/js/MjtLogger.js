/**
 * Perform logging functions.
 * 
 * Support the following levels from low-&gt;high.
 * Level : typical usage pattern:
 * 
 * - trace : called on function enter/exit.
 * - debug : strategically placed in certain sections to give meaningful low level detail data.
 * - info : useful data that does not change over time (version, machine memory stats, etc).
 * - error: unexpected bad condition.
 * - fatal: an error from which there is no recovery such as running out of memory.
 */

MjtLogger = function MjtLogger() {

};

/**
 * Given an object return its string representation
 * @param obj
 */
MjtLogger.prototype.stringify = function stringify(obj) {
	var result = "";
	if (typeof obj == 'string') {
		result = obj;
	} else {
		result = JSON.stringify(obj);
	}
	return result;

};

/**
 * Log the given message to the console using whatever output facilities are available
 * @param an array of message elements
 */
MjtLogger.prototype.log = function log() {
	var message = "";
	var self = this;
	$.each(arguments, function(k, v) {
		message = message + self.stringify(v);
	});

	if (window.console) {
		window.console.log(message);
	}

};

/**
 * If an argument is given then it is expected that it is the result from the function
 * Otherwise it is assumed that this is called at the top of the function
 */
MjtLogger.prototype.trace = function trace() {

	var caller = arguments.callee.caller;
	var callerName = caller.name;
	if (!callerName) {
		callerName = "(anon)";
	}

	if (arguments.length == 1) {
		this.log(callerName + ": result=" + arguments[0]);
	} else {
		this.log(callerName + ": ENTER ", caller.arguments);
	}

};