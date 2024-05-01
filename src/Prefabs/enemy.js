class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image) {
        super(scene , x, y, image);
        scene.add.existing(this)
        
    }
    update() 
    {
    
    }
}