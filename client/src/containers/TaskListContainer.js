import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from '../components/task_lists/initial-data';
import Column from '../components/task_lists/Column';

const Container = styled.div`
    display: flex;
`;

const TaskListContainer = () => {

    const [taskList, setTaskList] = useState(null);
    const [columns, setColumns] = useState(null);
    const [columnData, setColumnData] = useState(null);

    const columnOrder = [1, 2, 3, 4];

    useEffect(() => {
        setColumns(initialData);
        getTasks();
        getColumnData();
    }, [])

    useEffect(() => {
        if (columnData && columns && taskList) {
            setColumnsFromDatabase();
        }
    },[columnData])

    const getTasks = () => {
        fetch('/tasks')
            .then(res => res.json())
            .then(taskList => setTaskList(taskList))
    }

    const getColumnData = () => {
        fetch('/columns')
        .then(res => res.json())
        .then(columnData => setColumnData(columnData))
    }
    
    const setColumnsFromDatabase = () => {
        let tempColumns = columns;
        console.log(columnData);
        for (const column of columnData){
            
            console.log(tempColumns[column.id].taskIds);
            console.log(column.taskIds);
            tempColumns[column.id].taskIds = column.taskIds;
            
        }
        console.log(tempColumns);
        setColumns(tempColumns);
        console.log(columns); 
    } 
    
            
    

    const onDragEnd = result => {
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
                    
                    [newColumn.id]: newColumn
                
            };
            setColumns(newState);
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
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        
        setColumns(newState);
        } 

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            {taskList ?
                <Container>
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

                        return <Column key={columnId} column={column} tasks={tasks} />;
                    })}
                </Container>
                : null}
        </DragDropContext>
    )
}

export default TaskListContainer;