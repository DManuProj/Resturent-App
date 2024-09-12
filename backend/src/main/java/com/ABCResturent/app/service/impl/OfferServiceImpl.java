package com.ABCResturent.app.service.impl;

import com.ABCResturent.app.dto.request.OfferCreateRequestDTO;
import com.ABCResturent.app.dto.request.OfferUpdatedRequestDTO;
import com.ABCResturent.app.dto.response.OfferGetAllRequestDTO;
import com.ABCResturent.app.entity.Offer;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.UserType;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.exceptions.UnauthorizedException;
import com.ABCResturent.app.repo.OfferRepo;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.OfferService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private OfferRepo offerRepo;

    @Override
    public String createOffer(OfferCreateRequestDTO offerCreateRequestDTO) {


        if (!userRepo.existsById(offerCreateRequestDTO.getUser())) {
            throw new NotFoundException("User not found");
        }



        try {
            User user = userRepo.getReferenceById(offerCreateRequestDTO.getUser());

            if (user.getUserType() != UserType.ADMIN ) {
                throw new UnauthorizedException("Only users with ADMIN can create to Offers");
            }

            // Map the DTO to the Query entity
            Offer offer = modelMapper.map(offerCreateRequestDTO, Offer.class);

            // Set the user in the query
            offer.setUser(user);

            offerRepo.save(offer);


            return "Offer created successfully";
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public String updateOffer(int offerId , OfferUpdatedRequestDTO offerUpdatedRequestDTO) {

//        Offer offer = offerRepo.getReferenceById(offerId);

        if (!offerRepo.existsById(offerId) ){
            throw new NotFoundException("No offer found!! ");
        }

        try {
            User user = userRepo.getReferenceById(offerUpdatedRequestDTO.getUser());

            if (user.getUserType() != UserType.ADMIN ) {
                throw new UnauthorizedException("Only users with ADMIN can create to Offers");
            }
            Offer existingOffer = offerRepo.getReferenceById(offerId);

            modelMapper.map(offerUpdatedRequestDTO, existingOffer);

            offerRepo.save(existingOffer);

            return "Meal updated successfully";

        }catch (Exception e){
            throw new InternalServerErrorException("Internal server error!");
        }

    }

    @Override
    public List<OfferGetAllRequestDTO> getAllOffers() {
        List<Offer> allOffers = offerRepo.findAll();

        if (allOffers.size() > 0) {
            List<OfferGetAllRequestDTO> offers = modelMapper.map(allOffers, new TypeToken<List<OfferGetAllRequestDTO>>() {
            }.getType());
            return offers;
        } else {
            throw new NotFoundException("No offers found");
        }
    }

    @Override
    public String deleteOffer(int offerId) {
        if(!offerRepo.existsById(offerId)){
            throw new NotFoundException("Offer not found!");
        }

        try {
            offerRepo.deleteById(offerId);
            return "Offer deleted!";
        }catch (Exception e){
            throw new InternalServerErrorException("Internal server error occurred");
        }


    }
}
