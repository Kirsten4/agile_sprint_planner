import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from "../components/task_lists/Column";
import TasksService from "../services/TasksService";
import SprintsService from "../services/SprintsService";
import ColumnDataService from "../services/ColumnDataService";
import SprintSelector from "../components/sprint/SprintSelector";
import ProjectSelector from "../components/project/ProjectSelector";
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import TaskModal from "../components/task_lists/modal/TaskModal";
import SprintContainer from "./SprintContainer";

const StyledContainer = styled.div`
    display: flex;
    `;

const BacklogContainer = ({ currentProject, sprints, usersOnProject }) => {

    const [taskList, setTaskList] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [columns, setColumns] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [taskToAdd, setTaskToAdd] = useState(null);

    const columnOrder = ['Backlog'];

    useEffect(() => {
        TasksService.getTasksByProjectId(currentProject.id)
            .then(tasks => setTaskList(tasks))
        ColumnDataService.getColumnsByProjectId(currentProject.id)
            .then(columns => setColumnData(columns))
    }, [currentProject, taskList])

    useEffect(() => {
        if (columnData && taskList) {
            setUpColumns();
        }
    }, [columnData])

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

    const checkCanAddToSprint = (hoursRemaining, task) => {
        console.log(hoursRemaining);
        console.log(task);
        return hoursRemaining >= task.timeEstimate
    }

    const handleAddToSprint = (task) => {
        setTaskToAdd(task)
        if (selectedSprint && checkCanAddToSprint) {
            SprintsService.putTaskInSprint(selectedSprint.id, task.id)
            .then(sprint => setSelectedSprint({...sprint}))
            setTaskToAdd(null)
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

    return (
        <Container>
            <Row>
                <Alert show={showAlert} variant="danger">
                    Select a sprint for the task!
                </Alert>
            </Row>
            <Row>
                {/* <Col>
                                {projects ?
                                    <ProjectSelector projects={projects} onProjectSelected={onProjectSelected} />
                                    : null}
                            </Col> */}
                <Col>
                    {currentProject ?
                        <SprintSelector sprints={sprints} onSprintSelected={onSprintSelected} />
                        : null}
                </Col>
            </Row>
            <Row>
                <div>
                    <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>Add New Task</Button>
                    <TaskModal show={modalShow} onHide={() => setModalShow(false)} handleUpdate={handleTaskUpdate} currentProject={currentProject} />
                </div>

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
                    {selectedSprint ? <SprintContainer selectedSprint={selectedSprint} usersOnProject={usersOnProject} checkCanAddToSprint={checkCanAddToSprint} taskToAdd={taskToAdd} /> : null}
                    
                </Col>
            </Row>
        </Container>
    )
}

export default BacklogContainer;