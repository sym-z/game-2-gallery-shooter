class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image) {
        super(scene , x, y, image);
        this.name = "Jack"
        scene.add.existing(this)
        
    }
    update() 
    {
        // Keyboard handling
        // Health
    }
}