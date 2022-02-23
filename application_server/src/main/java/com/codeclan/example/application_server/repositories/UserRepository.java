package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
