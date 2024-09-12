package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderUpdateRequestDTO {

    private Long staffId;
    private  OrderStatus status;
}
