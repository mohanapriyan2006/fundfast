package com.e_wallet.fundfast.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.model.Wallet;
import com.e_wallet.fundfast.repository.TransactionRepository;
import com.e_wallet.fundfast.repository.UserRepository;
import com.e_wallet.fundfast.repository.WalletRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;

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

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        List<Wallet> wallets = walletRepository.findByOwnerId(userId);

        for (Wallet w : wallets) {
            Long walletId = w.getId();
            if (walletId != null) {
                transactionRepository.deleteByFromWallet_IdOrToWallet_Id(walletId, walletId);
            }
        }
        if (!wallets.isEmpty()) {
            walletRepository.deleteAll(wallets);
        }
        userRepository.delete(user);
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
