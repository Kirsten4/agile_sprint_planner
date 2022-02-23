package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<User, Long> {
}
