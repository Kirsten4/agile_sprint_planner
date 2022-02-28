import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialColumnData from '../components/task_lists/initial-data';
import Column from '../components/task_lists/Column';
import TasksService from "../services/TasksService";
import ColumnDataService from "../services/ColumnDataService";
import SprintsService from "../services/SprintsService";

const StyledContainer = styled.div`
    display: flex;
`;

const TaskListContainer = ({currentSprint}) => {

    const [taskList, setTaskList] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [columns, setColumns] = useState(null);
    
    const columnOrder = ['To Do', 'In Progress', 'Stuck', 'Done'];

    useEffect(() => {
        TasksService.getTasksBySprintId(currentSprint.id)
        .then(tasks => setTaskList(tasks))
        ColumnDataService.getColumnsBySprintId(currentSprint.id)
        .then(columns => setColumnData(columns))
    }, [currentSprint])

    useEffect(() => {
        if (columnData && taskList) {
            setUpColumns();
        }
    }, [columnData])

    const setUpColumns = () => {
        let tempColumns = {}
        for (const column of columnData){
            tempColumns[column.columnId] = column
        }
        setColumns(tempColumns)
    }
 
    const handleTaskUpdate = (task) => {
        TasksService.updateTask(task.id, task)
        .then(res => res.json());
        for (let taskToCheck in taskList){
            if (taskToCheck.id === task.id){
                taskToCheck = task
            }
        }
        const newState = [
            ...taskList
        ]
        setTaskList(newState);
    }



    const onDragEnd = result => {
        result.draggableId = Number(result.draggableId)
        const { destination, source, draggableId } = result;

        //dropped outside the list
        if (!destination) {
            return;
        }

        //dropped in original position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        //dropped in new index position, same column
        if (start === finish) {
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

            };
            setColumns(newState);
            ColumnDataService.updateColumn(newColumn.id, newColumn)
            return;
        }
        //dropped in new index position and new column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...columns,
            [newStart.columnId]: newStart,
            [newFinish.columnId]: newFinish
        }

        setColumns(newState);
        ColumnDataService.updateColumn(newStart.id, newStart)
        ColumnDataService.updateColumn(newFinish.id, newFinish)
    }

    return (

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

                        return <Column key={columnId} column={column} tasks={tasks} handleUpdate={handleTaskUpdate}  />;
                    })}
                </StyledContainer> 
                : null}
        </DragDropContext>
    )
}
 
export default TaskListContainer;