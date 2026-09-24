package com.SLAGuard.auth.exception;

public class ExistedUserException extends RuntimeException {
    public ExistedUserException(String message){
        super(message);
    }
}
