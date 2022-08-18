import './App.css';
import Pokemon from "./Pokemon.js"

function Team(props){
    const{name, team} = props.team;
    console.log(team)
    const teamComp = team.map(pokemon =>(

       (pokemon == 0 ? <text>Nothing</text>:<Pokemon key ={pokemon} id = {pokemon}/>
    )))
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