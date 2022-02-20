let canvas = document.getElementById("scene");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let ctx = canvas.getContext("2d");
let scenes = new sceneCTX();

let width = canvas.clientWidth; // Width of the canvas
let height = canvas.clientHeight; // Height of the canvas


let nodes = new Array();
init();

function init(){
    ctx.translate(width/2,height/2);
    ctx.fillStyle="#000000";
    scenes.initNodes(nodes,100,ctx);
    requestAnimationFrame(render);
}

function render(){
    ctx.clearRect(-width/2,-height/2,width,height);
    scenes.renderNodes(nodes,ctx);
    requestAnimationFrame(render);
}
