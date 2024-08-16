// TO DO
// giving each enemy proper hp that scales with level
// increase hp whenever the score reaches a certan threshold
// collision detection for arc
// shield ablility ??
// game over screen

// more abilities
// abilites info
// improve start screen 


const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const c = canvas.getContext('2d')


const button = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 + 20,
    width: 100,
    height: 50,
    text: 'Start'
};

// Draw the pop-up and button
function drawPopup() {
    c.fillStyle = 'rgba(0, 0, 0, 0.8)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.fillText('Welcome to the Game!', canvas.width / 2, canvas.height / 2 - 30);

    // Draw the start button
    c.fillStyle = '#4CAF50';
    c.fillRect(button.x, button.y, button.width, button.height);

    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.fillText(button.text, canvas.width / 2, button.y + 32);
}


addEventListener('click', (e) => {        // for clicking start button
    if (!gameStarted) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (
            mouseX > button.x &&
            mouseX < button.x + button.width &&
            mouseY > button.y &&
            mouseY < button.y + button.height
        ) {
            startGame();
        }
    }
});

function drawHUD() {
    const boxWidth = 200;
    const boxHeight = 120;

    // Draw the box
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, boxWidth, boxHeight);

    // Draw text
    c.fillStyle = 'white';
    c.font = '16px Arial';
    c.textAlign = 'left';
    c.fillText(`Health: ${player.health}`,   10,  20);
    c.fillText(`Score: ${playerScore}`,  10,  40);
    c.fillText(`Level: ${stageLevel}`,  10,  60);
    c.fillText(`Energy: ${player.energy}`,  10,  80);
}


function startTimer() {
    startTime = Date.now();  // Get the current time
    timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        //console.log(elapsedTime)
        if (elapsedTime % 10 === 0) {
            stageLevel += 1

        }
    }, 1000);  
}


function generateEnemies() {
    setInterval(() => {
        let x;
        let y;
        if (enemies.length < 30) {
            let side = spawnSides[Math.floor(Math.random() * spawnSides.length)]
            //console.log(side)
            if (side === 'left') {
                x = 0;
                y = Math.floor(Math.random() * canvas.height)
            }

            else if (side === 'top') {
                x = Math.floor(Math.random() * canvas.width)
                y = 0
            }

            else if (side === 'right') {
                x = canvas.width
                y = Math.floor(Math.random() * canvas.height)
            }

            else if (side === 'below') {
                x = Math.floor(Math.random() * canvas.width)
                y = canvas.height
            }
            //console.log(x, y)
            const angle = Math.atan2(
                player.y - 0,
                player.x - 0
            )
        
            const velocity = {
                x : Math.cos(angle),
                y : Math.sin(angle)  
            }
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`
            enemies.push(new Enemy(x, y, 40, color, velocity))
        }
        //console.log(enemyProjectiles)
        //console.log(projectiles)
    }, 2000);
    controlEnemy()
}


function controlEnemy() {
    setInterval(() => {
        enemies.forEach((enemy) => {
            const angle = Math.atan2(
                player.y - enemy.y,
                player.x - enemy.x
            )

            const velocity = {
                x : Math.cos(angle) * 4,
                y : Math.sin(angle) * 4
            }
            //console.log(velocity)

            enemyProjectiles.push(new EnemyProjectile(
                enemy.x, 
                enemy.y, 
                7, 
                'yellow', 
                velocity 
            ))
        })
    }, 2000);
}


addEventListener('keydown', (e) => {          // controlling player
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            player.velocity.y = -player.speed
            break
        case 'ArrowDown':
        case 's':
            player.velocity.y = player.speed
            break
        case 'ArrowLeft':
        case 'a':
            player.velocity.x = -player.speed
            break
        case 'ArrowRight':
        case 'd':
            player.velocity.x = player.speed
            break
    }
})


addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'ArrowDown':
        case 's':
            player.velocity.y = 0
            break
        case 'ArrowRight':
        case 'd':
        case 'ArrowLeft':
        case 'a':
            player.velocity.x = 0
            break
    }
})


addEventListener('click', (e) => {    // player shooting
   
    const angle = Math.atan2(
        e.clientY - player.y,
        e.clientX - player.x
    )
    //console.log(e.clientX, e.clientY)
    const velocity = {
        x : Math.cos(angle) * 7,
        y : Math.sin(angle) * 7
    }
    //console.log(velocity)

    projectiles.push(new Projectile(
        player.x, 
        player.y, 
        7,
        'white', 
        velocity 
    ))  
})

addEventListener('keydown', (e) => {    // "E" ability
    if (e.key === 'e' || e.key === 'E') {

        if (player.energy < 20) {
            return
        }
        player.energy -= 20
        const numProjectiles = 16; // Number of projectiles to create
        const angleIncrement = (Math.PI * 2) / numProjectiles;

        for (let i = 0; i < numProjectiles; i++) {
            const angle = i * angleIncrement;

            const velocity = {
                x: Math.cos(angle) * 5, // Adjust the multiplier for speed
                y: Math.sin(angle) * 5
            };

            projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity));
        }
        //console.log(projectiles)
    }
});


function generateSpreadingProjectiles(mouseX, mouseY) {          // 'F' ability
    const angleToCursor = Math.atan2(mouseY - player.y, mouseX - player.x);
    const spreadAngle = Math.PI / 6;  // Adjust to change the width of the cone
    const numProjectiles = 10;  // Number of projectiles in the wave

    for (let i = 0; i < numProjectiles; i++) {
        const angle = angleToCursor - spreadAngle / 2 + (spreadAngle / numProjectiles) * i; // Calculating the angle for each projectile

        const velocity = {
            x: Math.cos(angle) * 3,  
            y: Math.sin(angle) * 3
        };

        projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity));
    }
    //console.log(projectiles)
}


document.addEventListener('keydown', (e) => {             // 'F' ability
    if (e.key === 'f' || e.key === 'F') {
        if (player.energy < 20) {
            return
        }
        player.energy -= 20
        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            generateSpreadingProjectiles(mouseX, mouseY);
        }, { once: true });
    }
});


function generateExpandingArc(mouseX, mouseY) {           // "q" ability
    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    const velocity = {
        x: Math.cos(angle) * 2,  
        y: Math.sin(angle) * 2
    };

    const arc = new ExpandingArc(
        player.x,             
        player.y,
        18,                   // Initial radius
        angle - Math.PI / 8,  // Start angle (for arc segment)
        angle + Math.PI / 8,  // End angle (for arc segment)
        'white',             // Color of the arc
        velocity,
        1.5                  // Growth rate of the arc's radius
    );
    arcs.push(arc);
}



document.addEventListener('keydown', (e) => {              // "q" ability
    if (e.key === 'q' || e.key === 'Q') {
        if (player.energy < 20) {
            return
        }
        player.energy -= 20
        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            generateExpandingArc(mouseX, mouseY);
        }, { once: true });
    }
});


function animate() {
    animationState = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    drawHUD()
    player.update()
    projectiles.forEach((projectile, index)=> {
        projectile.update()
        if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
            projectiles.splice(index, 1)    // remove offscreen proj
        }
    })

    enemies.forEach((enemy, index) => {     // updating each enemy project pos 
        enemy.update()

        projectiles.forEach((projectile, index2) => {           // collision detection between player proj and enemies
            const dist = Math.hypot(     //  distance between two points (x1,y1) and (x2,y2)
                projectile.x - enemy.x, projectile.y - enemy.y    
            )
            if (dist < projectile.radius + enemy.radius) {
                enemies.splice(index, 1)
                projectiles.splice(index2, 1)
                playerScore += 10
                player.energy += 5

                if (playerScore % 100 === 0) {
                    player.health += 20
                }
            }
        })
    })

    enemyProjectiles.forEach((projectile_, index) => {    // updating each enemy project pos  
        projectile_.update()
        
        const dist = Math.hypot(
            projectile_.x - player.x, projectile_.y - player.y
        )
        if (dist < projectile_.radius + player.radius) {    //collision detection between enemy proj and player
            enemyProjectiles.splice(index, 1)
            player.health -= 5 * stageLevel
            if (player.health < 0) {
                cancelAnimationFrame(animationState)
                //console.log('lost')
            }
        }
        if (projectile_.x < 0 || projectile_.x > canvas.width || projectile_.y < 0 || projectile_.y > canvas.height) {
            enemyProjectiles.splice(index, 1)         // remove offscreen proj
        }
    })

    if (arcs.length > 0) {
        arcs.forEach((arc, index) => {
            arc.update();
            if (
                arc.x < 0 ||
                arc.x > canvas.width ||
                arc.y < 0 ||
                arc.y > canvas.height
            ) {
                arcs.splice(index, 1);
            }

            enemies.forEach((enemy, enemyIndex) => {
                if (arc.isCollidingWith(enemy)) {
                    enemies.splice(enemyIndex, 1);
                    playerScore += 10
                    player.energy += 5    
                }
            });


        })
    }
}

function drawGameOver() {
    pass
}


function startGame() {
    gameStarted = true
    animate()
    generateEnemies()
    startTimer()
}

function restartGame() {
    elapsedTime = 0

}


let gameStarted = false
let startTime;
let animationState;
let elapsedTime = 0;
const x = canvas.width / 2
const y = canvas.height/ 2
const player = new Player(x, y, 20, 'white')
let playerScore = 0;
let stageLevel = 1;
let projectiles = [];
let arcs = [] 
let enemyProjectiles = [];   
let enemies = [];
const spawnSides = ['left', 'top', 'right', 'below']
drawPopup()

