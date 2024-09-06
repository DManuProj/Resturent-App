package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.OrderSaveRequestDTO;
import com.ABCResturent.app.dto.request.OrderUpdateRequestDTO;
import com.ABCResturent.app.dto.response.OrdersGetAllRequestDTO;

import java.util.List;

public interface OrderService {
    String saveOrder(OrderSaveRequestDTO orderSaveRequestDTO);

    String updateOrder(int orderId, OrderUpdateRequestDTO orderUpdateRequestDTO);

    List<OrdersGetAllRequestDTO> getAllOrders();
}
