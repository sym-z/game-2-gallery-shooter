class End extends Phaser.Scene
{
    constructor() {
        super("End");
    }
    preload()
    {
        this.load.setPath("./assets/");
        this.load.bitmapFont('pi', 'fonts/pi_0.png', 'fonts/pi.fnt');
    }
    create() 
    {
        this.globals = this.scene.get("Global");
        this.score = this.globals.score;
        this.title = this.add.bitmapText(400,150,'pi','You Lose...', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,300,'pi','You finished with a score of ' + this.globals.score + "!", 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,450,'pi','Press [Enter] to replay!', 64).setOrigin(0.5);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update(delta) {
        if (this.enter.isDown) {
            this.globals.score = 0;
            this.scene.start("Start")
        }

    }
}