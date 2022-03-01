import { ProgressBar } from "react-bootstrap";

import { useEffect, useState } from "react";

const SprintContainer = ({ selectedSprint, usersOnProject, checkCanAddToSprint, taskToAdd }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks([...selectedSprint.tasks])
    }, [selectedSprint])

    let userHours = 0;
    for (const user of usersOnProject) {
        userHours += user.weeklyContractedHours
    }
    const totalSprintHours = userHours * selectedSprint.duration

    let totalTaskTime = 0;
    
        for (const task of tasks){
            totalTaskTime += task.timeEstimate
        }
    

    const hoursRemaining = totalSprintHours - totalTaskTime

    const percentageOfHours = Math.round(totalTaskTime / totalSprintHours * 100)

    if (taskToAdd){
        checkCanAddToSprint(hoursRemaining, taskToAdd)
    }
    

    return (
        <>
            <h3>I am sprint container</h3>
            <h4>Hours avialable: {totalSprintHours}</h4>
            <h4>Hours remaining: {hoursRemaining}</h4>
            <ProgressBar now={percentageOfHours} label={`${percentageOfHours}%`} />
            
            {tasks.map(task => <li key={task.id}>{task.description}: {task.timeEstimate}</li>)}
        </>
    )
}
export default SprintContainer; 