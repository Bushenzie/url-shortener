import axios from 'axios';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Homepage() {
    const navigate = useNavigate();
    const [message,setMessage] = useState("");
    const [inputValue,setInputValue] = useState("");
    const [returnValue,setReturnValue] = useState("");

    async function handleSubmit() {
        try {
            setMessage("Generating link...")
            let response = await axios.post("http://localhost:3001/links",{
                url: inputValue
            })
            let data = response.data;
            if(data.id) {
                setInputValue("");
                setMessage("Successfully generated link...")
                setReturnValue(data.id);
            }
        } catch(err) {
            setMessage("Something went wrong...");
        }
    }

    return (
        <div>
            <h1>Homepage</h1>
            <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} />
            <button onClick={handleSubmit}>Generate Link</button>
            <p>{message}</p>
            {returnValue &&
            <>
                <div>Link: <a href={`http://localhost:3000/${returnValue}`}>{`localhost:3000/${returnValue}`}</a></div>
                <div>
                    <button onClick={() => {navigate(`/${returnValue}`)}}>Go to link!</button>
                    <button onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/${returnValue}`)}}>Copy</button>
                </div>
            </>
            }
        </div>
    )
}

export default Homepage