var Cylon = require("cylon");

Cylon.api("http", {host: "0.0.0.0", ssl: false});

Cylon.robot({
  name: "edison",
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: {
    buzzer: { driver: 'led', pin: 4 },
    display: { driver: 'upm-jhd1313m1'}
  },

  writeToScreen: function(message) {
  	this.display.setCursor(0,0);
		this.display.write(message);
  },

  turnOn: function() {
  	this.buzzer.turnOn();
  	this.writeToScreen("ON!");
  },

  turnOff: function() {
  	this.buzzer.turnOff();
  	this.writeToScreen("Ready...");
  },

	commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff
    };
  },

  work: function() {
  	this.writeToScreen("Ready...");
  }
});

Cylon.start();
