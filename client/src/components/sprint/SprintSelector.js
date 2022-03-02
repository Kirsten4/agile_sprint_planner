import Dropdown from 'react-bootstrap/Dropdown'

const SprintSelector = ({sprints, onSprintSelected, currentSprint}) => {
    
    const handleChange = (eventKey) => {
        const chosenSprint = sprints[eventKey]
        onSprintSelected(chosenSprint)
    }

    const dropdownOptions = sprints.map((sprint, index) => {
        return <Dropdown.Item eventKey={index} key={index} >{sprint.id} </Dropdown.Item>
    })

    let dropDownToggle = "Select Sprint"
    if (currentSprint){
        dropDownToggle = "Sprint: " + currentSprint.id
    }

    return (
         <>
         <Dropdown onSelect={handleChange}>
             <Dropdown.Toggle variant="info" size="lg" id="dropdown-basic">
                 {dropDownToggle} 
             </Dropdown.Toggle>

             <Dropdown.Menu>
                 {dropdownOptions}
             </Dropdown.Menu>
         </Dropdown>
     </>
    )
}

export default SprintSelector;