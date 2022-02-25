package com.codeclan.example.application_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    private Double timeEstimate;

    @Column(name = "time_log")
    @ElementCollection
    private List<Double> timeLog;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    @JsonIgnoreProperties({"project", "tasks"})
    private Sprint sprint;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"users", "sprints", "productBacklog"})
    private Project project;

    public Task(String description, Project project) {
        this.description = description;
        this.project = project;
        this.timeLog = new ArrayList<>();
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

    public List<Double> getTimeLog() {
        return timeLog;
    }

    public void setTimeLog(List<Double> timeLog) {
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

    public void addToSprint(Sprint sprint){
        this.project = null;
        this.sprint = sprint;
    }

}
