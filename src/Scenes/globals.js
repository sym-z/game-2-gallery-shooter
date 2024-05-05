class Global extends Phaser.Scene
{
    constructor(){
        super("Global")
        this.score = 0
    }
    create()
    {
        this.scene.start("Start")
    }
}