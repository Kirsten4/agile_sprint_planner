import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import { Button, Container, Row, Alert } from 'react-bootstrap'

const NewProjectForm = ({ onProjectSubmit }) => {

    const [name, setName] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleProjectFormSubmit = (evt) => {
        evt.preventDefault()

        onProjectSubmit({
            name: name
        })
        setShowAlert(true)
        setName("")
    }

    return (
        <Container className="form-container">
            <Row>
                <Form onSubmit={handleProjectFormSubmit}>
                    <Form.Label><h3>Add New Project:</h3> </Form.Label>
                    <FloatingLabel controlId="floatingProjectName" label="Project Name" className="mb-3">
                        <Form.Control type="text" placeholder="Project Name" value={name} onChange={handleNameChange} required />
                    </FloatingLabel>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Row>
            <Row>
                <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Project added successfully!
                </Alert>
            </Row>
        </Container>


    )
}

export default NewProjectForm;