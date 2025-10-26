package com.e_wallet.fundfast.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String testWallet(){
        return "Wallet API works.";
    }

    @PostMapping
    public Wallet createWallet(@RequestBody Wallet wallet) {
        return walletService.creatWallet(wallet);
    }

    @GetMapping("/all")
    public List<Wallet> getAllWallet() {
        return walletService.getAllWallet();
    }

    @GetMapping("/{id}")
    public Optional<Wallet> getWalletById(@PathVariable Long id) {
        return walletService.getWalletById(id);
    }

    @PutMapping("/{id}")
    public Wallet updateWallet(@PathVariable Long id, @RequestBody Wallet wallet) {
        return walletService.updateWallet(id, wallet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWallet(@PathVariable Long id) {
        Optional<Wallet> existing = walletService.getWalletById(id);
        if (existing.isPresent()) {
            walletService.deleteWallet(id);
            return ResponseEntity.ok("Wallet deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wallet not found!");
        }
    }

}
