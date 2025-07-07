package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.Role;
import com.example.GestionUser.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class RoleController {

    private final RoleRepository roleRepository;


    @GetMapping
    public List<Role> getAll() {
        return roleRepository.findAll();
    }
}
