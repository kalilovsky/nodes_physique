let canvas = document.getElementById("scene");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let ctx = canvas.getContext("2d");
let scenes = new sceneCTX();





  let width = canvas.clientWidth; // Width of the canvas
  let height = canvas.clientHeight; // Height of the canvas
let centerGravity = new vecteur (0,0);

let nodes = new Array();
init();

function init(){
    //ctx.translate(width/2,height/2);
    ctx.fillStyle="#000000";
    scenes.initNodes(nodes,100,ctx,centerGravity);
    requestAnimationFrame(render);
}

function render(){
    ctx.clearRect(0,0,width,height);
    scenes.renderNodes(nodes,ctx,centerGravity);
    requestAnimationFrame(render);
}

canvas.addEventListener("mousemove", e=>{
    centerGravity.x = e.offsetX;
    centerGravity.y = e.offsetY;
})
