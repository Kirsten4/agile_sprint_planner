import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const NewProjectForm = ({ onProjectSubmit }) => {

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

    return (
        <>
            <Form onSubmit={handleProjectFormSubmit}>
                <Form.Label>Add New Project: </Form.Label>
                <FloatingLabel controlId="floatingProjectName" label="Project Name" className="mb-3">
                    <Form.Control type="text" placeholder="Project Name" value={name} onChange={handleNameChange} required />
                </FloatingLabel>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default NewProjectForm;