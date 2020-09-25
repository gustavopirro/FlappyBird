class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.entities = [];
        this.pipes = [];
        this.continueGame = true;
        this.gameScore = 0;
        this.numberOfFrames = 0;
        this.passedPipes = 0;
        this.initialValues = [];
        this.delta = 0;
        this._lastFrameStart = 0;
        this.gameSpeedMultiplier = 0.075
    }

    run() {
        this.flappy = new Flappy(50, 50, 35, 25, 'img/flappy.png');
        this.canvas.width = 1024;
        this.canvas.height = 600;
        this.input();
        this.update();
        this.entities.push(this.flappy);
    }


    reset() {
        this.entities = [];
        this.pipes = [];
        this.flappy = new Flappy(50, 50, 35, 25, 'img/flappy.png');
        this.entities.push(this.flappy);
        this.gameScore = 0;
        this.passedPipes = 0;
        if(!this.continueGame){
            this.continueGame = true;
            this.update();
        }
        this.continueGame = true;
    }

    update() {
        if (this.continueGame) {
            const now = performance.now()
            this.delta = now - this._lastFrameStart
            this._lastFrameStart = now
            this.render();
            this.checkFlappyCollision();
            this.applyVelocityToPosition();
    
            this.checkCanvasCollision();
            this.scoreCount();
            this.deletePassedPipes();
            this.flappy.velocityY += 0.3;

            if (this.numberOfFrames % 90 === 0) {
                this.pipeGenerator();
            }

            requestAnimationFrame(() => {
                this.update()
            })
            
            this.numberOfFrames++;
        }
    }

    input() {
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                this.flappy.jump();
            } else if (e.key === "r") {
                this.reset();
            }
        })
    }

    render() {
        this.ctx.clearRect(0, 0, 1024, 600)
        for (let entity of this.entities) {
            let img = new Image();
            img.src = entity.img;
            this.ctx.drawImage(img, entity.x, entity.y, entity.width, entity.height);
        }
    }


    pipeGenerator() {
        let gap = 175,
            margin = 50,
            gapCenter = Utils.getRandomInt(gap / 2 + margin, this.canvas.height - gap / 2 - margin),
            pipeWidth = 130;

        let pipeUp = new Pipe(this.canvas.width + pipeWidth, 0, pipeWidth, 500, 'img/pipe2.png'),
            pipeDown = new Pipe(this.canvas.width + pipeWidth, 0, pipeWidth, 500, 'img/pipe.png')

        pipeUp.bottom = gapCenter - gap / 2;
        pipeDown.top = gapCenter + gap / 2;

        pipeUp.velocityX = -4;
        pipeDown.velocityX = -4;

        this.entities.push(pipeUp)
        this.pipes.push(pipeUp)

        this.entities.push(pipeDown)
        this.pipes.push(pipeDown)
    }

    applyVelocityToPosition() {
        for (const entity of this.entities) {
            entity.x += this.delta * this.gameSpeedMultiplier * entity.velocityX;
            entity.y += this.delta * this.gameSpeedMultiplier * entity.velocityY;
        }
    }

    checkFlappyCollision() {
        for (let pipe of this.pipes) {
            if (this.flappy.x < pipe.x + pipe.width &&
                this.flappy.x + this.flappy.width > pipe.x &&
                this.flappy.y < pipe.y + pipe.height &&
                this.flappy.y + this.flappy.height > pipe.y) {
                this.gameOver();
            }
        }
    }

    scoreCount() {
        this.gameScore = this.passedPipes / 2;
        for (let pipe of this.pipes) {
            if (this.flappy.x > pipe.x + pipe.width) {
                this.gameScore += 0.5;
            }
        }
    }

    deletePassedPipes() {
        let index = 0;
        for (let pipe of this.pipes) {
            if (pipe.right < 0) {
                this.pipes.splice(index, 1);
                let indexEntities = this.entities.indexOf(pipe);
                this.entities.splice(indexEntities, 1);
                this.passedPipes++;
            }
            index++;
        }
    }

    checkCanvasCollision() {
        if (this.flappy.bottom >= this.canvas.height) {
            this.flappy.bottom = this.canvas.height;
            this.flappy.velocityY = 0;
        } else if (this.flappy.top <= 0) {
            this.flappy.bottom = 0 + this.flappy.height;
            this.flappy.velocityY = 0;
        }
    }

    gameOver() {
        this.continueGame = false;
    }
}


