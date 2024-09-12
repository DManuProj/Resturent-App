package com.ABCResturent.app.dto.queryInterface;

import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.OrderStatus;

import java.util.Date;

public interface OrderDetailsInterface {



  String getUserName();
  String getUserAddress();
  String getUserContact();

  Date getOrderDate();
   Double getTotal();

    String getMealName();

    Integer getQty();

//    int getOrderId();
//   Date getOrderDate();
//
//   double getTotal();
//
//   OrderStatus getOrderStatus();
//
//   User getCustomer();
//
//   User getStaff();
//
//   int getMealItemId();
//
//   String getMealItemName();
//
//   double getAmount();
//
//   int getQty();


//    private int orderId;
//    private Date orderDate;
//    private double total;
//    private OrderStatus orderStatus;
//    private User customer;
//    private User staff;
//
//    private int orderItemId;
//    private  String orderItemName;
//    private double amount;
//    private  int qty;
}
