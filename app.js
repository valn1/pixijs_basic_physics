import segment from "./modules/IKSegment.js";

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
for (let i = 0; i < 5000; i++) {
    if (i!==0){
        lines.push(new segment(2,lines[i-1].Bx,lines[i-1].By,i*20, lines[i-1]))
    }else{
        lines.push(new segment(2,0,0,0))
    }
    app.stage.addChild(lines[i].create())
}

 new segment(100,150,150,60)

app.ticker.add(() => {
    lines.forEach(line=>{
        line.update()
    })
});


