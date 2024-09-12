package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.ReservationSaveRequestDTO;
import com.ABCResturent.app.dto.request.ReservationUpdateRequestDTO;
import com.ABCResturent.app.dto.response.ReservationGetResponseDTO;
import com.ABCResturent.app.entity.Reservation;

import java.util.List;

public interface ReservationService {
    Reservation saveReservation(ReservationSaveRequestDTO reservationSaveRequestDTO);

    List<ReservationGetResponseDTO> getAllReservations();

    String updateReservation(ReservationUpdateRequestDTO reservationUpdateRequestDTO);

    ReservationGetResponseDTO getReservationById(int reservationId);
}
