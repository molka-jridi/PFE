package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.DimCarte;
import com.example.GestionUser.services.DimCarteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dimcarte")
@RequiredArgsConstructor
public class DimCarteController {

    private final DimCarteService service;

    @GetMapping("/all")
    public List<DimCarte> getAll() {
        return service.findAll();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCarte create(@RequestBody DimCarte carte) {
        return service.save(carte);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCarte update(@PathVariable Long id, @RequestBody DimCarte carte) {
        carte.setNumCar(id);
        return service.save(carte);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
