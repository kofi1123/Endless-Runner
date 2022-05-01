class GameOver extends Phaser.Scene {
    constructor() {
        super("game over");
    }

    init(score){
        this.displayScore = Math.floor(score);
    }

    preload() {
        this.load.image('gameOverBackground', './assets/images/GameOver.png');
        this.load.audio('sfx_menuClick', './assets/sound/sfx_menuClick.mp3');
    }

    create(){
         
        this.scoreDisplay = this.add.text(350, 525, this.displayScore, {fontFamily: 'Bahnschrift SemiBold',
        fontSize: '100px', color: '#000000' });
        console.log("displayScore = " + this.displayScore, );
        this.bg = this.add.image(0, 0, 'gameOverBackground').setOrigin(0, 0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.scoreDisplay.depth = 1;

        //this.bg.add(this.scoreDisplay);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("play");
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }
    }
}