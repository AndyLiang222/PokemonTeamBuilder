import pokemonLogo from './images/Pokemon_Logo.png';
import './App.css';
import Team from './Team';
import React, {useEffect, useState} from "react"

function App() {
  const [pokeData, setPokeData] = useState([])

  const fetchData = () =>{
    fetch("https://pokeapi.co/api/v2/pokemon/").then(response =>{
      return response.json()
    }).then(data =>{
      setPokeData(data)
    })
    console.log(pokeData)
  }
  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <div className = "Top-Bar">
          <img className = "Pokemon-Logo" src = {pokemonLogo}/>
          <h1 className = "Title" >Team Builder</h1>
        </div>
      </header>
      <Team/>
    </div>
  );
}
export default App;
