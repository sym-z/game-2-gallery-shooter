class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image) {
        super(scene , x, y, image);
        this.name = "Jack"
        scene.add.existing(this)
        
    }
    // Use preload to load art and sound assets before the scene starts running.
    preload() 
    {
    
    }

    create() 
    {
    
    }

    update() 
    {
    
    }
}