import React, { useEffect, useState } from "react";
import BackLogList from "../components/project/BacklogList";
import ProjectSelector from "../components/project/ProjectSelector";
import SprintSelector from "../components/sprint/SprintSelector";
import NewProjectForm from "../components/project/NewProjectForm";
import NewSprintForm from "../components/sprint/NewSprintForm"
import ProjectsService from "../services/ProjectsService";
import SprintsService from "../services/SprintsService";
import TaskListContainer from "./TaskListContainer"
import BacklogContainer from "./BacklogContainer";
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap'



const ProjectContainer = () => {
    const [key, setKey] = useState('dashboard');
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [currentSprint, setCurrentSprint] = useState(null);



    useEffect(() => {
        ProjectsService.getProjects()
            .then(projects => setProjects(projects));
    }, [projects])

    useEffect(() => {
        if (currentProject) {
            SprintsService.getSprintsByProject(currentProject.id)
                .then(sprints => setSprints(sprints));
        }
    }, [currentProject])

    if (!projects) {
        return (<p>Loading...</p>)
    }

    const onProjectSelected = (project) => {
        setCurrentSprint(null);
        setCurrentProject({ ...project });
    }

    const onSprintSelected = (sprint) => {
        setCurrentSprint({ ...sprint });
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
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Tab eventKey="dashboard" title="Dashboard">
                    <Container>
                        <Row>
                            <Col>
                                {projects ?
                                    <ProjectSelector projects={projects} onProjectSelected={onProjectSelected} />
                                    : null}
                            </Col>
                            <Col>
                                {currentProject ?
                                    <SprintSelector sprints={sprints} onSprintSelected={onSprintSelected} />
                                    : null}
                            </Col>
                        </Row>
                        <Row>
                            {currentSprint ?
                                <TaskListContainer currentSprint={currentSprint} />
                                : null}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="newProject" title="New Project">
                    <NewProjectForm onProjectSubmit={createProject} />
                </Tab>
                <Tab eventKey="newSprint" title="New Sprint">
                    <NewSprintForm currentProject={currentProject} onSprintSubmit={createSprint} />
                </Tab>
                <Tab eventKey="productBacklog" title="Product Backlog">
                    {currentProject ?
                        <>
                            <BacklogContainer currentProject={currentProject} />
                        </>
                        : null}

                </Tab>
            </Tabs>
        </>
    )
}

export default ProjectContainer;