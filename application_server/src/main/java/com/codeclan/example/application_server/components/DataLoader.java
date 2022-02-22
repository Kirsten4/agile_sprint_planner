package com.codeclan.example.application_server.components;

import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    TaskRepository taskRepository;

    public DataLoader() {
    }

    public void run(ApplicationArguments args) {
        Task checkIn = new Task("Check in", "To Do", 0);
        taskRepository.save(checkIn);

        Task checkOut = new Task("Check out", "To Do", 1);
        taskRepository.save(checkOut);

        Task makeReservation = new Task("Make reservation", "To Do", 2);
        taskRepository.save(makeReservation);
    }
}
