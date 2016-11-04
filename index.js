var request = require("request");

var Service, Characteristic;

module.exports = function(homebridge) {
	console.log("homebridge API version: " + homebridge.version);
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-window-cover", "WindowCover", WindowCover);
};


function WindowCover(log, config) {
	this.log = log;
	this.name = config.name || "A window cover need a name";
	this.apiroute = config.apiroute || "";
	this.id = config.id || 0;
	this.service = new Service.WindowCovering(this.name);
	
	// Required Characteristics
	this.currentPosition = 100;
	this.targetPosition = 100;

	//Characteristic.PositionState.DECREASING = 0;
	//Characteristic.PositionState.INCREASING = 1;
	//Characteristic.PositionState.STOPPED = 2;

	this.positionState = Characteristic.PositionState.STOPPED;
	this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED);

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
		
		if(this.targetPosition > this.currentPosition) {
			this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.INCREASING);
		} else if(this.targetPosition < this.currentPosition) {
			this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.DECREASING);
		}

		var url = this.apiroute + "/targetposition/"+ this.id + "/" + this.targetPosition;
		this.log("GET", url);

		request.get({
			url: url
		}, function(err, response, body) {
			if (!err && response.statusCode == 200) {
				this.log("Response success");
				this.currentPosition = this.targetPosition;
				this.service.setCharacteristic(Characteristic.CurrentPosition, this.currentPosition);
				this.log("currentPosition is now %s", this.currentPosition);
				this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED);
				//doSuccess.bind(this);
				callback(null); // success
			} else {
				if(this.apiroute === "") {
					this.log("Response ERROR !!! > Fake Succes here");
					this.currentPosition = this.targetPosition;
					this.service.setCharacteristic(Characteristic.CurrentPosition, this.currentPosition);
					this.log("currentPosition is now %s", this.currentPosition);
					this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED);
					callback(null); // success
				} else {
					this.log("Response error" , err);
					callback(err);
				}
			}
		}.bind(this));
	},

	getPositionState: function(callback) {
		this.log("getPositionState :", this.positionState);
		var error = null;
		callback(error, this.positionState);
	},

	getServices: function() {

		// you can OPTIONALLY create an information service if you wish to override
		// the default values for things like serial number, model, etc.
		var informationService = new Service.AccessoryInformation();

		informationService
			.setCharacteristic(Characteristic.Manufacturer, "HTTP Manufacturer")
			.setCharacteristic(Characteristic.Model, "HTTP Model")
			.setCharacteristic(Characteristic.SerialNumber, "HTTP Serial Number");

		this.service
			.getCharacteristic(Characteristic.Name)
			.on('get', this.getName.bind(this));

		// Required Characteristics
		this.service
			.getCharacteristic(Characteristic.CurrentPosition)
			.on('get', this.getCurrentPosition.bind(this));

 		this.service
			.getCharacteristic(Characteristic.TargetPosition)
			.on('get', this.getTargetPosition.bind(this))
			.on('set', this.setTargetPosition.bind(this));

		this.service
			.getCharacteristic(Characteristic.PositionState)
			.on('get', this.getPositionState.bind(this));

		// Optional Characteristics
		//TODO
	
		return [informationService, this.service];
	}
};
