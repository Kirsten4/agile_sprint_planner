package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByProjectsId(Long projectId);

    User findByUsername(String username);
}
