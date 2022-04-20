class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }
    preload () {
        this.load.image('grid', './assets/images/grid.png');
        this.load.image('player', './assets/images/spr_playerPlaceholder.png');
        this.load.image('train', './assets/images/spr_trainPlaceholder.png');
    }
    create() {
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#57e1ff',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        let pixelSize = 100;
        this.bg = this.add.tileSprite(borderPadding, borderPadding, 700, 500, 'grid').setOrigin(0,0);
        this.player  = new Player(this, pixelSize * 2 + borderPadding, pixelSize + borderPadding, 'player').setOrigin(0,0);
        this.train = new Train(this, pixelSize * 3 + borderPadding, pixelSize * 2 + borderPadding, 'train', undefined, 2, {x: 0, y: 1}).setOrigin(0,0);
        this.gameOver = false;
    }

    update() {
        if (!this.gameOver) {
            this.player.update();
            this.train.update();
            if (this.checkCollision(this.train)) {
                this.gameOver = true;
            }
        }
        else {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }
        /*if (this.checkCollision(this.train)) {
            this.gameOver = true;
        }*/
    }

    checkCollision(train) {
        if (this.player.x < train.x + train.width - 25 &&
            this.player.x + this.player.width - 25 > train.x &&
            this.player.y < train.y + train.height - 25 &&
            this.player.height - 25 + this.player.y > train.y) {
                return true;
        }
        else {
            return false;
        }
    }
}