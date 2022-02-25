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
    public ResponseEntity<List<ColumnData>> getAllColumns(){
        return new ResponseEntity<>(columnDataRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/columns/{id}")
    public ResponseEntity getColumn(@PathVariable Long id){
        return new ResponseEntity<>(columnDataRepository.findById(id), HttpStatus.OK);
    }

    @PatchMapping(value = "/columns/{id}")
    public ResponseEntity<ColumnData> updateColumnData(@RequestBody ColumnData columnData){
        columnDataRepository.save(columnData);
        return new ResponseEntity<>(columnData, HttpStatus.OK);
    }

}
