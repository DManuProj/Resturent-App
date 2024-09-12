package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.MealType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MealSaveRequestDTO {

    private  String mealName;
    private MealType mealCategory;
    private  int mealQty;
    private  double mealPrice;
    private  Long userId;
}
