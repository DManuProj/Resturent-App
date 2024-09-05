package com.ABCResturent.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuerySubmitSaveRequestDTO {

    private  String queryText;
    private  String querySubject;
    private Long userId;
}
