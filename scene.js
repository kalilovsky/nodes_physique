class sceneCTX{
    constructor(){

    }
    initNodes(nodes,nbrNodes,ctx){
        for (let i = 0; i< nbrNodes;i++){
            nodes[i] = new nodeThreeD(0,0,10,400,400);
            nodes[i].update(2);
            nodes[i].draw(ctx);
        }

    }
    renderNodes(nodes,ctx){
        nodes.forEach(_nodes=>{
            _nodes.update(0.02);
            _nodes.draw(ctx);
        })
    }
}