package com.ABCResturent.app.controller;


import com.ABCResturent.app.dto.UserDTO;
import com.ABCResturent.app.dto.request.UserSaveRequestDTO;
import com.ABCResturent.app.dto.request.UserUpdateRequestDTO;
import com.ABCResturent.app.dto.response.UserGetResponseDTO;
import com.ABCResturent.app.entity.User;
import com.ABCResturent.app.service.UserService;
import com.ABCResturent.app.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserSaveRequestDTO userSaveRequestDTO){
      User user =  userService.saveUser(userSaveRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User has created", user), HttpStatus.CREATED
        );
    }

    @GetMapping("/get-all-users")
    public ResponseEntity<StandardResponse> getAllUsers(){
        List<UserGetResponseDTO> user =  userService.getAllUsers();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Success", user), HttpStatus.OK
        );
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<StandardResponse> updateUser(@RequestBody UserUpdateRequestDTO userUpdateRequestDTO){

        User updatedUser = userService.updateUser(userUpdateRequestDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "User updated successfully", updatedUser), HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/delete-customer",params = "id")
    public ResponseEntity<StandardResponse> deleteCustomer(@RequestParam(value = "id") Long userId) {


        String message =  userService.deleteUser(userId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, message, null), HttpStatus.OK
        );
    }
}
