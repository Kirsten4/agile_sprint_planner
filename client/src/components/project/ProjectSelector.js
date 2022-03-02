import Dropdown from 'react-bootstrap/Dropdown'

const ProjectSelector = ({ projects, onProjectSelected, currentProject }) => {

    const handleChange = (eventKey) => {
        const chosenProject = projects[eventKey]
        onProjectSelected(chosenProject)
    }

    const dropdownOptions = projects.map((project, index) => {
        return <Dropdown.Item eventKey={index} key={index} >{project.name} </Dropdown.Item>
    })

    let dropDownToggle = "Select Project"
    if (currentProject){
        dropDownToggle = currentProject.name
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

export default ProjectSelector;