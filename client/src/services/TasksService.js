const TasksService = {
    
    updateTask(id, payload) {
        return fetch('/tasks/' + id, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
          })
    }
}

export default TasksService;