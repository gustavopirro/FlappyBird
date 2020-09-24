class Entity {
    constructor(x, y, width, height) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    get top() {
        return this.y
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }

    set bottom(y){
        this.y = y - this.height;
    }

    set top(y){
        this.y = y
    }

}