import { useEffect, useState } from "react"
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/task_lists/Column';
import TasksService from "../services/TasksService";
import ColumnDataService from "../services/ColumnDataService";
import { ProgressBar, Col, Row } from "react-bootstrap"
import { format } from "date-fns"
import '../App.css';

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
`;

const TaskListContainer = ({ currentSprint, usersOnProject }) => {

    const [taskList, setTaskList] = useState(null);
    const [columnData, setColumnData] = useState(null);
    const [columns, setColumns] = useState(null);
    const [bookedHours, setBookedHours] = useState(0);
    const [doneHours, setDoneHours] = useState(0);
    const [sprintHours, setSprintHours] = useState(0);
    const [bookedVsSprint, setBookedVsSprint] = useState(0);
    const [doneVsSprint, setDoneVsSprint] = useState(0);

    const columnOrder = ['To Do', 'In Progress', 'Stuck', 'Done'];

    useEffect(() => {
        TasksService.getTasksBySprintId(currentSprint.id)
            .then(tasks => setTaskList(tasks))
        ColumnDataService.getColumnsBySprintId(currentSprint.id)
            .then(columns => setColumnData(columns))
    }, [currentSprint, taskList])

    useEffect(() => {
        if (columnData && taskList) {
            setUpColumns();
        }
    }, [columnData])

    useEffect(() => {
        if (taskList && columns) {
            calculateBookedHours();
            calculateDoneHours();
            calculateSprintHours();
        }
    }, [taskList, columns])

    useEffect(() => {
        calculateBookedVsSprintHours()
        calculateDoneVsSprintHours()
    }, [sprintHours, doneHours, bookedHours, taskList])

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
        for (let taskToCheck of taskList) {
            if (taskToCheck.id === task.id) {
                taskToCheck = task
            }
        const newState = [
            ...taskList
        ]
        setTaskList(newState);
    }}

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

    const calculateSprintHours = () => {
        let totalSprintHours;
        if (currentSprint) {
            let userHours = 0;
            for (const user of usersOnProject) {
                userHours += user.weeklyContractedHours
            }
            totalSprintHours = userHours * currentSprint.duration
            setSprintHours(totalSprintHours);
        }
    }

    const calculateBookedVsSprintHours = () => {
        setBookedVsSprint(Math.round(bookedHours / sprintHours * 100))
    }

    const calculateDoneVsSprintHours = () => {
        setDoneVsSprint(Math.round(doneHours / sprintHours * 100))
    }

    const longEnUSFormatter = new Intl.DateTimeFormat('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const formattedDate = longEnUSFormatter.format(new Date(currentSprint.startDate), 'dd MM yyyy')

    return (
        <>
            <Row>
                <Col></Col>
                <Col>
                    <h6><b>Start Date: </b>{formattedDate}</h6>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <h6><b>Duration: </b>{currentSprint.duration} weeks ({sprintHours} hours)</h6>
                </Col>
            </Row>
            <Row> Hours Booked vs Duration:
                <ProgressBar className="progress-dashboard" now={bookedVsSprint} label={`${bookedVsSprint}%`} />
            </Row>
            <Row>
                Estimated Hours of Tasks Completed vs Duration:
                <ProgressBar className="progress-dashboard" now={doneVsSprint} label={`${doneVsSprint}%`} />
            </Row>
            <Row>
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
            </Row>
        </>
    )
}

export default TaskListContainer;