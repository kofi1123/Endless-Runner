class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.isMoving = false;
        this.moveSpeed = 100; //Pixels perframe when is moving
                             //100 is instant
        
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.x >= borderPadding * 2){
            this.x -= this.moveSpeed;
        } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.x < game.config.width - borderPadding * 2) {
            this.x += this.moveSpeed; 
        } else if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y > borderPadding){
            this.y -= this.moveSpeed;
        } else if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < game.config.height - borderPadding * 2) {
            this.y += this.moveSpeed;
        }
        
    }
}