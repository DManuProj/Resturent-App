package com.ABCResturent.app.utill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardErrorResponse {

    private int statusCode;
    private String message;
}
