package com.ABCResturent.app.entity;

import com.ABCResturent.app.enums.ReservationStatus;
import com.ABCResturent.app.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="reservation")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long reservationId;

    @Column(name = "reservation_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date reservationDate; // Stores the date of reservation (without time)

    @Column(name = "reservation_time", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date reservationTime; // Stores the time of reservation (without date)


    @Column(name = "reservation_type", length = 30, nullable = false)
    @Enumerated(EnumType.STRING)
    private ReservationType reservationType; // DINE_IN or DELIVERY

    @Column(name = "table_number")
    private Integer tableNumber; // Required only if reservationType is DINE_IN

    @Column(name = "number_of_people", nullable = false)
    private int numberOfPeople;

    @Column(name = "status", length = 30, nullable = false)
    @Enumerated(EnumType.STRING)
    private ReservationStatus status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
}
