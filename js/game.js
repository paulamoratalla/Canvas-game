const strangerStringsGame = {
    name: 'Stranger Strings Game',
    description: 'Stranger Strings Canvas game',
    version: '1.0.0',
    author: 'Paula y Carmen',
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },

    player: undefined,
    demogorgons: [],
    pancakes: [],
    framesIndex: 0,

    init(myCanvasID) {
        this.canvasNode = document.querySelector(`#${myCanvasID}`)
        this.ctx = this.canvasNode.getContext('2d')
        console.log('EL CONTEXTO:', this.ctx)

        this.setDimensions()
        this.setEventListeners()
        this.createPlayer()
        this.start()
        console.log(this.gameSize.h)
    },

    setDimensions() {
        this.gameSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasNode.setAttribute('width', this.gameSize.w)
        this.canvasNode.setAttribute('height', this.gameSize.h)
    },

    setEventListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key === 'ArrowLeft') {
                this.player.moveLeft()
            }
            if (key === 'ArrowRight') {
                this.player.moveRight()
            }
            if (key === ' ') {
                this.player.shoot()
            }
        }
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.gameSize)
    },

    createDemogorgons() {
        this.demogorgons.push(new Demogorgons(this.ctx, this.gameSize))
    },

    createPancakes() {
        this.pancakes.push(new Pancakes(this.ctx, this.gameSize))
    },

    start() {
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.framesIndex++
            if (this.framesIndex % 30 === 0) {
                this.createDemogorgons()
            }
            if (this.framesIndex % 100 === 0) {
                this.createPancakes()
            }
            this.demogorgonCollision()
            this.pancakeCollision()
            this.healthCounter()
            this.exitDemogorgon()
            this.gameOver()
            console.log(this.player.health)




        }, 150)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    drawAll() {
        this.player.draw()
        this.demogorgons.forEach(eachDemogorgon => eachDemogorgon.draw())
        this.pancakes.forEach(eachPancake => eachPancake.draw())
    },

    demogorgonCollision() {
        this.demogorgons.forEach((eachDemogorgon) => {
            this.player.bullets.forEach((eachBullet) => {

                if (eachBullet.bulletsPos.x < eachDemogorgon.demogorgonsPos.x + eachDemogorgon.demogorgonsSize.w &&

                    eachBullet.bulletsPos.x + eachBullet.radius > eachDemogorgon.demogorgonsPos.x &&

                    eachBullet.bulletsPos.y < eachDemogorgon.demogorgonsPos.y + eachDemogorgon.demogorgonsSize.h &&

                    eachBullet.radius + eachBullet.bulletsPos.y > eachDemogorgon.demogorgonsPos.y) {
                    // demogorgon desaparece 
                    const index = this.demogorgons.indexOf(eachDemogorgon)
                    this.demogorgons.splice(index, 1)
                    // bullet desaparece
                    const bulletIndex = this.player.bullets.indexOf(eachBullet)
                    this.player.bullets.splice(bulletIndex, 1)
                } else {
                }
            })
        })
    },

    pancakeCollision() {
        this.pancakes.forEach((eachPancake) => {

            if (this.player.playerPos.x < eachPancake.pancakesPos.x + eachPancake.pancakesSize.w &&

                this.player.playerPos.x + this.player.playerSize.w > eachPancake.pancakesPos.x &&

                this.player.playerPos.y < eachPancake.pancakesPos.y + eachPancake.pancakesSize.h &&

                this.player.playerSize.h + this.player.playerPos.y > eachPancake.pancakesPos.y) {
                // pancake desaparece 
                const index = this.pancakes.indexOf(eachPancake)
                this.pancakes.splice(index, 1)
                if (this.player.health < 5) {
                    this.player.health++
                }
            } else {
            }
        })
    },

    healthCounter() {
        this.demogorgons.forEach((eachDemogorgon) => {
            if (eachDemogorgon.demogorgonsPos.y >= this.gameSize.h) {
                this.player.health -= 1
            }
        })
    },

    exitDemogorgon() {

        this.demogorgons.forEach((eachDemogorgon) => {
            if (eachDemogorgon.demogorgonsPos.y >= this.gameSize.h) {
                const index = this.demogorgons.indexOf(eachDemogorgon)
                this.demogorgons.splice(index, 1)
            }
        })
    },

    gameOver() {
        if (this.player.health === 0) {
            clearInterval(this.interval)
        }
    }
}