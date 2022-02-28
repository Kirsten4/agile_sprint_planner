package com.codeclan.example.application_server.components;

import com.codeclan.example.application_server.models.*;
import com.codeclan.example.application_server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;

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

    @Autowired
    SprintRepository sprintRepository;

    public DataLoader() {
    }

    public void run(ApplicationArguments args) {
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
        project2.addUser(kirsten);
        project2.addUser(david);
        projectRepository.save(project2);
        ColumnData backlogProject2 = new ColumnData("Backlog", null, project2);
        columnDataRepository.save(backlogProject2);

        Date date = new Date();
        Sprint sprint1 = new Sprint(date, 2, project1);
        sprintRepository.save(sprint1);

        Task checkIn = new Task("Check in", project2);
        sprint1.getTaskFromBacklog(checkIn.getProject(),checkIn);
        checkIn.addUser(david);
        taskRepository.save(checkIn);
        Task checkOut = new Task("Check out", project2);
        sprint1.getTaskFromBacklog(checkOut.getProject(),checkOut);
        checkOut.addUser(david);
        taskRepository.save(checkOut);
        Task makeReservation = new Task("Make reservation", project2);
        sprint1.getTaskFromBacklog(makeReservation.getProject(),makeReservation);
        makeReservation.addUser(kirsten);
        taskRepository.save(makeReservation);
        Task backlogTask1 = new Task("Backlog Task1", project1);
        taskRepository.save(backlogTask1);
        Task backlogTask2 = new Task("Backlog Task2", project1);
        taskRepository.save(backlogTask2);
        ColumnData backlogProject1 = new ColumnData("Backlog", null, project1);
        backlogProject1.addToTaskList(5L);
        backlogProject1.addToTaskList(4L);
        columnDataRepository.save(backlogProject1);
//        project1.addBacklogOrder(backlogTask2.getId());
//        project1.addBacklogOrder(backlogTask1.getId());
        projectRepository.save(project1);

        ColumnData toDo = new ColumnData("To Do", sprint1, null);
        toDo.addToTaskList(1L);
        toDo.addToTaskList(3L);
        columnDataRepository.save(toDo);
        ColumnData inProgress = new ColumnData("In Progress", sprint1, null);
        columnDataRepository.save(inProgress);
        ColumnData stuck = new ColumnData("Stuck", sprint1, null);
        stuck.addToTaskList(2L);
        columnDataRepository.save(stuck);
        ColumnData done = new ColumnData("Done", sprint1, null);
        columnDataRepository.save(done);


    }
}
