package com.example.GestionUser.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "dim_carte", schema = "dw")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DimCarte {

    @Id
    @Column(name = "num_car")
    private Long numCar;

    @Column(name = "cod_sta")
    private Integer codSta;

    @Column(name = "dat_fin_val")
    private LocalDate datFinVal;

    @Column(name = "pla_aut_pai")
    private Integer plaAutPai;

    @Column(name = "pla_aut_ret")
    private Integer plaAutRet;

    @Column(name = "annule")
    private Boolean annule;

    @Column(name = "date_migration")
    private LocalDate dateMigration;
}
