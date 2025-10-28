package com.e_wallet.fundfast.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.e_wallet.fundfast.model.Role;
import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User login(User user) throws Exception {
        if (user.getUsername() == null || user.getUsername().isEmpty())
            throw new IllegalArgumentException("Username is required !");
        if (user.getPassword() == null || user.getPassword().isEmpty())
            throw new IllegalArgumentException("Password is required !");
        if (!userRepository.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Invalid username !");
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (!passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword()))
            throw new IllegalArgumentException("Invalid password !");
        return existingUser.get();
    }

    public User register(User user) throws Exception {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Username already exist !");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        return userRepository.save(user);
    }

}
