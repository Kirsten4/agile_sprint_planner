import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from "../components/task_lists/Column";
import TasksService from "../services/TasksService";

const StyledContainer = styled.div`
    display: flex;
    `;

const BacklogContainer = ({ currentProject }) => {

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
    }, [])

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

                        return <Column key={columnId} column={column} tasks={tasks} handleUpdate={handleTaskUpdate} />;
                    })}
                </StyledContainer>
                : null}
        </DragDropContext>
    )
}

export default BacklogContainer;