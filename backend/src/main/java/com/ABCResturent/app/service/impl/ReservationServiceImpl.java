package com.ABCResturent.app.service.impl;

import com.ABCResturent.app.dto.request.ReservationSaveRequestDTO;
import com.ABCResturent.app.dto.request.ReservationUpdateRequestDTO;
import com.ABCResturent.app.dto.response.ReservationGetResponseDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.Reservation;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.repo.ReservationRepo;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.ReservationService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ReservationRepo reservationRepo;

    @Autowired
    private UserRepo userRepo;
    @Override
    public Reservation saveReservation(ReservationSaveRequestDTO reservationSaveRequestDTO) {
        try {
            // Fetch the User entity by ID before saving
            User user = userRepo.findById(reservationSaveRequestDTO.getUserId())
                    .orElseThrow(() -> new NotFoundException("User not found"));

            // Map the DTO to Reservation entity
            Reservation reservation = modelMapper.map(reservationSaveRequestDTO, Reservation.class);


            // Save the Reservation entity
            Reservation savedReservation = reservationRepo.save(reservation);

            // Return the saved Reservation object
            return savedReservation;
        }catch (Exception e){
            throw  new InternalServerErrorException("Internal Server Error");
        }

    }

    @Override
    public List<ReservationGetResponseDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepo.findAll();

        if (reservations.size() > 0) {
            List<ReservationGetResponseDTO> reservationDTO = modelMapper.map(reservations, new TypeToken<List<ReservationGetResponseDTO>>() {
            }.getType());
            return reservationDTO;
        } else {
            throw new NotFoundException("No users found");
        }
    }

    @Override
    public String updateReservation(ReservationUpdateRequestDTO reservationUpdateRequestDTO) {
// Check if the reservation exists
        if (!reservationRepo.existsById(reservationUpdateRequestDTO.getReservationId())) {
            throw new NotFoundException("No reservation found with ID: " + reservationUpdateRequestDTO.getReservationId());
        }

        // Check if the user exists
        if (!userRepo.existsById(reservationUpdateRequestDTO.getUserId())) {
            throw new NotFoundException("No user found with ID: " + reservationUpdateRequestDTO.getUserId());
        }

        // Fetch the reservation entity
        Reservation existingReservation = reservationRepo.getReferenceById(reservationUpdateRequestDTO.getReservationId());

//        // Check if the reservation belongs to the user
//        if (!existingReservation.getUser().equals(reservationUpdateRequestDTO.getUserId())) {
//            throw new NotFoundException("user not Found");
//        }

        // Update the reservation status to the new status
        existingReservation.setStatus(reservationUpdateRequestDTO.getStatus());

        // Save the updated reservation back to the database
        reservationRepo.save(existingReservation);

        return "Reservation status updated successfully to " + reservationUpdateRequestDTO.getStatus();
}

    @Override
    public ReservationGetResponseDTO getReservationById(int reservationId) {
        try {
            if(reservationRepo.existsById(reservationId)){
                Reservation reservation = reservationRepo.getReferenceById(reservationId);

                ReservationGetResponseDTO reservationGetResponseDTO = modelMapper.map(reservation, ReservationGetResponseDTO.class);

                return reservationGetResponseDTO;

            }else{
                throw  new NotFoundException("Reservation Not found");
            }
        }catch (Exception e){
            throw  new InternalServerErrorException("Internal Server occurred");
        }
    }
}
