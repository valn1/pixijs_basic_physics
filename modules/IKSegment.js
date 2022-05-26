export default class segment {
    constructor(len,Ax,Ay,angle,texture,parent=null) {
        this.Ax=Ax;
        this.Ay=Ay;
        this.len=len;
        this.angle=angle;
        this.parent=parent;
        this.getPointB();
    }

    create(){
        this.line = new PIXI.Graphics()
        this.line.lineStyle(2, 0xFF0000, 1);
        return this.line;
    }

    calculatePointB(){
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
        this.line.lineStyle(5, 0xFF0000, 1, .5, false);
        this.line.position.set(this.Ax,this.Ay)
        this.calculatePointB()

        // if (this.parent){
        //     this.angle=(Math.asin(((this.By-this.Ay)/this.len))*180/Math.PI)-this.parent.angle
        // }else{
        //     this.angle=Math.asin(((this.By-this.Ay)/this.len))*180/Math.PI
        // }
        //
        // if (this.angle<-45){
        //     this.getPointB(-45)
        // }
        // if (this.angle>45){
        //     this.getPointB(45)
        // }
        // console.log(this.angle)

        this.line.lineTo(this.Bx-this.Ax,this.By-this.Ay)

        //if angle < minangle, seta o b pelo angulo minimo
        //if angle > maxangle, seta o b pelo angulo maximo

    }

    getPointB(angle){
        angle=this.angle*Math.PI/180;
        this.Bx=(this.Ax+(this.len*Math.cos(angle)))
        this.By=(this.Ay+(this.len*Math.sin(angle)))
    }

}