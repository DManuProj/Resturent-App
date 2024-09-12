package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.ReservationStatus;
import com.ABCResturent.app.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationUpdateRequestDTO {
    private int reservationId;
    private Long userId;
    private ReservationStatus status;

}
