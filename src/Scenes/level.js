class Level extends Phaser.Scene 
{
    constructor() 
    {
        super("Level");
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
       
        this.bullet_cooldown = 3;
        this.bullet_cooldown_counter = 0;
        // All enemies on screen are stored in this array.
        this.enemies = []
    }

    preload() 
    {
        this.load.setPath("./assets/");
        this.load.image("Joker", "large-cards/card_joker_black.png");
        this.load.image("Bullet", "small-cards/card_hearts_suit.png") 
        for (let i = 0; i < this.num_enemies; i++)
        {
            let title = this.generate_card()
            this.load.image("Enemy" + i, title)
            console.log("Enemy"+i)
        }
    }

    create() 
    {
        this.create_keys(this);
        
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

        for(let i = 0; i < this.num_enemies; i++)
        {
            this.enemy = new Enemy(this, 400+i*75,300-i*75,"Enemy"+i);
            this.enemies.push(this.enemy);
        }
        console.log(this.enemies)
        this.me = new Player(this,this.playerX,this.playerY,"Joker", null, this.left, this.right, this.player_speed).setOrigin(0.5);
        console.log(this.bulletGroup)
    }

    update(time, delta) 
    {
        this.bullet_cooldown_counter--;

        if (this.fire.isDown)
        {
            if(this.bullet_cooldown_counter < 0)
            {
                let bullet = this.bulletGroup.getFirstDead();

                if(bullet != null)
                {
                    console.log("Test");
                    this.bullet_cooldown_counter = this.bullet_cooldown;
                    bullet.makeActive();
                    bullet.x = this.me.x;
                    bullet.y = this.me.y - 10;
                }
            }
        }
        //this.x += delta
        this.me.update();
        for (let e of this.enemies)
        {
            e.update();
            if (e.x >= 800 || e.x <= 0)
            {
                //this.flip()
                e.switch_direction();
            }
        }

        //console.log(this.x/1000)
    }
    generate_card()
    {
        let card = "card_";
        let deck = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J","Q","K"]
        let suits = ["diamonds","clubs","spades","hearts"]
        let rand_deck = deck[Phaser.Math.Between(0,deck.length-1)]
        let rand_suit = suits[Phaser.Math.Between(0,suits.length-1)]
        card += rand_suit + "_" + rand_deck + ".png";
        //this.load.setPath("./assets/large-cards/");
        card = "large-cards/" + card;
        return card;
    }
    flip()
    {
        for (let e of this.enemies)
        {
            e.switch_direction();
        }
    }

    create_keys(scene)
    {
        scene.left = this.input.keyboard.addKey("A");
        scene.right = this.input.keyboard.addKey("D");
        scene.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
}