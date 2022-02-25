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
    }
}

export default SprintsService;