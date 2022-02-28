import { useEffect, useState } from "react";

const SprintContainer = ({ selectedSprint, usersOnProject }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks([...selectedSprint.tasks])
        console.log("here");
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


    return (
        <>
            <h3>I am sprint container</h3>
            <h4>Hours avialable: {totalSprintHours}</h4>
            <h4>Hours remaining: {hoursRemaining}</h4>
            
            {tasks.map(task => <li key={task.id}>{task.description}: {task.timeEstimate}</li>)}
        </>
    )
}
export default SprintContainer; 