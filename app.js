const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraser = document.getElementById("jsEraser");

const INITIAL_COLOR = "#2c2c2c"; //검정색
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; //배경색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;
let removing = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    if (removing) {
      //지우개모드
      //ctx.strokeStyle = "white";
      //ctx.lineTo(x, y);
      //ctx.stroke();
      console.log("eraser~~~", x, y);
      ctx.clearRect(x, y, 20, 20);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}
function handleEraserMode(event) {
  if (!removing) {
    removing = !removing;
  }
}
function handleColorClick(event) {
  removing = false;
  const color = event.target.style.backgroundColor;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}
function handleModeClick(event) {
  removing = false;
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (eraser) {
  eraser.addEventListener("click", handleEraserMode);
}
