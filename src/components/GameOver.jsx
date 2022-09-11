import React from 'react'
import Winner from './images/winner.png'
import Lost from './images/game-over.png'

const gameOver = ({win, word}) => {
  
  return (
    <div className='gameOver'>
        
        {win === 'win' && <img className='winner_img' src={Winner} alt="" />}
        {win === 'win' && <h1 className='gameOverText'>You Won !</h1>}


        {win === 'lost' && <h1 className='gameOverText'>The Word: <br/> <div style={{color: 'red'}}>{word}</div></h1>}
        {win === 'lost' && <img className='winner_img' src={Lost} alt="" />}
        {win === 'lost' && <h1 className='gameOverText'>You Lost !</h1>}
        
    </div>
  )
}

export default gameOver