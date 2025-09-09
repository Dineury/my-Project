

const Grid = ({ snake, food }) => {
let grid = 20
let cells = []
for(let row = 0; row< grid; row++) {
    for(let col = 0; col < grid; col++ ){
        let isSnake = false
        for(let i = 0; i < snake.length; i++){
            if(snake[i].row === row && snake[i].col === col){
                isSnake = true
                break
            }
        }
        cells.push((row === food.row && col === food.col ? <div key={row + '-' + col} className="cell food" ><img height="20px" src="https://em-content.zobj.net/source/apple/419/red-apple_1f34e.png"/></div>
            : <div key={row + '-' + col} 
            className={isSnake ? "cell snake" : row === food.row && col === food.col ? "cell food" : "cell"}></div>
        ))
           
    }
}
 
   return(
    <div id="grid-body">
        {cells}   
 </div>
    
   )
    
}
export default Grid