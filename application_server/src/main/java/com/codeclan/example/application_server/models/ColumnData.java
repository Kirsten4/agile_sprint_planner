package com.codeclan.example.application_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="column_data")
public class ColumnData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="column_id")
    private String columnId;

    @Column(name="task_ids")
    @ElementCollection
    private List<Long> taskIds = new ArrayList<Long>();

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    @JsonIgnoreProperties({"project","sprint", "tasks","columnData", "users"})
    private Sprint sprint;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"sprints", "tasks","columnData", "users","productBacklog"})
    private Project project;


    public ColumnData(String columnId, Sprint sprint, Project project) {
        this.columnId = columnId;
        this.sprint = sprint;
        this.project = project;
    }

    public ColumnData() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColumnId() {
        return columnId;
    }

    public void setColumnId(String columnId) {
        this.columnId = columnId;
    }

    public List<Long> getTaskIds() {
        return taskIds;
    }

    public void setTaskIds(List<Long> taskIds) {
        this.taskIds = taskIds;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void addToTaskList(Long taskId){
        this.taskIds.add(taskId);
    }

    public void removeFromTaskList(Long taskId){
        this.taskIds.remove(new Long(taskId));
    }
}
