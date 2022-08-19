import useFetch from './useFetch';
import './App.css';

function Pokemon(props){
    const [key, id] = props
    const temp = useFetch("")
    const data = useFetch("https://pokeapi.co/api/v2/pokemon/" + props.id)
    const formData = useFetch("https://pokeapi.co/api/v2/pokemon-form/"+props.id)
    console.log(data)
    const {name} = data

    return(
        <div className='Pokemon'>
            <text>{name}</text>
            <img className='Poke-Sprite' src={formData.sprites.front_default}/>
        </div>
    )
}
export default Pokemon;