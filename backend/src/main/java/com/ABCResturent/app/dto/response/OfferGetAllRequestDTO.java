package com.ABCResturent.app.dto.response;

import com.ABCResturent.app.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OfferGetAllRequestDTO {

    private int offerId;
    private  String offerName;
    private  String offerDescription;
    private double discountRate;
//    private User user;
    private Date startDate;
    private Date endDate;
    private Date createdAt;
    private Date updatedAt;
}
