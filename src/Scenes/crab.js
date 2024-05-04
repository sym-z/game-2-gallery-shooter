class Crab extends Phaser.Scene {
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
 
         this.bullet_cooldown = 10;
         this.bullet_cooldown_counter = 0;
         // All enemies on screen are stored in this array.
         this.enemies = [];
         this.enemy_names = [];
         // Holds paths for each enemy.
         this.curves = [];
 
         this.points = [];
         this.curve = null;
 
         this.points1 = [];
         this.curve1 = null;
 
         this.points2 = [];
         this.curve2 = null;
 
         this.points3 = [];
         this.curve3 = null;
 
         this.points4 = [];
         this.curve4 = null;
 
         this.score = 0;
        // this.d = 0
     }
 
     preload() {
         this.load.setPath("./assets/");
         this.load.bitmapFont('pi', 'fonts/pi_0.png', 'fonts/pi.fnt');
         this.load.image("Joker", "large-cards/card_joker_black.png");
         this.load.image("Bullet", "small-cards/card_hearts_suit.png")
         this.load.image("Proj", "small-cards/card_clubs_suit.png")
         this.load.image("dice1", "small-cards/dice_1.png")
         this.load.image("dice2", "small-cards/dice_2.png")
         this.load.image("dice3", "small-cards/dice_3.png")
         this.load.image("dice4", "small-cards/dice_4.png")
         this.load.image("dice5", "small-cards/dice_5.png")
         this.load.image("dice6", "small-cards/dice_6.png")
 
         this.load.audio("laser", "audio/laserRetro_002.ogg")
         this.load.audio("cardFire", "audio/cardPlace1.ogg")
         this.load.audio("cardDeath", "audio/cardFan1.ogg")
         this.load.audio("bigLaser", "audio/laserLarge_000.ogg")
 
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
         this.globals = this.scene.get("Global");
         this.score = this.globals.score 
         this.generate_paths();
 
         this.title = this.add.bitmapText(400,16,'pi','Ante Up!', 32).setOrigin(0.5)
         this.scoreText = this.add.bitmapText(128,584,'pi', 'Score: ' + this.score, 32).setOrigin(0.5);
         this.healthText = this.add.bitmapText(600,584,'pi', 'Health: ', 32).setOrigin(0.5);
         // Create input keys
         this.create_keys(this);
 
         this.make_bullet_group(this);
 
         this.health1 = this.add.sprite(760,580,'dice1')
         this.health2 = this.add.sprite(720,580,'dice2')
         this.health3 = this.add.sprite(680,580,'dice3')
 
         this.health1.setScale(2)
         this.health2.setScale(2)
         this.health3.setScale(2)
 
         this.health1.visible = false;
         this.health2.visible = false;
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
         // Create all enemies, push them into an array
         for (let i = 0; i < this.num_enemies; i++) {
             this.enemy = new Enemy(this, this.curves[i], 400 + i * 75, 300 - i * 75, this.enemy_names[i], this.enemy_names[i]);
             this.enemy.startFollow(obj)
             this.enemies.push(this.enemy);
         }
 
         // Create player
         this.me = new Player(this, this.playerX, this.playerY, "Joker", null, this.left, this.right, this.player_speed).setOrigin(0.5);
         this.d = 0;
     }
 
     update(time, delta) {
        //this.d += delta;
        // PAUSE THE GAME OR LOAD SCENE FOR A SEC
        /*while(this.d < 3000000)
        {
            // SET LEVEL TEXT TO VISIBLE
            console.log(this.d)
            this.d+=delta
            for(let e of this.enemies)
            {
                e.setActive(false)
            }
        }*/
        for(let e of this.enemies)
        {
            // SET LEVEL TEXT TO INVISIBLE
            e.setActive(true)
        }
         console.log(this.me.health)
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
             e.update(delta);
         }
         if(this.check_end())
         {
             if(this.me.health <= 0) this.restart();
             else
             {
                 this.scene.start("CrabStart")
             }
         }
         for(let b of this.bulletGroup.children.entries)
         {
             if(!b.active && this.me.isJoker)
             {
                 b.damage = 1;
             }
         }
         if(this.me.health > 0) this.calculate_health();
     }
     update_score(num)
     {
         this.globals.score += num;
     }
     calculate_health()
     {
         let h = this.me.health;
         if (this.me.health > 12)
         {
             this.health1.visible = true;
             this.health2.visible = true;
             let d1 = this.me.health % 12;
             this.health1.setTexture("dice"+d1);
             this.health2.setTexture("dice6")
             this.health3.setTexture("dice6")
 
         }
         else if (this.me.health > 6)
         {
             this.health1.visible = false;
             this.health2.visible = true;
             let d2 = this.me.health % 6
             if (d2 == 0) d2 = 6;
             this.health2.setTexture("dice"+d2)
             this.health3.setTexture("dice6")
         }
         else
         {
             this.health1.visible = false;
             this.health2.visible = false;
             let d3 = this.me.health % 6;
             if(d3 == 0) d3 = 6;
             this.health3.setTexture("dice"+d3)
         }
     }
     card_noise()
     { 
         this.sound.play("cardFire")
     }
     card_death()
     {
         this.sound.play("cardDeath")
     }
     generate_paths()
     {
         this.points =
         [
             0, 0,
             150, 0,
             0, 0,
             -320, 0,
             0,0
         ];
         
         this.curve = new Phaser.Curves.Spline(this.points);
         this.curves.push(this.curve);
         
         this.points1 =
         [
             150, 0,
             0, 0,
             -300, 0,
             0, 0,
             150,0
         ];
         
         this.curve1 = new Phaser.Curves.Spline(this.points1);
         this.curves.push(this.curve1);
 
         this.points2 =
         [
             0, 0,
             -400, 0,
             -200, 0,
             -100, 0,
             0,0
         ];
         
         this.curve2 = new Phaser.Curves.Spline(this.points2);
         this.curves.push(this.curve2);
 
         this.points3 =
         [
             0, 0,
             150, 0,
             0, 0,
             -320, 0,
             0,0
         ];
         
         this.curve3 = new Phaser.Curves.Spline(this.points3);
         this.curves.push(this.curve3);
 
         
     }
     restart()
     {
         for (let e of this.enemies)
         {
             e.die();
         }
         this.scene.restart()
 
     }
     check_end()
     {
         if(this.me.health <= 0)
         {
            this.globals.score = 0;
             return true;
         }
         for(let e of this.enemies)
         {
             if (e.alive) return false;
         }
         return true;
     }
     make_bullet_group(scene)
     {
         // Make bullet group
         scene.bulletGroup = scene.add.group
             ({
                 active: true,
                 defaultKey: "Bullet",
                 maxSize: 10,
                 runChildUpdate: true
             })
 
         scene.bulletGroup.createMultiple
             ({
                 classType: Bullet,
                 active: false,
                 key: scene.bulletGroup.defaultKey,
                 repeat: scene.bulletGroup.maxSize - 1
             });
         scene.bulletGroup.propertyValueSet("speed", scene.bullet_speed);
 
 
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
             this.me.health += enemy.original_damage;
             this.me.isJoker = false;
             this.card_death();
             enemy.die();
             if(enemy.faceCard)
             {
                 this.update_score(100)
             }
             else
             {
                 this.update_score(50)
             }
 
             this.scoreText.setText("Score: " + this.globals.score)
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
             if (type != "Bullet") {
                 this.sound.play("bigLaser")
                 this.me.bullet_type = "Bullet"
                 this.me.setTexture("Joker")
                 if(this.me.health - bullet.damage > 0)
                 {
                     this.me.health -= bullet.damage;
                 }
                 else
                 {
                     this.me.health = 1;
                 }
                 this.me.isJoker = true;
                 this.bulletGroup.getFirstDead().damage = 1;
             }
             else
             {
 
                 this.sound.play("laser")
             }
         }
 
     }
 }