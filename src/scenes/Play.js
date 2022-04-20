class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }
    preload () {
        this.load.image('grid', './assets/images/grid.png');
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
            fixedWidth: 100
        }

        let pixelSize = 100;
        this.bg = this.add.tileSprite(borderPadding, borderPadding, 700, 500, 'grid').setOrigin(0,0);
        this.add.text(this.grid[0][0], this.grid[0][1], 'grid1', this.scoreConfig);
        console.log(this.grid[0][0]);
        console.log(this.grid[0][1]);
    }
    update() {
        
    }

    coord(x,y) {
        return {x: x, y: y};
    }
}