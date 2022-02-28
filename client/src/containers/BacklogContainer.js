import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from "../components/task_lists/Column";
import TasksService from "../services/TasksService";
import SprintsService from "../services/SprintsService";
import SprintSelector from "../components/sprint/SprintSelector";
import ProjectSelector from "../components/project/ProjectSelector";
import { Container, Row, Col } from 'react-bootstrap'

const StyledContainer = styled.div`
    display: flex;
    `;

const BacklogContainer = ({ currentProject, currentSprint }) => {

    // const [currentProject, setCurrentProject] = useState(null);
    // const [currentSprint, setCurrentSprint] = useState(null);
    const [taskList, setTaskList] = useState(null);
    const [columns, setColumns] = useState([]);

    const initialColumnData = {
        'Backlog': {
          id: 1,
          columnId: 'Backlog',
          taskIds: [],
        }}

    const columnOrder = ['Backlog'];

    useEffect(() => {
        TasksService.getTasksByProjectId(currentProject.id)
            .then(tasks => setTaskList(tasks))
        setColumns(initialColumnData);
    }, [currentProject])

    useEffect(() => {
        if (currentProject && taskList) {
            setColumnsFromDatabase();
        }
    }, [taskList])

    const handleTaskUpdate = (task) => {
        TasksService.updateTask(task.id, task)
        .then(res => res.json());
        for (const taskToCheck in taskList){
            if (taskToCheck.id === task.id){
                taskToCheck = task
            }
        }
        
        console.log(task);
        const newState = [
            ...taskList
        ]
        console.log(newState);
        setTaskList(newState);
        console.log(taskList);
    }

    const setColumnsFromDatabase = () => {
            columns['Backlog'].taskIds = currentProject.backlogOrder;
            const newState = {
                ...columns
            }
            setColumns(newState);
    }

    const handleAddToSprint = (task) => {
        console.log("help");
        SprintsService.putTaskInSprint(currentSprint.id, task.id)
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
                        {/* <Row>
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
                        </Row> */}
                        <Row>

        <DragDropContext onDragEnd={onDragEnd}>
            {taskList && columns ?
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
        </Row>
        </Container>
    )
}

export default BacklogContainer;