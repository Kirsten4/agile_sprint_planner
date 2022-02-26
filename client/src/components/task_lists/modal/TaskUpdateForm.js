import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

const TaskUpdateForm = ({show, task, handleUpdate}) => {

    const [stateTask, setStateTask] = useState({description: ""})

    useEffect(() => {
        let copiedTask = { ...task };
        setStateTask(copiedTask);
    }, [show])

    const handleChange = (event) => {
        let propertyName = event.target.name;
        let copiedTask = { ...stateTask };
        copiedTask[propertyName] = event.target.value;
        setStateTask(copiedTask);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate(stateTask)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control name="description" type="text"  onChange={handleChange}></Form.Control>
            <Form.Control name="timeLog" type="number" placeholder={0} onChange={handleChange}></Form.Control>
                <Button type="submit">Save Changes</Button>
        </Form>
    )
}

export default TaskUpdateForm;