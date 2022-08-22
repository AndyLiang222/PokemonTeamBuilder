import './App.css';
import Pokemon from "./Pokemon.js"

function Team(props){
    const{name, team,toggleFocus, focus} = props.team;
    console.log(team)
    let count = 0;
    const teamComp = team.map((pokemon,index) =>(
       <Pokemon key ={count++} id = {pokemon} clicked = {() => toggleFocus(index)} focused= {index == focus}/>
    ))
    return(
        <div className='Team'>
            
            <h1 className='Team-Title'>
                Your Team
            </h1>
            <h2 className='Team-Name'>
                {name}
            </h2>
            <div className='Team-Main'>
                {teamComp}
            </div>
        </div>
    );
}
export default Team;