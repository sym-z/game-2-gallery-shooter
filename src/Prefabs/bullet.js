class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image, frame) {
        super(scene , x, y, image, frame);
        this.visible = false;
        this.active = false;
        return this;
        //scene.add.existing(this)
        
    }
    update() 
    {
        if (this.active)
        {
            console.log(this.speed)
            this.y -= this.speed;
            if(this.y < -(this.displayHeight/2))
            {
                this.makeInactive();
            }
        }
    }

    makeActive()
    {
        console.log("MAKING ACTIVE")
        this.visible = true;
        this.active = true;
    }
    makeInactive()
    {
        this.visible = false;
        this.active = false;
    }
}