import { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

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
        <Form onSubmit={handleProjectFormSubmit}>
            <Form.Group className="mb-3" controlId="formProjectName"> 
            <Form.Label>Project Name: </Form.Label>
            <Form.Control type="text" placeholder="Project Name..." value={name} onChange={handleNameChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>            
        </Form>
        </>
    )
}

export default NewProjectForm;