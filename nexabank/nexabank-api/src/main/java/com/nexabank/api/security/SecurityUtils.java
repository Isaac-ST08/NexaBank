package com.nexabank.api.security;

import com.nexabank.api.model.User;
import com.nexabank.api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Utilidades para obtener el usuario que hizo la petición.
 *
 * Firebase usa un UID como principal, mientras que NexaBank
 * tiene sus propios IDs (por ejemplo USR-000001).
 *
 * Para trabajar con los datos del seed buscamos primero por UID
 * y, si no existe, por correo electrónico.
 */
@Component
public class SecurityUtils {

    private final UserRepository userRepository;

    public SecurityUtils(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getCurrentUserId() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            throw new IllegalStateException(
                    "No authenticated user"
            );
        }

        String firebaseUid =
                authentication.getPrincipal().toString();

        // Si en el futuro guardamos el UID de Firebase
        // como ID de usuario, esto permite encontrarlo.
        if (userRepository.findById(firebaseUid).isPresent()) {
            return firebaseUid;
        }

        String email = getCurrentUserEmail();

        if (email != null) {
            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            if (user != null) {
                return user.getId();
            }
        }

        // Usuario autenticado pero todavía no creado
        // en la colección users.
        return firebaseUid;
    }

    public String getCurrentUserEmail() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null) {
            return null;
        }

        Object credentials =
                authentication.getCredentials();

        return credentials != null
                ? credentials.toString()
                : null;
    }
}
