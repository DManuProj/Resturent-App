package com.ABCResturent.app.service;

import com.ABCResturent.app.dto.request.UserSaveRequestDTO;
import com.ABCResturent.app.dto.request.UserUpdateRequestDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(UserSaveRequestDTO userDTO);

    List<UserGetResponseDTO> getAllUsers();

    User updateUser(UserUpdateRequestDTO userUpdateRequestDTO);

    String deleteUser(Long userId);
}
