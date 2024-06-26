class Start extends Phaser.Scene
{
    constructor() {
        super("Start");
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
        this.title = this.add.bitmapText(400,50,'pi','Ante Up!', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,125,'pi','Press [Enter] to Play!', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,275,'pi','Press [Z] for Credits!', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,350,'pi','Press [X] for Controls!', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,550,'pi','Your High Score is: ' + this.globals.high_score, 48).setOrigin(0.5);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.credits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.controls = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }
    update(delta) {
        if (this.enter.isDown) {
            this.scene.start("Level")
        }
        if (this.credits.isDown) {
            this.scene.start("Credits")
        }
        if (this.controls.isDown) {
            this.scene.start("Controls")
        }

    }
}