package com.e_wallet.fundfast.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_wallet.fundfast.model.Transaction;
import com.e_wallet.fundfast.model.Wallet;
import com.e_wallet.fundfast.service.WalletService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/test")
    public String testWallet() {
        return "Wallet API works.";
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/{user_id}")
    public ResponseEntity<?> createWallet(@PathVariable Long user_id, @RequestBody Wallet wallet) {
        try {
            return ResponseEntity.ok(walletService.createWallet(user_id, wallet));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Wallet> getAllWallet() {
        return walletService.getAllWallet();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public Optional<Wallet> getWalletById(@PathVariable Long id) {
        return walletService.getWalletById(id);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ownerId/{ownerId}")
    public List<Wallet> getWalletByOwnerId(@PathVariable Long ownerId) {
        return walletService.getWalletByOwnerId(ownerId);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWallet(@PathVariable Long id, @RequestBody Wallet wallet) {
        try {
            return ResponseEntity.ok(walletService.updateWallet(id, wallet));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage().toString());
        }
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/{id}/deposit")
    public ResponseEntity<?> deposit(@PathVariable Long id, @RequestParam Double amount) {
        try {
            Wallet updatedWallet = walletService.deposit(id, amount);
            return ResponseEntity.ok(updatedWallet);
        } catch (Exception e) {
            if (e instanceof IllegalArgumentException)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/{fromWallet_id}/transfer/{toWallet_id}")
    public ResponseEntity<?> transfer(@PathVariable Long fromWallet_id, @PathVariable Long toWallet_id,
            @RequestParam Double amount) {
        try {
            Transaction transaction = walletService.transfer(fromWallet_id, toWallet_id, amount);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wallet not found!");
            } else if (e.getMessage().contains("Insufficient balance")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance in the fromWallet!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        }
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWallet(@PathVariable Long id) {
        try {
            walletService.deleteWallet(id);
            return ResponseEntity.ok("Wallet and its transactions deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete wallet: " + e.getMessage());
        }
    }

}
