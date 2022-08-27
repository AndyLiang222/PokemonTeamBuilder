import pokemonLogo from './images/Pokemon_Logo.png';
import './App.css';
import Team from './Team';
import Info from './Info';
import React, {useEffect, useState} from "react"
import useFetch from './useFetch';

function App() {
  const loadLimit = 20;
  const loadMax = 500;
  const teamLen = 6;
  const optionLen = 5;
  const pokeData = useFetch("https://pokeapi.co/api/v2/pokemon/")
  
  const [comp , setComp] = useState([0,0,0,0,0,0]);
  const [focus, setFocus] = useState(-1);
  const [options, setOptions] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  const [showInfo, setShow] = useState(false);
  console.log(options)
  function randInt(max, min){
    return min + Math.floor(Math.random()*(max-min));
  }
  const randomTeam = () =>{
    const temp = [];
    for(let i = 0;i<6;i++){
      temp.push(randInt(1, loadMax));
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
      setShow(false);
    }
  }
  function changeOptions(dir){
    if(options[0]+dir*loadLimit<=0)return;
    if(options[loadLimit-1]+dir*loadLimit >= loadMax)return;
    let temp = options.map((value)=>{
      return value+dir*loadLimit;
    });
    setOptions(temp);
    
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
        setFocus(idx);
      }
    }
    setComp(temp);
    setShow(true);
  }
  function closeInfo(){
    setFocus(-1);
    setShow(false);
  }
  function toggleFocus (index,pokemon){
    setFocus(index);
    setShow((index != -1));
  }
  const teamComp = {name: "Test" , team: comp, onClick:toggleFocus, focus: focus,teamLen: teamLen}
  const optionComp = {name:"", team:options, onClick: setPokemon, focus:-1, teamLen: optionLen}
  const pData = {id : comp[focus],close: closeInfo}
  return (
    <div className="App">
      <header className="App-header">
        <div className = "Top-Bar">
          <img className = "Pokemon-Logo" src = {pokemonLogo}/>
          <h1 className = "Title" >Team Builder</h1>
        </div>
      </header>
      <div className='Action-Bar'>
        <a className = "Button-Random" onClick={randomTeam}>Randomize</a>
        <a className='Button-Delete' onClick={deletePokemon}>Delete</a>
        <a className='Button-Unselect' onClick={() => toggleFocus(-1,0)}>Un-focus</a>
      </div>
      <div className='Team'>
        <h1 className='Team-Title'>Your Team</h1>
        <Team team = {teamComp}/>
      </div>
      <div className='Options-Back'>
          <div className='Options'>
            {(!showInfo && <div className = 'Selection-Wrapper'>
              <div className='Options-Header'>
                <h1 className='Options-Title'>Pokemon</h1>
                <div className='Options-Buttons'>
                  <a onClick={() => changeOptions(-1)}>Previous</a>
                  <a onClick={() => changeOptions(1)}>Next</a>
                </div>
              </div>
              <div className='Options-Content'>
                <Team team = {optionComp}/>
              </div>
            </div>)}
            {(showInfo) && 
            <div className='Info-Wrapper'>
              <Info data = {pData}></Info>
            </div>  
            }
          </div>
      </div>
    </div>
  );
}
export default App;
