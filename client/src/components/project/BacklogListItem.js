const BacklogListItem = ({item, currentSprint}) => {
    
    const putTaskInSprint = () => {
        const payload = "payload"
        fetch('/sprints/' + currentSprint.id + '/' + item.id, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
          })    
    }  

    return (
        <li>
            <b>TaskName:</b> {item.description} 
            <button onClick={putTaskInSprint}>Add To Sprint</button>
        </li>
    )
}

export default BacklogListItem;