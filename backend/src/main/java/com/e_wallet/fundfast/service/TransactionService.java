package com.e_wallet.fundfast.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.e_wallet.fundfast.model.Transaction;
import com.e_wallet.fundfast.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // public Transaction createTransaction(Transaction transaction) {
    // return transactionRepository.save(transaction);
    // }

    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getAllTransactionPageAndSort(Integer pageNo, Integer pageSize, String sortBy,
            String sortDir) {
        if (sortBy == null || sortBy.isEmpty() || sortBy.equalsIgnoreCase("Time")) {
            sortBy = "timestamp";
        }
        if (sortDir == null || sortDir.isEmpty()) {
            sortDir = "DESC";
        }
        if (pageNo == null || pageNo < 0) {
            pageNo = 0;
        }
        if (pageSize == null || pageSize <= 0) {
            pageSize = 10;
        }
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return transactionRepository.findAll(PageRequest.of(pageNo, pageSize, sort)).getContent();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> getTransactionByWalletId(Long id) {
        return transactionRepository.findByWalletId(id);
    }

    public List<Transaction> getTransactionByWalletIdPageAndSort(Long id, Integer pageNo, Integer pageSize,
            String sortBy, String sortDir) {
        if (sortBy == null || sortBy.isEmpty() || sortBy.equalsIgnoreCase("Time")) {
            sortBy = "timestamp";
        }
        if (sortDir == null || sortDir.isEmpty()) {
            sortDir = "DESC";
        }
        if (pageNo == null || pageNo < 0) {
            pageNo = 0;
        }
        if (pageSize == null || pageSize <= 0) {
            pageSize = 10;
        }
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return transactionRepository.findByWalletId(id, PageRequest.of(pageNo, pageSize, sort)).getContent();
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    // public Transaction updateTransaction(Long id, Transaction transaction) {
    //     if (transactionRepository.existsById(id)) {
    //         return transactionRepository.save(transaction);
    //     } else {
    //         return null;
    //     }
    // }

}
