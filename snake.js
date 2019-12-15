const CANVAS_BORDER_COLOUR='black'
const CANVAS_BACKGROUND_COLOUR='white'

var canvas = document.getElementById('snakeGame')
var ctx = canvas.getContext('2d')
var dx = 10
var dy = 0
var foodX = 0
var foodY = 0
var score = 0

ctx.fillStyle = CANVAS_BACKGROUND_COLOUR
ctx.strokeStyle = CANVAS_BORDER_COLOUR

ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.strokeRect(0,0,canvas.width,canvas.height)

var snake = [{x:150,y:150},{x:140,y:150},{x:130,y:150},{x:120,y:150}]

function drawSnakePart(snakePart)
{
	ctx.fillStyle = 'lightgreen'
	ctx.strokeStyle = 'darkgreen'
	ctx.fillRect(snakePart.x,snakePart.y,10,10)
	ctx.strokeRect(snakePart.x,snakePart.y,10,10)

}

function drawSnake()
{
	advancedSnake()
	snake.forEach(drawSnakePart)
}

function advancedSnake()
{
	const head = {
		x:snake[0].x+dx,
		y:snake[0].y+dy
	}

	snake.unshift(head)
	const didEatFood = snake[0].x == foodX && snake[0].y == foodY
	if(didEatFood){
			score += 10
			document.getElementById('score').innerHTML = score
		 	createFood()
	}
		else snake.pop()
}

function clearCanvas()
{
	ctx.fillStyle = CANVAS_BACKGROUND_COLOUR
	ctx.strokeStyle = CANVAS_BORDER_COLOUR

	ctx.fillRect(0,0,canvas.width,canvas.height)	
	ctx.strokeRect(0,0,canvas.width,canvas.height)
}

function main()
{
	if(didEndGame()){
		console.log(snake,);
		document.getElementById('state').innerHTML = 'Game over'
		return false
	}
	setTimeout(()=>{
       clearCanvas()
       drawFood()
       advancedSnake()
       drawSnake()
       main()
	}, 150);
}
createFood()
main()

function changeDirection(event)
{
	const LEFT_KEY = 37
	const RIGHT_KEY = 39
	const UP_KEY = 38
	const DOWN_KEY = 40

	const keyPressed = event.keyCode
	const goingUp = dy === -10
	const goingDown = dy === 10
	const goingRight = dx === 10
	const goingLeft = dx === -10

	if (keyPressed === LEFT_KEY && !goingRight) {    dx = -10;    dy = 0;  }
	if (keyPressed === UP_KEY && !goingDown) {    dx = 0;    dy = -10;  }
	if (keyPressed === RIGHT_KEY && !goingLeft) {    dx = 10;    dy = 0;  }
	if (keyPressed === DOWN_KEY && !goingDown) {    dx = 0;    dy = 10;  }
}

document.addEventListener("keydown", changeDirection)

function randomTen(min,max)
{
	return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

function createFood(){
	foodX = randomTen(0,canvas.width-10)
	foodY = randomTen(0,canvas.height-10)
	snake.forEach(function isFood(part) {
		const foodIsOnSnake = part.x == foodX && part.y == foodY
		if(foodIsOnSnake) createFood()
	})
}

function drawFood(){
	ctx.fillStyle = 'red'
	ctx.strokeStyle = 'darkred'

	ctx.fillRect(foodX,foodY,10,10)
	ctx.strokeRect(foodX,foodY,10,10)
}

function didEndGame(){
	for(let i = 4; i < snake.length;i++){
		const didCollide = snake[i].x == snake[0].x && snake[i].y == snake[0].y
		if(didCollide) return true
	}
	const hitLeftWall = snake[0].x < 0
	const hitRigthWall = snake[0].x > canvas.width -10
	const hitTopWall = snake[0].y < 0
	const hitBottomWall = snake[0].y > canvas.height-10

	return hitLeftWall || hitRigthWall || hitTopWall || hitBottomWall
	
}