package com.codeclan.example.application_server.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="column_data")
public class ColumnData {

    @Id
    private String id;

    @Column(name="task_ids")
    @ElementCollection
    private List<String> taskIds = new ArrayList<String>();

    public ColumnData(String id) {
        this.id = id;
    }

    public ColumnData() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getTaskIds() {
        return taskIds;
    }

    public void setTaskIds(List<String> taskIds) {
        this.taskIds = taskIds;
    }

    public void addToTaskList(String taskId){
        this.taskIds.add(taskId);
    }
}
