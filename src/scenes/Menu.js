class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    preload() {
        this.load.image('menuBackground', './assets/images/menuBackground.png');
        this.load.audio('sfx_menuClick', './assets/sound/sfx_menuClick.mp3');
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
        this.bg = this.add.tileSprite(0, 0, 1082, 842, 'menuBackground').setOrigin(0, 0);
        this.bg.scaleX = 0.83179297597;
        this.bg.scaleY = 0.83135391924;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_menuClick');
            this.scene.start('play');    
        }
    }
}