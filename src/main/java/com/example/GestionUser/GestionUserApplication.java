package com.example.GestionUser;

import com.example.GestionUser.entities.Role;
import com.example.GestionUser.repositories.RoleRepository;
import com.example.GestionUser.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class GestionUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionUserApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {
			Role adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> {
				Role r = new Role();
				r.setName("ADMIN");
				return roleRepository.save(r);
			});

			Role analysteRole = roleRepository.findByName("ANALYSTE").orElseGet(() -> {
				Role r = new Role();
				r.setName("ANALYSTE");
				return roleRepository.save(r);
			});

			userRepository.findByEmail("admin@gmail.com").ifPresent(user -> {
				if (user.getRoles().stream().noneMatch(r -> r.getName().equals("ADMIN"))) {
					user.getRoles().add(adminRole);
					userRepository.save(user);
					System.out.println("✅ Rôle ADMIN ajouté à admin@gmail.com");
				}
			});
		};
	}






}
