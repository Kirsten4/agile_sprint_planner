import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

const TaskUpdateForm = ({show, task, handleUpdate}) => {
    
    const [stateTask, setStateTask] = useState({description: ""})

    useEffect(() => {
        console.log("active");
        console.log(task);
        let copiedTask = { ...task };
        console.log(copiedTask);
        setStateTask(copiedTask);
    }, [show])

    const handleChange = (event) => {
        let propertyName = event.target.name;
        console.log(propertyName);
        let copiedTask = { ...stateTask };
        copiedTask[propertyName] = event.target.value;
        console.log(copiedTask[propertyName]);
        console.log(stateTask);
        setStateTask(copiedTask);
        console.log(stateTask);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("help");
        handleUpdate(stateTask)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control name="description" type="text"  onChange={handleChange}></Form.Control>
            <Form.Control name="timeLog" type="number" placeholder={0} onChange={handleChange}></Form.Control>
                <Button type="submit">Submit</Button>
        </Form>
    )
}

export default TaskUpdateForm;