package com.e_wallet.fundfast.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_wallet.fundfast.model.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    public List<Wallet> findByOwnerId(Long ownerId);
}
