package com.example.GestionUser.services;

import com.example.GestionUser.entities.Role;
import com.example.GestionUser.entities.User;
import com.example.GestionUser.repositories.RoleRepository;
import com.example.GestionUser.repositories.TokenRepository;
import com.example.GestionUser.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;


    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User saveAnalyst(User user) {
        Role analystRole = roleRepository.findByName("ANALYSTE")
                .orElseThrow(() -> new RuntimeException("Rôle ANALYSTE introuvable"));

        user.setRoles(List.of(analystRole));
        user.setEnabled(true);              // ✅ activé par défaut
        user.setAccountLocked(false);       // ✅ non bloqué
        user.setPassword(passwordEncoder.encode(user.getPassword())); // ✅ mot de passe chiffré

        return userRepository.save(user);
    }

    public User updateAnalyst(Integer id, User updatedUser) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        existing.setFirstname(updatedUser.getFirstname());
        existing.setLastname(updatedUser.getLastname());

        return userRepository.save(existing);
    }


    @Transactional
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        tokenRepository.deleteAllByUser(user); // ✅ Supprimer les tokens liés
        user.setRoles(null); // ✅ Optionnel mais propre
        userRepository.delete(user);
    }


    public User upgradeToAdmin(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Rôle ADMIN introuvable"));

        if (!user.getRoles().contains(adminRole)) {
            user.getRoles().add(adminRole);
            user = userRepository.save(user);
        }

        return user;
    }
    public User downgradeToAnalyst(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Rôle ADMIN introuvable"));

        // Supprimer uniquement le rôle ADMIN
        user.getRoles().removeIf(role -> role.getName().equals("ADMIN"));

        return userRepository.save(user);
    }

}
