package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint, Long> {

    List<Sprint> findByProjectId(Long projectId);
}
