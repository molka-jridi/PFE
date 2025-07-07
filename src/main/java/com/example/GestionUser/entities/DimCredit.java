package com.example.GestionUser.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "dim_credit", schema = "dw")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DimCredit {

    @Id
    @Column(name = "num_cre")
    private Long numCre;

    @Column(name = "num_cpt_deb")
    private Long numCptDeb;

    @Column(name = "statut_credit", length = 100)
    private String statutCredit;

    @Column(name = "mnt_cre", precision = 15, scale = 2)
    private BigDecimal mntCre;

    @Column(name = "tau_int", precision = 5, scale = 2)
    private BigDecimal tauInt;

    @Column(name = "dur_rem")
    private Integer durRem;
}
