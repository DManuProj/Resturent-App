package com.ABCResturent.app.entity;

import com.ABCResturent.app.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Date;

@Entity
@Table(name ="user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name", length = 50, nullable = false)
    private  String userName;

    @Column(name = "user_address",length = 100)
    private  String userAddress;

    @Column(name = "user_email", length = 30, nullable = false, unique = true)
    @Email
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", length = 30, nullable = false)
    private UserType userType;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "active_state", columnDefinition = "TINYINT default 1")
    private boolean active;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
}
