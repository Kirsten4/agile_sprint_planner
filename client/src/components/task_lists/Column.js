import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const StyledContainer = styled.div`
    margin: 8px;
    min-width: 22%;
    display: flex;
    flex-direction: column;
    `;

const StyledTaskList = styled.div`
    padding: 8px;
    background-color: #e9ecef;
    flex-grow: 1;
    min-height: 300px;
    border-radius: 0 0 10px 10px;
    background-color: ${props => (props.isDraggingOver ? '#c5c6c7' : '#e9ecef')}
    `;

const Column = ({ column, tasks, handleUpdate, handleAdd, usersOnProject }) => {
    
    return (
        <StyledContainer>
            <h4 className="column-header">{column.columnId}</h4>
            <Droppable droppableId={column.columnId}>
                {(provided,snapshot) => (
                    <StyledTaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} handleUpdate={handleUpdate} handleAdd={handleAdd}usersOnProject={usersOnProject} />
                        ))}
                        {provided.placeholder}
                    </StyledTaskList>
                )}
            </Droppable>
        </StyledContainer>
    )
}

export default Column