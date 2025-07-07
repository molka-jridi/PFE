package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.DimCompte;
import com.example.GestionUser.services.DimCompteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dimcompte")
@RequiredArgsConstructor
public class DimCompteController {

    private final DimCompteService service;

    @GetMapping("/all")
    public List<DimCompte> getAll() {
        return service.findAll();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCompte create(@RequestBody DimCompte compte) {
        return service.save(compte);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCompte update(@PathVariable Long id, @RequestBody DimCompte compte) {
        compte.setNumCpt(id);
        return service.save(compte);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
