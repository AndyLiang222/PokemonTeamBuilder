import './App.css';
import Pokemon from "./Pokemon.js"

function Team(props){
    const{name, team,onClick, focus,teamLen} = props.team;
    //const name = props.team.name;
    console.log(team)
    let count = 0;
    

    
    // const teamComp = team.map((pokemon,index) =>(
    //    <Pokemon key ={count++} id = {pokemon} clicked = {() => onClick(index,pokemon)} focused= {index == focus}/>
    // ))
    function getTeam (team){

        let temp = [];
        console.log(team)
        for(let i = 0;i<=team.length/teamLen;i++){
            let t = [];
            for(let j = 0;j< teamLen;j++){
                let idx = i*teamLen+j;
                if(idx < team.length)t.push(<Pokemon key ={idx} id = {team[idx]} clicked = {() => onClick(idx,team[idx])} focused= {idx == focus}/>)
                console.log("added")
            }
            
            temp.push(<div className= 'Team-Row'>{t}</div>);
        }
        console.log("temp : " +temp);
        return temp;
    }
    return(
        <div className='Team-Container'>
            <h2 className='Team-Name'>
                {name}
            </h2>
            <div className='Team-Main'>
                {getTeam(team)}
                <div></div>
            </div>
        </div>
    );
}
export default Team;
