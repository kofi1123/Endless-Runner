class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }
    preload() {
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
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xd6b081).setOrigin(0, 0);
        this.add.rectangle(100, 100, game.config.width - 200, game.config.height - 200, 0xF5F5DC).setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ON TRACK', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use arrow keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'Dodge the trains as long as you can!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ←/→ to start', menuConfig).setOrigin(0.5);
        
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