package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping(value = "/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/tasks/{projectName}")
    public ResponseEntity<List<Task>> getAllTasksInProject(@PathVariable String projectName){
        return new ResponseEntity<>(taskRepository.findByProjectName(projectName), HttpStatus.OK);
    }
}
