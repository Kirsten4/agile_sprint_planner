package com.codeclan.example.application_server.controllers;

import com.codeclan.example.application_server.models.Sprint;
import com.codeclan.example.application_server.models.User;
import com.codeclan.example.application_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value="/users")
    public ResponseEntity<List<User>> getAllUsers(
            @RequestParam(name = "userName", required = false) String username,
            @RequestParam(name = "projectId", required = false) Long projectId
    ){
        if(username != null){
            return new ResponseEntity(userRepository.findByUsername(username), HttpStatus.OK);
        }else if (projectId != null){
            return new ResponseEntity<>(userRepository.findByProjectsId(projectId), HttpStatus.OK);
        } else{
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);}
    }


    @PostMapping(value="/users")
    public ResponseEntity<User> postUser(@RequestBody User user){
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
