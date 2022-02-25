package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping(value = "/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/tasks/{projectId}")
    public ResponseEntity<List<Task>> getAllTasksInProject(@PathVariable Long projectId){
        return new ResponseEntity<>(taskRepository.findByProjectId(projectId), HttpStatus.OK);
    }

    @PatchMapping(value = "/tasks/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task){
        taskRepository.save(task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
}
