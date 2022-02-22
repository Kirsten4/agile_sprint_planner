import { Draggable } from 'react-beautiful-dnd';

const Task = ({task, index}) => {
    
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // innerRef={provided.innerRef}
                    
                    
                    // isDragging={snapshot.isDragging}
                    >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
}

export default Task;