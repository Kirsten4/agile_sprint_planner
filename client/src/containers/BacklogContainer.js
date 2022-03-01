import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "../components/task_lists/Column";
import TasksService from "../services/TasksService";
import SprintsService from "../services/SprintsService";
import ColumnDataService from "../services/ColumnDataService";
import UsersService from "../services/UsersService";
import SprintSelector from "../components/sprint/SprintSelector";
import ProjectSelector from "../components/project/ProjectSelector";
import { Container, Row, Col, Button, Alert, ProgressBar, Table } from 'react-bootstrap'
import TaskModal from "../components/task_lists/modal/TaskModal";
import '../App.css'


const StyledContainer = styled.div`
display: flex;
justify-content: center;
padding: 10px;
    `;

const BacklogContainer = ({ projects }) => {

    const [taskList, setTaskList] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [columns, setColumns] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [sprintTasks, setSprintTasks] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [usersOnProject, setUsersOnProject] = useState(null);

    const columnOrder = ['Backlog'];

    useEffect(() => {
        if (currentProject) {
            SprintsService.getSprintsByProject(currentProject.id)
                .then(sprints => setSprints(sprints));
            UsersService.getUsersByProject(currentProject.id)
                .then(users => setUsersOnProject(users))
        }
    }, [currentProject])

    useEffect(() => {
        if (currentProject) {
            TasksService.getTasksByProjectId(currentProject.id)
                .then(tasks => setTaskList(tasks))
            ColumnDataService.getColumnsByProjectId(currentProject.id)
                .then(columns => setColumnData(columns))
        }
    }, [projects, currentProject, taskList])

    useEffect(() => {
        if (columnData && taskList) {
            setUpColumns();
        }
    }, [columnData])

    const onProjectSelected = (project) => {
        setCurrentProject({ ...project });
    }

    useEffect(() => {
        if (selectedSprint) {
            setSprintTasks([...selectedSprint.tasks])
        }
    }, [selectedSprint])

    const setUpColumns = () => {
        let tempColumns = {}
        for (const column of columnData) {
            tempColumns[column.columnId] = column
        }
        setColumns({ ...tempColumns })
    }

    const handleTaskUpdate = (task) => {
        if (task.id) {
            TasksService.updateTask(task.id, task)
                .then(res => res.json());
            for (let taskToCheck in taskList) {
                if (taskToCheck.id === task.id) {
                    taskToCheck = task
                }
            }
            const newState = [
                ...taskList
            ]
            setTaskList(newState);
        } else {
            TasksService.postTask(task)
            TasksService.getTasksByProjectId(currentProject.id)
                .then(tasks => setTaskList([...tasks]))
        }
    }

    const checkCanAddToSprint = (task) => {
        console.log(task.timeEstimate);
        console.log(hoursRemaining);
        return hoursRemaining >= Number(task.timeEstimate)
    }

    const handleAddToSprint = (task) => {
        if (selectedSprint && checkCanAddToSprint(task) && task.timeEstimate !== 0) {
            SprintsService.putTaskInSprint(selectedSprint.id, task.id)
                .then(sprint => setSelectedSprint({ ...sprint }))
        } else {
            setShowAlert(true);
        }
    }

    const onSprintSelected = (sprint) => {
        setSelectedSprint({ ...sprint });
        setShowAlert(false);
    }

    const onDragEnd = result => {
        result.draggableId = Number(result.draggableId)
        const { destination, source, draggableId } = result;

        //dropped outside the list
        if (!destination) {
            return;
        }

        //dropped in original position
        if (destination.index === source.index) {
            return;
        }

        const start = columns[source.droppableId];

        //dropped in new index position
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
            ...start,
            taskIds: newTaskIds
        };
        const newState = {
            ...columns,
            [newColumn.columnId]: newColumn
        }
        setColumns(newState);
    }


    let totalSprintHours;
    let hoursRemaining;
    let percentageOfHours;
    if (selectedSprint) {
        let userHours = 0;
        for (const user of usersOnProject) {
            userHours += user.weeklyContractedHours
        }
        totalSprintHours = userHours * selectedSprint.duration

        let totalTaskTime = 0;

        for (const task of sprintTasks) {
            totalTaskTime += task.timeEstimate
        }

        hoursRemaining = totalSprintHours - totalTaskTime
        percentageOfHours = Math.round(totalTaskTime / totalSprintHours * 100)

    }

    const longEnUSFormatter = new Intl.DateTimeFormat('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    let formattedDate
    if (selectedSprint) {
        formattedDate = longEnUSFormatter.format(new Date(selectedSprint.startDate), 'dd MM yyyy')
    }

    return (
        <Container>
            <Row>
                <Alert show={showAlert} variant="danger">
                    Select a sprint for the task!
                </Alert>
            </Row>
            <Row id="backlog-dropdowns">
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
                <Col id="add-new-buton">
                    <Button variant="primary" size="md" onClick={() => setModalShow(true)}>+ Add New Task</Button>
                </Col>
                <Col id="add-new-buton">
                    {selectedSprint ?
                        <>
                            <Row>
                                <h6><b>Start Date: </b>{formattedDate}</h6>
                            </Row>
                            <Row>
                                <h6><b>Duration: </b>{selectedSprint.duration} weeks</h6>
                            </Row>
                        </> : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {taskList && columns && columnData ?
                            <StyledContainer>
                                {columnOrder.map(columnId => {
                                    const column = columns[columnId];
                                    let tasks = [];

                                    for (let id of column.taskIds) {
                                        for (let task of taskList) {
                                            if (id === task.id) {
                                                tasks.push(task)
                                            }
                                        }
                                    }

                                    return <Column key={columnId} column={column} tasks={tasks} handleUpdate={handleTaskUpdate} handleAdd={handleAddToSprint} />;
                                })}

                            </StyledContainer>
                            : null}
                    </DragDropContext>
                </Col>
                <Col>
                    {selectedSprint ?
                        <>
                            <h5><b>Hours avialable: </b>{totalSprintHours}</h5>
                            <h5><b>Hours remaining: </b>{hoursRemaining}</h5>
                            <ProgressBar now={percentageOfHours} label={`Remaining Capacity: ${percentageOfHours}%`} />

                            <Table >
                                <thead>
                                    <tr>
                                        <th>
                                            Task
                                        </th>
                                        <th>
                                            Estimated Time (hours)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sprintTasks.map(task => {
                                        return <tr key={task.id}>
                                            <td>{task.description}</td>
                                            <td>{task.timeEstimate}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>

                        </> : null}
                </Col>
            </Row>
            <TaskModal show={modalShow} onHide={() => setModalShow(false)} handleUpdate={handleTaskUpdate} currentProject={currentProject} />
        </Container>
    )
}

export default BacklogContainer;