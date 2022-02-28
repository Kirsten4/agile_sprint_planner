package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.ColumnData;
import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.List;
import java.util.Optional;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    ColumnDataRepository columnDataRepository;

    @GetMapping(value = "/tasks")
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestParam(name = "projectId", required = false) Long projectId,
            @RequestParam(name = "sprintId", required = false) Long sprintId
    ){
        if(projectId != null){
            return new ResponseEntity<>(taskRepository.findByProjectId(projectId), HttpStatus.OK);
        } else if (sprintId != null){
            return new ResponseEntity<>(taskRepository.findBySprintId(sprintId), HttpStatus.OK);
        }
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/tasks")
    public ResponseEntity<Task> postTask(@RequestBody Task task) {
        taskRepository.save(task);
        Long id = task.getProject().getColumnData().get(0).getId();
        ColumnData columnData = columnDataRepository.findById(id).get();
        columnData.addToTaskList(task.getId());
        columnDataRepository.save(columnData);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/tasks/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task){
        taskRepository.save(task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
}
