import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const TaskUpdateForm = ({ show, task, handleUpdate }) => {

    const [stateTask, setStateTask] = useState({ description: "" })

    useEffect(() => {
        let copiedTask = { ...task };
        setStateTask(copiedTask);
    }, [show])

    const handleChange = (event) => {
        let propertyName = event.target.name;
        let copiedTask = { ...stateTask };
        if (propertyName === "timeLog") {
            copiedTask[propertyName] = task.timeLog + Number(event.target.value);
        } else {
            copiedTask[propertyName] = event.target.value;
        }
        setStateTask(copiedTask);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate(stateTask)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control name="description" type="text" placeholder="Enter description..." value={task.description} onChange={handleChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formTimeEstimate">
                        <Form.Label>Time Estimate: </Form.Label>
                        <Form.Control name="timeEstimate" type="number" placeholder={0} value={task.timeEstimate} onChange={handleChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <p>Logged Time: {task.timeLog}</p>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formTimeLog">
                            <Form.Label>Book Hours Against Task: </Form.Label>
                            <Form.Control name="timeLog" type="number" placeholder={0} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>





                <Button type="submit">Save Changes</Button>
            </Form>
        </Container>
    )
}

export default TaskUpdateForm;