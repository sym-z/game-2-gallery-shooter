class Controls extends Phaser.Scene
{
    constructor() {
        super("Controls");
    }
    preload()
    {
        this.load.setPath("./assets/");
        this.load.bitmapFont('pi', 'fonts/pi_0.png', 'fonts/pi.fnt');
    }
    create() 
    {
        this.title = this.add.bitmapText(400,50,'pi','Move Left / Right:', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,125,'pi','A (Left) and D (Right)', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,200,'pi','Fire Card: SPACE', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,300,'pi','Use the cards gained by destroying', 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,350,'pi','enemies to deal their damage', 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,400,'pi','or hold onto them for extra health!', 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,500,'pi','Press ENTER to return to start screen!', 48).setOrigin(0.5);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update(delta) {
        if (this.enter.isDown) {
            this.scene.start("Start")
        }

    }
}