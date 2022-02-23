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

    useEffect(() => {
        setColumns(initialData);
        getTasks();
    }, [])

    const getTasks = () => {
        fetch('/tasks')
        .then(res => res.json())
        .then(taskList => setTaskList(taskList))
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

        const start = columns.columns[source.droppableId];
        const finish = columns.columns[destination.droppableId];

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
                columns: {
                    ...columns.columns,
                    [newColumn.id]: newColumn
                }
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
            columns: {
                ...columns.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setColumns(newState);
    }

    return (
        
        <DragDropContext onDragEnd={onDragEnd}>
            {taskList ?
            <Container>
                {columns.columnOrder.map(columnId => {
                    const column = columns.columns[columnId];
                    // const tasks = column.taskIds.map(
                    //     taskId => columns.tasks[taskId]
                    // );
                    // console.log(tasks);
                    
                    const tasks = []
                        
                        

                        for (let id of column.taskIds) {
                            console.log(id);
                            for (let task of taskList){
                                if (id == task.id){
                                    tasks.push(task)
                                }
                            }
                        
                        console.log(tasks);
                    }
                    

                    return <Column key={columnId} column={column} tasks={tasks} />;
                })}
            </Container> : null}
        </DragDropContext> 
    )
}

export default TaskListContainer;