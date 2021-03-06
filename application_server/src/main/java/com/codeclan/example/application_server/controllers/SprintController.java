package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.ColumnData;
import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.models.Sprint;
import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
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
    ColumnDataRepository columnDataRepository;

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    ProjectRepository projectRepository;


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
        ColumnData toDo = new ColumnData("To Do", sprint, null);
        columnDataRepository.save(toDo);
        ColumnData inProgress = new ColumnData("In Progress", sprint, null);
        columnDataRepository.save(inProgress);
        ColumnData stuck = new ColumnData("Stuck", sprint, null);
        columnDataRepository.save(stuck);
        ColumnData done = new ColumnData("Done", sprint, null);
        columnDataRepository.save(done);
        return new ResponseEntity<>(sprint, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/sprints/{id}")
    public ResponseEntity<Sprint> updateSprint(@RequestBody Sprint sprint){
        sprintRepository.save(sprint);
        return new ResponseEntity<>(sprint, HttpStatus.OK);
    }

    @PatchMapping(value = "/sprints/{sprintId}/{taskId}")
    public ResponseEntity<Sprint> putTaskInSprint(@PathVariable Long sprintId, @PathVariable Long taskId){
        Sprint sprint = sprintRepository.findById(sprintId).get();
        Project project = projectRepository.findById(sprint.getProject().getId()).get();
        Task task = taskRepository.findById(taskId).get();
        sprint.getTaskFromBacklog(project,task);
        taskRepository.save(task);
        ColumnData columnDataStart = columnDataRepository.findById(project.getColumnData().get(0).getId()).get();
        columnDataStart.removeFromTaskList(taskId);
        ColumnData columnDataEnd = columnDataRepository.findBySprintId(sprintId).get(0);
        columnDataEnd.addToTaskList(taskId);
        columnDataRepository.save(columnDataStart);
        columnDataRepository.save(columnDataEnd);
        sprintRepository.save(sprint);
        return new ResponseEntity(sprintRepository.findById(sprintId), HttpStatus.OK);
    }
}
