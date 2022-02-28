import Dropdown from 'react-bootstrap/Dropdown'

const SprintSelector = ({sprints, onSprintSelected}) => {
    
    const handleChange = (eventKey) => {
        const chosenSprint = sprints[eventKey]
        onSprintSelected(chosenSprint)
    }

    const dropdownOptions = sprints.map((sprint, index) => {
        return <Dropdown.Item eventKey={index} key={index} >{sprint.id} </Dropdown.Item>
    })

    return (
         <>
         <Dropdown onSelect={handleChange}>
             <Dropdown.Toggle variant="success" size="lg" id="dropdown-basic">
                 Select Sprint
             </Dropdown.Toggle>

             <Dropdown.Menu>
                 {dropdownOptions}
             </Dropdown.Menu>
         </Dropdown>
     </>
    )
}

export default SprintSelector;