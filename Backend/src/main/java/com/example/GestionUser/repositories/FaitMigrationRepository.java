package com.example.GestionUser.repositories;

import com.example.GestionUser.entities.FaitMigration;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FaitMigrationRepository extends JpaRepository<FaitMigration, String> {

    // Trouver par numéro de carte
    List<FaitMigration> findByNumeroCarte(Long numeroCarte);

    // Trouver toutes les migrations effectuées (estMigre = true)
    List<FaitMigration> findByEstMigreTrue();

    // Trouver toutes les migrations avec un score de risque supérieur à un seuil
    List<FaitMigration> findByScoreMoyenRisqueMigrationGreaterThan(double score);
    @Transactional
    @Modifying
    @Query("DELETE FROM FaitMigration f WHERE f.codPer = :clientId")
    void deleteByClientId(@Param("clientId") String clientId);
}

