class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }
    preload () {
        this.load.image('grid', './assets/images/grid.png');
        this.load.image('player', './assets/images/player.png');
        this.load.image('redEndObj', './assets/images/redEndObj.png');
        this.load.image('redMiddleObj', './assets/images/redMiddleObj.png');
        this.load.image('blueEndObj', './assets/images/blueEndObj.png');
        this.load.image('blueMiddleObj', './assets/images/blueMiddleObj.png');
        this.load.image('yellowEndObj', './assets/images/yellowEndObj.png');
        this.load.image('yellowMiddleObj', './assets/images/yellowMiddleObj.png');
        this.load.spritesheet('redTrainIndicatorV', './assets/images/redTrainIndicatorV.png', {frameWidth: 3, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('redTrainIndicatorH', './assets/images/redTrainIndicatorH.png', {frameWidth: 100, frameHeight: 3, startFrame: 0, endFrame: 9});
        this.load.spritesheet('blueTrainIndicatorV', './assets/images/blueTrainIndicatorV.png', {frameWidth: 3, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('blueTrainIndicatorH', './assets/images/blueTrainIndicatorH.png', {frameWidth: 100, frameHeight: 3, startFrame: 0, endFrame: 9});
        this.load.spritesheet('yellowTrainIndicatorV', './assets/images/yellowTrainIndicatorV.png', {frameWidth: 3, frameHeight: 100, startFrame: 0, endFrame: 9});
        this.load.spritesheet('yellowTrainIndicatorH', './assets/images/yellowTrainIndicatorH.png', {frameWidth: 100, frameHeight: 3, startFrame: 0, endFrame: 9});
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
            fontFamily: 'Bahnschrift SemiBold',
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#000000',
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

        this.anims.create({
            key: 'redTrainIndicatorV',
            frames: this.anims.generateFrameNumbers('redTrainIndicatorV', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'redTrainIndicatorH',
            frames: this.anims.generateFrameNumbers('redTrainIndicatorH', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'blueTrainIndicatorV',
            frames: this.anims.generateFrameNumbers('blueTrainIndicatorV', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'blueTrainIndicatorH',
            frames: this.anims.generateFrameNumbers('blueTrainIndicatorH', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yellowTrainIndicatorV',
            frames: this.anims.generateFrameNumbers('yellowTrainIndicatorV', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'yellowTrainIndicatorH',
            frames: this.anims.generateFrameNumbers('yellowTrainIndicatorH', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}),
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
        this.bgUI = this.add.rectangle(0, 0, game.config.width, game.config.height, 0xd6b081).setOrigin(0, 0);
        this.bg = this.add.tileSprite(borderPadding, borderPadding, this.pixelSize * this.gridXSize, this.pixelSize * this.gridYsize, 'grid').setOrigin(0,0);

        this.player  = new Player(this, this.pixelSize * 2 + borderPadding, this.pixelSize + borderPadding, 'player').setOrigin(0,0);
        this.trains = this.add.group();
        let x = Phaser.Math.Between(1,7) * 100;
        let y = Phaser.Math.Between(1,5) * 100;
        this.rotate = this.add.sprite(x, y, 'coinrotate').setOrigin(0, 0);
        this.coin = new Coin(this, x, y, 'coinrotate', undefined ,5000, this.rotate).setOrigin(0,0);
        this.gameOver = false;
        this.bgLayer = this.add.layer([this.bgUI, this.bg]);
        this.bgLayer.setDepth(0);
        this.bgSound = this.sound.add('sfx_music', {loop: true});
        this.bgSound.play();
        
        this.trainColors = [['redEndObj', 'redMiddleObj', 'redTrainIndicatorV', 'redTrainIndicatorH'],
            ['yellowEndObj', 'yellowMiddleObj', 'yellowTrainIndicatorV', 'yellowTrainIndicatorH'],
            ['blueEndObj', 'blueMiddleObj', 'blueTrainIndicatorV', 'blueTrainIndicatorH']];
        //Systems for timer
        this.currentTime = 0;
        this.intervalTime = 120;
        this.trainSpeed = 2;
        this.timer = 0;
        this.timeRight = this.add.text(game.config.width - (borderPadding*2), borderPadding * 0.5,"Score: " + Math.floor(this.timer / 1000), this.scoreConfig).setOrigin(0.5);
        this.indicateQueue = new Queue();
        this.indicateLayer = this.add.layer();
        this.indicateLayer.setDepth(1);
        this.trainLayer = this.add.layer([this.player, this.rotate]);
        this.trainLayer.setDepth(2);
        this.wordLayer = this.add.layer(this.timeRight);
        this.wordLayer.setDepth(3);
    }
    
    update(time, delta) {
        if (!this.gameOver) {
            this.player.update();
            let increment = 60/(1000/delta);
            let rand = Math.random() * 1.5;
            this.timeRight.text = "Score: " + Math.floor(this.timer);
            this.timer += delta;
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
            if(this.currentTime >= this.intervalTime){

                let dir = Phaser.Math.Between(0, 3);
                let newTrain, xPos, yPos, direction;
                let xAdd = 0;
                let yAdd = 0;
                let foundTrain = true;
                let trainColor = this.trainColors[Phaser.Math.Between(0, 2)];
                let rotation;
                do {
                    dir = Phaser.Math.Between(0, 3);
                    foundTrain = true;
                    if(dir == 0){ //From Top
                        xPos = this.pixelSize * Phaser.Math.Between(0, this.gridXSize - 1) + borderPadding + 50;
                        yPos = this.pixelSize * -1 + borderPadding - 50;
                        direction = {x: 0, y: 1};
                        xAdd = 0;
                        yAdd = this.pixelSize * -1;
                        rotation = -90;
                    }
                    else if(dir == 1){ //From Bottom
                        xPos = this.pixelSize * Phaser.Math.Between(0, this.gridXSize - 1) + borderPadding + 50;
                        yPos = this.pixelSize * this.gridYSize + borderPadding + 150;
                        direction = {x: 0, y: -1};
                        xAdd = 0;
                        yAdd = this.pixelSize * 1;
                        rotation = 90;
                    }
                    else if(dir == 2){ //From Left
                        xPos = this.pixelSize * -1 + borderPadding - 50;
                        yPos = this.pixelSize * Phaser.Math.Between(0, this.gridYSize - 1) + borderPadding + 50;
                        direction = {x: 1, y: 0};
                        xAdd = this.pixelSize * -1;
                        yAdd = 0;
                        rotation = 180;
                    }
                    else{ //From Right
                        xPos = this.pixelSize * this.gridXSize + borderPadding + 150;
                        yPos = this.pixelSize * Phaser.Math.Between(0, this.gridYSize - 1) + borderPadding + 50;
                        direction = {x: -1, y: 0};
                        xAdd = this.pixelSize * 1;
                        yAdd = 0;
                        rotation = 0;
                    }
                    for(let currentTrain of trainArr){
                        if(dir == 0){ //from top check against bottom
                            if(xPos == currentTrain.x && direction.y == currentTrain.direction.y){
                                foundTrain = false;
                                break;
                            }
                        } else if(dir == 1) { //from bottom check against top
                            if(xPos == currentTrain.x && direction.y == currentTrain.direction.y){
                                foundTrain = false;
                                break;
                            }
                        } else if(dir == 2){ //from left check against right
                            if(yPos == currentTrain.y && direction.x == currentTrain.direction.x){
                                foundTrain = false;
                                break;
                            }
                        } else { //from right check against left
                            if(yPos == currentTrain.y && direction.x == currentTrain.direction.x){
                                console.log(xPos);
                                console.log(yPos);
                                foundTrain = false;
                                break;
                            }
                        }
                    }
                } while (!foundTrain);
                let indicator;
                if(dir == 0){ //From Top
                    indicator = this.add.sprite(xPos - 50, yPos + 150, trainColor[3]).setOrigin(0, 0);
                    indicator.anims.play(trainColor[3]);
                }
                else if(dir == 1){ //From Bottom
                    indicator = this.add.sprite(xPos - 50, yPos - 153, trainColor[3]).setOrigin(0, 0);
                    indicator.anims.play(trainColor[3]);
                }
                else if(dir == 2){ //From Left
                    indicator = this.add.sprite(xPos + 150, yPos - 50, trainColor[2]).setOrigin(0, 0);
                    indicator.anims.play(trainColor[2]);
                }
                else{ //From Right
                    indicator = this.add.sprite(xPos - 153, yPos - 50, trainColor[2]).setOrigin(0, 0);
                    indicator.anims.play(trainColor[2]);
                }
                this.indicateQueue.enqueue(indicator);
                this.indicateLayer.add(indicator);
                this.time.delayedCall(2000, () => {
                    this.indicateQueue.dequeue().destroy();
                    newTrain = new Train(this, xPos, yPos, trainColor[0], undefined, this.trainSpeed + rand, direction).setOrigin(0.5);
                    newTrain.angle = rotation;
                    newTrain.scaleX = 1.1;
                    this.trainLayer.add(newTrain);
                    let trainSize = Phaser.Math.Between(2, 4);
                    for(let i = 1; i < trainSize; i++) {
                        let segTrain
                        if (i < trainSize - 1) {
                            segTrain = new Train(this, xPos + (xAdd * i), yPos + (yAdd * i), trainColor[1], undefined, this.trainSpeed + rand, direction).setOrigin(0.5);
                            segTrain.angle = rotation;
                            segTrain.scaleX = 1.1;
                        }
                        else {
                            segTrain = new Train(this, xPos + (xAdd * i), yPos + (yAdd * i), trainColor[0], undefined, this.trainSpeed + rand, direction).setOrigin(0.5);
                            segTrain.angle = 180 + rotation;
                            segTrain.scaleX = 1.1;
                        }
                        this.trains.add(segTrain);
                        this.trainLayer.add(segTrain);
                    }
                
                    this.trains.add(newTrain);
                });
                this.currentTime = 0;
                if(this.intervalTime > 50){
                    this.intervalTime -= 1;
                }
                if(this.trainSpeed < 5){
                    this.trainSpeed += 0.02;
                }
            }

        }
        else {
            this.wordLayer.add(this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5));
            this.wordLayer.add(this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig)).setOrigin(0.5);
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
        if (this.player.x < train.x - 50 + train.width - 25 &&
            this.player.x + this.player.width - 25 > train.x - 50 &&
            this.player.y < train.y - 50 + train.height - 25 &&
            this.player.height - 25 + this.player.y > train.y - 50) {
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
                this.timer += coin.scoreValue;
                if(this.player.x >= 400){
                    coin.x = Phaser.Math.Between(1,3) * 100;
                } else {
                    coin.x = Phaser.Math.Between(4,7) * 100;
                }
                if(this.player.y >= 400){
                    coin.y = Phaser.Math.Between(1,3) * 100;
                } else {
                    coin.y = Phaser.Math.Between(4,5) * 100;
                }
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