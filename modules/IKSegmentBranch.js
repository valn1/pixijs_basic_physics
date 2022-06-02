export default class branch {
    constructor(length,angle,parent=null, whereInparent) {
        this.length=length;
        this.angle=angle;
        this.parent=parent;
        this.whereInParent=whereInparent*parent.length;
        this.calculatePointA();
        this.getPointB();
    }

    setTexture(texture) {
        this.texture = texture;
    }

    create(){
        this.line = new PIXI.Graphics()
        this.line.lineStyle(8, 0xFFFF00, 1);
        this.line.moveTo(this.ax, this.ay);
        this.getPointB();
        this.line.lineTo(this.bx, this.by);
        globalThis.app.stage.addChild(this.line);
        this.skin();
        return this.line;
    }

    skin(){
        this.setTexture(PIXI.Texture.from('../assets/textures/arm.png'));
        this.scale = new PIXI.Sprite(this.texture);
        this.scale.anchor.set(0.5,0);
        this.scale.pivot.set(0.5,0);
        this.scale.width=50;
        this.scale.height=this.length*2;
        globalThis.app.stage.addChild(this.scale);
    }

    calculatePointA(){
        this.ax=(this.parent.ax+this.whereInParent*
            ((this.parent.bx-this.parent.ax)/Math.sqrt((this.parent.bx - this.parent.ax)** 2+(this.parent.by - this.parent.ay)** 2)))
        this.ay=(this.parent.ay+this.whereInParent*
            ((this.parent.by-this.parent.ay)/Math.sqrt((this.parent.bx - this.parent.ax)** 2+(this.parent.by - this.parent.ay)** 2)))
    }

    getOffset(angle,length){
        this.offx=Math.cos(angle)*length;
        this.offy=Math.sin(angle)*length;
    }

    calculatePointB(){
        this.bx=(this.ax+this.length*((this.bx-this.ax)/Math.sqrt((this.bx - this.ax)** 2+(this.by - this.ay)** 2)))
        this.by=(this.ay+this.length*((this.by-this.ay)/Math.sqrt((this.bx - this.ax)** 2+(this.by - this.ay)** 2)))
    }

    update(){
        this.line.clear()
        // this.line.lineStyle(8, 0xFFFF00, 1, .5, false);
        this.calculatePointA()
        this.line.position.set(this.ax,this.ay)
        this.calculatePointB()
        this.line.lineTo(this.bx-this.ax,this.by-this.ay)
        this.scale.rotation = this.getAngle(this.parent.ax,this.parent.ay,this.parent.bx,this.parent.by);
        this.getOffset(this.angle+(90*(Math.PI/180)),25)
        this.scale.position.set(this.ax+this.offx,this.ay+this.offy)
    }

    getPointB(){
        this.bx=(this.ax+(this.length*Math.cos(this.angle)))
        this.by=(this.ay+(this.length*Math.sin(this.angle)))
        // this.angle=Math.asin(((this.ay-this.by)/this.length))
    }

    getAngle(ax,ay,bx,by){
        this.angle=Math.atan2(by-ay,bx-ax)
        return this.angle;
    }

}