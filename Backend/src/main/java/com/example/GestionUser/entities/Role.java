package com.example.GestionUser.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
 @Entity
 @Table(name = "role", schema = "dw")
 @EntityListeners(AuditingEntityListener.class)
public class Role {
        @Id
        @GeneratedValue
        private Integer id;
        @Column(unique = true)
        private String name;
        @ManyToMany(mappedBy = "roles")
        @JsonIgnore
        private List<User> user;


        @CreatedDate
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdDate;

        @LastModifiedDate
        @Column(insertable = false)
        private LocalDateTime lastModifiedDate;

}
