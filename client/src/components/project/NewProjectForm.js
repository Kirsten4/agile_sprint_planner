import { useState } from "react";

const NewProjectForm = ({onProjectSubmit}) => {
    
    const [name, setName] = useState("");

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleProjectFormSubmit = (evt) => {
        evt.preventDefault()

        onProjectSubmit({
            name: name
        })

        setName("")
    }

    return(
        <>
        <h3>Add a New Project:</h3>
        <form onSubmit={handleProjectFormSubmit}>
            <label>Project Name: </label><br/>
            <div >
            <input className="input-label" type="text" placeholder="Project Name..." value={name} onChange={handleNameChange} required/><br/>
            <input className="reg-submit" type="submit" value="Submit" />
            </div>
        </form>
        </>
    )
}

export default NewProjectForm;