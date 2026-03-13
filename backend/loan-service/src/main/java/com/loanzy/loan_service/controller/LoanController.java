package com.loanzy.loan_service.controller;

import com.loanzy.loan_service.entity.Loan;
import com.loanzy.loan_service.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanRepository loanRepository;
    private final com.loanzy.loan_service.service.LoanRiskAnalyzerService riskAnalyzerService;

    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {

        String calculatedStatus = riskAnalyzerService.analyzeLoanRisk(loan);
        loan.setStatus(calculatedStatus);
        return ResponseEntity.ok(loanRepository.save(loan));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Loan>> getUserLoans(@PathVariable Long userId) {
        return ResponseEntity.ok(loanRepository.findByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        return ResponseEntity.ok(loanRepository.findAll());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Loan> approveLoan(@PathVariable Long id) {
        return loanRepository.findById(id).map(loan -> {
            loan.setStatus("Approved");

            loanRepository.save(loan);
            return ResponseEntity.ok(loan);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Loan> rejectLoan(@PathVariable Long id) {
        return loanRepository.findById(id).map(loan -> {
            loan.setStatus("Rejected");
            loanRepository.save(loan);
            return ResponseEntity.ok(loan);
        }).orElse(ResponseEntity.notFound().build());
    }
}
