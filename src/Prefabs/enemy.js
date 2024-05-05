class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, image, id) {
        super(scene,path, x, y, image);
        scene.add.existing(this)
        this.direction = 1;
        this.papa = scene;

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
        this.timer = 0.0
        // Figure out if it is a Face Card
        this.faceCard = true ? this.damage > 10 : false;
        // Bag of shots
        this.shots_fired = []
        // Player's Position
        this.playerY = null;
        this.playerX = null;
        this.score_value = this.damage * 100;
        if (this.faceCard)
        {
            this.proj_damage = this.damage;
        }
        else
        {
            this.proj_damage = 1;
        }
    }

    update(delta) {

        let delta_sec = delta / 100;
        this.timer += delta_sec;
        // CHANGE 5 TO RANDOM FOR offset shots
        let fire_time = Phaser.Math.Between(25,1000)
        if(this.timer > fire_time)
        {
            this.timer = 0.0;
            this.fire_shot();
        }
        for(let f of this.shots_fired)
        {
            if (f.y > 500)
            {
                f.visible = false;              
                f.destroy();
            }
            else
            {
                // RANDOM BETWEEN HOMING and NON HOMING
               if (!this.faceCard)
               {
                   //Get displacement vector
                   let disvecY = this.playerY - f.y;
                   let disvecX = this.playerX - f.x;

                   // Calculate magnitude
                   let mag = Math.sqrt(disvecY * disvecY + disvecX * disvecX);

                   // Normalize vector
                   let dirY = disvecY / mag;
                   let dirX = disvecX / mag;

                   f.y += dirY * 3.0;
                   f.x += dirX * 3.0;
               }
                else
               {

                   f.y += 3.0;
               }
                if(this.papa.collides(this.papa.me, f))
                {
                    console.log("HIT")
                    f.x = -1000;
                    f.y = 1000;
                    f.destroy();
                    // CHANGE THIS TO DAMAGE NUMBER
                    console.log(this.proj_damage)
                    this.papa.me.health -= this.proj_damage; 
                    this.papa.hit_sound() 
                }
            }

        }
        
    }
    clear_shots()
    {
        // Destroy every shot on the screen, used when level restarts
        for(let f of this.shots_fired)
        {
            f.x = 2000;
            f.y = 2000;
            f.destroy();
        }
    }

    fire_shot()
    {
        // Aim at the player
        this.playerY = this.papa.me.y;
        this.playerX = this.papa.me.x;
        if(this.active && this.alive)
        {
            if (this.faceCard) {
                this.proj = this.papa.add.sprite(this.x, this.y, this.original_id)
                this.papa.add.existing(this.proj)
                this.shots_fired.push(this.proj)
            }
            else {
                this.proj = this.papa.add.sprite(this.x, this.y, "Proj")
                this.papa.add.existing(this.proj)
                this.shots_fired.push(this.proj)
            }
            this.papa.card_noise();
        }

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
        this.active = false;
        this.clear_shots();
        console.log(this.card, " has died.")
        this.destroy()
    }
}