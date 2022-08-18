import {useState, useEffect} from "react"

const useFetch  = (url) =>{
    const [data, setData] = useState(null)
    
    const fetchData = () =>{
        fetch(url)
            .then((response) => response.json())
            .then((data) =>setData(data))
    }
    useEffect(() => {
        console.log("effect ran");
        fetchData()
    },[url])
    console.log(url)
    return [data];
};
export default useFetch;
