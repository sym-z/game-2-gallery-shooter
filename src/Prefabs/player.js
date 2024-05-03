class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image, frame, left_key, right_key, player_speed) {
        super(scene , x, y, image, frame);
        this.health = 3;
        this.isJoker = true;
        scene.add.existing(this)
        this.left = left_key; 
        this.right = right_key; 
        this.player_speed = player_speed;
        this.damage = 1;
        // Handles new sprite for bullet
        this.bullet_type = "Bullet";
    }
    update() 
    {
        // Keyboard handling
        if (this.left.isDown)
        {
            if(this.x > (this.displayWidth/2))
            {
                this.x -= this.player_speed;
            }
        }
        if (this.right.isDown)
        {
            if(this.x < (game.config.width - (this.displayWidth/2)))
            {
                this.x += this.player_speed;
            }
        }
    }
}