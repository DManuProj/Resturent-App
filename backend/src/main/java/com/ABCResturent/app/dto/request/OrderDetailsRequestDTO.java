package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.entity.Meal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDetailsRequestDTO {
    private int mealId;
    private  String mealName;
    private  int qty;
    private  double amount;

}
