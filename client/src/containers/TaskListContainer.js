import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/task_lists/Column';
import TasksService from "../services/TasksService";
import ColumnDataService from "../services/ColumnDataService";
import { ProgressBar } from "react-bootstrap"
import {format} from "date-fns"

const StyledContainer = styled.div`
    display: flex;
`;

const TaskListContainer = ({ currentSprint, usersOnProject }) => {

    const [taskList, setTaskList] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [columns, setColumns] = useState(null);
    const [bookedHours, setBookedHours] = useState(0);
    const [doneHours, setDoneHours] = useState(0);

    const columnOrder = ['To Do', 'In Progress', 'Stuck', 'Done'];

    useEffect(() => {
        TasksService.getTasksBySprintId(currentSprint.id)
            .then(tasks => setTaskList(tasks))
        ColumnDataService.getColumnsBySprintId(currentSprint.id)
            .then(columns => setColumnData(columns))
    }, [currentSprint])

    useEffect(() => {
        if (columnData && taskList) {
            setUpColumns();
        }
    }, [columnData])

    useEffect(() => {
        if (taskList && columns) {
            calculateBookedHours();
            calculateDoneHours();
        }
    }, [taskList, columns])

    const setUpColumns = () => {
        let tempColumns = {}
        for (const column of columnData) {
            tempColumns[column.columnId] = column
        }
        setColumns(tempColumns)
    }

    const handleTaskUpdate = (task) => {
        TasksService.updateTask(task.id, task)
            .then(res => res.json());
        for (let taskToCheck in taskList) {
            if (taskToCheck.id === task.id) {
                taskToCheck = task
            }
        }
        const newState = [
            ...taskList
        ]
        setTaskList(newState);
    }



    const onDragEnd = result => {
        result.draggableId = Number(result.draggableId)
        const { destination, source, draggableId } = result;

        //dropped outside the list
        if (!destination) {
            return;
        }

        //dropped in original position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        //dropped in new index position, same column
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
            ColumnDataService.updateColumn(newColumn.id, newColumn)
            return;
        }
        //dropped in new index position and new column
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
        ColumnDataService.updateColumn(newStart.id, newStart)
        ColumnDataService.updateColumn(newFinish.id, newFinish)
    }

    const calculateBookedHours = () => {
        let bookedHours = 0;
        for (const task of taskList) {
            bookedHours += task.timeLog
        }
        setBookedHours(bookedHours)
    }


    const calculateDoneHours = () => {

        const column = columns["Done"];
        let tasks = [];
        for (let id of column.taskIds) {
            for (let task of taskList) {
                if (id === task.id) {
                    tasks.push(task)
                }
            }
        }
        let doneHours = 0;
        for (const task of tasks) {
            doneHours += task.timeLog
        }
        setDoneHours(doneHours);
    }

    const longEnUSFormatter = new Intl.DateTimeFormat('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

    const formattedDate = longEnUSFormatter.format(new Date(currentSprint.startDate), 'dd MM yyyy')
    
    return (
        <>
        <h3>Sprint: {currentSprint.id}</h3>
        <h4>Start Date: {formattedDate}</h4>
            <ProgressBar now={bookedHours} label={`${bookedHours}%`} />
            <ProgressBar now={doneHours} label={`${doneHours}%`} />
            <DragDropContext onDragEnd={onDragEnd}>
                {taskList && columns && columnData ?
                    <StyledContainer>
                        {columnOrder.map(columnId => {
                            const column = columns[columnId];
                            let tasks = [];
                            for (let id of column.taskIds) {
                                for (let task of taskList) {
                                    if (id === task.id) {
                                        tasks.push(task)
                                    }
                                }
                            }

                            return <Column key={columnId} column={column} tasks={tasks} handleUpdate={handleTaskUpdate} usersOnProject={usersOnProject} />;
                        })}
                    </StyledContainer>
                    : null}
            </DragDropContext>
        </>
    )
}

export default TaskListContainer;