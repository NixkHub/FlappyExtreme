var pipes = [];
var bird;
var bg;
var bat;
var bgx=0;
var parallax = 0.8;
var canvas; 
var pipePic;
var pipePic2;
var pipebody;
var bgMusic;
var score = 0;
var maxscore = 0;
let timer =5;
var start = true;
var parallax = 0.9;
var bg2;
var coin = [];
var coinimg;
var coinscore=0;


function preload() { //Load Images and Music
    score=0;
    coinscore=0;
    bg = loadImage('../../res/backgroundMain.png');
    bat = loadImage('../../res/bird/main.png');
    pipePic = loadImage('../../res/pipe/sharp_wood.png');
    pipePic2 = loadImage('../../res/pipe/sharp_wood2.png');
    pipebody = loadImage('../../res/pipe/wood.png')
    coinimg = loadImage('../../res/coin.png');
    soundFormats('mp3', 'ogg');
    bgMusic = loadSound('../../res/bgMusic.mp3');
}

function setup(){ // First Function that loads when Game get started
    bird = new Bird();
    pipes.push(new Pipe());
    coin.push(new Coin());
    canvas = createCanvas(700, 940);
    canvas.class('canvas-bg');
    bgMusic.setVolume(0.2);
    bgMusic.play(); 
    sessionStorage.clear();
}   


function draw(){ 

    background(0);
    image(bg,bgx,0,bg.width,height);

    bgx -= pipes[0].speed * parallax;

    if (bgx <= -bg.width + width) {
        image(bg, bgx + bg.width, 0, bg.width, height);
        if (bgx <= bg.width) {
        bgx = 0;
        }
      }

    for(var i = pipes.length-1; i >= 1; i--){
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].hits(bird)){
            console.log("HIT");
        }
        if(pipes[i].pass(bird)){
            score++;
            sessionStorage.setItem("score", score);
        }

        if(pipes[i].offscreen()){
            pipes.splice(i, 1);
        }
    
    }

    if (frameCount % 140 == 0) { //After 140 frames a new pipe spawns
        pipes.push(new Pipe());
      }
    showScores();
    function showScores(){
        textSize(32);
        fill(255); 
        text('score: ' + score,0,32);
        text('coins:' + coinscore,0,64);
    }
    for(var i = coin.length-1; i >= 1; i--){
        coin[i].show();

        if(coin[i].hit(bird)){
            coinscore++;
            coin.splice(i,1);
            sessionStorage.setItem("coinscore", coinscore);
        }
        else if(frameCount % 1550 == 0){
            coin.splice(i,1);
        }
    }
    if(frameCount % 1300 == 0){
        coin.push(new Coin());
    }
    bird.update();
    bird.show();
}


function keyPressed(){
    if(key == ' '){
        bird.up();
    }
}


