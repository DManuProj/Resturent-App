package com.ABCResturent.app.dto.response;

import com.ABCResturent.app.enums.MealType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MealGetRequestDTO {
    private int mealId;
    private  String mealName;
    private MealType mealCategory;
    private  double mealPrice;
    private  int mealQty;
    private boolean active = true;
    private Date createdAt;
    private Date updatedAt;
}
