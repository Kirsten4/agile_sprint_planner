const UsersService = {
    
    getUsersByProject(projectId) {
        return fetch('/users?projectId=' + projectId)
            .then(res => res.json())
    },

    getUserByUsername(username) {
        return fetch('/users?userName=' + username)
            .then(res => res.json())
    }
}

export default UsersService;