package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.QueryUpdateRequestDTO;
import com.ABCResturent.app.dto.request.QuerySubmitSaveRequestDTO;
import com.ABCResturent.app.dto.response.QuerySubmitGetResponseDTO;
import com.ABCResturent.app.entity.Query;

public interface QueryService {
    Query saveQueryRequest(QuerySubmitSaveRequestDTO querySubmitSaveRequestDTO);

    QuerySubmitGetResponseDTO getSubmitQuery(int submitQueryId);

    String saveQueryResponse(QueryUpdateRequestDTO queryUpdateRequestDTO);

    String deleteQuery(int queryId);
}
