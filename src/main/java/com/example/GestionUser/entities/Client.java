package com.example.GestionUser.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "dim_client", schema = "dw")
@Data
public class Client {

    @Id
    @Column(name = "cod_per")
    private String id; // C'est le PK

    @Column(name = "por_nom_car")
    private String nom; // Attention : tu peux renommer en quelque chose de plus clair si besoin

    @Column(name = "typ_por")
    private Integer typeClient; // typ-por

    @Column(name = "cod_age")
    private Integer codeAgence;

    @Column(name = "dat_ouv_cpt")
    private Date dateOuvertureCompte;

    @Column(name = "num_car")
    private Long numeroCarte;

    @Column(name = "num_cre")
    private Integer numeroCredit;

    @Column(name = "num_cpt")
    private Long numeroCompte;
}

