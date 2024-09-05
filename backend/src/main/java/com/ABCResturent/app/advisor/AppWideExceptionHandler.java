package com.ABCResturent.app.advisor;

import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.UnauthorizedException;
import com.ABCResturent.app.utill.StandardErrorResponse;

import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StandardErrorResponse> handleNorFoundException(NotFoundException e){
        return new ResponseEntity<>(
                new StandardErrorResponse(404, e.getMessage()), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<StandardErrorResponse> handleInternalServerErrorException(InternalServerErrorException e) {
        return new ResponseEntity<>(
                new StandardErrorResponse(500, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<StandardErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        return new ResponseEntity<>(
                new StandardErrorResponse(401, e.getMessage()), HttpStatus.FORBIDDEN
        );
    }
}
