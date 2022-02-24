package com.codeclan.example.application_server;

import com.codeclan.example.application_server.models.Project;
import com.codeclan.example.application_server.models.Sprint;
import com.codeclan.example.application_server.models.Task;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ApplicationServerApplicationTests {

	private Sprint sprint;
	private Task task;
	private Project project;

	@Test
	void contextLoads() {
	}

//	@Test
//	public void canGetTaskFromBacklog(){
//		project = new Project("project3");
//		task = new Task("Backlog Task1", project);
//		project.addTask(task);
//		Date date = new Date();
//		sprint = new Sprint(date, 3, project);

//		assertEquals(0, sprint.getTasks().size());
//		assertEquals(task, project.getProductBacklog().get(0));

//		sprint.getTaskFromBacklog(project,0);

//		assertEquals(task, sprint.getTasks().get(0));
//		assertEquals(0, project.getProductBacklog().size());
//	}

}
