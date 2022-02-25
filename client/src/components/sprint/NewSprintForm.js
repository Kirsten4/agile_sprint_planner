import { useState } from "react";

const NewSprintForm = ({onSprintSubmit, currentProject}) => {
    
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

    const options = Array.from({length: 8}, (v, i) => i + 1)

    const durationOptions = options.map(option => {
        return <option value={option} key={option}>{option} weeks</option>
    })  

    return(
        <>
        <h3>Add a New Sprint:</h3>
        <form onSubmit={handleSprintFormSubmit}>
            <label>Select Start Date: </label><br/>
            <input type="date" name="startDate" value={startDate} onChange={handleStartDateChange} required/><br/>
            <select defaultValue="" onChange={handleDurationChange}>
                <option value="">
                    Select Duration
                </option>
                {durationOptions}
                </select>
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}

export default NewSprintForm;