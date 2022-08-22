import pokemonLogo from './images/Pokemon_Logo.png';
import './App.css';
import Team from './Team';
import React, {useEffect, useState} from "react"
import useFetch from './useFetch';

function App() {
  const pokeData = useFetch("https://pokeapi.co/api/v2/pokemon/")
  console.log(pokeData)
  const [comp , setComp] = useState([0,0,0,0,0,0]);
  const [focus, setFocus] = useState(-1);
  function randInt(max, min){
    return min + Math.floor(Math.random()*(max-min));
  }
  const randomTeam = () =>{
    const temp = [];
    for(let i = 0;i<6;i++){
      temp.push(randInt(1, 155));
    }
    setComp(temp)
    setFocus(-1)
  }
  const deletePokemon = () =>{
    if(focus != -1){
      const up  = [...comp];
      up.splice(focus, 1);
      up.push(0);
      setComp(up)
      console.log(focus)
      setFocus(-1);
    }
  }
  function toggleFocus (id){
    setFocus(id);
  }
  const teamComp = {name: "Test" , team: comp, toggleFocus, focus: focus}
  return (
    <div className="App">
      <header className="App-header">
        <div className = "Top-Bar">
          <img className = "Pokemon-Logo" src = {pokemonLogo}/>
          <h1 className = "Title" >Team Builder</h1>
        </div>
      </header>
      <button className = "Button-Random" onClick={randomTeam}>Randomize</button>
      <button className='Button-Delete' onClick={deletePokemon}>Delete</button>
      <Team team = {teamComp}/>
      <div className='Options-Back'>
          <div className='Options'>
      
          </div>
      </div>
    </div>
  );
}
export default App;
