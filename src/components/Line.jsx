import React from 'react'

const Line = ({input}) => {


 
 
  return (
    <div className='Line'>
        {input[0] === undefined ?  <h3 className='letter'></h3> : <h3 className='letter active' >{input[0]}</h3>}
        {input[1] === undefined ?  <h3 className='letter'></h3> : <h3 className='letter active' >{input[1]}</h3>}
        {input[2] === undefined ?  <h3 className='letter'></h3> : <h3 className='letter active' >{input[2]}</h3>}
        {input[3] === undefined ?  <h3 className='letter'></h3> : <h3 className='letter active' >{input[3]}</h3>}
        {input[4] === undefined ?  <h3 className='letter'></h3> : <h3 className='letter active' >{input[4]}</h3>}
       
     
    </div>
  )
}

export default Line