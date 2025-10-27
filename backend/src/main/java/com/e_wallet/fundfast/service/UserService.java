package com.e_wallet.fundfast.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) throws Exception {
        if (userRepository.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Username already exist !");
        Date now = new Date();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        return userRepository.save(user);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User user) {
        if (userRepository.existsById(id)) {
            Date now = new Date();
            user.setId(id);
            user.setUpdatedAt(now);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

}
