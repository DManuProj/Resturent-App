package com.ABCResturent.app.repo;

import com.ABCResturent.app.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ReservationRepo extends JpaRepository<Reservation, Integer> {
}
