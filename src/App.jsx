import { useState, useEffect } from 'react'
import './Styles/App.css'
import './Styles/Console.css'
import Grid from  './components/Grid'
import Instructions from './components/instructions'

function App() {
  const [snakeMoving, setSnakeMoving] = useState("")
  const [canChangeDirection, setCanChangeDirection] = useState(true);
  const [snake, setSnake] =  useState([
    { row: 10, col: 10 },
    { row: 10, col: 9 },
    { row: 10, col: 8 }
  ])
  const [food, setFood] = useState({row: -1 , col: -1})
 const [gameState, setGameState] = useState("start"); 
  const [score, setScore] = useState(0)
  const GRID_SIZE = 15; 
  
  const opposites = {
    "LEFT": "RIGHT",
    "RIGHT": "LEFT",
    "UP": "DOWN",
  "DOWN": "UP"
}

const handleGameButton = () => {
  setSnake([
    { row: 10, col: 10 },
    { row: 10, col: 9 },
    { row: 10, col: 8 }
  ]);
  setSnakeMoving("RIGHT"); 
  setCanChangeDirection(true);
  setScore(0)
  const row = Math.floor(Math.random() * GRID_SIZE);
  const col = Math.floor(Math.random() * GRID_SIZE);
  setFood({ row, col });

  setGameState("playing");
};

  const getNewHead = (head, direction) => {
    let newHead = {row: head.row, col: head.col}
    if(direction == "LEFT") {
      newHead.col = head.col - 1
    }
    if(direction == "RIGHT") {
      newHead.col = head.col + 1
    }
    if(direction == "UP") {
      newHead.row = head.row - 1
    }
    if(direction == "DOWN") {
      newHead.row = head.row + 1
    }
    return newHead
  }
  const controlDirection = (e) => {
  if (!canChangeDirection) return;

  setSnakeMoving(prevDirection => {
    let desiredDirection;
    if (e.key === "ArrowLeft") desiredDirection = "LEFT";
    if (e.key === "ArrowRight") desiredDirection = "RIGHT";
    if (e.key === "ArrowUp") desiredDirection = "UP";
    if (e.key === "ArrowDown") desiredDirection = "DOWN";

    if (!desiredDirection) return prevDirection;

    if (opposites[desiredDirection] === prevDirection) {
      return prevDirection;
    } else {
      setCanChangeDirection(false); 
      return desiredDirection;
    }
  });
};


useEffect(() => {
  const handleKey = (e) => controlDirection(e)
  window.addEventListener("keydown", handleKey)

  return () => window.removeEventListener("keydown", handleKey)
},)



useEffect(() => {
  if(gameState !== 'playing') return;
const interval = setInterval(() => {
  setSnake(prevSnake => {
    const newHead = getNewHead(prevSnake[0], snakeMoving)
    if(newHead.row < 0 || newHead.row >= GRID_SIZE ||
        newHead.col < 0 || newHead.col >= GRID_SIZE) {
          setGameState("gameover")
          return prevSnake
        }
        setCanChangeDirection(true);
        if(newHead.row === food.row && newHead.col === food.col) {
      
         if(snake.row !== food.row && snake.col !== food.col) {
           const row = Math.floor(Math.random() * GRID_SIZE)
          const col = Math.floor(Math.random() * GRID_SIZE)
          setFood({row,col})
         }

           setScore(prev =>  prev + 1)
      return [newHead, ...prevSnake]
    } 
    let collided = false
    for(let i = 0; i< prevSnake.length; i++) {
      if(prevSnake[i].row === newHead.row && prevSnake[i].col === newHead.col) {
       collided = true
        break;
      }
    }
       if (collided) {
    setGameState('gameover')
    return prevSnake
  }
      return [ newHead, ...prevSnake.slice(0, -1)]
  })
}, 500);
return () => clearInterval(interval)
},[snakeMoving, gameState, food, snake])


return (
    <>
      <div id='main-div'>
       <div id="header">
  <h1>
    <span id='title-text'>Snake Game</span></h1>
</div>
         
         <div id="grid-wrapper" >
        <Grid snake={snake} food={food} gameState={gameState} gameHandler={handleGameButton} score={score}/>
        
        <Instructions />
         </div>
      </div>

    </>
  )
}

export default App
