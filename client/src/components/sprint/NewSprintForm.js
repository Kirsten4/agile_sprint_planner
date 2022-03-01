import { useState } from "react";
import Form from 'react-bootstrap/Form'
import { Button, Container, Row, Alert } from 'react-bootstrap'

const NewSprintForm = ({ onSprintSubmit, projects }) => {

    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState("");
    const [project, setProject] = useState("");
    const [stateTask, setStateTask] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleStartDateChange = (evt) => {
        setStartDate(evt.target.value);
    }

    const handleDurationChange = (evt) => {
        setDuration(evt.target.value);
    }

    const handleProjectChange = (evt) => {
        for (const project of projects) {
            console.log(project);
            if (project.id === Number(evt.target.value)) {
                setProject(project)
            }
        }
        
    }

    // const handleChange = (event) => {
    //     console.log(event.target.name);
    //     console.log(event.target.vaue);
    //     let propertyName = event.target.name;
    //     let copiedTask = { ...stateTask };
    //     if (propertyName === "project") {
    //         for (const project of projects) {
    //             console.log(project);
    //             if (project.id === Number(event.target.value)) {
    //                 copiedTask[propertyName] = project
    //             }
    //         }
    //     } else {
    //         copiedTask[propertyName] = event.target.value;
    //     }
    //     setStateTask(copiedTask);
    // }

        const handleSprintFormSubmit = (evt) => {
            evt.preventDefault()
            onSprintSubmit({
                startDate: startDate,
                duration: duration,
                project: project,
            })
            setStartDate(null)
            setDuration(null)
            setProject(null)
        }

    const options = Array.from({ length: 8 }, (v, i) => i + 1)

    const durationOptions = options.map(option => {
        return <option value={option} key={option}>{option} weeks</option>
    })

    let projectOptions;
    if (projects) {
        projectOptions = projects.map((project) => {
            return <option value={project.id} key={project.id} >{project.name} </option>
        })
    }

    return (
        <Container className="form-container">
            <Row>
                <Form onSubmit={handleSprintFormSubmit}>
                    <Form.Label><h3>Add New Sprint:</h3> </Form.Label>
                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>Select Start Date: </Form.Label>
                        <Form.Control type="date" name="startDate" onChange={handleStartDateChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDuration">
                        <Form.Label>Select Duration: </Form.Label>
                        <Form.Select defaultValue="" onChange={handleDurationChange}>
                            <option value="">
                                Select Duration
                            </option>
                            {durationOptions}
                        </Form.Select>
                    </Form.Group>
                    {projects ?
                        <Form.Group className="mb-3" controlId="formProject">
                            <Form.Label>Project: </Form.Label>
                            <Form.Select name="project" onChange={handleProjectChange}>
                                <option>Select Project</option>
                                {projectOptions}
                            </Form.Select>
                        </Form.Group>
                        : null}
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

export default NewSprintForm;