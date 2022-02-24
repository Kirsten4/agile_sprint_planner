package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.Sprint;
import com.codeclan.example.application_server.repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.GeneratedValue;
import java.util.List;

@RestController
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;

    @GetMapping(value = "/sprints")
    public ResponseEntity<List<Sprint>> getAllSprints(){
        return new ResponseEntity<>(sprintRepository.findAll(), HttpStatus.OK);
    }
}
