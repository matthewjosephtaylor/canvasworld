/**
* Collect various statistical measures
*/

MjtStats = function MjtStats() {
	this.measures = {};
};

/**
 * Update the statistical measure named 'name'
 * @param name
 * @param value
 */
MjtStats.prototype.update = function update(name, value) {
	this.measures[name] = value;
	var self = this;
	mjt.later(function() {self.updateDisplay(name);});
	return value;
};

/**
 * 
 * @param name
 * @returns the current value of the named statistical measure
 */
MjtStats.prototype.get = function get(name) {
	return this.measures[name];
};


/**
 * Update the HTML DOM such that any elements named "${name}_display" are updated
 * with the value of the measure.
 * @param name
 */
MjtStats.prototype.updateDisplay = function updateDisplay(name) {
	var element = document.getElementById(name + "_display");
	if(element != null) {
		element.innerHTML = name + ": " + this.get(name);
	}
};

mjt.singletonify(MjtStats);