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

        this.pixelSize = 100;
        this.bg = this.add.tileSprite(borderPadding, borderPadding, 700, 500, 'grid').setOrigin(0,0);
        this.player  = new Player(this, this.pixelSize * 2 + borderPadding, this.pixelSize + borderPadding, 'player').setOrigin(0,0);
        this.trains = this.add.group();
        this.gameOver = false;

        //Systems for timer
        this.currentTime = 0;
        this.intervalTIme = 120;
        this.trainSpeed = 2;
    }

    update() {
        if (!this.gameOver) {
            this.player.update();
            
            //Update Trains
            let trainArr = this.trains.getChildren();
            for(let i = 0; i < trainArr.length; i++){
                trainArr[i].update();
                if(this.checkCollision(trainArr[i])){
                    this.gameOver = true;
                }
            }

            //Spawns new trains
            this.currentTime++;
            if(this.currentTime >= this.intervalTIme){
                let dir = Phaser.Math.Between(0, 3);
                let newTrain;
                if(dir == 0){
                    newTrain = new Train(this, this.pixelSize * Phaser.Math.Between(0, 6) + borderPadding, this.pixelSize * -1 + borderPadding, 'train', undefined, this.trainSpeed, {x: 0, y: 1}).setOrigin(0,0);
                }
                else if(dir == 1){
                    newTrain = new Train(this, this.pixelSize * Phaser.Math.Between(0, 6) + borderPadding, this.pixelSize * 7 + borderPadding, 'train', undefined, this.trainSpeed, {x: 0, y: -1}).setOrigin(0,0);
                }
                else if(dir == 2){
                    newTrain = new Train(this, this.pixelSize * -1 + borderPadding, this.pixelSize * Phaser.Math.Between(0, 4) + borderPadding, 'train', undefined, this.trainSpeed, {x: 1, y: 0}).setOrigin(0,0);
                }
                else{
                    newTrain = new Train(this, this.pixelSize * 7 + borderPadding, this.pixelSize * Phaser.Math.Between(0, 4) + borderPadding, 'train', undefined, this.trainSpeed, {x: -1, y: 0}).setOrigin(0,0);
                }
                this.trains.add(newTrain);
                this.currentTime = 0;
                if(this.intervalTIme > 30){
                    this.intervalTIme -= 5;
                }
                if(this.trainSpeed < 3){
                    this.trainSpeed += 0.1;
                }
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