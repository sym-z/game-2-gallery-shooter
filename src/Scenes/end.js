class End extends Phaser.Scene
{
    constructor() {
        super("End");
    }
    preload()
    {
        this.load.setPath("./assets/");
        this.load.bitmapFont('pi', 'fonts/pi_0.png', 'fonts/pi.fnt');
        this.load.audio("lose", "audio/lose.ogg")
    }
    create() 
    {
        this.sound.play("lose")
        this.globals = this.scene.get("Global");
        this.score = this.globals.score;
        if(this.score > this.globals.high_score)
            {
                this.globals.high_score = this.score
            }
        this.title = this.add.bitmapText(400,150,'pi','You Lose...', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,300,'pi','You finished with a score of ' + this.globals.score + "!", 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,400,'pi','Your high score is:  ' + this.globals.high_score + "!", 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,550,'pi','Press [Enter] to replay!', 48).setOrigin(0.5);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update(delta) {
        if (this.enter.isDown) {
            this.globals.score = 0;
            this.scene.start("Start")
        }

    }
}