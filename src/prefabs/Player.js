class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isMoving = false;
        this.moveSpeed = 100; //Pixels perframe when is moving
                             //100 is instant

        //this.squishSize = 50;
        this.scale = 1;
        this.squishScale = 1.25;
        this.initTween = 0.01;
        this.squishTween = this.initTween;
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.x >= borderPadding * 2){
            this.x -= this.moveSpeed;
            this.scale = this.squishScale;
            this.squishTween = this.initTween;
        } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.x < game.config.width - borderPadding * 2) {
            this.x += this.moveSpeed; 
            this.scale = this.squishScale;
            this.squishTween = this.initTween;
        } else if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y > borderPadding){
            this.y -= this.moveSpeed; 
            this.scale = this.squishScale;
            this.squishTween = this.initTween;
        } else if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < game.config.height - borderPadding * 2) {
            this.y += this.moveSpeed;
            this.scale = this.squishScale;
            this.squishTween = this.initTween;
        }

        if(this.scale > 1){
            //this.setDisplaySize(this.width + 0.05);
            this.scale -= this.squishTween;
            this.squishTween += 0.01;
        }
    }

}