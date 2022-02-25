package com.codeclan.example.application_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="username")
    private String username;

    @Column(name="email")
    private String email;

    @Column(name="role")
    private Role role;

    @ManyToMany
    @JsonIgnoreProperties({"users","sprints", "productBacklog"})
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "users_projects",
            joinColumns = {@JoinColumn(
                    name = "user_id"
            )},
            inverseJoinColumns = {@JoinColumn(
                    name = "project_id"
            )}
    )
    private List<Project> projects;

    public User(String name, String username, String email, Role role) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.role = role;
        this.projects = new ArrayList<>();
    }

    public User() {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public void addProject(Project project){
        this.projects.add(project);
    }
}
