import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialColumnData from '../components/task_lists/initial-data';
import Column from '../components/task_lists/Column';
import TasksService from "../services/TasksService";

const StyledContainer = styled.div`
    display: flex;
`;

const TaskListContainer = ({currentSprint}) => {

    const [taskList, setTaskList] = useState(null);
    const [columns, setColumns] = useState(null);
    const [columnData, setColumnData] = useState(null);
    

    
    const columnOrder = ['To Do', 'In Progress', 'Stuck', 'Done'];

    useEffect(() => {
        console.log(taskList);
        console.log(currentSprint.id);
        setColumns(initialColumnData);
        // getTasks();
        getColumnData();
        TasksService.getTasksBySprintId(currentSprint.id)
        .then(tasks => setTaskList(tasks))
        console.log(taskList);
    }, [])

    useEffect(() => {
        if (columnData && columns && taskList) {
            setColumnsFromDatabase();
        }
    }, [columnData])
 
    const handleTaskUpdate = (task) => {
        console.log(task);
        TasksService.updateTask(task.id, task)
        .then(res => res.json());
        console.log(task.description);
        const newState = {
            ...taskList,
            task
        }
        
        setColumns(newState);
    }

    const getColumnData = () => {
        fetch('/columns')
            .then(res => res.json())
            .then(columnData => setColumnData(columnData))
    }

    const updateColumn = (id, payload) => {
        fetch('/columns/' + id, {
              method: "PATCH",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(payload)
            })
          }
    

    const setColumnsFromDatabase = () => {
        
        for (const column of columnData) {

            columns[column.columnId].taskIds = column.taskIds;
            const newState = {
                ...columns,
                taskIds: column.taskIds
            }
            
            setColumns(newState);
        }
    }

    const onDragEnd = result => {
        result.draggableId = Number(result.draggableId)
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

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
            updateColumn(newColumn.id, newColumn)
            return;
        }

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
        updateColumn(newStart.id, newStart)
        updateColumn(newFinish.id, newFinish)
    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            {taskList && columns && columnData ?
                <StyledContainer>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];

                        const tasks = []

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
 
export default TaskListContainer;