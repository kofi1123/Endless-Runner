
//console.log("Hello from main.js");
let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 700,
    backgroundColor: '#ffffff',
    scene: [Menu, Play, GameOver],
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
};

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyR;
let borderUISize = config.height / 15;
let borderPadding = config.height / 7;
let game = new Phaser.Game(config);
let finalScore;