var Cylon = require('cylon');

Cylon.api("http", {host: "0.0.0.0", ssl: false});

Cylon.robot({
  name: 'olliebot',
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'}
  },

  devices: {
    ollie: { driver: 'ollie'}
  },

  move: function(direction) {
    var my = this;

    switch (direction) {
      case "up":
        my.ollie.roll(100, 0);
        break;
      case "down":
        my.ollie.roll(100, 180);
        break;
      case "left":
        my.ollie.roll(100, 270);
        break;
      case "right":
        my.ollie.roll(100, 90);
    }

    setTimeout(function() {
      my.ollie.stop();
    }, 2000);

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
