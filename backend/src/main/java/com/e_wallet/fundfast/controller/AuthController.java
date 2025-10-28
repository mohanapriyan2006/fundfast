package com.e_wallet.fundfast.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import com.e_wallet.fundfast.dto.LoginResponse;
import com.e_wallet.fundfast.model.User;
import com.e_wallet.fundfast.service.AuthService;
import com.e_wallet.fundfast.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = authService.login(user);
            String token = jwtUtil.generateToken(user.getUsername());

            LoginResponse response = new LoginResponse(token, loggedInUser);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user, BindingResult br) {
        if (br.hasErrors()) {
            Map<String, String> fieldErrors = br.getFieldErrors().stream()
                    .collect(
                            java.util.stream.Collectors.toMap(
                                    error -> error.getField(),
                                    error -> error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(fieldErrors);
        }
        try {
            User registeredUser = authService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}