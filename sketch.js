const grid = document.querySelector(".sketchgrid");
let currentColor = "#46cfb3";
let isDrawing = false;
let isRainbow = false;

function generateColor()
{
    const max = 16777215;
    return '#' + Math.floor(Math.random() * max).toString(16).padStart(6,'0').toLocaleUpperCase();
}

function generateGrid(size)
{
    for (let i = 0; i < size; i++) 
    {
        const row = document.createElement("div");
        row.classList.add("sketchrow");
    
        for (let j = 0; j < size; j++) 
        {
            const div = document.createElement("div");
            div.classList.add("sketchbutton");
            div.style.width = (480 / size).toString() + "px";
            div.style.height = (480 / size).toString() + "px";
            row.appendChild(div);
        }
        grid.appendChild(row);
    }
}

function setBrushColor(color){
    if(color == "rainbow"){
        isRainbow = true;
        currentColor = color;
        return;
    }
    isRainbow = false;
    currentColor = color;
}

grid.addEventListener("mousedown",setColor);

function setColor(event)
{
    if(isDrawing && event.type == "mouseup")
    {
        isDrawing = false;
        // grid.removeEventListener("mousemove",setColor);
    }

    else if(event.type == "mousedown")
    {
        isDrawing = true;       
        grid.addEventListener("mousemove",setColor);
        grid.addEventListener("mouseup",setColor);
    }

    if(isDrawing){
        if(isRainbow){
            currentColor = generateColor();
        }

        event.target.style.background = currentColor;
    }
}

generateGrid(16);

function deleteGrid()
{
    const rows = document.querySelectorAll(".sketchrow");
    rows.forEach((row) => row.remove());
}

function regenerateGrid(size){
    deleteGrid();
    generateGrid(size);
}

var slider = document.getElementById("sketchrange");
var width = document.getElementById("sketchnmbr");
var height = document.getElementById("sketchnmbr2");
width.innerHTML = slider.value;
height.innerHTML = width.innerHTML;

slider.oninput = function(){
    width.innerHTML = this.value;
    height.innerHTML = width.innerHTML;
    regenerateGrid(this.value);
}