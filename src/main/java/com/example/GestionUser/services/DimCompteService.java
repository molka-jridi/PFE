package com.example.GestionUser.services;

import com.example.GestionUser.entities.DimCompte;
import com.example.GestionUser.repositories.DimCompteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DimCompteService {

    private final DimCompteRepository repository;

    public List<DimCompte> findAll() {
        return repository.findAll();
    }

    public DimCompte save(DimCompte compte) {
        return repository.save(compte);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
