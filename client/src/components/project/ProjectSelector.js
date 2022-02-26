import Dropdown from 'react-bootstrap/Dropdown'

const ProjectSelector = ({ projects, onProjectSelected }) => {

    const handleChange = (eventKey) => {
        const chosenProject = projects[eventKey]
        onProjectSelected(chosenProject)
    }

    const dropdownOptions = projects.map((project, index) => {
        return <Dropdown.Item eventKey={index} key={index} >{project.name} </Dropdown.Item>
    })

    return (
        <>
            <Dropdown onSelect={handleChange}>
                <Dropdown.Toggle variant="info" size="lg" id="dropdown-basic">
                    Select Project
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {dropdownOptions}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ProjectSelector;