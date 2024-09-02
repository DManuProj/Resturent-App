package com.ABCResturent.app.entity;

import com.ABCResturent.app.enums.MealType;
import com.ABCResturent.app.enums.QueryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="query")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "query_id")
    private Long queryId;

    @Column(name = "query_text",nullable = false)
    private  String queryText;


    @Column(name = "query_response", nullable = false)
    private String queryResponse;

    @Enumerated(EnumType.STRING)
    @Column(name = "query_status", length = 50,nullable = false)
    private QueryStatus queryStatus;

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
