class Crab extends Phaser.Scene
{
    constructor() {
        super("Crab");
        // Default player coords
        this.playerX = 400
        this.playerY = 500
        // Bullet Coords
        this.playerShotX = this.playerX
        this.playerShotY = this.playerY - 10;

        // Number of enemies on screen
        this.num_enemies = 4;

        this.player_speed = 5;
        this.bullet_speed = 5;

        this.bullet_cooldown = 50;
        this.bullet_cooldown_counter = 0;
        // All enemies on screen are stored in this array.
        this.enemies = [];
        this.enemy_names = [];
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("Joker", "large-cards/card_joker_black.png");
        this.load.image("Bullet", "small-cards/card_hearts_suit.png")


        let card = "large-cards/card_";
        let deck = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"]
        let suits = ["diamonds", "clubs", "spades", "hearts"]
        // Load all possible cards
        for (let d of deck) {
            for (let s of suits) {
                card += s + "_" + d + ".png"
                this.load.image(card, card)
                card = "large-cards/card_"
            }
        }
        // Generate random cards, and push the names into an array
        for (let i = 0; i < this.num_enemies; i++) {
            let title = this.generate_card()
            this.enemy_names.push(title)
        }
    }

    create() {

        this.points =
            [
                200, 0,
                400, 0,
                200, 0,
                -200, 0
            ];

        this.curve = new Phaser.Curves.Spline(this.points);
        // Create input keys
        this.create_keys(this);

        // Make bullet group
        this.bulletGroup = this.add.group
            ({
                active: true,
                defaultKey: "Bullet",
                maxSize: 10,
                runChildUpdate: true
            })

        this.bulletGroup.createMultiple
            ({
                classType: Bullet,
                active: false,
                key: this.bulletGroup.defaultKey,
                repeat: this.bulletGroup.maxSize - 1
            });
        this.bulletGroup.propertyValueSet("speed", this.bullet_speed);


        let obj =
        {
            from: 0,
            to: 1,
            delay: 0,
            duration: 7000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            rotateToPath: false,
            rotationOffset: -90
        }
        // Create all enemies, push them into an array
        for (let i = 0; i < this.num_enemies; i++) {
            this.enemy = new Enemy(this, this.curve, 400 + i * 75, 300 - i * 75, this.enemy_names[i], this.enemy_names[i]);
            this.enemy.startFollow(obj)
            this.enemies.push(this.enemy);
        }

        // Create player
        this.me = new Player(this, this.playerX, this.playerY, "Joker", null, this.left, this.right, this.player_speed).setOrigin(0.5);
    }

    update(time, delta) {
        this.bullet_cooldown_counter--;

        if (this.fire.isDown) {
            this.fire_projectile(this.me.bullet_type);
        }
        this.me.update();
        for (let b of this.bulletGroup.children.entries) {
            for (let e of this.enemies) {
                if (e.alive) {
                    if (this.collides(b, e)) {
                        // Destroy bullet to prevent multi-hit
                        b.makeInactive();
                        b.x = -100;
                        b.y = -100;
                        // BUllet's damage not player damage
                        this.hit_card(b, e)
                    }
                }
            }
        }
        for (let e of this.enemies) {
            e.update();
            /*if (e.x >= 800 || e.x <= 0)
            {
                e.switch_direction();
            }*/
        }
        let game_over = this.check_end();
        if(game_over)
        {
            
            this.scene.start("Level")
        }
    }
    check_end()
    {
        for(let e of this.enemies)
        {
            console.log(e.alive);
        }
        for(let e of this.enemies)
        {
            if (e.alive) return false;
        }
        return true;
    }
    generate_card() {
        let card = "large-cards/card_";
        let deck = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"]
        let suits = ["diamonds", "clubs", "spades", "hearts"]
        let rand_deck = deck[Phaser.Math.Between(0, deck.length - 1)]
        let rand_suit = suits[Phaser.Math.Between(0, suits.length - 1)]
        card += rand_suit + "_" + rand_deck + ".png";
        return card;
    }
    flip() {
        for (let e of this.enemies) {
            e.switch_direction();
        }
    }

    create_keys(scene) {
        scene.left = this.input.keyboard.addKey("A");
        scene.right = this.input.keyboard.addKey("D");
        scene.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth / 2 + b.displayWidth / 2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight / 2 + b.displayHeight / 2)) return false;
        return true;
    }

    hit_card(bullet, enemy) {
        let diff = enemy.damage - bullet.damage;
        if (diff > 0) {
            let new_id = "large-cards/card_" + enemy.suit + "_" + enemy.calc_card(diff) + ".png";
            enemy.id = new_id;
            enemy.name = enemy.id.replace("large-cards/card_", "").replace(".png", "");
            enemy.damage = diff;
            enemy.card = enemy.calc_card();
            enemy.setTexture(new_id)
            bullet.damage = 1;
        }
        else {
            this.me.bullet_type = enemy.original_id;
            this.bulletGroup.getFirstDead().damage = enemy.original_damage;
            this.me.setTexture(enemy.original_id)
            enemy.die();
        }

    }

    fire_projectile(type = "Bullet") {
        if (this.bullet_cooldown_counter < 0) {
            let bullet = this.bulletGroup.getFirstDead();
            if (bullet != null) {
                this.bullet_cooldown_counter = this.bullet_cooldown;
                bullet.makeActive();
                bullet.setTexture(type)
                bullet.x = this.me.x;
                bullet.y = this.me.y - 10;
                console.log(bullet.damage)
            }
        }
        if (type != "Bullet") {
            this.me.bullet_type = "Bullet"
            this.me.setTexture("Joker")
        }
    }
}
