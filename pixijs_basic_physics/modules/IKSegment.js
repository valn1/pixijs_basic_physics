export default class segment {
    constructor(len,Ax,Ay,angle,parent=null) {
        this.Ax=Ax;
        this.Ay=Ay;
        this.len=len;
        this.angle=angle;
        this.parent=parent;
        this.getPointB();
    }

    create(){
        this.line = new PIXI.Graphics()
        this.line.lineStyle(2, 0xFFFFFF, 1);
        // this.line.moveTo(this.Ax, this.Ay);
        // this.line.lineTo(this.Bx, this.By);

        return this.line;
    }

    calculatePointB(){
        // dist:(Math.sqrt((Math.pow((bx - ax), 2))+ (Math.pow((by - ay), 2)))- len).toFixed(5),
        this.Bx=(this.Ax+this.len*((this.Bx-this.Ax)/Math.sqrt(Math.pow((this.Bx - this.Ax), 2)+Math.pow((this.By - this.Ay), 2))))
        this.By=(this.Ay+this.len*((this.By-this.Ay)/Math.sqrt(Math.pow((this.Bx - this.Ax), 2)+Math.pow((this.By - this.Ay), 2))))
    }

    update(){
        if (this.parent){
            this.Ax=this.parent.Bx;
            this.Ay=this.parent.By;
        }else{
            this.Ax=window.app.renderer.plugins.interaction.mouse.global.x;
            this.Ay=window.app.renderer.plugins.interaction.mouse.global.y;
        }
        this.line.clear()
        this.line.lineStyle(2, 0xFFFFFF, 1);
        this.line.position.set(this.Ax,this.Ay)
        // this.getPointB()
        this.calculatePointB()
        this.line.lineTo(this.Bx-this.Ax,this.By-this.Ay)
    }

    getPointB(){
        this.angle=this.angle*Math.PI/180;
        this.Bx=(this.Ax+(this.len*Math.cos(this.angle)))
        this.By=(this.Ay+(this.len*Math.sin(this.angle)))
    }

}