package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderSaveRequestDTO {

    private Date orderDate;
    private double total;
    private OrderStatus status;
    private Long customer;
    private List<OrderDetailsRequestDTO> orderDetails;


}
