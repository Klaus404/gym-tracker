package com.klaus.gymtracker.dao;

import com.klaus.gymtracker.entity.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetRepository extends JpaRepository<Set, Long> {

    @Query("SELECT s FROM Set s WHERE s.training.id = :trainingId ORDER BY s.setNumber ASC")
    List<Set> findByTrainingId(@Param("trainingId") Long trainingId);
}
