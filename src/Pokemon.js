import useFetch from './useFetch';
import Default from './images/default.png';
import './App.css';

function Pokemon(props){
    // const [key, id] = props
    const {data,error,loading} = useFetch("https://pokeapi.co/api/v2/pokemon/" + props.id);
    if(error)console.log(error);
    let name = "temp";
    let imgUrl = "temp";

    console.log(data + " " + props.id);
    if(data ){
        name = data.name;
        imgUrl = data.sprites.front_default;
        console.log(data.name);
    }
    return(
        <div className='Pokemon'>
            {loading && <text>Image Loading...</text>}
            {!data && <img className='Poke-Sprite' src = {Default}></img>}
            {data && <img className='Poke-Sprite' src={imgUrl} onClick = {props.clicked}/>}
            {loading && <text>loading...</text>}
            {data && <text>{name}</text>}

        </div>
    )
}
//<img className='Poke-Sprite' src={formData.sprites.front_default}/>
export default Pokemon;