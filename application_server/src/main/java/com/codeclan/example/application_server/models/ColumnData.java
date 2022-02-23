package com.codeclan.example.application_server.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="column_data")
public class ColumnData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="task_ids")
    @ElementCollection
    private List<String> taskIds = new ArrayList<String>();

    public ColumnData() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
