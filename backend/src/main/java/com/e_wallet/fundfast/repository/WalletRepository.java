package com.e_wallet.fundfast.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_wallet.fundfast.model.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Long, Wallet> {

}
