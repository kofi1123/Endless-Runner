class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this);   
        this.isMoving = false;
        this.moveSpeed = 100; //Pixels perframe when is moving
        //100 is instant  
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.x >= borderPadding * 2){
            this.x -= this.moveSpeed;
            this.scene.sound.play('sfx_playerMoveLeft');
        } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.x < game.config.width - borderPadding * 2) {
            this.x += this.moveSpeed;
            this.scene.sound.play('sfx_playerMoveRight');
        } else if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y > borderPadding){
            this.y -= this.moveSpeed;
            this.scene.sound.play('sfx_playerMoveUp');
        } else if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < game.config.height - borderPadding * 2) {
            this.y += this.moveSpeed;
            this.scene.sound.play('sfx_playerMoveDown');
        }
        
    }
}