class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color,
        this.velocity = velocity
        this.changeDirectionInterval = setInterval(() => {
            this.changeDirection();
        }, 500);
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

    changeDirection() {
        const angle = Math.random() * Math.PI * 2;
        this.velocity = {
            x: Math.cos(angle), 
            y: Math.sin(angle)  
        };
    }
}