var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-window-cover", "WindowCover", WindowCover);
};


function WindowCover(log, config) {
	this.log = log;
	this.name = config.name;

	//this.apiroute = config.apiroute || "apiroute";
	//this.log(this.name, this.apiroute);
	
	// Required Characteristics
	//this.currentPosition = Characteristic.Position;
	//this.targetPosition = Characteristic.TargetPosition;
	//this.positionState = Characteristic.PositionState;

	// Optional Characteristics
	//this.holdPosition = Characteristic.HoldPosition;
	//this.targetHorizontalTiltAngle = Characteristic.TargetHorizontalTiltAngle;
	//this.targetVerticalTiltAngle = Characteristic.TargetVerticalTiltAngle;
	//this.currentHorizontalTiltAngle = Characteristic.CurrentHorizontalTiltAngle;
	//this.currentVerticalTiltAngle = Characteristic.CurrentVerticalTiltAngle;
	//this.obstructionDetected = Characteristic.ObstructionDetected;

}

WindowCover.prototype = {
	//Start
	identify: function(callback) {
		this.log("Identify requested!");
		callback(null);
	},
	// Required
	getCurrentPosition: function(callback) {
		this.log("getCurrentPosition:", this.currentPosition);
		var error = null;
		callback(error, this.currentPosition);
	},

	getName: function(callback) {
		this.log("getName :", this.name);
		var error = null;
		callback(error, this.name);
	},

	getTargetPosition: function (callback) {
		this.log("getTargetPosition :", this.targetPosition);
		var error = null;
		callback(error, this.targetPosition);
	},

	setTargetPosition: function (value, callback) {
		this.log("setTargetPosition from %s to %s", this.targetPosition, value);
		this.targetPosition = value;
		var error = null;
		callback(error);
	},

	getPositionState: function(callback) {
		this.log("getPositionState :", this.positionState);
		var error = null;
		callback(error, this.positionState);
	},

	setPositionState: function(value, callback) {
		this.log("setPositionState from %s to %s", this.setPositionState, value);
		this.positionState = value;
		var error = null;
		callback(error);
	},

	getServices: function() {

		// you can OPTIONALLY create an information service if you wish to override
		// the default values for things like serial number, model, etc.
		var informationService = new Service.AccessoryInformation();

		informationService
			.setCharacteristic(Characteristic.Manufacturer, "HTTP Manufacturer")
			.setCharacteristic(Characteristic.Model, "HTTP Model")
			.setCharacteristic(Characteristic.SerialNumber, "HTTP Serial Number");

		var WindowCoverService = new Service.WindowCover(this.name);

		WindowCoverService
			.getCharacteristic(Characteristic.Name)
			.on('get', this.getName.bind(this));

		// Required Characteristics
		WindowCoverService
			.getCharacteristic(Characteristic.CurrentPosition)
			.on('get', this.getCurrentPosition.bind(this));

 		WindowCoverService
			.getCharacteristic(Characteristic.TargetPosition)
			.on('get', this.getTargetPosition.bind(this))
			.on('set', this.setTargetPosition.bind(this));

		WindowCoverService
			.getCharacteristic(Characteristic.PositionState)
			.on('get', this.getPositionState.bind(this))
			.on('set', this.setPositionState.bind(this));

		// Optional Characteristics
		//TODO
	
		return [informationService, WindowCoverService];
	}
};
