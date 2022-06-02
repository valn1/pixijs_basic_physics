export default class branch {
    constructor(length,angle,parent=null, whereInparent) {
        this.length=length;
        this.angle=angle;
        this.parent=parent;
        this.whereInParent=whereInparent*parent.length;
        this.calculatePointA();
        this.getPointB();
    }

    create(){
        this.line = new PIXI.Graphics()
        this.line.lineStyle(8, 0xFFFF00, 1);
        this.line.moveTo(this.ax, this.ay);
        this.getPointB();
        this.line.lineTo(this.bx, this.by);
        globalThis.app.stage.addChild(this.line);
        return this.line;
    }

    calculatePointA(){
        this.ax=(this.parent.ax+this.whereInParent*
            ((this.parent.bx-this.parent.ax)/Math.sqrt((this.parent.bx - this.parent.ax)** 2+(this.parent.by - this.parent.ay)** 2)))
        this.ay=(this.parent.ay+this.whereInParent*
            ((this.parent.by-this.parent.ay)/Math.sqrt((this.parent.bx - this.parent.ax)** 2+(this.parent.by - this.parent.ay)** 2)))
    }

    calculatePointB(){
        this.bx=(this.ax+this.length*((this.bx-this.ax)/Math.sqrt((this.bx - this.ax)** 2+(this.by - this.ay)** 2)))
        this.by=(this.ay+this.length*((this.by-this.ay)/Math.sqrt((this.bx - this.ax)** 2+(this.by - this.ay)** 2)))
    }

    update(){
        this.line.clear()
        this.line.lineStyle(8, 0xFFFF00, 1, .5, false);
        this.calculatePointA()
        this.line.position.set(this.ax,this.ay)
        this.calculatePointB()
        this.line.lineTo(this.bx-this.ax,this.by-this.ay)
        // console.log(this.line.position)
    }

    // essa função usa o angulo pra determinar o ponto b, só precisamos determinar o ângulo, se esse angulo for maior que o ângulo máximo, getpointB
    //o ângulo deve ser relativo ao parent dele
    getPointB(){
        this.bx=(this.ax+(this.length*Math.cos(this.angle)))
        this.by=(this.ay+(this.length*Math.sin(this.angle)))
        // this.angle=Math.asin(((this.ay-this.by)/this.length))
    }

}