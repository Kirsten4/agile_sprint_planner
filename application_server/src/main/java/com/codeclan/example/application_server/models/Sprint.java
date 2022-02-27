package com.codeclan.example.application_server.models;

import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.models.Task;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "duration")
    private int duration;

    @ManyToOne
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnoreProperties({"users", "sprints", "productBacklog"})
    private Project project;

    @OneToMany(mappedBy = "sprint")
    @JsonIgnoreProperties({"sprint"})
    private List<Task> tasks;

    @OneToMany(mappedBy = "sprint")
    @JsonIgnoreProperties({"sprint","columnData"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private List<ColumnData> columnData;

    public Sprint(Date startDate, int duration, Project project) {
        this.startDate = startDate;
        this.duration = duration;
        this.project = project;
        this.tasks = new ArrayList<>();
        this.columnData = new ArrayList<>();
    }

    public Sprint() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<ColumnData> getColumnData() {
        return columnData;
    }

    public void setColumnData(List<ColumnData> columnData) {
        this.columnData = columnData;
    }

    public void addTaskToSprint(Task task){
        this.tasks.add(task);
    }

    public void getTaskFromBacklog(Project project, Task task) {
        project.removeTask(task);
        task.addToSprint(this);
        this.addTaskToSprint(task);
    }
}

