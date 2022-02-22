import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({column, tasks}) => {

    return (
        <>
        <h3>{column.title}</h3>
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                // isDraggingOver={snapshot.isDraggingOver}
                >
                {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
                </div>
            )}
        </Droppable>
        </>
    )
}

export default Column