package com.ABCResturent.app.repo;

import com.ABCResturent.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long>{
}
