class ExpandingArc {
    constructor(x, y, radius, startAngle, endAngle, color, velocity, growthRate) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.color = color;
        this.velocity = velocity;
        this.growthRate = growthRate;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        c.strokeStyle = this.color;
        c.lineWidth = 5;  // Adjust for thicker or thinner arcs
        c.stroke();
        c.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.radius += this.growthRate;
        this.draw();
    }
}

