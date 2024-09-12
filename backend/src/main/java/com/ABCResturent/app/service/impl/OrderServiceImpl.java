package com.ABCResturent.app.service.impl;

import com.ABCResturent.app.dto.paginated.PaginatedOrderDetailsDTO;
import com.ABCResturent.app.dto.queryInterface.OrderDetailsInterface;
import com.ABCResturent.app.dto.request.OrderDetailsRequestDTO;
import com.ABCResturent.app.dto.request.OrderSaveRequestDTO;
import com.ABCResturent.app.dto.request.OrderUpdateRequestDTO;
import com.ABCResturent.app.dto.response.OrdersGetAllRequestDTO;
import com.ABCResturent.app.dto.response.ReservationGetResponseDTO;
import com.ABCResturent.app.entity.*;
import com.ABCResturent.app.enums.UserType;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.exceptions.UnauthorizedException;
import com.ABCResturent.app.repo.MealRepo;
import com.ABCResturent.app.repo.OrderDetailsRepo;
import com.ABCResturent.app.repo.OrderRepo;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.OrderService;
import com.ABCResturent.app.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    MealRepo mealRepo;

    @Autowired
    OrderDetailsRepo orderDetailsRepo;

    @Override
    public String saveOrder(OrderSaveRequestDTO orderSaveRequestDTO) {

        // Create a new Order entity
        Order order = new Order(
                orderSaveRequestDTO.getOrderDate(),
                orderSaveRequestDTO.getTotal(),
                orderSaveRequestDTO.getStatus(),
                userRepo.getReferenceById(orderSaveRequestDTO.getCustomer())
        );

        // Save the order
        orderRepo.save(order);

        // Check if the order was saved successfully
        if (orderRepo.existsById(order.getOrderId())) {

            // Map the order details from the request DTO
            List<OrderDetails> orderDetails = modelMapper.map(orderSaveRequestDTO.getOrderDetails(), new TypeToken<List<OrderDetails>>() {
            }.getType());

            // Iterate through each OrderDetails and set the Order and Meal objects
            for (int i = 0; i < orderDetails.size(); i++) {
                OrderDetails currentOrderDetail = orderDetails.get(i);
                currentOrderDetail.setOrders(order);

                // Set the meal object by fetching from the repository
                Meal meal = mealRepo.getById(orderSaveRequestDTO.getOrderDetails().get(i).getMealId());
                currentOrderDetail.setMeal(meal);

                // Also set the meal name (mealItemName) explicitly
                currentOrderDetail.setMealItemName(meal.getMealName());
            }

            // Save all order details
            if (!orderDetails.isEmpty()) {
                orderDetailsRepo.saveAll(orderDetails);
            }

            return "saved";
        } else {
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

//    public String saveOrder(OrderSaveRequestDTO orderSaveRequestDTO) {
//
//
//        Order order = new Order(
//                orderSaveRequestDTO.getOrderDate(),
//                orderSaveRequestDTO.getTotal(),
//                orderSaveRequestDTO.getStatus(),
//                userRepo.getReferenceById(orderSaveRequestDTO.getCustomer())
//
//        );
//        orderRepo.save(order);
//
//        if (orderRepo.existsById(order.getOrderId())) {
//            List<OrderDetails> orderDetails = modelMapper.map(orderSaveRequestDTO.getOrderDetails(), new TypeToken<List<OrderDetails>>() {
//            }.getType());
//
//            for (int i = 0; i < orderDetails.size(); i++) {
//                orderDetails.get(i).setOrders(order);
//                orderDetails.get(i).setMeal(mealRepo.getById(orderSaveRequestDTO.getOrderDetails().get(i).getMealId()));
//            }
//
//            if (orderDetails.size() > 0) {
//                orderDetailsRepo.saveAll(orderDetails);
//            }
//            return "saved";
//        } else {
//            throw new InternalServerErrorException("Internal Server Error");
//        }
//
//    }

    @Override
    public String updateOrder(int orderId, OrderUpdateRequestDTO orderUpdateRequestDTO) {

        if (!orderRepo.existsById(orderId)) {
            throw new NotFoundException("Order not found!!");
        }

        try {
            Order order = orderRepo.getReferenceById(orderId);
            order.setOrderStatus(orderUpdateRequestDTO.getStatus());
            order.setStaff(orderUpdateRequestDTO.getStaffId());

            orderRepo.save(order);
            return "Order Status updated";
        } catch (Exception e) {
            throw new InternalServerErrorException("Internal Server Error");
        }

    }

    @Override
    public PaginatedOrderDetailsDTO getAllOrders(int size, int page) {
        List<OrderDetailsInterface> ordersDTO = orderRepo.getAllOrderDetails(PageRequest.of(page, size));

        List<OrdersGetAllRequestDTO> list = new ArrayList<>();

        for (OrderDetailsInterface o : ordersDTO) {
            OrdersGetAllRequestDTO r = new OrdersGetAllRequestDTO(
                    o.getUserName(),
                    o.getUserAddress(),
                    o.getUserContact(),
                    o.getMealName(),
                    o.getQty(),
                    o.getOrderDate(),
                    o.getTotal()


            );
            list.add(r);
        }

        PaginatedOrderDetailsDTO paginatedOrderDetailsDTO = new PaginatedOrderDetailsDTO(
                list,
                orderRepo.count()
        );

        return paginatedOrderDetailsDTO;
    }


}
