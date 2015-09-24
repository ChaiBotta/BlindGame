/**
 * Created by Chai on 20/09/2015.
 */

/*UNIQUE ID FOR SOUNDS*/
var beepID = "beep";
var beepLID = "beep_left"; //sound  beep left
var beepRID = "beep_r"; // sound beep right

var hereRID = "here_right";
var hereLID = "here_left";

var explosionID = "explosion";
var alertID = "asteroid_alert";

var saveSoundID = "save_sound";

var salvatoID = "salvato";
var colpitoID = "colpito";
var evitatoID = "evitato";

var fuocoID = "fuoco";
var pausaID = "pausa";

var soundReady = false;


//Load assets sounds togheter
function loadAssets() {
    createjs.Sound.registerSound("assets/beep.mp3", beepID);
    createjs.Sound.registerSound("assets/beep_left_riv.mp3", beepLID);
    createjs.Sound.registerSound("assets/beep_right_riv.mp3", beepRID);


    createjs.Sound.registerSound("assets/sono_qui_l.mp3", hereLID);
    createjs.Sound.registerSound("assets/sono_qui_r.mp3", hereRID);

    createjs.Sound.registerSound("assets/explosion_short.mp3", explosionID);

    createjs.Sound.registerSound("assets/beep_lineup.mp3", alertID);
    createjs.Sound.registerSound("assets/save_sound.mp3", saveSoundID);

    //collision with ship
    createjs.Sound.registerSound("assets/salvato_bis.mp3",salvatoID);
    createjs.Sound.registerSound("assets/evitato.mp3", evitatoID);
    createjs.Sound.registerSound("assets/colpito.mp3", colpitoID);

    createjs.Sound.registerSound("assets/fuoco_shot.mp3", fuocoID);
    createjs.Sound.registerSound("assets/pausa.mp3", pausaID);
    soundReady = true;
    //  playSound(beepID);

}
;


//Play single sounds
function playBeepSound() {
    createjs.Sound.play(beepID);
    // alert("play sound starteddd");
}
;

function playBeepLeftSound() {

    createjs.Sound.play(beepLID);

    // alert("play sound starteddd");
};
function playBeepRightSound() {

    var b = createjs.Sound.play(beepRID);

    // alert("play sound starteddd");
};

function playHereRightSound() {

    var b = createjs.Sound.play(hereRID);

    // alert("play sound starteddd");
};
function playHereLefttSound() {

    var b = createjs.Sound.play(hereLID);

    // alert("play sound starteddd");
};

function playExplosion() {
    createjs.Sound.play(explosionID);

};

function playAlert() {
    createjs.Sound.play(alertID);
};

function playSaveSound() {
    createjs.Sound.play(saveSoundID);
};

function playSalvatoSound() {
    createjs.Sound.play(salvatoID);
};

function playEvitato() {
    createjs.Sound.play(evitatoID);
};

function playColpito() {
    createjs.Sound.play(colpitoID);
};

function playFuoco() {
    createjs.Sound.play(fuocoID);
};
function playPausa() {
    createjs.Sound.play(pausaID);
};