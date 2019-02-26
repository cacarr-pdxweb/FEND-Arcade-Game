/*=============================================
=                Randomizer                   =
=============================================*/

/*=== random int function taken from: https://bit.ly/2GF0Ik2 (quackit.com) ===*/
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/*=============================================
=               Game Entities                 =
=============================================*/

/*=== Player + Enemy superclass ===*/
class Entities {
    constructor(x, y, image) { // specify velocity in subclasses
        
        // horizontal and vertical axses positions
        this.x = x;
        this.y = y;

        // helper provided for loading the character images
        this.image = image;
    }

    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}

/*=== Enemy subclass ===*/
class Enemy extends Entities {
    constructor(x, y, image, velocity) {
        super(x, y, image = 'images/enemy-bug.png'); //enemy image
        this.velocity = randomInt(1, 6); // randomize initial velocity
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks - regularizes speed for all computers
    update(dt) { 
        
        // reposition enemy after it goes off canvas, change velocity
        this.x += 100 * this.velocity * dt;
        if (this.x > 550) { // enemy goes off canvas
            this.x = -50; // enemy starts at other side
            this.velocity = randomInt(1, 4) * 70 * dt; // randomize restart velocity 
        }                                                    
    }

    // collision function on engine.js

    // draw the enemey bugs
    render() {
        super.render();
    }
}

/*=== Player subclass ===*/
class Player extends Entities {
    constructor(x, y, move, image) {
        super(x, y, image = 'images/char-horn-girl.png');
        this.move = move;
        
        //player start position
        this.x = 150;
        this.y = 406;
    }

    update() {
        
        // y axis movement constraints - return after reaching water
        if (this.y < 50) { // reach the water
            this.y = 406; // return to y axis start
        } else if (this.y > 406) { // constrain bottom movement
            this.y = 406; // return to start
        }
        
        // x axis movement constraints 
        if (this.x < -100) {
            this.x = 0;
        } else if (this.x > 455) {
            this.x = 455;
        }
        
    }

    
    render() {
        super.render();
    }

    // arrow key player control
    handleInput(move) {
        switch(move) {
            case 'left':
                if(this.x > 0) {
                    this.x -= 100;
                }
            break;

            case 'up':
                if(this.y >= 56) {
                    this.y -= 80;
                }
            break;

            case 'right':
                if(this.x <= 405) {
                    this.x += 100;
                }
            break;

            case 'down':
                if(this.y <= 406) {
                    this.y += 80;
                }
        }
    }
}



/*=============================================
=     Instantiation & event listener    =
=============================================*/

/*=== Instantiating enemy objects ===*/
const enemyOne = new Enemy(0, 65);
const enemyTwo = new Enemy(-300, 65);
const enemyThree = new Enemy(-200, 150);
const enemyFour = new Enemy(0, 150);
const enemyFive = new Enemy(50, 235); 

/*=== All enemy ojects placed in an array called allEnemies ===*/
const allEnemies = [];
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive);

/*=== Player object in a variable called player ===*/
const player = new Player();


/*=== This listens for key presses and sends the keys to your Player.handleInput() method ===*/
document.addEventListener('keyup', (e) => {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});