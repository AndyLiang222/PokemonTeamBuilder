import pokemonLogo from './images/Pokemon_Logo.png';
import './App.css';
import Team from './Team';
import React, {useEffect, useState} from "react"
import useFetch from './useFetch';

function App() {
  const loadLimit = 10;
  const teamLen = 6;
  const optionLen = 5;
  const pokeData = useFetch("https://pokeapi.co/api/v2/pokemon/")
  
  const [comp , setComp] = useState([0,0,0,0,0,0]);
  const [focus, setFocus] = useState(-1);
  const [options, setOptions] = useState([1,2,3,4,5,6,7,8,9,10]);
  console.log(comp)
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
  function changeOptions(dir){
    setOptions((previous) => {
      previous.map((value)=>{
        return value+dir*loadLimit;
      })
    })
  }
  function setPokemon(index,pokemon){
    let idx = comp.indexOf(0);
    console.log(idx + " " + focus);
    let temp= [...comp];
    if(focus != -1){
      temp[focus] = pokemon;
    }else{
      if(idx != -1){
        temp[idx] = pokemon;
      }
    }
    setComp(temp);
  }
  function toggleFocus (index,pokemon){
    setFocus(index);
  }
  const teamComp = {name: "Test" , team: comp, onClick:toggleFocus, focus: focus,teamLen: teamLen}
  const optionComp = {name:"", team:options, onClick: setPokemon, focus:-1, teamLen: optionLen}
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
      <button className='Button-Unselect' onClick={() => toggleFocus(-1,0)}>Un-focus</button>
      <div className='Team'>
        <h1 className='Team-Title'>Your Team</h1>
        <Team team = {teamComp}/>
      </div>
      <div className='Options-Back'>
          <div className='Options'>
            <h1 className='Options-Header'>Pokemon</h1>
              <div className='Options-Content'>
                <Team team = {optionComp}/>
              </div>
          </div>
      </div>
    </div>
  );
}
export default App;
