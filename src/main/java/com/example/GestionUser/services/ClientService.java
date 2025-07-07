package com.example.GestionUser.services;

import com.example.GestionUser.entities.Client;
import com.example.GestionUser.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public Client update(String id, Client updatedClient) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        client.setNom(updatedClient.getNom());
        client.setTypeClient(updatedClient.getTypeClient());
        client.setCodeAgence(updatedClient.getCodeAgence());
        client.setDateOuvertureCompte(updatedClient.getDateOuvertureCompte());
        client.setNumeroCarte(updatedClient.getNumeroCarte());
        client.setNumeroCredit(updatedClient.getNumeroCredit());
        client.setNumeroCompte(updatedClient.getNumeroCompte());
        return clientRepository.save(client);
    }

    public void delete(String id) {
        clientRepository.deleteById(id);
    }
}