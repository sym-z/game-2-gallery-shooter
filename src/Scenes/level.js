class Level extends Phaser.Scene 
{
    constructor() 
    {
        super("Level");
        // Default player coords
        this.playerX = 400
        this.playerY = 500
        this.playerShotX = this.playerX
        this.playerShotY = this.playerY - 10;
        this.num_enemies = 3;

        this.enemies = []
        this.cards = 
        {
            

        }
    }

    preload() 
    {
        this.load.setPath("./assets/");
        this.load.image("Joker", "large-cards/card_joker_black.png");
        
        for (let i = 0; i < 5; i++)
        {
            let title = this.generate_card()
            this.load.image("Enemy" + i, title)
            console.log("Enemy"+i)
        }
    }

    create() 
    {
        for(let i = 0; i < 5; i++)
        {
            this.enemy = new Enemy(this, 400+i*75,300,"Enemy"+i);
            this.enemies.push(this.enemy);
        }
        console.log(this.enemies)
        this.me = new Player(this,this.playerX,this.playerY,"Joker").setOrigin(0.5);
    }

    update(time, delta) 
    {
        //this.x += delta
        for (let e of this.enemies)
        {
            e.update();
            if (e.x >= 800 || e.x <= 0)
            {
                this.flip()
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
}