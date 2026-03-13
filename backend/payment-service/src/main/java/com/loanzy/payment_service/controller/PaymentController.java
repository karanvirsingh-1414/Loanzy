package com.loanzy.payment_service.controller;

import com.loanzy.payment_service.entity.Payment;
import com.loanzy.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        payment.setPaymentDate(LocalDate.now());
        payment.setStatus("Success");
        payment.setTransactionId(UUID.randomUUID().toString());

        return ResponseEntity.ok(paymentRepository.save(payment));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentRepository.findByUserId(userId));
    }

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<Payment>> getLoanPayments(@PathVariable Long loanId) {
        return ResponseEntity.ok(paymentRepository.findByLoanId(loanId));
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }
}
