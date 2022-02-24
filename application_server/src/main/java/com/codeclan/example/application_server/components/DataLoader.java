package com.codeclan.example.application_server.components;

import com.codeclan.example.application_server.models.*;
import com.codeclan.example.application_server.repositories.ColumnDataRepository;
import com.codeclan.example.application_server.repositories.ProjectRepository;
import com.codeclan.example.application_server.repositories.TaskRepository;
import com.codeclan.example.application_server.repositories.UserRepository;
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

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    public DataLoader() {
    }

    public void run(ApplicationArguments args) {
        Task checkIn = new Task("Check in");
        taskRepository.save(checkIn);
        Task checkOut = new Task("Check out");
        taskRepository.save(checkOut);
        Task makeReservation = new Task("Make reservation");
        taskRepository.save(makeReservation);

        ColumnData taskIdsToDo = new ColumnData("To Do");
        taskIdsToDo.addToTaskList("1");
        taskIdsToDo.addToTaskList("3");
        columnDataRepository.save(taskIdsToDo);
        ColumnData taskIdsInProgress = new ColumnData("In Progress");
        columnDataRepository.save(taskIdsInProgress);
        ColumnData taskIdsStuck = new ColumnData("Stuck");
        taskIdsStuck.addToTaskList("2");
        columnDataRepository.save(taskIdsStuck);
        ColumnData taskIdsDone = new ColumnData("Done");
        columnDataRepository.save(taskIdsDone);

        User kirsten = new User("Kirsten", "Kirsten4", "kirsten@fake.com", Role.PRODUCT_OWNER);
        userRepository.save(kirsten);
        User david = new User("David", "David2", "david@fake.com", Role.DEVELOPER);
        userRepository.save(david);
        User duncan = new User("Duncan", "Duncan1", "duncan@fake.com", Role.SCRUM_MASTER);
        userRepository.save(duncan);
        User linda = new User("Linda", "Linda3", "linda@fake.com", Role.ADMIN);
        userRepository.save(linda);

        Project project1 = new Project("Project 1");
        project1.addUser(kirsten);
        project1.addUser(duncan);
        projectRepository.save(project1);
        Project project2 = new Project("Project 2");
        project2.addUser(david);
        projectRepository.save(project2);
    }
}
