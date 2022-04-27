class Train extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = speed;
        this.direction = direction;
        this.time = 0;
    }

    update(time, delta) {
        if (this.time < 1) {
            this.time -= 10;
            this.x += this.direction.x * this.moveSpeed;
            this.y += this.direction.y * this.moveSpeed;
        }
        else {
            this.time += delta;
        }
        //check if the train has gone off the boarder, if so delete
        /* if(this.y < config.height * -1){
            this.destroy();
        } */
    } 
}