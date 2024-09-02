package com.ABCResturent.app.dto.request;

import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserUpdateRequestDTO {

    private Long userId;
    private String userName;
    private String userAddress;
    private String userEmail;
    private UserType userType;

}
