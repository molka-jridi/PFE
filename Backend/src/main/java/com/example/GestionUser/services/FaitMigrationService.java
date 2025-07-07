package com.example.GestionUser.services;

import com.example.GestionUser.entities.FaitMigration;
import com.example.GestionUser.repositories.DimCreditRepository;
import com.example.GestionUser.repositories.FaitMigrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaitMigrationService {

    private final FaitMigrationRepository faitMigrationRepository;
    private final DimCreditRepository dimCreditRepository;

    public List<FaitMigration> getAllFaitMigrations() {
        return faitMigrationRepository.findAll();
    }

    public Optional<FaitMigration> getFaitMigrationById(String codPer) {
        return faitMigrationRepository.findById(codPer);
    }

    public List<FaitMigration> getFaitMigrationsByNumCar(Long numCar) {
        return faitMigrationRepository.findByNumeroCarte(numCar);
    }

    public List<FaitMigration> getMigrationsEffectuees() {
        return faitMigrationRepository.findByEstMigreTrue();
    }

    public List<FaitMigration> getFaitMigrationsParScore(double score) {
        return faitMigrationRepository.findByScoreMoyenRisqueMigrationGreaterThan(score);
    }

    public FaitMigration createFaitMigration(FaitMigration faitMigration) {
        return faitMigrationRepository.save(faitMigration);
    }

    public FaitMigration updateFaitMigration(String codPer, FaitMigration updated) {
        return faitMigrationRepository.findById(codPer)
                .map(fait -> {
                    fait.setNomClient(updated.getNomClient());
                    fait.setAncienneteClient(updated.getAncienneteClient());
                    fait.setTauxCartesAnnulees(updated.getTauxCartesAnnulees());
                    fait.setMontantTotalCredits(updated.getMontantTotalCredits());
                    fait.setDureeMoyenneCredits(updated.getDureeMoyenneCredits());
                    fait.setTauxDefaultCredit(updated.getTauxDefaultCredit());
                    fait.setTauxCartesActives(updated.getTauxCartesActives());
                    fait.setNombreReProduits(updated.getNombreReProduits());
                    fait.setScoreMoyenRisqueMigration(updated.getScoreMoyenRisqueMigration());
                    fait.setEstMigre(updated.getEstMigre());
                    fait.setDateMigration(updated.getDateMigration());
                    fait.setDureeAvantMigration(updated.getDureeAvantMigration());
                    return faitMigrationRepository.save(fait);
                })
                .orElseThrow(() -> new RuntimeException("FaitMigration non trouvé avec cod_per = " + codPer));
    }

    public void deleteFaitMigration(String codPer) {
        faitMigrationRepository.deleteById(codPer);
    }

    // === KPI POUR DASHBOARD ===

    // 1. Répartition Migrés vs Non Migrés
    public Map<String, Long> getRepartitionMigres() {
        List<FaitMigration> all = faitMigrationRepository.findAll();
        long migres = all.stream().filter(FaitMigration::getEstMigre).count();
        long nonMigres = all.size() - migres;
        return Map.of("Migrés", migres, "Non Migrés", nonMigres);
    }

    // 2. Score moyen par ancienneté
    public Map<Integer, Double> getRisqueParAnciennete() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> f.getScoreMoyenRisqueMigration() != null)
                .collect(Collectors.groupingBy(
                        FaitMigration::getAncienneteClient,
                        Collectors.averagingDouble(f -> f.getScoreMoyenRisqueMigration().doubleValue())
                ));
    }

    // 3. Nombre de migrations par année (bar chart)
    public Map<Integer, Long> getNbMigrationsParAnnee() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> Boolean.TRUE.equals(f.getEstMigre()) && f.getDateMigration() != null)
                .collect(Collectors.groupingBy(
                        f -> f.getDateMigration().getYear(),
                        Collectors.counting()
                ));
    }

    // 4. Moyenne du taux de défaut par ancienneté
    public Map<Integer, Double> getTauxDefaultParAnciennete() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> f.getTauxDefaultCredit() != null)
                .collect(Collectors.groupingBy(
                        FaitMigration::getAncienneteClient,
                        Collectors.averagingDouble(f -> f.getTauxDefaultCredit().doubleValue())
                ));
    }

    // 5. Répartition des durées avant migration
    public Map<Integer, Long> getRepartitionParDureeAvantMigration() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> f.getDureeAvantMigration() != null)
                .collect(Collectors.groupingBy(
                        FaitMigration::getDureeAvantMigration,
                        Collectors.counting()
                ));
    }

    // 6. Répartition des clients selon leur ancienneté (histogramme)
    public Map<Integer, Long> getRepartitionParAnciennete() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> f.getAncienneteClient() != null)
                .collect(Collectors.groupingBy(
                        FaitMigration::getAncienneteClient,
                        Collectors.counting()
                ));
    }

    // 7. Moyenne du taux de cartes annulées par ancienneté
    public Map<Integer, Double> getTauxCartesAnnuleesParAnciennete() {
        return faitMigrationRepository.findAll().stream()
                .filter(f -> f.getTauxCartesAnnulees() != null)
                .collect(Collectors.groupingBy(
                        FaitMigration::getAncienneteClient,
                        Collectors.averagingDouble(f -> f.getTauxCartesAnnulees().doubleValue())
                ));
    }
    // 8. Statistiques globales : total, migrés, taux
    public Map<String, Object> getStatistiquesGlobales() {
        List<FaitMigration> all = faitMigrationRepository.findAll();
        long total = all.size();
        long migres = all.stream().filter(FaitMigration::getEstMigre).count();
        double taux = total > 0 ? (migres * 100.0 / total) : 0.0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalClients", total);
        stats.put("migratedClients", migres);
        stats.put("migrationRate", Math.round(taux * 100.0) / 100.0); // arrondi à 2 décimales
        return stats;
    }
    public Map<String, Double> getMontantParStatutCredit() {
        return dimCreditRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        credit -> credit.getStatutCredit() != null ? credit.getStatutCredit() : "Inconnu",
                        Collectors.summingDouble(
                                credit -> credit.getMntCre() != null ? credit.getMntCre().doubleValue() : 0.0
                        )
                ));
    }

}
