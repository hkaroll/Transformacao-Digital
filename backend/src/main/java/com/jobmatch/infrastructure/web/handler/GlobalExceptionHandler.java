package com.jobmatch.infrastructure.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        // Retorna um status 400 Bad Request com uma mensagem de erro clara.
        return new ResponseEntity<>(Map.of("error", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    // Podemos adicionar outros handlers para diferentes exceções aqui.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        // Para qualquer outra exceção não tratada, retorna um 500 Internal Server Error.
        return new ResponseEntity<>(Map.of("error", "Ocorreu um erro interno no servidor."), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
