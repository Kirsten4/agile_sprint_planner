import React, { useEffect, useState } from "react";
import BackLogList from "../components/project/BacklogList";
import ProjectSelector from "../components/project/ProjectSelector";
import SprintSelector from "../components/project/SprintSelector";

const ProjectContainer = () => {

    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentSprint, setCurrentSprint] = useState(null);

    const getProjects = () => {
        fetch('/projects')
            .then(res => res.json())
            .then(projects => setProjects(projects))
    }

    useEffect(() => {
        getProjects();
    }, [])

    const onProjectSelected = (project) => {
        setCurrentProject(project);
    }

    const onSprintSelected = (sprint) => {
        setCurrentSprint(sprint);
    }

    return (
        <>
            <h2>This is the project container</h2>
            {projects ?
                <ProjectSelector projects={projects} onProjectSelected={onProjectSelected} />
                : null}
            {currentProject ?
                <SprintSelector sprints={currentProject.sprints} onSprintSelected={onSprintSelected} />
                : null}

            {currentSprint ?
                <BackLogList productBacklog={currentProject.productBacklog} currentSprint={currentSprint} />
                : null}

        </>
    )
}

export default ProjectContainer;