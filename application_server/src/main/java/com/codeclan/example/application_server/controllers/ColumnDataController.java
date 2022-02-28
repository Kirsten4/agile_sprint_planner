package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.ColumnData;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ColumnDataController {

    @Autowired
    ColumnDataRepository columnDataRepository;

    @GetMapping(value = "/columns")
    public ResponseEntity<List<ColumnData>> getAllColumns(
            @RequestParam(name = "projectId", required = false) Long projectId,
            @RequestParam(name = "sprintId", required = false) Long sprintId
    ){
        if(projectId != null){
            return new ResponseEntity<>(columnDataRepository.findByProjectId(projectId), HttpStatus.OK);
        } else if (sprintId != null){
            return new ResponseEntity<>(columnDataRepository.findBySprintId(sprintId), HttpStatus.OK);
        }
        return new ResponseEntity<>(columnDataRepository.findAll(), HttpStatus.OK);
    }

    @PatchMapping(value = "/columns/{id}")
    public ResponseEntity<ColumnData> updateColumnData(@RequestBody ColumnData columnData){
        columnDataRepository.save(columnData);
        return new ResponseEntity<>(columnData, HttpStatus.OK);
    }

}
