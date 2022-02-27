package com.codeclan.example.application_server.repositories;

import com.codeclan.example.application_server.models.ColumnData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColumnDataRepository extends JpaRepository<ColumnData, Long> {

    List<ColumnData> findBySprintId(Long projectId);
}
