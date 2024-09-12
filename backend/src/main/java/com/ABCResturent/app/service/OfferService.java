package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.OfferCreateRequestDTO;
import com.ABCResturent.app.dto.request.OfferUpdatedRequestDTO;
import com.ABCResturent.app.dto.response.OfferGetAllRequestDTO;

import java.util.List;

public interface OfferService {
    String createOffer(OfferCreateRequestDTO offerCreateRequestDTO);

    String updateOffer(int offerId , OfferUpdatedRequestDTO offerUpdatedRequestDTO);

    List<OfferGetAllRequestDTO> getAllOffers();

    String deleteOffer(int offerId);
}
