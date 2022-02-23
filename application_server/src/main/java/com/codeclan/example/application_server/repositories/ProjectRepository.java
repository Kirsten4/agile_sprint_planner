package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
