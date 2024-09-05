package com.ABCResturent.app.entity;

import com.ABCResturent.app.enums.MealType;
import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Date;

@Entity
@Table(name ="meal")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private int mealId;

    @Column(name = "meal_name", length = 50, nullable = false)
    private  String mealName;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_category", length = 50,nullable = false)
    private MealType mealCategory;

    @Column(name = "meal_price", length = 50, nullable = false)
    private  double mealPrice;

    @Column(name = "meal_qty", length = 50, nullable = false)
    private  int mealQty;

    @Column(name = "active_state")
    private boolean active = true;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;


}
