package com.ABCResturent.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OfferCreateRequestDTO {

    private  String offerName;
    private  String offerDescription;
    private double discountRate;
    private Long user;
    private Date startDate;
    private Date endDate;
}
