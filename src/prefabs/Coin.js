class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, scoreValue, animation) {
        super(scene, x, y, texture, frame);
        this.scoreValue = scoreValue;
        this.animation = animation;
        animation.anims.play('coinrotate');
    }

}