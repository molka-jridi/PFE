package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.DimCredit;
import com.example.GestionUser.services.DimCreditService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dimcredit")
@RequiredArgsConstructor
public class DimCreditController {

    private final DimCreditService service;

    @GetMapping("/all")
    public List<DimCredit> getAll() {
        return service.findAll();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCredit create(@RequestBody DimCredit credit) {
        return service.save(credit);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public DimCredit update(@PathVariable Long id, @RequestBody DimCredit credit) {
        credit.setNumCre(id);
        return service.save(credit);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
