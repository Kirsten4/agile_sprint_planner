import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import TaskModal from './modal/TaskModal';
import { useState } from 'react';
import SprintsService from '../../services/SprintsService';

const Container = styled.div`
    color: aliceblue;    
    border-radius: 10px;
    padding 8px;
    margin: 10px;
    background-color: ${props => (props.isDragging ? '#51bdb8' : '#45A29E')};
`

const Task = ({ task, index, handleUpdate, handleAdd, usersOnProject }) => {
    const [modalShow, setModalShow] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const stringDraggableId = task.id.toString();

    const handleClick = () => {
        handleAdd(task)
    }

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
                    Priority: {index + 1}<br />
                    {/* {task.users[0]} */}
                    <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>View/Edit Details</Button>
                    {task.project ? <Button variant="primary" size="sm" onClick={handleClick}>Add To Sprint</Button> : null}
                    <TaskModal show={modalShow} onHide={() => setModalShow(false)} task={task} handleUpdate={handleUpdate} usersOnProject={usersOnProject} />
                    {task.users.length > 0 ?
                        <div className="icon-div">
                            <div className='user-icon'>{task.users[0].name[0]}</div>
                        </div>

                        : null}

                </Container>
            )}
        </Draggable>
    );
}

export default Task;