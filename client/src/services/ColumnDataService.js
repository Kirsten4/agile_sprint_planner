const ColumnDataService = {
    
    getColumnsBySprintId(sprintId){
        return fetch('/columns/' + sprintId)
            .then(res => res.json())
    },

    updateColumn(id, payload){
        return fetch('/columns/' + id, {
              method: "PATCH",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(payload)
            })
          }

} 

export default ColumnDataService;