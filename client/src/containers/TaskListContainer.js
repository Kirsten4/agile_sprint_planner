import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialColumnData from '../components/task_lists/initial-data';
import Column from '../components/task_lists/Column';

const Container = styled.div`
    display: flex;
`;

const TaskListContainer = () => {

    const [taskList, setTaskList] = useState(null);
    const [columns, setColumns] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [productBackLog, setProductBacklog] = useState(null);

    const columnOrder = ['To Do', 'In Progress', 'Stuck', 'Done'];

    useEffect(() => {
        setColumns(initialColumnData);
        getTasks();
        getColumnData();
        getBacklog();
    }, [])

    useEffect(() => {
        if (columnData && columns && taskList) {
            setColumnsFromDatabase();
        }
    }, [columnData])

    const getTasks = () => {
        fetch('/tasks')
            .then(res => res.json())
            .then(taskList => setTaskList(taskList))
    }

    const getBacklog = () => {
        fetch('/tasks/Project 1')
            .then(res => res.json())
            .then(taskList => setProductBacklog(taskList))
    }

    const getColumnData = () => {
        fetch('/columns')
            .then(res => res.json())
            .then(columnData => setColumnData(columnData))
    }

    const updateColumn = (id, payload) => {
        fetch('/columns/' + id, {
              method: "PATCH",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(payload)
            })
          }
    

    const setColumnsFromDatabase = () => {
        
        for (const column of columnData) {

            columns[column.columnId].taskIds = column.taskIds;
            
            const newState = {
                ...columns,
                taskIds: column.taskIds
            }
            
            setColumns(newState);
        }
    }

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...columns,

                [newColumn.columnId]: newColumn

            };
            setColumns(newState);
            updateColumn(newColumn.id, newColumn)
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...columns,
            [newStart.columnId]: newStart,
            [newFinish.columnId]: newFinish
        }

        setColumns(newState);
        updateColumn(newStart.id, newStart)
        updateColumn(newFinish.id, newFinish)
    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            {taskList && columns && columnData ?
                <Container>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];

                        const tasks = []

                        for (let id of column.taskIds) {
                            for (let task of taskList) {
                                if (id === task.id) {
                                    tasks.push(task)
                                }
                            }
                        }

                        return <Column key={columnId} column={column} tasks={tasks} />;
                    })}
                </Container>
                : null}
        </DragDropContext>
    )
}

export default TaskListContainer;