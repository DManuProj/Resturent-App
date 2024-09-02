package com.ABCResturent.app.service.impl;

import com.ABCResturent.app.dto.request.UserSaveRequestDTO;
import com.ABCResturent.app.dto.request.UserUpdateRequestDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.exceptions.InternalServerErrorException;
import com.ABCResturent.app.exceptions.NotFoundException;
import com.ABCResturent.app.repo.UserRepo;
import com.ABCResturent.app.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Override
    public User saveUser(UserSaveRequestDTO userSaveRequestDTO) {
        try {
            User user = modelMapper.map(userSaveRequestDTO, User.class);
            return userRepo.save(user);

        } catch (Exception e) {
            throw new InternalServerErrorException("An unexpected error occurred while saving the user.");
        }
    }

    @Override
    public List<UserGetResponseDTO> getAllUsers() {
        List<User> allUsers = userRepo.findAll();

        if (allUsers.size() > 0) {
            List<UserGetResponseDTO> userDTOS = modelMapper.map(allUsers, new TypeToken<List<UserGetResponseDTO>>() {
            }.getType());
            return userDTOS;
        } else {
            throw new NotFoundException("No users found");
        }
    }

    @Override
    public User updateUser(UserUpdateRequestDTO userUpdateRequestDTO) {

        if (userRepo.existsById(userUpdateRequestDTO.getUserId())) {
//            User user = userRepo.getReferenceById(userUpdateRequestDTO.getUserId());
//            user.setUserName(userUpdateRequestDTO.getUserName());
//            user.setUserAddress(userUpdateRequestDTO.getUserAddress());
//            user.setUserEmail(userUpdateRequestDTO.getUserEmail());
//            user.setUserType(userUpdateRequestDTO.getUserType());
           ;
            User existingUser = userRepo.getReferenceById(userUpdateRequestDTO.getUserId());
            // Map the properties from the DTO to the existing user entity
            modelMapper.map(userUpdateRequestDTO, existingUser);

            // Save the updated entity back to the database
            return userRepo.save(existingUser);

        } else {
            throw new InternalServerErrorException("An unexpected error occurred while updating the user.");
        }
    }

    @Override
    public String deleteUser(Long userId) {
        try {
            if (userRepo.existsById(userId)) {
                userRepo.deleteById(userId);
                return "user Deleted Successfully";
            } else {
                throw new NotFoundException("no Customer");
            }
        }catch (Exception e){
            throw  new InternalServerErrorException("An unexpected error occurred while deleting user");
        }

    }
}
