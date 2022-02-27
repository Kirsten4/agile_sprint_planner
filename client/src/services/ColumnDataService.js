const ColumnDataService = {
    
    getColumnsBySprintId(sprintId){
        return fetch('/columns/' + sprintId)
            .then(res => res.json())
    },
} 

export default ColumnDataService;