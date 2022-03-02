package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.ColumnData;
import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
import com.codeclan.example.application_server.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ColumnDataRepository columnDataRepository;

    @GetMapping(value="/projects")
    public ResponseEntity<List<Project>> getAllProjects(){
        return new ResponseEntity<>(projectRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/projects")
    public ResponseEntity<Project> postProject(@RequestBody Project project){
        projectRepository.save(project);
        ColumnData done = new ColumnData("Backlog", null, project);
        columnDataRepository.save(done);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }
}
