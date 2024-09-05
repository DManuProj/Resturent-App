package com.ABCResturent.app.repo;

import com.ABCResturent.app.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepo extends JpaRepository<Offer,Integer> {
}
