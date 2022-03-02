const ProjectsService = {

    getProjects() {
        return fetch('/projects')
            .then(res => res.json())
    },

    postProject(payload) {
        return fetch('/projects', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json());
    }
}

export default ProjectsService;