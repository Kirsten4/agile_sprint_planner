package com.codeclan.example.application_server.models;

import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.models.Task;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    public Sprint(Date startDate, int duration, Project project) {
        this.startDate = startDate;
        this.duration = duration;
        this.project = project;
        this.tasks = new ArrayList<>();
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

    public void addTaskToSprint(Task task){
        this.tasks.add(task);
    }

    public void getTaskFromBacklog(Project project, Task task) {
        System.out.println(project.getProductBacklog().size());
        project.removeTask(task);
        task.addToSprint(this);
        System.out.println(project.getProductBacklog().size());
        this.addTaskToSprint(task);

        System.out.println(this.getTasks().size());

    }
}

