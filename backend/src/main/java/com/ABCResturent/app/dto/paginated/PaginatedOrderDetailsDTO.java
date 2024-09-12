package com.ABCResturent.app.dto.paginated;

import com.ABCResturent.app.dto.response.OrdersGetAllRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaginatedOrderDetailsDTO {
    private List<OrdersGetAllRequestDTO> list;
    private long dataCount;
}
