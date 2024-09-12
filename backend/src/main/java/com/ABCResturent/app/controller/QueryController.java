package com.ABCResturent.app.controller;

import com.ABCResturent.app.dto.request.QueryUpdateRequestDTO;
import com.ABCResturent.app.dto.request.QuerySubmitSaveRequestDTO;
import com.ABCResturent.app.dto.response.QuerySubmitGetResponseDTO;
import com.ABCResturent.app.entity.Query;
import com.ABCResturent.app.service.QueryService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/query")
@CrossOrigin
public class QueryController {

    @Autowired
    QueryService queryService;


    @PostMapping("/create-query")
    public ResponseEntity<StandardResponse> saveQueryRequest(@RequestBody QuerySubmitSaveRequestDTO querySubmitSaveRequestDTO){
        Query query =  queryService.saveQueryRequest(querySubmitSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Query created", query), HttpStatus.CREATED
        );
    }

    @PutMapping(value = "/response-query")
    public ResponseEntity<StandardResponse> UpdateQueryRequest(@RequestBody QueryUpdateRequestDTO queryUpdateRequestDTO) {
        String query = queryService.saveQueryResponse(queryUpdateRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, query, null),
                HttpStatus.OK
        );
    }


    @GetMapping(path = "/get-submit-query-by-id", params = "id")
    public ResponseEntity<StandardResponse> getSubmitQueryById(@RequestParam(value = "id") int submitQueryId) {
        QuerySubmitGetResponseDTO submittedQuery = queryService.getSubmitQuery(submitQueryId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", submittedQuery), HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/delete-query",params = "id")
    public ResponseEntity<StandardResponse> deleteQuery(@RequestParam(value = "id") int queryId) {


        String message =  queryService.deleteQuery(queryId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, message, null), HttpStatus.OK
        );
    }
}
