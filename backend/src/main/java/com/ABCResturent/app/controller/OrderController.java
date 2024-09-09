package com.ABCResturent.app.controller;


import com.ABCResturent.app.dto.paginated.PaginatedOrderDetailsDTO;
import com.ABCResturent.app.dto.request.OrderSaveRequestDTO;
import com.ABCResturent.app.dto.request.OrderUpdateRequestDTO;
import com.ABCResturent.app.dto.response.OfferGetAllRequestDTO;
import com.ABCResturent.app.dto.response.OrdersGetAllRequestDTO;
import com.ABCResturent.app.entity.Order;
import com.ABCResturent.app.service.OrderService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody OrderSaveRequestDTO orderSaveRequestDTO){
        String order =  orderService.saveOrder(orderSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, order, null), HttpStatus.CREATED
        );
    }

    @PutMapping("/update-order/{id}")
    public ResponseEntity<StandardResponse> updateOrder(@PathVariable(value = "id") int orderId , @RequestBody OrderUpdateRequestDTO orderUpdateRequestDTO){

        String updated = orderService.updateOrder(orderId, orderUpdateRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(20, updated, null), HttpStatus.OK
        );
    }

    @GetMapping(value = "/get-all-orders", params = {"page","size"})
    public ResponseEntity<StandardResponse> getAllOrders(
            @RequestParam(value = "page") int page, @RequestParam(value = "size") int size){

        PaginatedOrderDetailsDTO p =  orderService.getAllOrders(size,page);


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", p), HttpStatus.OK
        );
    }

}
