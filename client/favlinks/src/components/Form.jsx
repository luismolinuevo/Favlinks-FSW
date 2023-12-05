import { useState } from "react"

function Form({addLink}){
    const [name, setName] = useState("");
    const [URL, setURL] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            URL
        }

        addLink(data);
        setName("");
        setURL("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Link Name:</label>
            <input type="text" id="linkName" name="linkName" value={name} onChange={(e) => setName(e.target.value)}/>
            <br />
            <br />
            <label>Link URL:</label>
            <input type="text" id="linkURL" name="linkURL" value={URL} onChange={(e) => setURL(e.target.value)}/>
            <br/>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default Form;
