class Win extends Phaser.Scene
{
    constructor() {
        super("Win");
    }
    preload()
    {
        this.load.setPath("./assets/");
        this.load.bitmapFont('pi', 'fonts/pi_0.png', 'fonts/pi.fnt');
        this.load.audio("win", "audio/win.ogg")
        this.load.image("actor", "large-cards/card_joker_red.png")
    }
    create() 
    {
        // ---------------------------------------------------------------------
        // TODO: Test this!
        this.points =
            [
                0, 0,
                -225, 0,
                -225, -120,
                225, -120,
                225, 0,
                0,0
            ];

        this.curve = new Phaser.Curves.Spline(this.points);
        this.actor = new Enemy(this, this.curve, 400, 220, "actor", 'actor')
        this.actor2 = new Enemy(this, this.curve, 340, 220, "actor", 'actor2')
        this.actor3 = new Enemy(this, this.curve, 460, 220, "actor", 'actor3')
        let obj =
        {
            from: 0,
            to: 1,
            delay: 0,
            duration: 7000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        }
        this.actor.setScale(1.25);
        this.actor2.setScale(1.25);
        this.actor3.setScale(1.25);
        
        this.actor.startFollow(obj);
        this.actor2.startFollow(obj);
        this.actor3.startFollow(obj);
        //this.actor.update();
        // ---------------------------------------------------------------------
        this.sound.play("win")
        this.globals = this.scene.get("Global");
        if(this.globals.score > this.globals.high_score)
            {
                this.globals.high_score = this.globals.score
            }
        this.title = this.add.bitmapText(400,150,'pi','You Win!', 64).setOrigin(0.5);
        this.title = this.add.bitmapText(400,300,'pi','You finished with a score of ' + this.globals.score + "!", 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,400,'pi','Your high score is: ' + this.globals.high_score + "!", 48).setOrigin(0.5);
        this.title = this.add.bitmapText(400,550,'pi','Press [Enter] to replay!',48).setOrigin(0.5);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update(delta) {
        if (this.enter.isDown) {
            this.globals.score = 0;
            this.scene.start("Start")
        }

    }
}