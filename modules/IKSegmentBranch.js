export default class branch {
    constructor(len,angle,texture,parent=null, whereInparent) {
        this.len=len;
        this.angle=angle;
        this.parent=parent;
        this.whereInParent=whereInparent*parent.len;
        this.calculatePointA();
        this.getPointB();
    }

    create(){
        this.line = new PIXI.Graphics()
        this.line.lineStyle(8, 0xFFFF00, 1);

        return this.line;
    }

    calculatePointA(){
        this.Ax=(this.parent.Ax+this.whereInParent*
            ((this.parent.Bx-this.parent.Ax)/Math.sqrt(Math.pow((this.parent.Bx - this.parent.Ax), 2)
                +Math.pow((this.parent.By - this.parent.Ay), 2))))
        this.Ay=(this.parent.Ay+this.whereInParent*
            ((this.parent.By-this.parent.Ay)/Math.sqrt(Math.pow((this.parent.Bx - this.parent.Ax), 2)
                +Math.pow((this.parent.By - this.parent.Ay), 2))))
    }

    calculatePointB(){
        this.Bx=(this.Ax+this.len*((this.Bx-this.Ax)/Math.sqrt(Math.pow((this.Bx - this.Ax), 2)+Math.pow((this.By - this.Ay), 2))))
        this.By=(this.Ay+this.len*((this.By-this.Ay)/Math.sqrt(Math.pow((this.Bx - this.Ax), 2)+Math.pow((this.By - this.Ay), 2))))
    }

    update(){
        this.line.clear()
        this.line.lineStyle(8, 0xFFFF00, 1, .5, false);
        this.calculatePointA()
        this.line.position.set(this.Ax,this.Ay)
        this.calculatePointB()
        this.line.lineTo(this.Bx-this.Ax,this.By-this.Ay)
    }

    // essa função usa o angulo pra determinar o ponto b, só precisamos determinar o ângulo, se esse angulo for maior que o ângulo máximo, getpointB
    //o ângulo deve ser relativo ao parent dele
    getPointB(){
        this.Bx=(this.Ax+(this.len*Math.cos(this.angle)))
        this.By=(this.Ay+(this.len*Math.sin(this.angle)))
        // this.angle=Math.asin(((this.Ay-this.By)/this.len))
    }

}