class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image) {
        super(scene , x, y, image);
        scene.add.existing(this)
        this.direction = 1;
        
    }
    update() 
    {
        this.x += 3 * this.direction;
    }

    switch_direction()
    {
        this.direction *= -1;
    }
}