package com.ABCResturent.app.dto.response;

import com.ABCResturent.app.enums.QueryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuerySubmitGetResponseDTO {

    private int queryId;
    private  String queryText;
    private  String querySubject;
    private Long userId;
    private String queryResponse;
    private QueryStatus queryStatus;
}
