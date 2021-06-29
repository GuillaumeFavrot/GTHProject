//var input numbers
var one = document.querySelector("#one")
var two = document.querySelector("#two")
var three = document.querySelector("#three")
var four = document.querySelector("#four")
var five = document.querySelector("#five")
var six = document.querySelector("#six")
var seven = document.querySelector("#seven")
var eight = document.querySelector("#eight")
var nine = document.querySelector("#nine")
var zero = document.querySelector("#zero")
var point = document.querySelector("#point")

//var input operators
var plus = document.querySelector("#plus")
var minus = document.querySelector("#minus")
var multiply = document.querySelector("#multiply")
var divide = document.querySelector("#divide")
var equal = document.querySelector("#equal")

//var input suppr and clear everything
var suppr = document.querySelector("#suppr")
var ce = document.querySelector("#ce")

//var output
var current = document.querySelector(".current")
var previous = document.querySelector(".previous")
var operator = document.querySelector(".operator")

//var calculation
var result ="";


//number input functions
one.addEventListener("click", a);
function a ()
{
    result = result + "1";
    current.innerHTML = result;
}

two.addEventListener("click", b);
function b ()
{
    result = result + "2";
    current.innerHTML = result;  
}

three.addEventListener("click", c);
function c ()
{
    result = result + "3";
    current.innerHTML = result;  
}

four.addEventListener("click", d);
function d ()
{
    result = result + "4";
    current.innerHTML = result;  
}

five.addEventListener("click", e);
function e ()
{
    result = result + "5";
    current.innerHTML = result;  
}

six.addEventListener("click", f);
function f ()
{
    result = result + "6";
    current.innerHTML = result;  
}

seven.addEventListener("click", g);
function g ()
{
    result = result + "7";
    current.innerHTML = result;  
}

eight.addEventListener("click", h);
function h ()
{
    result = result + "8";
    current.innerHTML = result;  
}

nine.addEventListener("click", i);
function i ()
{
    result = result + "9";
    current.innerHTML = result;  
}

zero.addEventListener("click", j);
function j ()
{
    if(result === "")
    {

    }
    else
    {
    result = result + "0";
    current.innerHTML = result; 
    }

     
}

point.addEventListener("click", jj);
function jj ()
{
    if(result === "")
    {
    result = "0."
    current.innerHTML = result;
    }
    else
    {
    result = result + ".";
    current.innerHTML = result;
    }
}

//operator input functions
plus.addEventListener("click", k);
function k ()
{
    previous.innerHTML = result;
    operator.innerHTML = "+"
    current.innerHTML = ""
    result ="";
}

minus.addEventListener("click", l);
function l ()
{
    previous.innerHTML = result;
    operator.innerHTML = "-"
    current.innerHTML = ""
    result ="";
}

multiply.addEventListener("click", m);
function m ()
{
    previous.innerHTML = result;
    operator.innerHTML = "x"
    current.innerHTML = ""
    result ="";
}

divide.addEventListener("click", n);
function n ()
{
    previous.innerHTML = result;
    operator.innerHTML = "/"
    current.innerHTML = ""
    result ="";
}

//equal function

equal.addEventListener("click", o);
function o ()
{
   let value1 = parseFloat(previous.textContent);
   let value2 = parseFloat(current.textContent);

   switch (operator.textContent)
   {
    case "+": result = value1 + value2
        previous.innerHTML =""; 
        current.innerHTML ="";
        operator.innerHTML ="";
        current.innerHTML = result;
        break;
    
    case "-": result = value1 - value2
        previous.innerHTML =""; 
        current.innerHTML ="";
        operator.innerHTML ="";    
        current.innerHTML = result;   
        break;
    
    case "x": result = value1 * value2
        previous.innerHTML =""; 
        current.innerHTML ="";
        operator.innerHTML ="";   
        current.innerHTML = result;
        break;

    case "/": result = value1 / value2
        previous.innerHTML =""; 
        current.innerHTML ="";
        operator.innerHTML ="";   
        current.innerHTML = result;    
        break;
   }

}

//functions suppr and clear everything

ce.addEventListener("click", p);
function p ()
{
    previous.innerHTML =""; 
    current.innerHTML ="";
    operator.innerHTML ="";
    result ="";
}

suppr.addEventListener("click", q);
function q ()
{
        result = result.slice(0 , result.length-1);
        current.innerHTML = result;
}