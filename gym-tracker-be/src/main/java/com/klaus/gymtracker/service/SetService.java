package com.klaus.gymtracker.service;

import com.klaus.gymtracker.dao.SetRepository;
import com.klaus.gymtracker.entity.Set;
import com.klaus.gymtracker.entity.Training;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SetService {

    @Autowired
    private SetRepository setRepository;

    @Autowired
    private TrainingService trainingService;

    public Optional<Set> getSetById(Long setId) {
        return setRepository.findById(setId);
    }

    public List<Set> getSetsByTraining(Long trainingId) {
        return setRepository.findByTrainingId(trainingId);
    }

    public Set createSet(Long trainingId, Set set) {
        Optional<Training> training = trainingService.getTrainingById(trainingId);
        if (training.isPresent()) {
            set.setTraining(training.get());
            return setRepository.save(set);
        }
        throw new IllegalArgumentException("Training not found with ID: " + trainingId);
    }

    public Set updateSet(Long setId, Set updatedSet) {
        Optional<Set> existingSet = setRepository.findById(setId);
        if (existingSet.isPresent()) {
            Set set = existingSet.get();
            if (updatedSet.getSetNumber() > 0) {
                set.setSetNumber(updatedSet.getSetNumber());
            }
            if (updatedSet.getWeight() >= 0) {
                set.setWeight(updatedSet.getWeight());
            }
            if (updatedSet.getReps() > 0) {
                set.setReps(updatedSet.getReps());
            }
            if (updatedSet.getNotes() != null) {
                set.setNotes(updatedSet.getNotes());
            }
            return setRepository.save(set);
        }
        throw new IllegalArgumentException("Set not found with ID: " + setId);
    }

    public void deleteSet(Long setId) {
        setRepository.deleteById(setId);
    }
}
