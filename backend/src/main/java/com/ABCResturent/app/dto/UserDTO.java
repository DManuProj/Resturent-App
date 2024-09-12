package com.ABCResturent.app.dto;

import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {

    private Long userId;
    private  String userName;
    private  String userAddress;
    private String userEmail;
    private UserType userType;
    private String password;
    private boolean active;
    private Date createdAt;
    private Date updatedAt;
}
