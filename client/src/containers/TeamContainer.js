import { Card, Row } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import UsersService from '../services/UsersService';
import '../App.css';
import ProjectSelector from '../components/project/ProjectSelector';

const TeamContainer = ({ projects }) => {
    const [currentProject, setCurrentProject] = useState(null);
    const [usersOnProject, setUsersOnProject] = useState(null);

    const onProjectSelected = (project) => {
        setCurrentProject({ ...project });
    }

    useEffect(() => {
        if (currentProject) {
            UsersService.getUsersByProject(currentProject.id)
                .then(users => setUsersOnProject(users))
        }
    }, [currentProject])

    return (
        <>
        <Row className="selector-row">
            {projects ?
                <ProjectSelector projects={projects} onProjectSelected={onProjectSelected} currentProject={currentProject} />
                : null}
                </Row>
            {usersOnProject ?
                <div className="flex-cards">
                    {usersOnProject.map(user => {
                        return (
                            <Card key={user.id} style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>
                                        {user.email}<br />
                                        {user.role}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                : null}
        </>

    )
}

export default TeamContainer;