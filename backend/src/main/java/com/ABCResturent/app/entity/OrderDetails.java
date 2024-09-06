package com.ABCResturent.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name ="orders_details")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDetails {

    @Id
    @Column(name = "order_details_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderDetailsId;

    @Column(name = "order_item_name", length = 100)
    private  String orderItemName;

    @Column(name = "qty", length = 100, nullable = false)
    private  int qty;

    @Column(name = "amount", length = 100, nullable = false)
    private  double amount;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order orders ;

    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false)
    private Meal meal;
}
