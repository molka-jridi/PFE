package com.example.GestionUser.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fait_migration_client", schema = "dw")
@Data
public class FaitMigration {

    @Id
    @Column(name = "cod_per")
    private String codPer;

    @Column(name = "nom_client")
    private String nomClient;

    @Column(name = "num_cpt")
    private Long numeroCompte;

    @Column(name = "num_car")
    private Long numeroCarte;

    @Column(name = "num_cre")
    private Long numeroCredit;

    @Column(name = "anciennete_client")
    private Integer ancienneteClient;

    @Column(name = "taux_cartes_annulees")
    private BigDecimal tauxCartesAnnulees;

    @Column(name = "mnt_total_credits")
    private BigDecimal montantTotalCredits;

    @Column(name = "duree_moy_credits")
    private BigDecimal dureeMoyenneCredits;

    @Column(name = "tx_default_credit")
    private BigDecimal tauxDefaultCredit;

    @Column(name = "tx_cartes_actives")
    private BigDecimal tauxCartesActives;

    @Column(name = "nb_re_produits")
    private Integer nombreReProduits;

    @Column(name = "score_moyen_risque_migration")
    private BigDecimal scoreMoyenRisqueMigration;

    @Column(name = "est_migre")
    private Boolean estMigre;

    @Column(name = "date_migration")
    private LocalDate dateMigration;

    @Column(name = "duree_avant_migration")
    private Integer dureeAvantMigration;
}
