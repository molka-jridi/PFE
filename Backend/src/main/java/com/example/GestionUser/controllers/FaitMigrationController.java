package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.FaitMigration;
import com.example.GestionUser.repositories.DimCreditRepository;
import com.example.GestionUser.services.FaitMigrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/faitmigrations")
@RequiredArgsConstructor
public class FaitMigrationController {

    private final FaitMigrationService faitMigrationService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public List<FaitMigration> getAllFaitMigrations() {
        return faitMigrationService.getAllFaitMigrations();
    }

    @GetMapping("/{codPer}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Optional<FaitMigration> getFaitMigrationById(@PathVariable String codPer) {
        return faitMigrationService.getFaitMigrationById(codPer);
    }

    @GetMapping("/carte/{numCar}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public List<FaitMigration> getFaitMigrationsByNumCar(@PathVariable Long numCar) {
        return faitMigrationService.getFaitMigrationsByNumCar(numCar);
    }

    @GetMapping("/effectuees")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public List<FaitMigration> getMigrationsEffectuees() {
        return faitMigrationService.getMigrationsEffectuees();
    }


    @GetMapping("/score/{score}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public List<FaitMigration> getMigrationsParScore(@PathVariable double score) {
        return faitMigrationService.getFaitMigrationsParScore(score);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public FaitMigration createFaitMigration(@RequestBody FaitMigration faitMigration) {
        return faitMigrationService.createFaitMigration(faitMigration);
    }

    @PutMapping("/{codPer}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public FaitMigration updateFaitMigration(@PathVariable String codPer, @RequestBody FaitMigration updatedFaitMigration) {
        return faitMigrationService.updateFaitMigration(codPer, updatedFaitMigration);
    }

    @DeleteMapping("/{codPer}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteFaitMigration(@PathVariable String codPer) {
        faitMigrationService.deleteFaitMigration(codPer);
    }

    // === ENDPOINTS POUR DASHBOARD ===

    @GetMapping("/stats/repartition")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<String, Long> getRepartitionMigrés() {
        return faitMigrationService.getRepartitionMigres();
    }

    @GetMapping("/stats/risque-par-anciennete")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Double> getRisqueParAnciennete() {
        return faitMigrationService.getRisqueParAnciennete();
    }

    @GetMapping("/stats/migrations-par-annee")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Long> getMigrationsParAnnee() {
        return faitMigrationService.getNbMigrationsParAnnee();
    }

    @GetMapping("/stats/taux-default-par-anciennete")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Double> getTauxDefaultParAnciennete() {
        return faitMigrationService.getTauxDefaultParAnciennete();
    }

    @GetMapping("/stats/repartition-par-duree-migration")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Long> getRepartitionParDureeMigration() {
        return faitMigrationService.getRepartitionParDureeAvantMigration();
    }

    @GetMapping("/stats/repartition-par-anciennete")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Long> getRepartitionParAnciennete() {
        return faitMigrationService.getRepartitionParAnciennete();
    }

    @GetMapping("/stats/taux-cartes-annulees-par-anciennete")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<Integer, Double> getTauxCartesAnnuleesParAnciennete() {
        return faitMigrationService.getTauxCartesAnnuleesParAnciennete();
    }
    @GetMapping("/stats/global")
    public ResponseEntity<Map<String, Object>> getStatistiquesGlobales() {
        return ResponseEntity.ok(faitMigrationService.getStatistiquesGlobales());
    }
    @GetMapping("/stats/montant-par-statut")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public Map<String, Double> getMontantParStatutCredit() {
        return faitMigrationService.getMontantParStatutCredit();
    }




}
