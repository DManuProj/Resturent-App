package com.ABCResturent.app.entity;


import com.ABCResturent.app.enums.OrderStatus;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name ="orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;


    @Column(name = "order_date",nullable = false)
    private Date orderDate;

    @Column(name = "total", nullable = false)
    private double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status" )
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false )
    @JsonBackReference
    private User customer;

    @OneToMany(mappedBy = "orders")
    private Set<OrderDetails> orderDetails;

    @Column(name = "staff_id" )
    private Long staff;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    public Order(Date orderDate, double total,OrderStatus orderStatus, User customer) {
        this.orderDate = orderDate;
        this.total = total;
        this.orderStatus = orderStatus;
        this.customer = customer;
    }



}

