class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.health = 100;
        this.energy = 100;
        this.color = color;
        this.speed = 2;
        this.velocity = { x : 0, y : 0}
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
        this.x += this.velocity.x
        this.y += this.velocity.y

        if (this.x - this.radius < 0) this.x = this.radius
        if (this.x + this.radius > canvas.width) this.x = canvas.width - this.radius
        if (this.y - this.radius < 0) this.y = this.radius
        if (this.y + this.radius > canvas.height) this.y = canvas.height - this.radius
        this.draw()
    }
}