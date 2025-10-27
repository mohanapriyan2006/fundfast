package com.e_wallet.fundfast.controller;

import java.sql.Connection;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_wallet.fundfast.repository.TransactionRepository;
import com.e_wallet.fundfast.repository.UserRepository;
import com.e_wallet.fundfast.repository.WalletRepository;

@RestController
@RequestMapping
public class HealthController {

    @Value("${spring.application.name:fundfast}")
    private String appName;

    @Value("${server.port:8080}")
    private String port;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public String check() {
        return "Fundfast API running... (in above url add '/swagger-ui.html' or '/api/health')";
    }

    /**
     * Health check endpoint.
     * Returns JSON with:
     * - status: UP or DOWN
     * - timestamp: current instant
     * - application, port
     * - database: UP/DOWN and product info (if available)
     * - counts: users, wallets, transactions (best-effort)
     */
    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> info = new LinkedHashMap<>();
        String overall = "UP";

        info.put("application", appName);
        info.put("timestamp", Instant.now().toString());
        info.put("port", port);

        // Database connectivity check
        try (Connection c = dataSource.getConnection()) {
            String product = c.getMetaData().getDatabaseProductName();
            String version = c.getMetaData().getDatabaseProductVersion();
            info.put("database", "UP");
            info.put("databaseProduct", product + " " + version);
        } catch (Exception ex) {
            info.put("database", "DOWN");
            info.put("databaseError", ex.getMessage());
            overall = "DOWN";
        }

        // Repository counts (best-effort)
        try {
            info.put("userCount", userRepository.count());
        } catch (Exception ex) {
            info.put("userCountError", ex.getMessage());
            overall = "DOWN";
        }

        try {
            info.put("walletCount", walletRepository.count());
        } catch (Exception ex) {
            info.put("walletCountError", ex.getMessage());
            overall = "DOWN";
        }

        try {
            info.put("transactionCount", transactionRepository.count());
        } catch (Exception ex) {
            info.put("transactionCountError", ex.getMessage());
            // don't force overall DOWN for a single count failure
        }

        info.put("status", overall);
        return ResponseEntity.ok(info);
    }

}
