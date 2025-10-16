import ConsoleHud from './ConsoleHud'


const Grid = ({ snake, food, gameHandler, gameState, score }) => {
let grid = 15
let cells = []
for(let row = 0; row< grid; row++) {
    for(let col = 0; col < grid; col++ ){
        let isSnake = false
        let isHead = false
        let isTail = false
        for(let i = 0; i < snake.length; i++){
            if (snake[i].row === row && snake[i].col === col) {
    isSnake = true
    if (i === 0) isHead = true  
    if (i === snake.length - 1) isTail = true  
    break
  }
        }
       if (isHead) {
  cells.push(
    <div key={row + '-' + col} className="cell snake head"></div>
  )
} else if (isTail) {
  const tail = snake[snake.length - 1];
  const beforeTail = snake.length > 1 ? snake[snake.length - 2] : null;
  let tailClass = "";

  if (beforeTail) {
    tailClass = tail.row !== beforeTail.row ? "tail-vertical" : "tail-horizontal";
  }

  cells.push(
    <div
      key={row + "-" + col}
      className={`cell snake ${tailClass}`}
    ></div>
  );
}

 else if (isSnake) {
  cells.push(
    <div key={row + '-' + col} className="cell snake"></div>
  )
} else if (row === food.row && col === food.col) {
  cells.push(
    <div key={row + '-' + col} className="cell food">
      <img
        height="20px"
        src="https://em-content.zobj.net/source/apple/419/red-apple_1f34e.png"
      />
    </div>
  )
} else {
  cells.push(
    
    <div key={row + '-' + col} className="cell"></div>
  )
}         
    }
}
 
   return(
    <div id="console-body">
        <div id="grid-body" >
        {cells}  
        </div>
        <ConsoleHud gameHandler={gameHandler} gameState={gameState} score={score}/>
 </div>
    
   )
    
}
export default Grid