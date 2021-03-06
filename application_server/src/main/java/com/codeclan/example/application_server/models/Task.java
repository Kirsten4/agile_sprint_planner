package com.codeclan.example.application_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="description")
    private String description;

    @Column(name = "time_estimate")
    private Double timeEstimate = 0.0;

    @Column(name = "time_log")
    private Double timeLog = 0.0;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JsonIgnoreProperties(value = {"project", "tasks", "columnData"}, allowSetters = true)
    private Sprint sprint;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JsonIgnoreProperties({"users", "sprints", "productBacklog","columnData"})
    private Project project;

    @ManyToMany
    @JsonIgnoreProperties({"tasks", "users", "projects"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "users_tasks",
            joinColumns = {@JoinColumn(
                    name = "task_id"
            )},
            inverseJoinColumns = {@JoinColumn(
                    name = "user_id"
            )}
    )
    private List<User> users;

    public Task(String description, Project project) {
        this.description = description;
        this.project = project;
        this.users = new ArrayList<>();
    }

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(Double timeEstimate) {
        this.timeEstimate = timeEstimate;
    }

    public Double getTimeLog() {
        return timeLog;
    }

    public void setTimeLog(Double timeLog) {
        this.timeLog = timeLog;
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user){
        this.users.add(user);
    }

    public void addToSprint(Sprint sprint){
        this.project = null;
        this.sprint = sprint;
    }
}
