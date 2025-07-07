package com.example.GestionUser.services;

import com.example.GestionUser.entities.DimCredit;
import com.example.GestionUser.repositories.DimCreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DimCreditService {

    private final DimCreditRepository repository;

    public List<DimCredit> findAll() {
        return repository.findAll();
    }

    public DimCredit save(DimCredit credit) {
        return repository.save(credit);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
