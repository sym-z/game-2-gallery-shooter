class Level extends Phaser.Scene 
{
    constructor() 
    {
        super("Level");
        // Default player coords
        this.playerX = 400
        this.playerY = 500
        this.playerShotX = this.playerX
        this.playerShotY = this.playerY - 10;
    }

    preload() 
    {
        this.load.setPath("./assets/");
        this.load.image("Joker", "large-cards/card_joker_black.png");
    }

    create() 
    {
        //this.x = 0.0
        this.me = new Player(this,this.playerX,this.playerY,"Joker").setOrigin(0.5);
    }

    update(time, delta) 
    {
        //this.x += delta
        //console.log(this.x/1000)
    }

}