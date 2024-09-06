package com.ABCResturent.app.dto.response;

import com.ABCResturent.app.dto.request.OrderDetailsRequestDTO;
import com.ABCResturent.app.entity.OrderDetails;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrdersGetAllRequestDTO {
    private int orderId;
    private Date orderDate;
    private double total;
    private OrderStatus orderStatus;
    private User customer;
    private List<OrderDetailsRequestDTO> orderDetails;
    private User staff;
    private Date createdAt;
    private Date updatedAt;
}
