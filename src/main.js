
console.log("Hello from main.js");
let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 700,
    scene: [Menu, Play],
};

let keyF, keyR, keyLEFT, keyRIGHT

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;
let game = new Phaser.Game(config);