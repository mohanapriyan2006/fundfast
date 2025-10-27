package com.e_wallet.fundfast.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User login(User user) throws Exception {
        if(user.getUsername() == null || user.getUsername().isEmpty())
            throw new IllegalArgumentException("Username is required !");
        if(user.getPassword() == null || user.getPassword().isEmpty())
            throw new IllegalArgumentException("Password is required !");
        if (!userRepository.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Invalid username !");
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
            throw new IllegalArgumentException("Invalid password !");
        return existingUser;
    }

    public User register(User user) throws Exception {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Username already exist !");
        Date now = new Date();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
   

}
