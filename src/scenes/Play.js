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

        //Setting up grid
        this.pixelSize = 100;
        this.gridXSize = 7;
        this.gridYSize = 5;
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xd6b081).setOrigin(0, 0);
        this.bg = this.add.tileSprite(borderPadding, borderPadding, this.pixelSize * this.gridXSize, this.pixelSize * this.gridYsize, 'grid').setOrigin(0,0);

        this.player  = new Player(this, this.pixelSize * 2 + borderPadding, this.pixelSize + borderPadding, 'player').setOrigin(0,0);
        this.trains = this.add.group();
        this.gameOver = false;

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
            this.timeRight.text = "Score: " + Math.floor(this.time / 10);
            this.time += delta
            //Update Trains
            let trainArr = this.trains.getChildren();
            for(let i = 0; i < trainArr.length; i++){
                trainArr[i].update();
                if(this.checkCollision(trainArr[i])){
                    this.gameOver = true;
                }
                if(this.outOfBounds(trainArr[i])){
                    this.trains.remove(trainArr[i]);
                    trainArr[i].destroy();
                }
            }

            //Spawns new trains
            this.currentTime++;
            if(this.currentTime >= this.intervalTIme){
                let dir = Phaser.Math.Between(0, 3);
                let newTrain, xPos, yPos, direction;
                let xAdd = 0;
                let yAdd = 0;
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

                newTrain = new Train(this, xPos, yPos, 'train', undefined, this.trainSpeed, direction).setOrigin(0,0);
                let trainSize = Phaser.Math.Between(2, 4);
                for(let i = 1; i < trainSize; i++){
                    let segTrain = new Train(this, xPos + (xAdd * i), yPos + (yAdd * i), 'train', undefined, this.trainSpeed, direction).setOrigin(0,0);
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

    outOfBounds(train){
        if(train.x > config.width * 2 || train.x < config.width * -2 
            || train.y > config.height * 2 || train.y < config.height * -2){
                return true;
        }
        return false;
    }
}