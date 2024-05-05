class LobsterStart extends Phaser.Scene {
    constructor() {
        super("LobsterStart");
        this.d = 0
    }
    preload()
    {
        this.load.setPath("./assets/");

        this.load.audio("start", "audio/wave_start.ogg")
    }
    create() 
    {
        this.d = 0
        this.sound.play("start")
        this.globals = this.scene.get("Global");
        this.score = this.globals.score;
        this.title = this.add.bitmapText(400,300,'pi','WAVE 3', 128).setOrigin(0.5);
    }
    update(delta) {
        console.log(this.d)
        this.d += delta / 100;
        if (this.d > 30000) {
            this.scene.start("Lobster")
        }

    }
}