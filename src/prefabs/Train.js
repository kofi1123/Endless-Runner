class Train extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = speed;
        this.direction = direction;
        //UP = 0 RIGHT = 1 DOWN = 2 LEFT = 3
    }

    update() {
        this.x += this.direction.x * this.moveSpeed;
        this.y += this.direction.y * this.moveSpeed;
        //check if the train has gone off the boarder, if so delete
        /*if(this.y < config.height * -1){
            this.destroy();
        }*/
    } 
}