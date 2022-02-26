import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import TaskModal from './TaskModal';
import { useState } from 'react';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

const Task = ({ task, index, handleUpdate }) => {
    const [modalShow, setModalShow] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const stringDraggableId = task.id.toString();
    
    return (
        <Draggable draggableId={stringDraggableId} index={index}>
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}

                    isDragging={snapshot.isDragging}
                >
                    {task.description}<br />
                    Priority: {index + 1}
                    <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>View/Edit Details</Button>
                    <TaskModal show={modalShow} onHide={() => setModalShow(false)} task={task} handleUpdate={handleUpdate} />
                </Container>
            )}
        </Draggable>
    );
}

export default Task;