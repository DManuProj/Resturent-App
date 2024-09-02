package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserSaveRequestDTO {


    private  String userName;
    private  String userAddress;
    private String userEmail;
    private UserType userType;
    private String password;

}
