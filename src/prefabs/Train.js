class Train extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.moveSpeed = speed; 
        this.direction = direction;
        //UP = 0 RIGHT = 1 DOWN = 2 LEFT = 3
    }
    update() {
        if(this.direction = 0) { //Moving UP
            this.y += speed;
        } else if(this.direction = 1) { //Moving RIGHT
            this.x += speed;
        } else if(this.direction = 2) { //Moving DOWN
            this.y -= speed;
        } else if(this.direction = 3) {
            this.x -= speed; 
        }
    } 
}