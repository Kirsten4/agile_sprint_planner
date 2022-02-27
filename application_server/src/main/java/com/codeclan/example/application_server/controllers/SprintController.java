package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.models.Sprint;
import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.ProjectRepository;
import com.codeclan.example.application_server.repositories.SprintRepository;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.GeneratedValue;
import java.util.List;

@RestController
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TaskRepository taskRepository;

    @GetMapping(value = "/sprints")
    public ResponseEntity<List<Sprint>> getAllSprints(){
        return new ResponseEntity<>(sprintRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/sprints/{projectId}")
    public ResponseEntity<List<Sprint>> getAllSprintsInProject(@PathVariable Long projectId){
        return new ResponseEntity<>(sprintRepository.findByProjectId(projectId), HttpStatus.OK);
    }

    @PostMapping(value = "/sprints")
    public ResponseEntity<Sprint> postSprint(@RequestBody Sprint sprint){
        sprintRepository.save(sprint);
        return new ResponseEntity<>(sprint, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/sprints/{id}")
    public ResponseEntity<Sprint> updateSprint(@RequestBody Sprint sprint){
        sprintRepository.save(sprint);
        return new ResponseEntity<>(sprint, HttpStatus.OK);
    }

    @PatchMapping(value = "/sprints/{sprintId}/{taskId}")
    public ResponseEntity putTaskInSprint(@PathVariable Long sprintId, @PathVariable Long taskId){
        Sprint sprint = sprintRepository.findById(sprintId).get();
        Project project = sprint.getProject();
        Task task = taskRepository.findById(taskId).get();
        sprint.getTaskFromBacklog(project,task);
        taskRepository.save(task);
        return new ResponseEntity(HttpStatus.OK);
    }
}
