class Flappy extends Entity {
    constructor(x, y, width, height, img) {
        super(x, y, width, height)
        this.img = img;
    }

    jump() {
        this.velocityY = -7;
    }
}