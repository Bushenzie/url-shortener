import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function RedirectPage() {
    const {shortenedID} = useParams();
    const [message,setMessage] = useState("");

    useEffect(() => {
        setMessage("Loading...")
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/links/${shortenedID}`);
                const data = await response.data;
                if(data.url) {
                    window.location.replace(data.url)
                    setMessage("Redirecting...")
                }
            } catch(err) {
                setMessage("Not found...")
            }
        }
        fetchData();
    },[])

    return (
        <h1>{message}</h1>
    )
}

export default RedirectPage