import React, { useEffect, useState } from "react";
import BackLogList from "../components/project/BacklogList";
import ProjectSelector from "../components/project/ProjectSelector";
import SprintSelector from "../components/project/SprintSelector";
import NewProjectForm from "../components/project/NewProjectForm";
import NewSprintForm from "../components/sprint/NewSprintForm"
import ProjectsService from "../services/ProjectsService";
import SprintsService from "../services/SprintsService";

const ProjectContainer = () => {

    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [currentSprint, setCurrentSprint] = useState(null);

    useEffect(() => {
        ProjectsService.getProjects()
            .then(projects => setProjects(projects));
    }, [])

    useEffect(() => {
        if (currentProject) {
            SprintsService.getSprintsByProject(currentProject.id)
                .then(sprints => setSprints(sprints));
        }
    }, [currentProject])

    const onProjectSelected = (project) => {
        setCurrentSprint(null);
        setCurrentProject(project);
    }

    const onSprintSelected = (sprint) => {
        setCurrentSprint(sprint);
    }

    const createProject = (newProject) => {
        ProjectsService.postProject(newProject)
            .then(savedProject => setProjects([...projects, savedProject]))
    }

    const createSprint = (newSprint) => {
        SprintsService.postSprint(newSprint)
            .then(savedSprint => setSprints([...sprints, savedSprint]))
    }

    return (
        <>
            <h2>This is the project container</h2>
            <NewProjectForm onProjectSubmit={createProject} />
            <NewSprintForm currentProject={currentProject} onSprintSubmit={createSprint} />
            {projects ?
                <ProjectSelector projects={projects} onProjectSelected={onProjectSelected} />
                : null}
            {currentProject ?
                <SprintSelector sprints={sprints} onSprintSelected={onSprintSelected} />
                : null}

            {currentSprint ?
                <BackLogList productBacklog={currentProject.productBacklog} currentSprint={currentSprint} />
                : null}

        </>
    )
}

export default ProjectContainer;