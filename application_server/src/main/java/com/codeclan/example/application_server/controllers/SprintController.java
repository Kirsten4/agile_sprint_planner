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

    @PatchMapping(value = "/sprints/{sprintId}/{taskId}")
    public ResponseEntity putTaskInSprint(@PathVariable Long sprintId, @PathVariable Long taskId){
        Sprint sprint = sprintRepository.findById(sprintId).get();
        Project project = sprint.getProject();
        Task task = taskRepository.findById(taskId).get();
        sprint.getTaskFromBacklog(project,task);
        System.out.println(sprint.getId());
        System.out.println(project.getName());
        System.out.println(task.getDescription());
//        projectRepository.save(project);
        sprintRepository.save(sprint);


        System.out.println(project.getProductBacklog().size());

        System.out.println(sprint.getTasks().size());
        return new ResponseEntity(HttpStatus.OK);
    }
}
