class Demogorgons {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.demogorgonsPos = { x: Math.random() * ((this.gameSize.w - 150) - 100) + 100, y: 0 }
        this.demogorgonsSize = { w: 150, h: 150 }
        this.speed = Math.random() * (20 - 10) + 10

        this.imageDemogorgon = undefined

        this.init()
    }

    init() {
        this.imageDemogorgon = new Image()
        this.imageDemogorgon.src = 'img/demogorgon.png'
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageDemogorgon, this.demogorgonsPos.x, this.demogorgonsPos.y, this.demogorgonsSize.w, this.demogorgonsSize.h)
    }

    move() {
        this.demogorgonsPos.y += this.speed
    }
}