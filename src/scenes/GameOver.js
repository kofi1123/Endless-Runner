class GameOver extends Phaser.Scene {
    constructor() {
        super("game over");
    }

    preload(){
   
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#57e1ff',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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