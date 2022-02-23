package com.codeclan.example.application_server.components;

import com.codeclan.example.application_server.models.ColumnData;
import com.codeclan.example.application_server.models.Task;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
import com.codeclan.example.application_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    ColumnDataRepository columnDataRepository;

    public DataLoader() {
    }

    public void run(ApplicationArguments args) {
        Task checkIn = new Task("Check in", "To Do", 0);
        taskRepository.save(checkIn);

        Task checkOut = new Task("Check out", "To Do", 1);
        taskRepository.save(checkOut);

        Task makeReservation = new Task("Make reservation", "To Do", 2);
        taskRepository.save(makeReservation);

        ColumnData taskIdsToDo = new ColumnData();
        taskIdsToDo.addToTaskList("1");
        taskIdsToDo.addToTaskList("3");
        columnDataRepository.save(taskIdsToDo);

        ColumnData taskIdsInProgress = new ColumnData();
        columnDataRepository.save(taskIdsInProgress);

        ColumnData taskIdsStuck = new ColumnData();
        taskIdsStuck.addToTaskList("2");
        columnDataRepository.save(taskIdsStuck);

        ColumnData taskIdsDone = new ColumnData();
        columnDataRepository.save(taskIdsDone);
    }
}
