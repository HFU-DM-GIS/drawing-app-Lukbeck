const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEL = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const saveC = document.getElementById("savecanvas");
const ctx = canvas.getContext("2d");
const randomColorBtn = document.getElementById("randomColor");
let saveBtn = document.getElementById("save");
let selectedColor = localStorage.getItem("selectedColor") || colorEl.value;
let size = parseInt(localStorage.getItem("size")) || 10;
let isPressed = false;
let x;
let y;

function saveData() {
  localStorage.setItem("selectedColor", selectedColor);
  localStorage.setItem("size", size.toString());
}

function loadData() {
  selectedColor = localStorage.getItem("selectedColor") || colorEl.value;
  size = parseInt(localStorage.getItem("size")) || 10;
  updateSizeOnScreen();
  updateColorOnScreen();

}

let url = "http://colormind.io/api/";
let data = {
	  model : "default" 
} // variables/constants


var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
    var toolbox = document.getElementById("colorbuttons"); 
    for (color of palette) { 
      var button = document.createElement ("button");
      const hexcolor = "#" + color[0].toString(16)
      + color[1].toString(16) + color[2].toString(16);
      button.style.background = hexcolor

      button.addEventListener("mousedown",(e) => { 
      colorEl.value= hexcolor 
      selectedColor=hexcolor
      saveData();
    })
      toolbox.appendChild (button) ; 
    }
	} 

} // onreadystatechange

http.open("POST", url, true);
http.send(JSON.stringify(data));

// [[42, 41, 48], [90, 83, 84], [191, 157, 175], [188, 138, 125], [215, 170, 66]]
// note that the input colors have changed as well, by a small amount


if(localStorage.getItem("imgCanvas") != null){
    let img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0, 0)
    }
    img.src = localStorage.getItem("imgCanvas");  

};


canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  drawCircle(x,y);
}); // sets the mouse down

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
}); // sets the mouse up

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
}); // sets the mouse move

canvas.addEventListener("mouseleave", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
}); // sets the mouse leave

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = selectedColor;
  ctx.fill();
} // draws a circle

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = selectedColor;
  ctx.lineWidth = size * 2;
  ctx.stroke();
} // draws a line
 
saveC.addEventListener("click", () => {

  if(typeof(localStorage) != null){
    localStorage.setItem("imgCanvas", canvas.toDataURL())
  //window.alert(localStorage.getItem("imgCanvas"));
  
  }else{
    window.alert("Dieser Browser unterstützt kein local storage");
  }


})


function updateSizeOnScreen() {
  sizeEL.innerText = size;
  saveData(); // Speichern der Größe nach der Aktualisierung
}
function updateColorOnScreen() {
  colorEL.value = selectedColor;
  saveData(); // Speichern der Größe nach der Aktualisierung
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 100) {
    size = 100;
  }
  updateSizeOnScreen();
}); // increases the size

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
}); // sets the size

window.addEventListener("load", () => {
  loadData(); // Laden der gespeicherten Daten
});

colorEl.addEventListener("change", (e) => {
  selectedColor = e.target.value;
  saveData();
  updateColorOnScreen(); // Speichern der ausgewählten Farbe
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}); // clears the canvas


function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  
  return color;

  //sets a random color
}

randomColorBtn.addEventListener("click", () => {
  const randomColor = getRandomColor();
  colorEl.value = randomColor;
  selectedColor = randomColor;
  
 document.body.style.backgroundColor = randomColor;
 saveData();
});

saveBtn.addEventListener("click" , () => {  
  let data = canvas.toDataURL("img/png");
  let pic = document.createElement("a");
  pic.href = data;
  pic.download ="sketch.png"
  pic.click();

})


loadData();
