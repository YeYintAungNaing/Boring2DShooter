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
        c.lineWidth = 7;  // Adjust for thicker or thinner arcs
        c.stroke();
        c.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.radius += this.growthRate;
        this.draw();
    }

    isCollidingWith(enemy) {
        // Calculate the distance from the arc's center to the enemy
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const distance = Math.hypot(dx, dy);

        // Check if the enemy is within the radius of the arc
        if (distance > this.radius) {
            return false; // No collision
        }

        // Calculate the angle between the arc's center and the enemy
        const angleToEnemy = Math.atan2(dy, dx);

        // Normalize angles to be between 0 and 2π
        const normalizedStart = this.startAngle < 0 ? this.startAngle + Math.PI * 2 : this.startAngle;
        const normalizedEnd = this.endAngle < 0 ? this.endAngle + Math.PI * 2 : this.endAngle;
        const normalizedAngle = angleToEnemy < 0 ? angleToEnemy + Math.PI * 2 : angleToEnemy;

        // Check if the angle to the enemy is within the arc's angle range
        if (normalizedAngle >= normalizedStart && normalizedAngle <= normalizedEnd) {
            return true; // Collision detected
        }

        return false; // No collision
    }
}

