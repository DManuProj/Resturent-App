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
//    private int orderId;
//    private Date orderDate;
//    private double total;
//    private OrderStatus orderStatus;
//    private User customer;
//    private User staff;

    private  String  userName;
    private  String  userAddress;
    private  String userContact;

    private  String mealName;
    private  int qty;

    private Date orderDate;
    private double total;

//    private int mealItemId;
//    private  String mealItemName;
//    private double amount;
//    private  int qty;


}
