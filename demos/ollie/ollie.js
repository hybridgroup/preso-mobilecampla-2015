var Cylon = require('cylon');

Cylon.api("http", {host: "0.0.0.0", ssl: false});

Cylon.robot({
  name: 'olliebot',
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'}
  },

  devices: {
    ollie: { name: 'ollie', driver: 'ollie'}
  },

  move: function(direction) {
    var my = this;

    switch (direction) {
      case "up":
        my.ollie.roll(60, 0, 1);
        break;
      case "down":
        my.ollie.roll(60, 180, 1);
        break;
      case "left":
        my.ollie.setRGB(0xFF0000);
        my.ollie.setRawMotorValues(my.ollie.MotorForward, 200, my.ollie.MotorReverse, 200);
        break;
      case "right":
        my.ollie.setRGB(0xFF0000);
        my.ollie.setRawMotorValues(my.ollie.MotorReverse, 200, my.ollie.MotorForward, 200);
    }

    setTimeout(function() {
      my.ollie.setRGB(0x00FFFF);
      my.ollie.stop();
    }, 500);

    return "ok";
  },

  commands: function() {
    return {
      move: this.move
    };
  },

  work: function(my) {
    my.ollie.wake(function(err, data){
      after(200, function() {
        my.ollie.setRGB(0x00FFFF);
      });
    });
  }
}).start();
