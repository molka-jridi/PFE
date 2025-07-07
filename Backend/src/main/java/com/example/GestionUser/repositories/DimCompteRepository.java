package com.example.GestionUser.repositories;

import com.example.GestionUser.entities.DimCompte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DimCompteRepository extends JpaRepository<DimCompte, Long> {
}