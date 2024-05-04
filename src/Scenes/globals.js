class Global extends Phaser.Scene
{
    constructor(){
        super("Global")
        this.score = 0
        console.log("hello")
    }
    create()
    {
        this.scene.start("Level")
    }
}