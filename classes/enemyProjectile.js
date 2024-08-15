class EnemyProjectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(
            this.x, this.y,                       // x,y, startAngle, endAngle, counterClock
            this.radius, 0, Math.PI * 2, false
        )
        c.fillStyle = this.color 
        c.fill()
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.draw()
    }
}