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
    min-height: 100px;
    `;

const Column = ({ column, tasks }) => {

    return (
        <Container>
            <h3>{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        // isDraggingOver={snapshot.isDraggingOver}
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