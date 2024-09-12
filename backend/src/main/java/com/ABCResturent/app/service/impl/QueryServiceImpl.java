package com.ABCResturent.app.service.impl;

import com.ABCResturent.app.dto.request.QueryUpdateRequestDTO;
import com.ABCResturent.app.dto.request.QuerySubmitSaveRequestDTO;
import com.ABCResturent.app.dto.response.QuerySubmitGetResponseDTO;
import com.ABCResturent.app.entity.Query;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.UserType;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.exceptions.UnauthorizedException;
import com.ABCResturent.app.repo.QueryRepo;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.QueryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryServiceImpl implements QueryService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private QueryRepo queryRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Query saveQueryRequest(QuerySubmitSaveRequestDTO querySubmitSaveRequestDTO) {
        // Check if the user exists
        if (!userRepo.existsById(querySubmitSaveRequestDTO.getUserId())) {
            throw new NotFoundException("User not found");
        }

        try {
            User user = userRepo.getReferenceById(querySubmitSaveRequestDTO.getUserId());
            // Map the DTO to the Query entity
            Query query = modelMapper.map(querySubmitSaveRequestDTO, Query.class);

            // Set the user in the query
            query.setUser(user);

            // Set default values if necessary
            query.setQueryResponse("");  // Set default empty response if necessary

            return queryRepo.save(query);
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public QuerySubmitGetResponseDTO getSubmitQuery(int submitQueryId) {
        if (!queryRepo.existsById(submitQueryId)) {
            throw new NotFoundException("Query Not found");
        }

        try {

            Query query = queryRepo.getReferenceById(submitQueryId);

            QuerySubmitGetResponseDTO querySubmitGetResponseDTO = modelMapper.map(query, QuerySubmitGetResponseDTO.class);

            return querySubmitGetResponseDTO;

        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server occurred");
        }

    }

    @Override
    public String saveQueryResponse(QueryUpdateRequestDTO queryUpdateRequestDTO) {
        // Check if the query exists
        if (!queryRepo.existsById(queryUpdateRequestDTO.getQueryId())) {
            throw new NotFoundException("Query Not found");
        }

        try {
            // Retrieve the existing query
            Query existingQuery = queryRepo.getReferenceById(queryUpdateRequestDTO.getQueryId());

            // Retrieve the responder (the user who responded)
            if (queryUpdateRequestDTO.getResponderId() != null) {
                User responder = userRepo.getReferenceById(queryUpdateRequestDTO.getResponderId());

                // Check if the responder's user type is ADMIN or STAFF
                if (responder.getUserType() != UserType.ADMIN && responder.getUserType() != UserType.STAFF) {
                    throw new UnauthorizedException("Only users with ADMIN or STAFF roles can respond to queries.");
                }
                // Update the queryResponse and queryStatus fields
                existingQuery.setQueryResponse(queryUpdateRequestDTO.getQueryResponse());
                existingQuery.setQueryStatus(queryUpdateRequestDTO.getQueryStatus());
                existingQuery.setResponderId(queryUpdateRequestDTO.getResponderId());

                // Save the updated query
                queryRepo.save(existingQuery);

            }


            return "Response has been sent";

        } catch (Exception e) {
            // Handle any unexpected exceptions
            throw new InternalServerErrorException("An internal server error occurred");
        }
    }

    @Override
    public String deleteQuery(int queryId) {
        if(!queryRepo.existsById(queryId)){
            throw new NotFoundException("Query not found!");
        }
       try {
           queryRepo.deleteById(queryId);
           return "Query deleted successfully";

       }catch (Exception e){
           throw  new InternalServerErrorException("Internal Server Error");
       }
    }
}
