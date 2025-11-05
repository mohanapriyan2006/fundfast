package com.e_wallet.fundfast.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e_wallet.fundfast.model.Transaction;
import com.e_wallet.fundfast.model.TransactionType;
import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.model.Wallet;
import com.e_wallet.fundfast.repository.TransactionRepository;
import com.e_wallet.fundfast.repository.UserRepository;
import com.e_wallet.fundfast.repository.WalletRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public Wallet createWallet(Long user_id, Wallet wallet) throws Exception {
        User user = userRepository.findById(user_id).orElse(null);
        if (user != null) {
            wallet.setOwner(user);
            return walletRepository.save(wallet);
        } else
            throw new IllegalArgumentException("User not found with id: " + user_id);
    }

    public List<Wallet> getAllWallet() {
        return walletRepository.findAll();
    }

    public Optional<Wallet> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    public List<Wallet> getWalletByOwnerId(Long ownerId) {
        return walletRepository.findByOwnerId(ownerId);
    }

    @Transactional
    public void deleteWallet(Long id) {
        Wallet wallet = walletRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Wallet not found with id: " + id));
        transactionRepository.deleteByFromWallet_IdOrToWallet_Id(id, id);
        walletRepository.delete(wallet);
    }

    public Wallet updateWallet(Long id, Wallet wallet) throws Exception {
        Wallet existingWallet = walletRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Wallet not found!"));

        if (wallet.getWalletName() != null) existingWallet.setWalletName(wallet.getWalletName());
        return walletRepository.save(existingWallet);
    }

    public Wallet deposit(Long id, Double amount) throws Exception {
        Wallet wallet = walletRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Wallet not found!"));
        if (amount == null || amount <= 0)
            throw new IllegalArgumentException("Deposit amount must be positive!");
        Double cur_amt = wallet.getBalance() == null ? 0.0 : wallet.getBalance();
        wallet.setBalance(cur_amt + amount);
        Wallet saved = walletRepository.save(wallet);

        Transaction transaction = new Transaction();
        transaction.setToWallet(wallet);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.DEPOSIT);
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return saved;
    }

    public Transaction transfer(Long fromWalletId, Long toWalletId, Double amount) throws Exception {
        Wallet fromWallet = walletRepository.findById(fromWalletId).orElse(null);
        Wallet toWallet = walletRepository.findById(toWalletId).orElse(null);
        if (amount == null || amount <= 0)
            throw new Exception("Transfer amount must be positive!");
        if (fromWallet == null || toWallet == null)
            throw new Exception("Wallet not found!");
        if (fromWallet.getBalance() < amount)
            throw new Exception("Insufficient balance!");

        fromWallet.setBalance(fromWallet.getBalance() - amount);
        toWallet.setBalance(toWallet.getBalance() + amount);
        walletRepository.save(fromWallet);
        walletRepository.save(toWallet);

        Transaction transaction = new Transaction();
        transaction.setFromWallet(fromWallet);
        transaction.setToWallet(toWallet);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.TRANSFER);
        transaction.setTimestamp(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

}
