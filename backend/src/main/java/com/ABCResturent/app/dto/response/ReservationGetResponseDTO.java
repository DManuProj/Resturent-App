package com.ABCResturent.app.dto.response;

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
public class ReservationGetResponseDTO {

    private int reservationId;
    private Date reservationDate;
    private LocalTime reservationTime;
    private ReservationType reservationType;
    private int tableNumber;
    private int numberOfPeople;
    private ReservationStatus status;
    private Long userId;
}
