const UsersService = {
    
    getUsersByProject(projectId) {
        return fetch('/sprints/' + projectId)
            .then(res => res.json())
    }
}

export default UsersService;