/*
Tomas Gonzalez Moron
ABRIL - 2020
https://github.com/tomigm
 */

/**************************************************************************************** */
// THIS IS A COLOR PICKER - Selects color and then assign the color to colorPick variable

//https://vanilla-picker.js.org/
// Create a new Picker instance and set the parent element.
// By default, the color picker is a popup which appears when you click the parent.

const colorBox = document.querySelector('.colorBox');
const picker = new Picker(colorBox);
let colorPick;
// You can do what you want with the chosen color using two callbacks: onChange and onDone.

picker.onChange = function(color) {
    colorBox.style.background = color.rgbaString;
    colorPick = color.rgbaString;
};

// onDone is similar to onChange, but only called when you click 'Ok'.

/*************************************************************************************** */

/********** GRID SECTION **********/


//contains rows
let grid = document.querySelector('.grid');
//contains boxes
let row;

// It creates divs with class .box
function createBox (){
    const box = document.createElement('div');
    box.classList.add('box');
    row.appendChild(box);
}
// It create divs with class .row
function createRow () {
    row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
}

// It restart the grid deleting all childen
function resetGrid () {

    grid = document.querySelector('.grid');
    // while a child (firstChild) exist in a function >> remove last child >> repeat until there is no First child
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
        
      }  
}

// It merges rows and boxes
function createGrid(size){
          
    resetGrid();    
    
    // It creates a row and then insert boxes (createBox()) inside it
    for (let r = 0; r < size; r++ ){
    createRow ();
    paintMode();
        //it loops until boxes = size and goes back to createRow 
        for (let b = 0; b < size ; b++) {
        createBox ();
        }

    }


} 

/********** COLOR MODES SECTION **********/


// Color mode >> makes random color for each box
function randomColor (){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = "rgb("+r+","+g+","+b+")"
    return color;

}
// Color mode>> increases opacity by 0.1 for each pass over box
function grayScale (e){
    
    let currentOpacity = Number(e.target.style.opacity);
    
    if (e.target.style.opacity == 100){
        currentOpacity = 0;
        e.target.style.backgroundColor = 'black';
        return e.target.style.opacity = currentOpacity += 0.1;
    }
    e.target.style.backgroundColor = 'black';
    return e.target.style.opacity = currentOpacity += 0.1;
    
}

// Choose between different Color types
function changeColor(e){
    
    if (document.getElementById ('randomColor').className == "CMbtn active") {
        this.style.backgroundColor = randomColor();
        this.style.opacity = 100;

    }
    else if (document.getElementById ('grayScale').className == "CMbtn active") {
        grayScale(e);
    }

    else if (document.getElementById ('erase').className == "CMbtn active") {
        this.style.backgroundColor = 'white';
    }
    else {
        
        this.style.backgroundColor = colorPick;
        this.style.opacity = 100;
    }
}


/********** PAINT MODES SECTION **********/

// Painting style >> on hover >> changeColor
function hoverPaint () {
    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(div => div.removeEventListener('click', changeColor));
    boxes.forEach(div => div.addEventListener('mouseover', changeColor));
}

// Painting style >> with clicks >> changeColor
function clickPaint () {
    const boxes = document.querySelectorAll('div.box');
    boxes.forEach(div => div.removeEventListener('mouseover', changeColor));
    boxes.forEach(div => div.addEventListener('click', changeColor));
             

}

// Selects between the available paintmodes
function paintMode (){
    if (document.getElementById ('hoverPaint').className == "PMbtn active2") {
        hoverPaint ();
    }
    else {
        clickPaint ();
    }
}


/********** BUTTONS SECTION **********/

// [button] Paint Mode > Makes active or inactive
let PMbuttons = document.getElementById("paintMode");
let PMbtn = PMbuttons.getElementsByClassName("PMbtn");

for (let i = 0; i < PMbtn.length; i++) {
    PMbtn[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active2");
  current[0].className = current[0].className.replace(" active2", "");
  this.className += " active2";
  paintMode ();
  });
}

// [button] Grid  >> createGrid
const newGrid = document.querySelector ('.newGrid') 

newGrid.addEventListener('click', function(e){
createGrid(prompt('enter number'));
});

// [button] Color Mode  >> Makes active or inactive 
let CMbuttons = document.getElementById("colorMode");
let CMbtn = CMbuttons.getElementsByClassName("CMbtn");

for (let i = 0; i < CMbtn.length; i++) {
    CMbtn[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

// Makes default PaintMode to run on page load
paintMode ();
console.log('%cTomas Gonzalez Moron \nabril 2020 \nhttps://github.com/tomigm', 'background: plum; font-size: medium')