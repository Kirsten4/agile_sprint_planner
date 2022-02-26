import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

const Task = ({task, index}) => {

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
                    <input id="number" type="number" value="42"></input>
                </Container>
            )}
        </Draggable>
    );
}

export default Task;