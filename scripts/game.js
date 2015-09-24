// requestAnim shim layer by Paul Irish

//window.requestAnimFrame = (function(){
//    return  window.requestAnimationFrame       || 
//        window.webkitRequestAnimationFrame || 
//        window.mozRequestAnimationFrame    || 
//        window.oRequestAnimationFrame      || 
//        window.msRequestAnimationFrame     || 
//        function(/* function */ callback, /* DOMElement */ element){
//        window.setTimeout(callback, 1000 / 60);
//    };
//})();

var SPACE_SIDE = 64;
var BULLET_SPEED = 8;
var ASTEROID_SPEED = 4;
var NUMERO_ASTRONAUTA = 1;


/*console for log*/
var console = document.getElementById("console");
var log = function (message) {

    console.innerHTML = message;
};
/*game controllers*/


var canvas = document.getElementById("game_canvas");
window.addEventListener("keydown", doKeyDown, true);
var ctx = canvas.getContext("2d");

//var stage = new createjs.Stage("game_canvas");

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

//load resources image
//var bgReady = false;
//var bgImage = new Image();
//bgImage.onload = function () {
//    bgReady = true;
//};
//bgImage.src = "../img/space.jpg";

var image = document.getElementById('background');


/*
 Game Logic
 */

var astronautas = [];


var render = function () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //drawGrid();
    ship.draw();

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }

    //rocks
    for (var i = 0; i < rocks.length; i++) {
        rocks[i].draw();
    }

    for (var j = 0; j < astronautas.length; j++) {
        astronautas[j].draw();
    }

    // requestAnimationFrame(render);
    //canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

};

var isAsteroidReady = true;
var isAstronautaReady = true;
setInterval(function(){
    var posX = getRandomInt(0, CANVAS_WIDTH - 64);
        if(astronautas.length == 0)
        astronautas.push(new Astronauta(posX, -64));

},10000);
var GAME_STATE = 0; //0 = PAUSE; 1 = PLAY
/*UPDATE GAME STATE*/
var update = function () {

    //bullets and  //check collision
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update();

        //check collision with asteroids (rocks)
        for (var j = 0; j < rocks.length; j++) {
            var bullet_top_center = bullets[i].getX() + 8;
            if (bullet_top_center > rocks[j].getX() && bullet_top_center < (rocks[j].getX() + 64)) {
                if (bullets[i].getY() <= (rocks[j].getY() + 64)) {
                    //OBJECTS ARE COLLIDING
                    playExplosion();

                    //remove collided bullets
                    var index = bullets.indexOf(bullets[i]);
                    if (index > -1) {
                        bullets.splice(index, 1);
                    }
                    //remove collide rocks
                    index = rocks.indexOf(rocks[j]);
                    if (index > -1) {
                        rocks.splice(index, 1);
                    }

                }
            }
        }
//remove bullets out of screen
        if (bullets[i].getY() < -16) {
            var index = bullets.indexOf(bullets[i]);
            if (index > -1) {
                bullets.splice(index, 1);
            }
            console.innerHTML = "bullet removed";
        }


    }

    //schedule showing of asteroid
    if (isAsteroidReady) {
        //every 2 seconds send an asteroid
        isAsteroidReady = false;
        setTimeout(function () {
            var posX = getRandomInt(0, CANVAS_WIDTH - 64);
            if (rocks.length <= 2)
                rocks.push(new Asteroid(posX, -64));


            isAsteroidReady = true;
        }, 2000);
    }
    //update asteroid position
    for (var i = 0; i < rocks.length; i++) {
        rocks[i].update();
        if (rocks[i].getY() > CANVAS_HEIGHT - 100) {
            var index = rocks.indexOf(rocks[i]);
            if (index > -1) {
                rocks.splice(index, 1);
            }

        }
        if ((rocks[i].getX() > ship.x && rocks[i].getX() < ship.x + 64) || (rocks[i].getX() + 64 > ship.x && rocks[i].getX() + 64 < ship.x + 64)) {

            if (rocks[i].getY() + 64 > ship.y) {
                playColpito();
                var index = rocks.indexOf(rocks[i]);
                if (index > -1) {
                    rocks.splice(index, 1);
                }
            }
        }
    }


//schedule showing of astronautas
    /*
    if (isAstronautaReady) {
        //every 2 seconds send an asteroid
        isAstronautaReady = false;
        setTimeout(function () {
            var posX = getRandomInt(0, CANVAS_WIDTH - 64);
            if (astronautas.length <= NUMERO_ASTRONAUTA)
                astronautas.push(new Astronauta(posX, -64));


            isAstronautaReady = true;
        }, 3000);
    }*/
    //update astronautas && check collision with ship
    for (var i = 0; i < astronautas.length; i++) {
        astronautas[i].update();
        //remove astronauta if go out of screen
        if (astronautas[i].getY() > CANVAS_HEIGHT) {
            var index = astronautas.indexOf(astronautas[i]);
            if (index > -1) {
                astronautas.splice(index, 1);
            }

        }
        if ((astronautas[i].getX() > ship.x && astronautas[i].getX() < ship.x + 64) || (astronautas[i].getX() + 64 > ship.x && astronautas[i].getX() + 64 < ship.x + 64)) {

            if (astronautas[i].getY() + 64 > ship.y) {
                playSalvatoSound();
                var index = astronautas.indexOf(astronautas[i]);
                if (index > -1) {
                    astronautas.splice(index, 1);
                }
            }
        }
    }


};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var drawGrid = function () {
    var mVLines = CANVAS_WIDTH / SPACE_SIDE;
    var mHLines = CANVAS_HEIGHT / SPACE_SIDE;
    //log("width: "+CANVAS_WIDTH);
    var posX = 0;
    var posY = 0;
    //draw horizontal lines
    for (var i = 0; i <= mVLines; i++) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(posX, CANVAS_HEIGHT);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.closePath();
        posX = posX + SPACE_SIDE;
    }
    posX = 0;
    posY = 0;
    //draw vertical lines
    for (var i = 0; i <= mHLines; i++) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(CANVAS_WIDTH, posY);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.closePath();
        posY = posY + SPACE_SIDE;
    }

};


var clearScreen = function () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

};


function init(success, fail) {

}
var img_bullet = new Image();
var bullet_imgready = false;
img_bullet.onload = function () {
    bullet_imgready = true;
};
img_bullet.src = "./img/bullet_star16x16.png";

var Bullet = function (x, y, direction) {
    this.x = x + SPACE_SIDE - 40;
    this.y = y;
    this.color = "#ff0";
    this.dir = direction;
    this.speed = 0.26;
    this.width = 16;
    this.height = 16;
    this.draw = function () {
        // ctx.fillStyle = this.color;
        if (bullet_imgready)
            ctx.drawImage(img_bullet, this.x, this.y, this.width, this.height);

    };
    this.update = function () {

        switch (this.dir) {

            case 1: //top
                this.x = this.x;
                this.y = this.y - BULLET_SPEED;

                break;
            case 0: //down
                this.x = this.x;
                this.y = this.y + BULLET_SPEED;
                break;

        }

    };

    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };

};


var img_asteroid = new Image();
var asteroid_ready = false;
img_asteroid.onload = function () {
    asteroid_ready = true;
};
img_asteroid.src = "./img/asteroid64x64.png";


var Asteroid = function (x, y) {
    this.x = x;
    this.y = y;
    this.color = "#ff0";
    this.speed = 0.26;
    this.width = 64;
    this.height = 64;
    this.draw = function () {
        // ctx.fillStyle = this.color;
        if (asteroid_ready)
            ctx.drawImage(img_asteroid, this.x, this.y, this.width, this.height);

    };
    this.update = function () {

        this.x = this.x;
        this.y = this.y + ASTEROID_SPEED;


    }


    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
};


var img_astronauta = new Image();
var astronauta_ready = false;
img_astronauta.onload = function () {
    astronauta_ready = true;
};

img_astronauta.src = "./img/astronauta64x64_1.png";

var Astronauta = function (x, y) {
    this.x = x;
    this.y = y;
    this.color = "#ff0";
    this.speed = 0.26;
    this.width = 64;
    this.height = 64;
    this.draw = function () {
        // ctx.fillStyle = this.color;
        if (astronauta_ready)
            ctx.drawImage(img_astronauta, this.x, this.y, this.width, this.height);

    };
    this.update = function () {

        this.x = this.x;
        this.y = this.y + ASTEROID_SPEED;


    };


    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
};


function doKeyDown(e) {
    log(e.keyCode);

    switch (e.keyCode) {
        case 81: //PRESS ON Q
            if(GAME_STATE ==0) GAME_STATE = 1;
            else{
                GAME_STATE = 0;
                playPausa();
            }

            break;
      /*  case 87:
            if (ship.y <= 0) ship.y = 0;
            else ship.y = ship.y - SPACE_SIDE;

            ship.update(ship.x, ship.y); //press on W
            break;
        case 83:
            if (ship.y >= CANVAS_HEIGHT - SPACE_SIDE) ship.y = CANVAS_HEIGHT - SPACE_SIDE;
            else ship.y = ship.y + SPACE_SIDE;
            ship.update(ship.x, ship.y);
            break;*/
        case 68:
            if (ship.x >= CANVAS_WIDTH - SPACE_SIDE) ship.x = CANVAS_WIDTH - SPACE_SIDE; //press D
            else ship.x = ship.x + 32;
            break;
        case 65:
            if (ship.x <= 0) ship.x = 0; //press A
            else ship.x = ship.x - 32;
            break;
        case 32: //Shot the bulletnew Bullet(ship.x, ship.y, r);
            bullets.push(new Bullet(ship.x, ship.y, 1));
            break;
        case 70: //Pressed F for feedback
            if (soundReady)
                giveAsteroidPosition();
            break;
        default:
            break;
    }
}

setInterval(function () {
    if (rocks.length > 0 && GAME_STATE == 1)
        giveAsteroidPosition();

}, 500);


setInterval(function () {
    if (astronautas.length > 0 && GAME_STATE == 1)
 giveAstronautPosition();

}, 800);

function giveAstronautPosition() {
    //get the closest rock
    var index;
    var minDistance = 1000;
    for (var i = 0; i < astronautas.length; i++) {
        var tempValue = ship.y - rocks[i].getY();
        minDistance = Math.min(minDistance, tempValue);
        if (minDistance == tempValue) index = i;
    }


    if (astronautas[index].getX() + 64 < ship.x && soundReady) {

        playHereLefttSound();

        pos.innerHTML = "left";
    } else if (astronautas[index].getX() > ship.x + 64 && soundReady) {
        pos.innerHTML = "right";

        playHereRightSound();
    } //center in line

    else if (astronautas[index].getX() + 64 > ship.x + 32 && astronautas[index].getX() < ship.x + 32) {
        playAlert();
    }
}
function giveAsteroidPosition() {
    //get the closest rock
    var index;
    var minDistance = 1000;
    for (var i = 0; i < rocks.length; i++) {
        var tempValue = ship.y - rocks[i].getY();
        minDistance = Math.min(minDistance, tempValue);
        if (minDistance == tempValue) index = i;
    }


    if (rocks[index].getX() + 64 < ship.x && soundReady) {

        playBeepLeftSound();

        pos.innerHTML = "left";
    } else if (rocks[index].getX() > ship.x + 64 && soundReady) {
        pos.innerHTML = "right";

        playBeepRightSound();
    } //center in line

    else if (rocks[index].getX() + 64 > ship.x + 32 && rocks[index].getX() < ship.x + 32) {
        playAlert();
    }
}
/*
 Game elements
 */
/*Singleton instance class of a ship*/
//var img_ship = document.createElement("img");
var img_ship = new Image();
var shipLoaded = false;
img_ship.onload = function () {
    shipLoaded = true;
};
img_ship.src = "./img/ship64x64.png";

var ship = {
    color: "#00A",
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - SPACE_SIDE,
    width: SPACE_SIDE,
    height: SPACE_SIDE,
    draw: function () {

        if (shipLoaded) {
            ctx.drawImage(img_ship, this.x, this.y, 64, 64);

        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }


    },
    update: function (newX, newY) {
        this.x = newX;
        this.y = newY;
    }
};

/*Collection of bullets*/
var bullets = [];
/*Object bullet 
 x = position x
 y= position y
 dir = direction
 */

var rocks = [];

/*
 startAnimation();

 function startAnimation () {
 requestAnimFrame( startAnimation );
 render();
 };*/

/*SOUND JS
 */
var pos = document.getElementById("position");
var can_shoot = true;
Leap.loop(function (frame) {
    if (frame.hands.length > 0) {
        if (frame.hands.length == 2 && GAME_STATE == 1) {
            GAME_STATE = 0; //pause the game
            playPausa();
        }else{

            var hand = frame.hands[0];
            var position = hand.palmPosition;

            // pos.innerHTML = position[0];ff
            ship.update(position[0] + 256 - 32, ship.y);

            if (hand.grabStrength == 1 && can_shoot) {
                bullets.push(new Bullet(ship.x, ship.y, 1));
                playFuoco();
                can_shoot = false;
                GAME_STATE = 1; //restart the Game
                //pos.innerHTML = "grabstrength: "+hand.grabStrength;
            }
        }

    } else {
        pos.innerHTML = "frame zero size : " + frame.id;
    }

});

setInterval(function () {
    if (GAME_STATE == 1) {
        update();
    }

    render();
}, 1000 / 20);

setInterval(function () {
    can_shoot = true;
}, 800);