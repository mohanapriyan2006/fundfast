package com.e_wallet.fundfast.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.e_wallet.fundfast.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select t from Transaction t where t.fromWallet.id = :walletId or t.toWallet.id = :walletId")
    List<Transaction> findByWalletId(@Param("walletId") Long walletId);

    @Query("select t from Transaction t where t.fromWallet.id = :walletId or t.toWallet.id = :walletId")
    Page<Transaction> findByWalletId(@Param("walletId") Long walletId, Pageable pageable);

    List<Transaction> findByFromWallet_Id(Long walletId);

    List<Transaction> findByToWallet_Id(Long walletId);

    void deleteByFromWallet_IdOrToWallet_Id(Long fromId, Long toId);

}