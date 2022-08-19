import {useState, useEffect,useMemo} from "react"
//Idk why useEffect isn't running even tho the dependency is url
//I'm going to temporarly move the hooks to the components then fix once I figure out
function useFetch  (url){
    const [data, setData] = useState([])
    
    const fetchData = async() =>{
        await fetch(url)
            .then((response) => response.json())
            .then((data) =>setData(data))
    }
    useEffect(() => {
        console.log("effect ran");
        fetchData()
    },[url])
    // console.log(url)
    return data;
};
export default useFetch;
