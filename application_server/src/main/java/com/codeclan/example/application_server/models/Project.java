package com.codeclan.example.application_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToMany
    @JsonIgnoreProperties({"projects"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "users_projects",
            joinColumns = {@JoinColumn(
                    name = "project_id"
            )},
            inverseJoinColumns = {@JoinColumn(
                    name = "user_id"
            )}
    )
    private List<User> users;

    @OneToMany(mappedBy = "project")
    @JsonIgnoreProperties({"project","tasks"})
    private List<Sprint> sprints;

    @OneToMany(mappedBy = "project")
    @JsonIgnoreProperties({"project"})
    private List<Task> productBacklog;

    @Column(name = "backlog_order")
    @ElementCollection
    private List<Long> backlogOrder = new ArrayList<>();

    public Project(String name) {
        this.name = name;
        this.users = new ArrayList<>();
        this.sprints = new ArrayList<>();
        this.productBacklog = new ArrayList<>();
    }

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Sprint> getSprints() {
        return sprints;
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }

    public List<Task> getProductBacklog() {
        return productBacklog;
    }

    public void setProductBacklog(List<Task> productBacklog) {
        this.productBacklog = productBacklog;
    }

    public List<Long> getBacklogOrder() {
        return backlogOrder;
    }

    public void setBacklogOrder(List<Long> backlogOrder) {
        this.backlogOrder = backlogOrder;
    }

    public void addUser(User user){
        this.users.add(user);
    }

    public void addBacklogOrder(Long id){
        this.backlogOrder.add(id);
    }

    public void addTask(Task task){
        this.productBacklog.add(task);
    }

    public boolean removeTask(Task task) {
        return this.productBacklog.remove(task);
    }
}
