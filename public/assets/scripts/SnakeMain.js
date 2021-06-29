const canvas = document.querySelector("#snakeCanvas")
//Pour une raison qui reste à eclaicir, la taille de base de l'objet canvas etait de x = 300 et y = 150 (2:1 aspect ratio) malgré les instructions CSS (510px 510px).
//J'ai donc modifié l'objet canvas en modifiant sa width et sa height pour matcher avec la CSS et avoir un aspect ratio 1:1.
canvas.width = 510;
canvas.height = 510;
//A ajouter dans tous les canvas en 2D
const ctx = canvas.getContext("2d");
//il s'agit de l'echelle du jeu, (la taille des cases du plateau)
const scale = 10;
const columns = canvas.width / scale;
const rows = canvas.height / scale;

//vitesse du jeu (en ms)
var gameSpeed = 100;

//variables de positions et de vitesse initiale du serpent
var snakeBody = [{snakePositionX: 25, snakePositionY: 25}];
var snakeSpeedX = 0;
var snakeSpeedY = 0;

//Variables de position de la bouffe
var foodX = 15;
var foodY = 15;

//Variables features
var score = 0;
var player = [];
const containerCanvas = document.querySelector(".containerCanvasSnake");
const currentlevel = document.querySelector("#currentLevel");
const difficulty = document.querySelector("#difficulty");
var difficultySettings = {
            //vitesse d'expassion du serpent
            expansionRate: 1,
            //nombre de points accordés par bouffe mangée 
            scorePerFood: 100,
};
var highScoreList = document.querySelector("#hiscorelist");


//Appel de la fonction HighScoreRetrieve pour l'inistaliser;
highScoreIni ();

//Fonction timer
    //Cette fonction est le timer, son but est d'executer un certain nombre de fonctions toutes les 250 millisecondes depuis le référentiel de la page html.
window.setInterval(() => {  
    //je commence par nettoyer tout le canvas afin d'effacer les anciennes cases serpent inutiles. Seules les cases utiles seront redessinées par la fonction en dessous.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //j'appelle la fonction drawSnake
    functionSnakePositionX ();
    functionSnakePositionY ();
    snakeBodyCollision ();
    foodUpdate ();
    snakeBodyUpdate ();
    drawSnake();
    drawFood(foodX, foodY);
    levelUp ();
}, gameSpeed);//timer de vitesse de jeu

//Fonction de dessin

    //Cette fonction déssine la tête du serpent (case de 10px*10px) aux coordonnées x et y indiquées. 
function drawSnake () {
        for ( let i = 0 ; i < snakeBody.length ; i++){
        //cette opération permet d'indiquer la couleur du dessin
        ctx.fillStyle = "#08A016";
        //cette opération déssine un restangle plein aux coordonnées (x, y, longeur, largeur)
        ctx.fillRect(snakeBody[i].snakePositionX * scale, snakeBody[i].snakePositionY * scale, scale, scale);
    }
}

function drawFood (foodX, foodY){
    ctx.fillStyle = "#E2BE08";
    ctx.fillRect(foodX * scale, foodY * scale, scale, scale);
}


//Fonctions snake speed 

    //Il semblerait que pour pouvoir utiliser l'evenement et ses paramêtres générés par un event listener il créer une fonction avec paramêtre.
    //Ce paramêtre devient alors l'objet "evènement". Logger l'objet evènement permet d'inspecter ses attributs.
    //le meilleurs moyen de lancer la fonction est d'utiliser une "arrow function".   
window.addEventListener("keydown", (e) => {
    console.log(e)   
    switch(e.key){
            
        case "z" :
            arrowUp ();
            break;
        case "q" :
            arrowLeft ();
            break;
        case "s" :
            arrowDown ();
            break;
        case "d" :
            arrowRight ();
            break;
        }})
    
    //fonction de gestion des flèches et des limitations de déplacement
function arrowUp () {
                if ( snakeSpeedX === 0 && snakeSpeedY === 1) {}
                else {
                    snakeSpeedX = 0;
                    snakeSpeedY = -1;   
                    }
                }

function arrowDown () {
                if ( snakeSpeedX === 0 && snakeSpeedY === -1) {}
                else {
                    snakeSpeedX = 0;
                    snakeSpeedY = 1;  
                    }
                }

function arrowLeft () {
                if ( snakeSpeedX === 1 && snakeSpeedY === 0) {}
                else {
                    snakeSpeedX = -1;
                    snakeSpeedY = 0;   
                    }
                }

function arrowRight () {
                if ( snakeSpeedX === -1 && snakeSpeedY === 0) {}
                else {
                    snakeSpeedX = 1;
                    snakeSpeedY = 0;   
                    }
                }

//Fonctions snake position

function snakeBodyUpdate (){
  for ( let i = snakeBody.length-2 ; i >= 0 ; i--){
        snakeBody[i+1].snakePositionX = snakeBody[i].snakePositionX;
        snakeBody[i+1].snakePositionY = snakeBody[i].snakePositionY;
    }; 
}

function functionSnakePositionX (){
                if( snakeBody[0].snakePositionX + snakeSpeedX === -1 ) {
                    snakeBody[0].snakePositionX = 0;
                    gameOver ();
                }

                else if ( snakeBody[0].snakePositionX + snakeSpeedX === 51 ) {
                    snakeBody[0].snakePositionX = 50;
                    gameOver ();
                }

                else{
                    snakeBody[0].snakePositionX = snakeBody[0].snakePositionX + snakeSpeedX;
                }
 
    
};

function functionSnakePositionY (){
                if( snakeBody[0].snakePositionY + snakeSpeedY === -1 ) {
                    C = 0;
                    gameOver ();
                }

                else if ( snakeBody[0].snakePositionY + snakeSpeedY === 51 ) {
                    snakeBody[0].snakePositionY = 50;
                    gameOver ();
                }

                else{
                    snakeBody[0].snakePositionY = snakeBody[0].snakePositionY + snakeSpeedY;
                }
};

function snakeGrowFirst (){
    snakeBody.push({...snakeBody[0]});
    for (let i = 0 ; i < difficultySettings.expansionRate ; i++ ){
        snakeBody.push({...snakeBody[0]})
    }
}

function snakeGrow (){
    for (let i = 0 ; i < difficultySettings.expansionRate ; i++ ){
        snakeBody.push({...snakeBody[0]})
    }
}

function snakeBodyCollision (){
    for (let i = 1 ; i < snakeBody.length ; i++){
        if (snakeBody[0].snakePositionX === snakeBody[i].snakePositionX && snakeBody[0].snakePositionY === snakeBody[i].snakePositionY){
            gameOver (); 
        }
        else {};
    }
}


//Fonctions food position

    //food update
function foodUpdate (){
    if (snakeBody[0].snakePositionX === foodX && snakeBody[0].snakePositionY === foodY && score === 0){
        snakeGrowFirst ();
        foodPositionRandomizer ()
        score = score + difficultySettings.scorePerFood;
    }
    else if (snakeBody[0].snakePositionX === foodX && snakeBody[0].snakePositionY === foodY){
        snakeGrow ();
        foodPositionRandomizer ()
        score = score + difficultySettings.scorePerFood;
    }
    else {};
}

    //food position randomizer
function foodPositionRandomizer (){
    foodX = Math.floor((Math.random()*51));
    foodY = Math.floor((Math.random()*51));
    foodPositionChecker ();
}

    //food position checker
function foodPositionChecker (){
    for (let i = 0 ; i < snakeBody.length ; i++){
        if (foodX === snakeBody[i].snakePositionX && foodY === snakeBody[i].snakePositionY){
            foodPositionRandomizer ();
        }
        else {};
    };
}

//Fonctions features


    //Fonction level up
function levelUp (){
    if (score < 1000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/aerial-top-view-forest_35024-263.jpg'" + ")";
        currentlevel.innerHTML = "Level 1";
    }
    else if (score < 2000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/pexels-kelly-lacy-3224800.jpg'" + ")";
        currentlevel.innerHTML = "Level 2";
    }
    else if (score < 3000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/113234084-rocky-ground-of-desert.jpg'" + ")";
        currentlevel.innerHTML = "Level 3";
    }
    else if (score < 4000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/Desert_pavement_2.jpg'" + ")";
        currentlevel.innerHTML = "Level 4";
    }
    else if (score < 5000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/unnamed.jpg'" + ")";  
        currentlevel.innerHTML = "Level 5"; 
    }
    else if (score < 6000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/RocketCrop.png'" + ")";  
        currentlevel.innerHTML = "Level 6"; 
    }
    else if (score < 7000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/EarthCrop.png'" + ")"; 
        currentlevel.innerHTML = "Level 7";  
    }
    else if (score < 8000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/MarsCrop.png'" + ")"; 
        currentlevel.innerHTML = "Level 8";  
    }
    else if (score < 9000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/JupiterCrop.png'" + ")"; 
        currentlevel.innerHTML = "Level 9";  
    }
    else if (score < 10000){
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/SaturnCrop.png'" + ")"; 
        currentlevel.innerHTML = "Level 10";  
    }
    else {  
        containerCanvas.style.backgroundImage = "url(" + "'/public/assets/img/Neptune.png'" + ")";
        currentlevel.innerHTML = "Level MAX";
    };
}

    //fonction select difficulty

    difficulty.addEventListener("change", () => {
        switch (difficulty.value){
        case "easy" :
            difficultySettings.expansionRate = 1; 
            difficultySettings.scorePerFood = 100;
        break;

        case "medium" :
            difficultySettings.expansionRate = 2; 
            difficultySettings.scorePerFood = 200;
        break;

        case "hard" :
            difficultySettings.expansionRate = 3; 
            difficultySettings.scorePerFood = 300;
        break;

        case "kingSnake" :
            difficultySettings.expansionRate = 5; 
            difficultySettings.scorePerFood = 500;
        break;
    }
});

    //Fonction GAME OVER
function gameOver (){
    //On arrete le serpent
    snakeSpeedX = 0;
    snakeSpeedY = 0;
    snakeBody = [{snakePositionX: 25, snakePositionY: 25}];
    //On annonce le GAME OVER et on demande le nom du joueur 
    var nickname = prompt("GAME OVER - Enter your nickname!", "nickname");
    //On annonce le score final.
    alert("Well done " + nickname + "! " + "Your final score is : " + score + " points!" )
    player.push({playerNickname : nickname, playerScore : score});
    highScoreRanking ();
    highScoreStorage ();
    highScoreDisplay ();
    //On propose de relancer le jeu.
    window.confirm ("Replay?");
    score = 0;
    //On réinitialise le serpend. (partie à remplacer par une fonction de réinitialisation)
    snakeBody[0].snakePositionX = 25;
    snakeBody[0].snakePositionY = 25;
    
}

    //Fonction highscore ranking (organisation du highscore)
function highScoreRanking (){
        //La fonction native de javascript .sort() permet de classer les évènement d'une array. Par défaut si on ne met rien entre les parenthèses elle va classer les items de l'array par ordre croissant (nombres) ou alphabétique (string).
        //Cependant si l'array contient des objets la fonction .sort() sans rien dans les parenthèses ne va rien faire. Pour trier des objets d'une array il faut ajouter dans les parenthèses une fonction de comparaison homemade.
        //Attention : la fonction .sort() convertis les éléments comparés en string avant de les comparer donc si on compare 11 et 102 la fonction la les classer 102, 11 et non l'inverse car 0 est inférieur à 1.
    player.sort(compare);
    //Petit bout de code pour éviter que la liste des highScore déborde. On classe les highscore puis on vire tout ce qui dépasse le rang 25.
    if(player.length > 24){
        player.pop();
    }
    else{
        return};
}
    //Fonction d'affichage des highscore
function highScoreDisplay (){
    highScoreList.innerHTML = "";
    highScoreRetreive ();
    for(i = 0 ; i < player.length ; i++){
    var playerRanking = document.createElement("li");
    let nickname = player[i].playerNickname;
    let score = player[i].playerScore;
    var text = document.createTextNode(nickname + ": " + score);
    playerRanking.appendChild(text);
    highScoreList.appendChild(playerRanking);
    };
}

    //fonction classement des hiscores
function compare(a, b) {
    //a et b sont les éléments qui seront comparés. La fonction .sort() va comparer les élémentss de l'array deux a deux les un après les autres.
    //le résultat de la fonction de comparaison va déterminer l'ordre de classement.
    //si le résultat < 0, a sera classé en premier et b en second.
    //si le résultat = 0, l'ordre des éléments ne sera pas modifié.
    //si le résultat > 0, b sera premier et a deuxième.
    //Si on fait a-b les éléments seront classés par ordre croissant car :  si "b" est > à "a" => a-b < 0 donc a est placé en premier. 
    //si on fait b-a les éléments seront classés par ordre décroissant car si "b" et > à "a" => b-a > 0 donc b est placé en premier.
    //HYPOTHESE : la fonction .sort() semble comparer l'ensemble des éléments de l'array deux à deux par vagues successives et renvoi le résultat (array finale classée) lorsque le dernier passage n'a pas eu d'effet sur l'ordre des éléments => résultat de tests papier.
    //en gros elle compare les éléments de l'array deux a deux dans l'ordre une fois et réalise un classement, puis recommence et remodifie le classement si des ajustement necessaire puis continue jusqu'à ce que l'ensemble des éléments soient classés selon la règle établie.
    return b.playerScore - a.playerScore;
    }

    //fonction stockage des highscores
function highScoreStorage (){
    //Le local storage des navigateurs ne peut contenir que des string. Du coup pour stocker autre chose que des string il faut les "stringifier" grâce à la "fonction" JSON.stringify
    let playerString = JSON.stringify(player);
    //la fonction .setItem() permet de stocker des string dans le local storage. Entre parenthèse il faut mettre la "clef" qui est en fait le nom du "tiroir" dans lequel on va stocker la string puis la valeur.
    //En un sens cette fonction fonctionne comme une variable.
    localStorage.setItem("player", playerString);
}
    //fonction de récupération des highscores
function highScoreRetreive (){
    //La fonction .getItem("clef") permet de récupérer la string contenue dans le tiroir "clef" depuis le local storage.
    //La fonction JSON.parse permet de rendre à la string récupérée sont format d'origine. Ici un array 
    player = JSON.parse(localStorage.getItem("player"));
}

    //Fonction d'initialisation des HighScore
function highScoreIni (){
    //On récupère les HighScore depuis le local storage
    highScoreRetreive ()
    //Si le local storage est vide (ie : après un wipe des données) la fonction highScoreRetrieve() va asssigner à la variable player un ensemble vide.
    //La variable va donc perdre son statut d'array et le pourra pas être utilisée en tant que telle dans le reste du code.
    //Du coup, si le localstorage est vide est que la variable player est dénaturée on la réinitialise.
    if (player === null){
        player = [];
    }
    //En revanche, si le stockage n'est pas vide et que des données HighScore sont disponibles alors on les affiche.
    else{
        highScoreDisplay ();    
    }
}