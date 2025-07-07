package com.example.GestionUser.services;

import com.example.GestionUser.entities.DimCarte;
import com.example.GestionUser.repositories.DimCarteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DimCarteService {

    private final DimCarteRepository repository;

    public List<DimCarte> findAll() {
        return repository.findAll();
    }

    public DimCarte save(DimCarte carte) {
        return repository.save(carte);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
