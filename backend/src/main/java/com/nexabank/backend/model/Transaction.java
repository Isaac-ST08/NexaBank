package com.nexabank.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountOrigin;

    private String accountDestination;

    private BigDecimal amount;

    private String type;

    private LocalDateTime date;

    private String status;

    public Transaction() {
    }

    public Transaction(
            String accountOrigin,
            String accountDestination,
            BigDecimal amount,
            String type,
            LocalDateTime date,
            String status
    ) {
        this.accountOrigin = accountOrigin;
        this.accountDestination = accountDestination;
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getAccountOrigin() {
        return accountOrigin;
    }

    public String getAccountDestination() {
        return accountDestination;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getType() {
        return type;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    public void setAccountOrigin(String accountOrigin) {
        this.accountOrigin = accountOrigin;
    }

    public void setAccountDestination(String accountDestination) {
        this.accountDestination = accountDestination;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}