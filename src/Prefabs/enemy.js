class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, image, id) {
        super(scene , x, y, image);
        scene.add.existing(this)
        this.direction = 1;
        
        // Used to take existing card and put it into deck
        this.id = id;
        this.name = id.replace("large-cards/card_", "").replace(".png", "");
        this.suit = this.name.substring(0,this.name.indexOf('_'));
        this.card = this.name.substring(this.name.indexOf('_')+1);
        switch (this.card)
        {
            case "A":
                this.damage = 1;
                break;
            case "02":
                this.damage = 2;
                break;
            case "03":
                this.damage = 3;
                break;
            case "04":
                this.damage = 4;
                break;
            case "05":
                this.damage = 5;
                break;
            case "06":
                this.damage = 6;
                break;
            case "07":
                this.damage = 7;
                break;
            case "08":
                this.damage = 8;
                break;
            case "09":
                this.damage = 9;
                break;
            case "10":
                this.damage = 10;
                break;
            case "J":
                this.damage = 11;
                break;
            case "Q":
                this.damage = 12;
                break;
            case "K":
                this.damage = 13;
                break;
        }
        console.log(this.id, this.name, this.suit,this.card, this.damage)
        
    }
    update() 
    {
        this.x += 3 * this.direction;
    }

    switch_direction()
    {
        this.direction *= -1;
    }
}