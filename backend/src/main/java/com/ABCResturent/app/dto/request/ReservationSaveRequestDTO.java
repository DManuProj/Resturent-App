package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.enums.ReservationStatus;
import com.ABCResturent.app.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationSaveRequestDTO {

    private Date reservationDate;
    private Date reservationTime;
    private ReservationType reservationType;
    private int tableNumber;
    private int numberOfPeople;
    private ReservationStatus status;
    private Long userId;
}
