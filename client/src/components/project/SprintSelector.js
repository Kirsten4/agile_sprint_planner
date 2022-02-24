const SprintSelector = ({sprints, onSprintSelected}) => {
    
    const handleChange = (event) => {
        const chosenSprint = sprints[event.target.value]
        onSprintSelected(chosenSprint)
    }

    const SprintOptions = sprints.map((sprint, index) => {
        return <option value={index} key={index}>{sprint.id}</option>
    })

    return (
        <select defaultValue="" onChange={handleChange}>
            <option value="">Select Sprint</option>
            {SprintOptions}
        </select>
    )
}

export default SprintSelector;