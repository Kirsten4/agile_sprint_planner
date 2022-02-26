const TasksService = {
    
    getTasksByProjectId(projectId){
        return fetch('/tasks?projectId=' + projectId)
            .then(res => res.json())
    },

    getTasksBySprintId(sprintId){
        return fetch('/tasks?sprintId=' + sprintId.toString())
            .then(res => res.json())
    },
    
    updateTask(id, payload) {
        return fetch('/tasks/' + id, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
          })
    }
}

export default TasksService;