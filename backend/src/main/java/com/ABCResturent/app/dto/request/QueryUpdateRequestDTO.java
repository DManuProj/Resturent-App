package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.QueryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class QueryUpdateRequestDTO {
    private int queryId;
    private String queryResponse;
    private QueryStatus queryStatus;
    private Long responderId;

}
