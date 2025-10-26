package com.e_wallet.fundfast.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e_wallet.fundfast.model.Transaction;
import com.e_wallet.fundfast.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction creatTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public void deleteTransaction(Long id){
        transactionRepository.deleteById(id);
    }

    public Transaction updateTransaction(Long id , Transaction transaction){
        if(transactionRepository.existsById(id)){
            return transactionRepository.save(transaction);
        }else{
            return null;
        }
    }

}
