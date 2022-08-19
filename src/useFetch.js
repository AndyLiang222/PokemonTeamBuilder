import {useState, useEffect} from "react"
//Idk why useEffect isn't running even tho the dependency is url
//I'm going to temporarly move the hooks to the components then fix once I figure out
const useFetch = url =>{
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    
    const refetch = () =>{
        fetch(url)
            .then((response) => response.json())
            .then((data) =>setData(data))
    }
    useEffect(() => {
        console.log("effect ran");
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    },[url]);
    // console.log(url)
    return {data,error, loading, refetch};
};
export default useFetch;
