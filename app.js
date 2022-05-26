import segment from "./modules/IKSegment.js";
import branch from "./modules/IKSegmentBranch.js";

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias:true
});
app.stage.interactive = true;
window.app=app;

app.renderer.view.style.position='absolute'

document.body.appendChild(app.view);

let lines=[]
let branches=[]
for (let i = 0; i < 5; i++) {
    if (i!==0){
        lines.push(new segment(100,lines[i-1].Bx,lines[i-1].By,i*60,null, lines[i-1]))
    }else{
        lines.push(new segment(100,0,0,0))
    }
    app.stage.addChild(lines[i].create())
    // if (i===3||i===1){
    //     branches.push(new branch(50,60,null,lines[i], .3))
    //     app.stage.addChild(branches[i-1].create())
    //     branches.push(new branch(50,300,null,lines[i], .5))
    //     app.stage.addChild(branches[i].create())
    //
    //     //obviamente, isso aqui é só pra testes, o produto final não vai ser feito na mão desse jeito
    // }
}

// branches.push(new branch(50,300,null,lines[1], .5))
// app.stage.addChild(branches[0].create())
//
// let cotoco = new branch(100,300,null,branches[0], .8)
// app.stage.addChild(cotoco.create())

//esse aí em cima é o dragão hehe, aqui em baixo tá o código q faz o dragão se mexer

app.ticker.add(() => {
    lines.forEach(line=>{
        // line.len=line.len*1.001; //dá pra fazer a linha crescer, como nesse exemplo
        line.update()
    })
    branches.forEach(apendage=>{
        apendage.update()
    })

    // cotoco.update()
});


