class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, image, id) {
        super(scene,path, x, y, image);
        scene.add.existing(this)
        this.direction = 1;

        // Used to take existing card and put it into deck
        this.id = id;
        this.alive = true;
        // Used to put card into deck
        this.original_id = id;
        this.name = id.replace("large-cards/card_", "").replace(".png", "");
        this.suit = this.name.substring(0, this.name.indexOf('_'));
        this.card = this.name.substring(this.name.indexOf('_') + 1);
        this.calc_damage();
        this.original_damage = this.damage;
        //console.log(this.id, this.name, this.suit, this.card, this.damage)

    }
    update() {
        //this.x += 3 * this.direction;
    }

    switch_direction() {
        this.direction *= -1;
    }
    calc_damage() {
        switch (this.card) {
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
    }

    calc_card(diff = this.damage) {
        let retval = "";
        switch (diff) {
            case 1:
                retval = "A";
                break;
            case 2:
                retval = "02";
                break;
            case 3:
                retval = "03";
                break;
            case 4:
                retval = "04";
                break;
            case 5:
                retval = "05";
                break;
            case 6:
                retval = "06";
                break;
            case 7:
                retval = "07";
                break;
            case 8:
                retval = "08";
                break;
            case 9:
                retval = "09";
                break;
            case 10:
                retval = "10";
                break;
            case 11:
                retval = "J";
                break;
            case 12:
                retval = "Q";
                break;
            case 13:
                retval = "K";
                break;
        }
        return retval;

    }
    die()
    {
        this.visible = false
        this.x = -600;
        this.y = -600;
        this.alive = false;
        console.log(this.card, " has died.")
    }
}