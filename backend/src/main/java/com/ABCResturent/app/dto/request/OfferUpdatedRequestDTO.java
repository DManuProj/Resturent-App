package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OfferUpdatedRequestDTO {

    private  String offerName;
    private  String offerDescription;
    private double discountRate;
    private Long user;
    private Date startDate;
    private Date endDate;
}
