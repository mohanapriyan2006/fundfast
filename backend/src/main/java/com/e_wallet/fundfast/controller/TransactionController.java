package com.e_wallet.fundfast.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_wallet.fundfast.repository.TransactionRepository;
import com.e_wallet.fundfast.model.Transaction;
import com.e_wallet.fundfast.service.TransactionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/test")
    public String testTransaction() {
        return "Transaction API works.";
    }

    // @PostMapping
    // public Transaction createTransaction(@RequestBody Transaction transaction) {
    // return transactionService.createTransaction(transaction);
    // }

    @GetMapping("/all")
    public List<Transaction> getAllTransaction(@RequestParam(required = false) Integer pageNo,
            @RequestParam(required = false) Integer pageSize, @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        if (pageNo == null && pageSize == null && sortBy == null && sortDir == null)
            return transactionService.getAllTransaction();
        return transactionService.getAllTransactionPageAndSort(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/walletId/{walletId}")
    public List<Transaction> getTransactionByWalletId(@PathVariable Long walletId,
            @RequestParam(required = false) Integer pageNo,
            @RequestParam(required = false) Integer pageSize, @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        if (pageNo == null && pageSize == null && sortBy == null && sortDir == null)
            transactionService.getTransactionByWalletId(walletId);
        return transactionService.getTransactionByWalletIdPageAndSort(walletId, pageNo, pageSize, sortBy, sortDir);
    }

    // @PutMapping("/{id}")
    // public Transaction updateTransaction(@PathVariable Long id, @RequestBody
    // Transaction transaction) {
    // return transactionService.updateTransaction(id, transaction);
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
    // Optional<Transaction> existing = transactionService.getTransactionById(id);
    // if (existing.isPresent()) {
    // transactionService.deleteTransaction(id);
    // return ResponseEntity.ok("Transaction deleted successfully");
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not
    // found!");
    // }
    // }

}
