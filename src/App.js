import { useEffect, useState } from 'react';
import './App.css';
import Line from './components/Line';
import GameOver from './components/GameOver';
import Words from './words.json'
import ErrorMsg from './components/ErrorMsg';
import Button from './components/Button'
import { Switch } from 'react-switch-input';
import Theme from './components/images/day-and-night.png'

function App() {
  const [text, setText] = useState('');
  const [input, setInput] = useState([]);
  const [win, setWin] = useState('');
  const [active, setActive] = useState(0);
  const [inputs, setInputs] = useState([[],[],[],[],[],[]])
  const [gameOver, setGameOver] = useState(false);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    getWord();
  }, [])


  useEffect(() => {
   
   
     if (document.querySelector(".App").style.backgroundColor === 'rgb(40, 44, 52)'){
      document.querySelector(".App").style.backgroundColor = 'white'
      document.querySelector(".header").style.color = 'black'
      document.querySelectorAll(".letter").forEach((lets) => {
        if (lets.style.color != 'green' && lets.style.color != 'red' && lets.style.color != "orange"){
          lets.style.color = 'rgb(40, 44, 52)';
        }
        
        lets.style.border = '1px solid black'
      })
     }else{
      document.querySelector(".App").style.backgroundColor = 'rgb(40, 44, 52)'
      document.querySelector(".header").style.color = 'white'
      document.querySelectorAll(".letter").forEach((lets) => {
        lets.style.border = '1px solid grey'
        if (lets.style.color != 'green' && lets.style.color != 'red' && lets.style.color != "orange"){
          lets.style.color = 'white';
        }
       
      })
     }

     //document.querySelector(".App").style.backgroundColor ='rgb(40, 44, 52)' ? 'white' : 'rgb(40, 44, 52)'
 
  }, [theme])
 

  useEffect(() => {
    
    const catchKey = (event) => {
      if (input.length < 5 && event.key !== "Alt" && event.key !== "Enter" && event.key !== "Control"){
        setInput([...input, event.key])
     
      }
      
      
      if (event.key === "Backspace"){
        setInput(input.slice(0, -1))
      }
      
      if (event.key === "Enter"){
       
        if (input.length === 5){
          let newArr = [...inputs]; 
          newArr[active] = input; 
          
  
    
          if (exist(newArr[active])){
            setActive(active + 1);
  
            
            setInputs(newArr);           // update array of inputs by index
            
  
  
            checkLine();
            setInput([]);
            
          }else{
            const lines = document.querySelectorAll(".Line")
            lines[active].classList.toggle("move");
            lines[active].addEventListener('animationend', function(){
              lines[active].classList.remove("move");
              
             
            });
            const Error = document.querySelector(".errorMsg")
            Error.innerHTML = "the word <br/> doesn´t exist´s";
            Error.classList.add("hide");
            Error.addEventListener('animationend', function(){
                Error.classList.remove("hide");
        
                
            });
          }
        }else{
          const lines = document.querySelectorAll(".Line")
          lines[active].classList.toggle("move");
          lines[active].addEventListener('animationend', function(){
            lines[active].classList.remove("move");

           
            
          });
          
          
          const Error = document.querySelector(".errorMsg")
          Error.innerHTML = "that´s not enough";
          Error.classList.add("hide");
          Error.addEventListener('animationend', function(){
              Error.classList.remove("hide");
      
              
          });

        
        }
        
      }
     
      
    }
    document.addEventListener("keydown", catchKey);
    return () => document.removeEventListener("keydown", catchKey);
  }, [input])


  const containGreen = (character, letters) => {
    
    for (let x = 0; x < 5; x++){
      if (letters[x + active * 5].innerHTML === character && letters[x + active * 5].style.color === "green"){
       
        return true;
      }
    }
    
  }


  function isIsogram (str) {          // checks if input have 1+ same characters
    return !/(.).*\1/.test(str);
  }

  const removeSame = (character, letters) => {
      
    for (let x = 0; x < 5; x++){
      if (letters[x + active * 5].innerHTML === character.innerHTML && letters[x + active * 5].style.color === "green"){
        character.style.color = "red";
      }else{
        letters[x + active * 5].style.color = "red";
      }
    }
     
  }

 
  const checkLine = () => { 
    var letters = document.querySelectorAll(".letter");
   

    var count = {};
    var chars = [];
    for (let i = active * 5; i < active * 5 + 5; i++){
     
      
      if (i === active * 5){
        text.split("").forEach((char) => {
        count[char] = (count[char] || 0) + 1;
        })
      }
     
      
      if (text[i - active * 5] !== letters[i].innerHTML){                // text[i] = i => 0 - 5   ||    active * 5 => 0 - 25
    
       
        if (text.includes(letters[i].innerHTML)){
        
            

          
          if (isIsogram(input.join("")) === false && isIsogram(text)){
           
             for (let x = 0; x < 5; x++){
            
              
            
              if (letters[x + active * 5].innerHTML === letters[i].innerHTML && letters[x + active * 5].style.color !== "rgb(40, 44, 52)"){
                letters[i].style.color = "red";
              }

              if (letters[x + active * 5].innerHTML === letters[i].innerHTML && letters[x + active * 5].style.color === "rgb(40, 44, 52)"){
                letters[i].style.color = "orange";
                
             


                if (input.filter(function (e) {
                  return e === letters[i].innerHTML;
                }).length > 1){
                 
                 
                  if (containGreen(letters[i].innerHTML, letters) === true){
                    removeSame(letters[i], letters)   // removing surplus characters if text is Isogram
                  }
                
             
                           

                 
                }

              }
             
             }


          }else{

            if (isIsogram(text) === false){ 
                
             
              

                for (let x = 0; x < 5; x++){
                  for (const property in count) {
                   
                  
                    if (Number(count[property]) === 0 && property === letters[x + active * 5].innerHTML && x === i){
                      letters[x + active * 5].style.color = "red"
                      
                    }else{
                     
                      if (property === letters[x + active * 5].innerHTML && x === i - active * 5){
                       
                        letters[x + active * 5].style.color = "orange"

                        count[property] = Number(count[property] - 1);
                        
                       
                        if (count[property] < 0){
                          letters[x + active * 5].style.color = "red"
                        }
                       
                      
                    
                      }
                    }

                    

                  }
            
                }
                
            }else{
              letters[i].style.color = "orange";
            }
            
            
          }

        }else{
          letters[i].style.color = "red"; 
          
        }
        
                             
      }else{
         
        if (text[i - active * 5] === letters[i].innerHTML){
          letters[i].style.color = "green"; 
         
          count[letters[i].innerHTML] = Number(count[letters[i].innerHTML] - 1);

          if (count[letters[i].innerHTML] < 0){                            // clearing surplus characters in input
           for (let f = 0; f < 5; ++f){                   
             if (letters[f + active * 5].innerHTML === letters[i].innerHTML){
              letters[f + active * 5].style.color = "red";
              break;
             }
           }
          }
          
          
        }
      }
     

    }
    
   checkWin();
  } 
  
   
  const getWord = () => {                          // getting random word from JSON;
    const num = Math.floor(Math.random() * 12972);
    setText(Words[num]);
    
    //setText('frays');
  }         

  const exist = (input) => {
    var canGo = false;
    Words.map((word) => {
     
      if (word === input.join("")){
        canGo = true;
      }                               
    })
    return canGo;
    
  }
  

  const checkWin = () => {
    
    if (input.join("") === text){
      setGameOver(true);
      setWin('win');
      return;
    }

     
    if (inputs[4].length >= 5){
      setGameOver(true);
      setWin('lost');
      return;
    }


  }
   

  return ( 
    <div className="App">
   
    {gameOver && <GameOver win={win} word={text}/>}
    <ErrorMsg/>
    <Button />
    <div className='switch'>
      <img src={Theme} alt="" className='themeImg' />
      <Switch onChange={() => setTheme(!theme)} />
    </div>
  
     
    <div className='grid'>
     <h1 className='header'>Wordle</h1>
     {active === 0 ? <Line input={input}/> : <Line input={inputs[0]} />}
     {active === 1 ? <Line input={input}/> : <Line input={inputs[1]} />}
     {active === 2 ? <Line input={input}/> : <Line input={inputs[2]} />}
     {active === 3 ? <Line input={input}/> : <Line input={inputs[3]} />}
     {active === 4 ? <Line input={input}/> : <Line input={inputs[4]} />}
     {active === 5 ? <Line input={input}/> : <Line input={inputs[5]} />}
    
    </div>
  

     
    </div>
  
  );
}

export default App;
