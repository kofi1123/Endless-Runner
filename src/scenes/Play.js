class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }
    preload () {
        this.load.image('grid', './assets/images/grid.png');
        this.load.image('player', './assets/images/spr_playerPlaceholder.png');
        this.load.image('train', './assets/images/spr_trainPlaceholder.png');
        this.load.image('coin', './assets/images/spr_coinPlaceholder.png');
        this.load.spritesheet('coinrotate', './assets/images/CoinSpriteSheet.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 3});
        this.load.audio('sfx_music', './assets/sound/sfx_music.mp3');
        this.load.audio('sfx_coin', './assets/sound/sfx_coin.mp3');
        this.load.audio('sfx_gameOver', './assets/sound/sfx_gameOver.mp3');
        this.load.audio('sfx_playerMoveDown', './assets/sound/sfx_playerMoveDown.mp3');
        this.load.audio('sfx_playerMoveUp', './assets/sound/sfx_playerMoveUp.mp3');
        this.load.audio('sfx_playerMoveRight', './assets/sound/sfx_playerMoveRight.mp3');
        this.load.audio('sfx_playerMoveLeft', './assets/sound/sfx_playerMoveLeft.mp3');
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

        this.anims.create({
            key: 'coinrotate',
            frames: this.anims.generateFrameNumbers('coinrotate', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Setting up grid
        this.pixelSize = 100;
        this.gridXSize = 7;
        this.gridYSize = 5;
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xd6b081).setOrigin(0, 0);
        this.bg = this.add.tileSprite(borderPadding, borderPadding, this.pixelSize * this.gridXSize, this.pixelSize * this.gridYsize, 'grid').setOrigin(0,0);

        this.player  = new Player(this, this.pixelSize * 2 + borderPadding, this.pixelSize + borderPadding, 'player').setOrigin(0,0);
        this.trains = this.add.group();
        let x = Phaser.Math.Between(1,7) * 100;
        let y = Phaser.Math.Between(1,5) * 100;
        this.rotate = this.add.sprite(x, y, 'coinrotate').setOrigin(0, 0);
        this.coin = new Coin(this, x, y, 'coin', undefined ,100000, this.rotate).setOrigin(0,0);
        this.gameOver = false;

        this.bgSound = this.sound.add('sfx_music', {loop: true});
        this.bgSound.play();

        //Systems for timer
        this.currentTime = 0;
        this.intervalTIme = 120;
        this.trainSpeed = 2;
        this.time = 0;
        this.timeRight = this.add.text(game.config.width - (borderPadding*2), borderPadding * 0.5,"Score: " + Math.floor(this.time / 1000), this.scoreConfig).setOrigin(0.5);
    }
    
    update(time, delta) {
        if (!this.gameOver) {
            this.player.update();
            let increment = 60/(1000/delta);
            let rand = Math.random() * 1.5;
            this.timeRight.text = "Score: " + Math.floor(this.time / 10);
            this.time += delta;
            //Update Trains
            let trainArr = this.trains.getChildren();
            for(let i = 0; i < trainArr.length; i++){
                trainArr[i].update(time, increment);
                if(this.checkCollision(trainArr[i])){
                    this.gameOver = true;
                }
                if(this.outOfBounds(trainArr[i])){
                    this.trains.remove(trainArr[i]);
                    trainArr[i].destroy();
                }
            }
            //Check coin collison
            this.checkCollisionCoin(this.coin);
            //Spawns new trains
            this.currentTime += increment;
            if(this.currentTime >= this.intervalTIme){

                let dir = Phaser.Math.Between(0, 3);
                let newTrain, xPos, yPos, direction;
                let xAdd = 0;
                let yAdd = 0;
                let foundTrain = true;
                do {
                    dir = Phaser.Math.Between(0, 3);
                    foundTrain = true;
                    if(dir == 0){ //From Top
                        xPos = this.pixelSize * Phaser.Math.Between(0, this.gridXSize - 1) + borderPadding;
                        yPos = this.pixelSize * -1 + borderPadding;
                        direction = {x: 0, y: 1};
                        yAdd = this.pixelSize * -1;
                    }
                    else if(dir == 1){ //From Bottom
                        xPos = this.pixelSize * Phaser.Math.Between(0, this.gridXSize - 1) + borderPadding;
                        yPos = this.pixelSize * this.gridXSize + borderPadding;
                        direction = {x: 0, y: -1};
                        yAdd = this.pixelSize * 1;
                    }
                    else if(dir == 2){ //From Left
                        xPos = this.pixelSize * -1 + borderPadding;
                        yPos = this.pixelSize * Phaser.Math.Between(0, this.gridYSize - 1) + borderPadding;
                        direction = {x: 1, y: 0};
                        xAdd = this.pixelSize * -1;
                    }
                    else{ //From Right
                        xPos = this.pixelSize * this.gridXSize + borderPadding;
                        yPos = this.pixelSize * Phaser.Math.Between(0, this.gridYSize - 1) + borderPadding;
                        direction = {x: -1, y: 0};
                        xAdd = this.pixelSize * 1;
                    }
                    for(let currentTrain of trainArr){
                        if(dir == 0){ //from top check against bottom
                            if(xPos == currentTrain.x && direction.y == currentTrain.direction.y){
                                console.log("invalid train top");
                                foundTrain = false;
                                break;
                            }
                        } else if(dir == 1) { //from bottom check against top
                            if(xPos == currentTrain.x && direction.y == currentTrain.direction.y){
                                console.log("invalid train bottom");
                                foundTrain = false;
                                break;
                            }
                        } else if(dir == 2){ //from left check against right
                            if(yPos == currentTrain.y && direction.x == currentTrain.direction.x){
                                console.log("invalid train left");
                                foundTrain = false;
                                break;
                            }
                        } else { //from right check against left
                            if(yPos == currentTrain.y && direction.x == currentTrain.direction.x){
                                console.log("invalid train right");
                                foundTrain = false;
                                break;
                            }
                        }
                    }
                    console.log("bottom of Do-while");
                } while (!foundTrain);

                newTrain = new Train(this, xPos, yPos, 'train', undefined, this.trainSpeed + rand, direction).setOrigin(0,0);
                let trainSize = Phaser.Math.Between(2, 4);
                for(let i = 1; i < trainSize; i++){
                    let segTrain = new Train(this, xPos + (xAdd * i), yPos + (yAdd * i), 'train', undefined, this.trainSpeed + rand, direction).setOrigin(0,0);
                    this.trains.add(segTrain);
                }
                
                this.trains.add(newTrain);
                this.currentTime = 0;
                if(this.intervalTIme > 30){
                    this.intervalTIme -= 5;
                }
                if(this.trainSpeed < 5){
                    this.trainSpeed += 0.1;
                }
            }

        }
        else {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.bgSound.stop();
            this.gameOver = true;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }
    }

    checkCollision(train) {
        if (this.player.x < train.x + train.width - 25 &&
            this.player.x + this.player.width - 25 > train.x &&
            this.player.y < train.y + train.height - 25 &&
            this.player.height - 25 + this.player.y > train.y) {
                this.sound.play('sfx_gameOver');
                return true;
        }
        else {
            return false;
        }
    }

    checkCollisionCoin(coin) {
        if (this.player.x < coin.x + coin.width - 25 &&
            this.player.x + this.player.width - 25 > coin.x &&
            this.player.y < coin.y + coin.height - 25 &&
            this.player.height - 25 + this.player.y > coin.y) {
                this.time += coin.scoreValue;
                coin.x = Phaser.Math.Between(1,7) * 100;
                coin.y = Phaser.Math.Between(1,5) * 100;
                coin.animation.x = coin.x;
                coin.animation.y = coin.y;
                this.sound.play('sfx_coin');
                return true;
        }
        else {
            return false;
        }
    }

    outOfBounds(train){
        if(train.x > config.width * 2 || train.x < config.width * -2 
            || train.y > config.height * 2 || train.y < config.height * -2){
                return true;
        }
        return false;
    }
}