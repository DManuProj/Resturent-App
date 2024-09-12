package com.ABCResturent.app.controller;

import com.ABCResturent.app.dto.request.ReservationSaveRequestDTO;
import com.ABCResturent.app.dto.request.ReservationUpdateRequestDTO;
import com.ABCResturent.app.dto.request.UserUpdateRequestDTO;
import com.ABCResturent.app.dto.response.ReservationGetResponseDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.Reservation;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.service.ReservationService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reservation")
@CrossOrigin
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody ReservationSaveRequestDTO reservationSaveRequestDTO){
        Reservation reservation =  reservationService.saveReservation(reservationSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Reservation has created", reservation), HttpStatus.CREATED
        );
    }

    @GetMapping("/get-all-reservations")
    public ResponseEntity<StandardResponse> getAllReservations(){
        List<ReservationGetResponseDTO> reservations =  reservationService.getAllReservations();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", reservations), HttpStatus.OK
        );
    }

    @GetMapping(path = "/get-reservation-by-id", params = "id")
    public ResponseEntity<StandardResponse> getReservationById(@RequestParam(value = "id") int reservationId) {
        ReservationGetResponseDTO reservationGetResponseDTO = reservationService.getReservationById(reservationId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", reservationGetResponseDTO), HttpStatus.OK
        );
    }

    @PutMapping("/update-reservation/{id}")
    public ResponseEntity<StandardResponse> updateReservation(@RequestBody ReservationUpdateRequestDTO reservationUpdateRequestDTO){

        String reservation = reservationService.updateReservation(reservationUpdateRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "Reservation has canceled successfully", null), HttpStatus.OK
        );
    }
}
