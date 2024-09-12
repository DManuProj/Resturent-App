package com.ABCResturent.app.dto.response;

import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserGetResponseDTO {

    private Long userId;
    private  String userName;
    private  String userAddress;
    private String userEmail;
    private UserType userType;
    private boolean active;

}
