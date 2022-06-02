import segment from "./modules/Segment.js";
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
        lines.push(new segment(100,lines[i-1].bx,lines[i-1].by,60, lines[i-1]))
    }else{
        lines.push(new segment(100,0,0,60))
    }
    app.stage.addChild(lines[i].create())
    if (i===3||i===1){
        let appendage=new branch(50,60,lines[i], .3)
        branches.push(appendage)
        app.stage.addChild(appendage.create())
        let appendage2 = new branch(50,300,lines[i], .5)
        branches.push(appendage2)
        app.stage.addChild(appendage2.create())
    }
}

//it is going to be a dragon class, wich has an array of line objects and an array of branch objects and other stuff

app.ticker.add(() => {
    //this is going to be dragon.update() or maybe stage.update()
    lines.forEach(line=>{
        line.update()
    })
    branches.forEach(apendage=>{
        apendage.update()
    })

});


