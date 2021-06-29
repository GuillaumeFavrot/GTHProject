//Ces variables ClassName servent à la boucle de détection des input car cela semble bugger avec les ClassID.
const celciusInput = document.getElementsByClassName("celciusInput");
const fahrenheitInput = document.getElementsByClassName("fahrenheitInput");
const kelvinInput = document.getElementsByClassName("kelvinInput");

//Ces variables permettent de récupérer les valeurs utilisés pour les calculs. Le programme ne récupérait pas les valeurs avec le ClassName car une class peut être attribuée à plusieurs éléments.
const celciusValue = document.getElementById("celciusValue");
const fahrenheitValue = document.getElementById("fahrenheitValue");
const kelvinValue = document.getElementById("kelvinValue");

//Boucle for de base permettant de détecter chaque input. La var "input" évolue à chaque fois que l'utilisateur saisi un nombre.
for (var i = 0 ; i < celciusInput.length ; i++){
    var input = celciusInput[i];
    
    //La fonction EventListener var détecter chaque évolution de la variable "input" et faire tourner la fonction "a".   
    input.addEventListener("input", a) 
    function a () {
    //La valeur entrée par l'utilisateur est stockée dans la var "value". Cette var sert au calcul des output.
    var value = celciusValue.value;
    //La ligne value = value*1 permet de transformer la valeur entrée par l'utilisateur sous forme de string en number. Sans cette ligne, si on entre 20°C dans le cconvertisseur, le calcul de la var Kelvin renvoie 20273.5 et non 293.5. 
    value = value * 1;
    var fahrenheit = (value * 1.8) + 32;
    //L'ajout de l'argument .toFixed(x) permet de limiter les décimales à deux et permet d'éviter que le résultat sorte de la case output.
    document.getElementById("fahrenheitOutput1").innerHTML = fahrenheit.toFixed(2) + " °F";
    var kelvin =  value + 273.5;
    document.getElementById("kelvinOutput1").innerHTML = kelvin.toFixed(2) + " K";
    } 
}

for (var i = 0 ; i < fahrenheitInput.length ; i++){
    var input = fahrenheitInput[i];
    
    input.addEventListener("input", b) 
    function b () {
    var value1 = fahrenheitValue.value;
    value1 = value1 * 1;
    var celcius = (value1 -32) / 1.8;
    console.log(celcius);
    document.getElementById("celciusOutput1").innerHTML = celcius.toFixed(2) + " °C";
    var kelvin1 =  ((value1 -32) / 1.8) + 273.5;
    document.getElementById("kelvinOutput2").innerHTML = kelvin1.toFixed(2) + " K";
    } 
}

for (var i = 0 ; i < kelvinInput.length ; i++){
    var input = kelvinInput[i];
    
    input.addEventListener("input", c) 
    function c () {
    var value2 = kelvinValue.value;
    value2 = value2 * 1;
    var celcius1 = value2 - 273.5;
    document.getElementById("celciusOutput2").innerHTML = celcius1.toFixed(2) + " °C";
    var fahrenheit1 =  ((value2 - 273.5) * 1.8) +32;
    document.getElementById("fahrenheitOutput2").innerHTML = fahrenheit1.toFixed(2) + " °F";
    } 
}