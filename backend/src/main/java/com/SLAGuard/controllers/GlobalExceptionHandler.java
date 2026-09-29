package com.SLAGuard.controllers;

import com.SLAGuard.exceptions.IllegalStateTransitionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalStateTransitionException.class)
    public ResponseEntity<?> handleInvalidTransition(IllegalStateTransitionException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                Map.of(
                        "error", "ILLEGAL_STATUS_TRANSITION",
                        "message", ex.getMessage()
                )
        );
    }
}
