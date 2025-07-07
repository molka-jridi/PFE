package com.example.GestionUser.controllers;

import com.example.GestionUser.entities.User;
import com.example.GestionUser.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/create-analyst")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> createAnalyst(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveAnalyst(user));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> updateAnalyst(@PathVariable Integer id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateAnalyst(id, user));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upgrade/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> upgradeToAdmin(@PathVariable Integer id) {
        User updatedUser = userService.upgradeToAdmin(id);
        return ResponseEntity.ok(updatedUser); // ✅ renvoyer l'objet User
    }
    @PostMapping("/downgrade/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> downgradeToAnalyst(@PathVariable Integer id) {
        User updatedUser = userService.downgradeToAnalyst(id);
        return ResponseEntity.ok(updatedUser);
    }

}
