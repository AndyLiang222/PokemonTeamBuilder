import './App.css';
import useFetch from './useFetch';
import Default from './images/default.png';
import Exit from './images/Exit.png';

function Info(props){
    const {id,close} = props.data;
    const {data,error,loading} = useFetch("https://pokeapi.co/api/v2/pokemon/" + id);
    const typeArr = ["normal", "fire", "water", "grass", "electric","ice", "fighting", "poison",
    "ground", "flying","psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
    let weak = [64,4356,24,2722,256,69698,132608,1280,44,4144,43008,4610,65868,40960,147488,133184,322,65664];
    let immune = [8192,0,0,0,0,0,0,0,16,256,0,0,0,65,0,1024,128,16384];
    let resist = [0,198698,65574,284,66064,32,38912,133320,4224,2120,1088,328,643,2176,30,40960,220713,34880];
    let types = "";
    let abilities = "";
    let w = [];
    let im = [];
    let r = [];
    let stats = [];
    let rawStats = [];
    let rawStatsTitle = []; 
    let moves = "";
    const on = {
        backgroundColor: "#F4F7F5",
        margin: 5,
        width: 25,
        height: 10,
        marginRight: "auto" ,
        marginLeft: "auto"
    }
    const off = {
        backgroundColor: "#08090A",
        margin: 5,
        width: 25,
        height: 10,
        marginRight: "auto" ,
        marginLeft: "auto"
    }
    if(data){
        types = data.types.map((value) =>(
            <img className = "Type-Img"src = {require(`./images/Type/${value.type.name}.png`)}></img>
        ));
        abilities = data.abilities.map((value) =>(
            <text>{value.ability.name}</text>
        ));
        let statData = data.stats;
        for(let i = 0;i < statData.length;i++){
            rawStats.push(statData[i].base_stat);
            rawStatsTitle.push(statData[i].stat.name.split("-").map((value)=>(
                <text>{value}</text>
            )));
            let temp = [];
            for(let j = 1;j<=15;j++){
                if(Math.floor((255 - rawStats[i])/17.0) >= j)temp.push(<div style={on}></div>);
                else temp.push(<div style = {off}></div>);
            }
            stats.push(<div className='Stat'>{[temp,<text>{rawStats[i]}</text>,rawStatsTitle[i]]}</div>);
        }
        moves = data.moves.map((value)=>(
            <text className='Move'>{value.move.name}</text>
        ));
        let wV = 0;let rV = 0;let iV = 0;
        for(let i = 0;i<data.types.length;i++){
            let type = data.types[i].type.name;
            let tIdx = typeArr.indexOf(type);
            wV = wV|weak[tIdx];
            rV = rV|resist[tIdx];
            iV = iV|immune[tIdx];
        }
        for(let i = 0;i<18;i++){
            if(((1<<i) & wV) !=0 && ((1<<i) & rV) == 0 && ((1<<i) & iV) == 0){
                w.push(<img className = "Type-Img"src = {require(`./images/Type/${typeArr[i]}.png`)}></img>)
            }
            if(((1<<i) & wV) == 0 && ((i<<i) & rV) != 0 && ((1<<i) & iV) == 0 ){
                r.push(<img className = "Type-Img"src = {require(`./images/Type/${typeArr[i]}.png`)}></img>)
            }
            if(((1<<i) & iV) != 0){
                im.push(<img className = "Type-Img" src = {require(`./images/Type/${typeArr[i]}.png`)}></img>)
            }
        }
    }
    return(
        <div>
            {( data &&
            <div className='Info'>
                <div className='Upper-Info'>
                    <img className='Info-Img' src = {data.sprites.front_default}></img>
                    <div className='Basic-Info'>
                        <h1 className='Info-Name'>{data.name}</h1>
                        <div className='Info-Types'>{types}</div>
                        <div className='Info-Stats'>
                            <text>height: {data.height}</text>
                            <text>weight: {data.weight}</text>
                            <br/><br/>
                            <text>Abilities:  {abilities}</text>
                        </div>
                    </div>
                    <div className='Info-Exit'>
                        <img className = 'Exit-Button' src={Exit} onClick = {close}></img>
                    </div>
                </div>
                <div className='Lower-Info'>
                    <div className='Info-PokeStats'>
                        {stats}
                    </div>
                    <div className='Info-Moves'>
                        <h3>Moves</h3>
                        <div className='Moves'>
                            {moves}
                        </div>
                    </div>
                    <div className='Info-Advantages'>
                        <h3>Weakness:</h3>
                        <div className='Type-Advangtage'>{w}</div>
                        <h3>Resistance:</h3>
                        <div className='Type-Advangtage'>{r}</div>
                        <h3>Immune:</h3>
                        <div className='Type-Advangtage'>{im}</div>
                    </div>
                </div>
            </div>
            )}
            {/* {(!data &&
                <div className='Info-Loading'>
                    <img src={Default}>
                    </img>
                </div>    
            )} */}
        </div>
    );
        
}
export default Info;