package com.codeclan.example.application_server.models;

import javax.persistence.*;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private  String id;

    @Column(name="description")
    private String description;

    @Column(name="column")
    private String column;

    @Column(name="index_position")
    private int indexPosition;

    public Task(String description, String column, int indexPosition) {
        this.description = description;
        this.column = column;
        this.indexPosition = indexPosition;
    }

    public Task() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public int getIndexPosition() {
        return indexPosition;
    }

    public void setIndexPosition(int indexPosition) {
        this.indexPosition = indexPosition;
    }
}
