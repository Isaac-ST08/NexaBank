package com.nexabank.backend.structures;

import com.nexabank.backend.model.Transaction;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class DynamicArrayTransactionTest {
    @Test
    void almacenarTransacciones() {
        DynamicArray<Transaction> transactions = new DynamicArray<>();
        Transaction transaction = new Transaction(
                "Isaac",
                "Ana",
                new BigDecimal("1000"),
                "Transferencia",
                LocalDateTime.now(),
                "Realizado"
        );
        transactions.add(transaction);
        assertEquals(1, transactions.size());
        transactions.get(0);
        assertEquals(transaction, transactions.get(0));
    }
}
