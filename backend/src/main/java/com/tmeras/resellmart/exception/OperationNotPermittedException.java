package com.chintanjethi.topmart.exception;

public class OperationNotPermittedException extends RuntimeException{

    public OperationNotPermittedException(String message) {
        super(message);
    }
}
