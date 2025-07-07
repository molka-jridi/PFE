package com.example.GestionUser.controllers;


import com.example.GestionUser.entities.Client;
import com.example.GestionUser.repositories.ClientRepository;
import com.example.GestionUser.repositories.FaitMigrationRepository;
import com.example.GestionUser.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;
    private final ClientRepository clientRepository;
    private final FaitMigrationRepository faitMigrationRepository;

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ANALYSTE')")
    public List<Client> getAllClients() {
        return clientService.findAll();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Client createClient(@RequestBody Client client) {
        return clientService.save(client);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Client updateClient(@PathVariable String id, @RequestBody Client updatedClient) {
        return clientService.update(id, updatedClient);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            faitMigrationRepository.deleteByClientId(id); // supprime les faits liés
            clientRepository.deleteById(id); // ensuite le client
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la suppression : " + e.getMessage());
        }
    }
}
