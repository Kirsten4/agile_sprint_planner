const SprintsService = {

    getSprintsByProject(projectId) {
        return fetch('/sprints/' + projectId)
            .then(res => res.json())
    },

    postSprint(payload) {
        return fetch('/sprints', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
    },

    putTaskInSprint(sprintId, taskId) {
        console.log("here1");
        return fetch('/sprints/' + sprintId + '/' + taskId, {
            method: "PATCH",
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
    }
}

export default SprintsService;