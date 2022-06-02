export default class {
    constructor(length,ax,ay,angle,parent) {
        this.length = length;
        this.ax = ax||window.innerWidth/2;
        this.ay = ay||window.innerHeight/2;
        this.angle = angle;
        this.parent = parent;
    }

    setTexture(texture) {
        this.texture = texture;
    }

    getRandomColor() {
        this.color= Math.floor(Math.random()*16777215);
    }

    create(){
        this.getRandomColor();
        this.line = new PIXI.Graphics();
        this.line.lineStyle(2, this.color, 1);
        this.line.moveTo(this.ax, this.ay);
        this.setBByAngle(this.angle||90);
        this.line.lineTo(this.bx, this.by);
        globalThis.app.stage.addChild(this.line);
        this.skin();
        return this.line;
    }

    skin(){
        this.setTexture(PIXI.Texture.from('../assets/textures/scales.jpg'));
        // this.texture.trim=new PIXI.Rectangle(0,0,50,this.length);
        this.scale = new PIXI.Sprite(this.texture);
        this.scale.anchor.set(0.5,0);
        this.scale.pivot.set(0.5,0);
        this.scale.width=50;
        this.scale.height=this.length;
        // this.scale.frame=new PIXI.Rectangle(0,0,50,this.length);
        globalThis.app.stage.addChild(this.scale);
    }

    update(){
        this.line.clear();
        // this.line.lineStyle(2, this.color, 1);
        this.setPointA();
        this.line.moveTo(this.ax,this.ay);
        this.calculatePointB()
        this.line.lineTo(this.bx,this.by);
        this.scale.rotation = this.getAngle(this.ax,this.ay,this.bx,this.by)-(90 * (Math.PI/180));
        this.scale.position.set(this.ax,this.ay);
    }

    setPointA(){
        if (this.parent){
            this.ax = this.parent.bx;
            this.ay = this.parent.by;
        }else {
            this.ax = window.app.renderer.plugins.interaction.mouse.global.x;
            this.ay = window.app.renderer.plugins.interaction.mouse.global.y;
        }
    }

    setBByAngle(angle){
        this.bx = this.ax + this.length * Math.cos(angle);
        this.by = this.ay + this.length * Math.sin(angle);
    }

    getAngle(ax,ay,bx,by){
        return Math.atan2(by-ay,bx-ax);
    }

    calculatePointB(){
        this.bx = this.ax+this.length*((this.bx-this.ax)/
            Math.sqrt((this.bx-this.ax)**2+(this.by-this.ay)**2));
        this.by = this.ay+this.length*((this.by-this.ay)/
            Math.sqrt((this.bx-this.ax)**2+(this.by-this.ay)**2));
    }
}