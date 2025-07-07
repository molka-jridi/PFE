package com.example.GestionUser.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "dim_compte", schema = "dw")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DimCompte {

    @Id
    @Column(name = "num_cpt")
    private Long numCpt;

    @Column(name = "dat_ouv_cpt")
    private LocalDate datOuvCpt;

    @Column(name = "cod_dev", length = 10)
    private String codDev;

}
