package com.ABCResturent.app.controller;

import com.ABCResturent.app.dto.request.OfferCreateRequestDTO;
import com.ABCResturent.app.dto.request.OfferUpdatedRequestDTO;
import com.ABCResturent.app.dto.request.UserUpdateRequestDTO;
import com.ABCResturent.app.dto.response.OfferGetAllRequestDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.service.OfferService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/offer")
@CrossOrigin
public class OfferController {

    @Autowired
    OfferService offerService;

    @PostMapping("/create-offer")
    public ResponseEntity<StandardResponse> createOffer(@RequestBody OfferCreateRequestDTO offerCreateRequestDTO){
        String offer =  offerService.createOffer(offerCreateRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, offer, null), HttpStatus.CREATED
        );
    }

    @PutMapping(value = "/update-offer/{id}")
    public ResponseEntity<StandardResponse> updateUser(@PathVariable("id") int offerId,@RequestBody OfferUpdatedRequestDTO offerUpdatedRequestDTO) {

        String updatedOffer = offerService.updateOffer(offerId, offerUpdatedRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, updatedOffer, null), HttpStatus.OK
        );
    }

    @GetMapping("/get-all-offers")
    public ResponseEntity<StandardResponse> getAllOffers(){
        List<OfferGetAllRequestDTO> offers =  offerService.getAllOffers();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", offers), HttpStatus.OK
        );
    }


    @DeleteMapping(value = "/delete-offer", params = "id")
    public ResponseEntity<StandardResponse> deleteOffer(@RequestParam(value = "id") int offerId ){
        String confirmationMessage =  offerService.deleteOffer(offerId);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, confirmationMessage, null), HttpStatus.OK
        );
    }


    }
