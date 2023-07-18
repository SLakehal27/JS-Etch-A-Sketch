const grid = document.querySelector(".sketchgrid");
let isDrawing = false;

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

grid.addEventListener("mousedown",setColor);

function setColor(event){

    if(isDrawing && event.type == "mousedown"){
        isDrawing = false;
        grid.removeEventListener("mousemove",setColor)
    }

    else if(event.type == "mousedown"){
        isDrawing = true;       
        grid.addEventListener("mousemove",setColor);
    }

    if(isDrawing){
        event.target.style.background = "#46cfb3";
    }
}

generateGrid(16);
