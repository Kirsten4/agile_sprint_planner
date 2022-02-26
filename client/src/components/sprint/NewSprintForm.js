import { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const NewSprintForm = ({ onSprintSubmit, currentProject }) => {

    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState("");

    const handleStartDateChange = (evt) => {
        setStartDate(evt.target.value);
    }

    const handleDurationChange = (evt) => {
        setDuration(evt.target.value);
    }

    const handleSprintFormSubmit = (evt) => {
        evt.preventDefault()

        onSprintSubmit({
            startDate: startDate,
            duration: duration,
            project: currentProject
        })

    }

    const options = Array.from({ length: 8 }, (v, i) => i + 1)

    const durationOptions = options.map(option => {
        return <option value={option} key={option}>{option} weeks</option>
    })

    return (
        <>
            <h3>Add a New Sprint:</h3>
            <Form onSubmit={handleSprintFormSubmit}>
                <Form.Group className="mb-3" controlId="formStartDate">
                    <Form.Label>Select Start Date: </Form.Label>
                    <Form.Control type="date" name="startDate" value={startDate} onChange={handleStartDateChange} required></Form.Control>
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

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default NewSprintForm;