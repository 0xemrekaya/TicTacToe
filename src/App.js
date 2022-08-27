import React, {useState} from 'react';
import './App.css';

import {Board} from "./components/Board"
import { Status } from './components/Status';
import {ResetButton} from "./components/ResetButton.js"


function App() {

  const winnigConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [board,setBoard]= useState(Array(9).fill(null));
  const [xPlaying, setXPlaying]= useState(true);
  const[gameOver,setGameOver]= useState(false);
  let [status, setStatus]= useState("-");



  const handleBoxClick =(boxIdx)=> {
    const updatedBoard = board.map((value,index)=>{
      if(index === boxIdx)
      {
        return xPlaying === true ? "X": "O";
      }
      else{
        
        return value;
      }
    })
    const winner = checkWinner(updatedBoard);
    setBoard(updatedBoard);
    setXPlaying(!xPlaying);

    let gameIsOver=false;
    function isGameOver(){
      if(!updatedBoard.includes(null)){
        setGameOver(true);
        gameIsOver=true;
      }
    }
    isGameOver();

    if (winner) {
      if(winner==="O"){
        setStatus("Winner: O");
      }
      else if(winner==="X"){
        setStatus("Winner: X");
      }
    }else if (gameIsOver===true){
      setStatus("Draw!");
    }
    else
    {
      setStatus (`Next player: ${xPlaying ? 'O' : 'X'}`);
    }

  }

  const checkWinner = (board) => {
    for (let i = 0; i < winnigConditions.length; i++) {
      const [x, y, z] = winnigConditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }
  
  const resetBoard = () =>{
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setStatus("-");
  }
  
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard = {resetBoard}/>
      <Status className="status" status={status}></Status>
    </div>
  );
}

export default App;
