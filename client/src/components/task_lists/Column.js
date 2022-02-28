import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const StyledContainer = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 200px;
    display: flex;
    flex-direction: column;
    `;

const StyledTaskList = styled.div`
    padding: 8px;
    background-color: skyblue;
    flex-grow: 1;
    min-height: 300px;
    `;

const Column = ({ column, tasks, handleUpdate, handleAdd }) => {
    
    return (
        <StyledContainer>
            <h3>{column.columnId}</h3>
            <Droppable droppableId={column.columnId}>
                {(provided) => (
                    <StyledTaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} handleUpdate={handleUpdate} handleAdd={handleAdd} />
                        ))}
                        {provided.placeholder}
                    </StyledTaskList>
                )}
            </Droppable>
        </StyledContainer>
    )
}

export default Column