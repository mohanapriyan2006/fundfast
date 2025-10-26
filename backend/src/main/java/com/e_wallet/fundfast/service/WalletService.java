package com.e_wallet.fundfast.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e_wallet.fundfast.model.Wallet;
import com.e_wallet.fundfast.repository.WalletRepository;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    public Wallet creatWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public List<Wallet> getAllWallet() {
        return walletRepository.findAll();
    }

    public Optional<Wallet> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    public void deleteWallet(Long id){
        walletRepository.deleteById(id);
    }

    public Wallet updateWallet(Long id , Wallet wallet){
        if(walletRepository.existsById(id)){
            return walletRepository.save(wallet);
        }else{
            return null;
        }
    }

}
