const ConsoleHud = ({ gameState, gameHandler, score }) => {
    let text = ""
    if(gameState === 'start') {
        text = "Start game!"
    } else if(gameState === 'gameover') {
        text = "play again!"
    }

  return (
    
    <div className="consoleHud">
        {gameState === "gameover" && (
            <div> 
                <h2 id="gameOver">Game Over</h2> 
               <h4 className="score">Last Score: {score}</h4>
            </div>
        )}
      {gameState !== "playing" && (
          <button id="start-button" onClick={gameHandler}>
          {text}
        </button>
        )}

        {gameState === "playing" && (
            <h4 className="score">score: {score}</h4>
        )}
      
    </div>
  )
}

export default ConsoleHud