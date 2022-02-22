import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from '../components/task_lists/initial-data';
import Column from '../components/task_lists/Column';

const Container = styled.div`
    display: flex;
`;

const TaskListContainer = () => {
    
    const [taskLists, setTaskLists] = useState(null);

    useEffect(() => {
        setTaskLists(initialData);
    }, [])

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

        const start = taskLists.columns[source.droppableId];
        const finish = taskLists.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...taskLists,
                columns: {
                    ...taskLists.columns,
                    [newColumn.id]: newColumn
                }
            };
            setTaskLists(newState);
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
            ...taskLists,
            columns: {
                ...taskLists.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setTaskLists(newState);
    }

    return (
        
        <DragDropContext onDragEnd={onDragEnd}>
            {taskLists ?
            <Container>
                {taskLists.columnOrder.map(columnId => {
                    const column = taskLists.columns[columnId];
                    const tasks = column.taskIds.map(
                        taskId => taskLists.tasks[taskId]
                    );

                    return <Column key={columnId} column={column} tasks={tasks} />;
                })}
            </Container> : null}
        </DragDropContext> 
    )
}

export default TaskListContainer;