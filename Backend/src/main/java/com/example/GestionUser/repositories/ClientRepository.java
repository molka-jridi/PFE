package com.example.GestionUser.repositories;



import com.example.GestionUser.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
    // Tu pourras ajouter des filtres plus tard si nécessaire
}