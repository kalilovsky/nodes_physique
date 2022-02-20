class sceneCTX{
    constructor(){

    }
    initNodes(nodes,nbrNodes,ctx,centerPos){
        for (let i = 0; i< nbrNodes;i++){
            nodes[i] = new nodeThreeD(centerPos.x,centerPos.y,1,30,400);
            nodes[i].mouvementSpherique(2,centerPos);
            nodes[i].draw(ctx);
        }

    }
    renderNodes(nodes,ctx,centerPos){
        nodes.forEach(_nodes=>{
            _nodes.mouvementSpherique(0.02,centerPos);
            _nodes.draw(ctx);
        })
    }
}