const canvas = document.querySelector("#pongCanvas");

//A ajouter dans tous les canvas en 2D
const ctx = canvas.getContext("2d");
canvas.width = 711;
canvas.height = 451;

//variable vitesse de déplacement

let vitesse = 5;

//Variables paddle
let paddleWidth = 10 ;
let paddleHeight = 51 ;
const paddle1 = {x : 30, y : 226-(paddleHeight/2)};
const paddle2 = {x : 670, y : 226-(paddleHeight/2)};


//Variable ball
let ballWidth = 10;
let ballHeight = 10;
const ball = {x : 356-(ballWidth/2), y : 226-(ballHeight/2)};
const ballSpeed = {x : -1, y : 0}
const ballSpeedFactor = 5;
let ballInitialSpeed = -1;
let ballBounceFactor;


//variables input

let keyZ = false;
let keyS = false;
let keyP = false;
let keyM = false;

//Variables features
let player1 = {
    nickname : "",
    score : 0,
}
let player2 = {
    nickname : "",
    score : 0,
}

//Fonction Animation : cette fonction remplace la fonction timer.setinterval et est considérée comme plus efficace.
function animation (){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle1 ();
    drawPaddle2 ();
    deplacementPaddle1 ();
    deplacementPaddle2 ();
    drawBall ();
    drawscore ();
    drawPlayField ();
    ballDynamicVectorCalculator ();
    ballPositionCalculator ();
}animation ();

//fonction draw
function drawPaddle1 () {
    //cette opération permet d'indiquer la couleur du dessin
    ctx.fillStyle = "#ffffff";
    //cette opération déssine un restangle plein aux coordonnées (x, y, largeur, hauteur)
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    
};

function drawPaddle2 () {
        //cette opération permet d'indiquer la couleur du dessin
        ctx.fillStyle = "#ffffff";
        //cette opération déssine un restangle plein aux coordonnées (x, y, largeur, hauteur)
        ctx.fillRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);
};

function drawBall (){
        //cette opération permet d'indiquer la couleur du dessin
        ctx.fillStyle = "#ffffff";
        //cette opération déssine un restangle plein aux coordonnées (x, y, largeur, hauteur)
        ctx.fillRect(ball.x, ball.y, ballWidth, ballHeight);
}

function drawscore () {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Player 1", (canvas.width / 2) - 80 , 20);
        ctx.fillText("Player 2", (canvas.width / 2) + 10 , 20);
        if (player1.score < 10){
            ctx.fillText(player1.score, (canvas.width / 2) - 50 , 50);  
        }
        else if (player1.score < 100){
            ctx.fillText(player1.score, (canvas.width / 2) - 55 , 50);   
        }
        else {
            ctx.fillText(player1.score, (canvas.width / 2) - 60 , 50);
        };

        if (player2.score < 10){
            ctx.fillText(player2.score, (canvas.width / 2) + 35, 50);  
        }
        else if (player2.score < 100){
            ctx.fillText(player2.score, (canvas.width / 2) + 30, 50);   
        }
        else {
            ctx.fillText(player2.score, (canvas.width / 2) + 25, 50);
        };
}

function drawPlayField (){
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(356, 0, 1, 451);
}

//fonctions de déplacement des raquettes
    //event listenner pour détecter lorsqu'on appuyie sur une touche
window.addEventListener("keydown", (e) => {  
    switch(e.key){ 
        case "z" :
            keyZ = true;
            keyS = false;
            console.log(keyZ);
            break;
        case "s" :
            keyS = true;
            keyZ = false;
            console.log(keyS);
            break;
        case "p" :
            keyP = true;
            keyM = false;
            console.log(keyP);
            break;
        case "m" :
            keyM = true;
            keyP = false;
            console.log(keyM);
            break;
        }})

        //event listenner pour détecter lorsqu'on relache une touche
window.addEventListener("keyup", (e) => {  
    switch(e.key){ 
        case "z" :
            keyZ = false;
            console.log(keyZ);
            break;
        case "s" :
            keyS = false;
            console.log(keyS);
            break;
        case "p" :
            keyP = false;
            console.log(keyP);
            break;
        case "m" :
            keyM = false;
            console.log(keyM);
            break;
        }})



    //fonction de gestion des flèches et des limitations de déplacement
function deplacementPaddle1 () {
    if (keyZ === true){
        if(paddle1.y > 10){
            paddle1.y -= vitesse;
        }
        else{
            paddle1.y = 0;
        }     
    }
    else if (keyS === true){
        if(paddle1.y < 441-paddleHeight){
            paddle1.y += vitesse;
        }
        else{
            paddle1.y = 451-paddleHeight;
        }   
    }
    else return       
};

function deplacementPaddle2 () {
    if (keyP === true){
        if(paddle2.y > 10){
            paddle2.y -= vitesse;
        }
        else{
            paddle2.y = 0;
        }     
    }
    else if (keyM === true){
        if(paddle2.y < 441-paddleHeight){
            paddle2.y += vitesse;
        }
        else{
            paddle2.y = 451-paddleHeight;
        }   
    }
    else return       
};

//fonctions de déplacement de la balle
    //fonction de calcul de la position de la balle
function ballPositionCalculator () {
    ball.x = ball.x + (ballSpeed.x * ballSpeedFactor);
    ball.y = ball.y + (ballSpeed.y * ballSpeedFactor);
}

   //Fonction de déplacement dynamique de la balle
function ballDynamicVectorCalculator () {
    let ballFutureX = ball.x + (ballSpeed.x * ballSpeedFactor);
    let ballFutureY = ball.y + (ballSpeed.y * ballSpeedFactor);
    let paddle1UpperTip = {x : paddle1.x + paddleWidth , y : paddle1.y};
    let paddle1LowerTip = {x : paddle1.x + paddleWidth , y : paddle1.y + paddleHeight};
    let paddle1Middle = {x : paddle1.x + paddleWidth , y : paddle1.y + ((paddleHeight / 2 ) + 1)}
    let paddle2Middle = {x : paddle2.x + paddleWidth , y : paddle2.y + ((paddleHeight / 2 ) + 1)}
    let paddle2UpperTip = {x : paddle2.x , y : paddle2.y};
    let paddle2LowerTip = {x : paddle2.x , y : paddle2.y + paddleHeight};

    if (ballFutureX < paddle1UpperTip.x && ballFutureY + ballHeight > paddle1UpperTip.y && ballFutureY < paddle1LowerTip.y && ball.x >= paddle1.x){
        ballSpeed.x = 1
        if (ballFutureY + ballHeight < paddle1Middle.y){
            ballBounceFactorRandomizer ();
            ballSpeed.y = - ballBounceFactor;
        } 
        else if (ballFutureY > paddle1Middle.y){
            ballBounceFactorRandomizer ();
            ballSpeed.y = ballBounceFactor;
        } 
        else {return};
    }
    else if (ballFutureX > paddle2UpperTip.x && ballFutureY + ballHeight > paddle2UpperTip.y && ballFutureY < paddle2LowerTip.y && ball.x <= paddle2.x){
        ballSpeed.x = -1
        if (ballFutureY + ballHeight < paddle2Middle.y){
            ballBounceFactorRandomizer ();
            ballSpeed.y = -ballBounceFactor;
        } 
        else if (ballFutureY > paddle2Middle.y){
            ballBounceFactorRandomizer ();
            ballSpeed.y = ballBounceFactor;
        } 
        else {return};
    }
    else if (ballFutureY < 0 || ballFutureY + ballHeight > canvas.height){
        ballSpeed.y = - ballSpeed.y
    }
    else if (ball.x === 1 ){
        gameOver (player2);
    }
    else if (ball.x === 701 ){
        gameOver (player1);
    }
    else {return};
}

    //Fonction de randomisation du vesteur Y de la balle
function ballBounceFactorRandomizer () {
    ballBounceFactor = Math.random();
    console.log(ballBounceFactor);
};



    //Fonctions features
function gameOver (player){
    //Gestion de la remise en jeu : on déplace la balle au centre et on la renvoi
    ball.x = 356-(ballWidth/2);
    ball.y = 226-(ballHeight/2);
    if (player === player1){
        ballSpeed.x = 1;
        ballSpeed.y = 0;
    }
    else if (player === player2){
        ballSpeed.x = -1;
        ballSpeed.y = 0;
    };
    //Ajout du score
    player.score += 1;
    console.log("Player 1 : " + player1.score)
    console.log("Player 2 : " + player2.score)
}; 

