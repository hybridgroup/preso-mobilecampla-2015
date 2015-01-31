var Cylon = require("cylon");

Cylon.api("http", {host: "0.0.0.0", ssl: false});

Cylon.robot({
  name: "edison",
  connections: {
    edison: { adaptor: 'intel-iot' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), function() {
      my.led.toggle();
    });
  }
}).start();
