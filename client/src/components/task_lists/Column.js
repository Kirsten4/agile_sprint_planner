import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 200px;
    display: flex;
    flex-direction: column;
    `;

const TaskList = styled.div`
    padding: 8px;
    background-color: skyblue;
    flex-grow: 1;
    min-height: 300px;
    `;

const Column = ({ column, tasks }) => {
    
    return (
        <Container>
            <h3>{column.columnId}</h3>
            <Droppable droppableId={column.columnId}>
                {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column