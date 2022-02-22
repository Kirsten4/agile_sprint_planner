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
        console.log(initialData);
        setTaskLists(initialData);
        console.log(taskLists);
        console.log("help");
    }, [])

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
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