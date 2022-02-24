const ProjectSelector = ({projects, onProjectSelected}) => {
    
    const handleChange = (event) => {
        const chosenProject = projects[event.target.value]
        onProjectSelected(chosenProject)
    }

    const projectOptions = projects.map((project, index) => {
        return <option value={index} key={index}>{project.name}</option>
    })

    return (
        <select defaultValue="" onChange={handleChange}>
            <option value="">Select Project</option>
            {projectOptions}
        </select>
    )
}

export default ProjectSelector;