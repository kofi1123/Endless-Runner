class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.isMoving = false;
        this.moveSpeed = 100; //Pixels perframe when is moving
                             //100 is instant
        
    }
    update() {

        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= borderUISize + this.width) {
            this.x += this.moveSpeed; 
        } else if(keyUP.isDown && this.y <= borderUISize + this.height){
            this.y -= this.moveSpeed;
        } else if(keyDOWN.isDown && this.y >= borderUISize + this.height) {
            this.y += this.moveSpeed;
        }
        
    }
}