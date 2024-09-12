package com.ABCResturent.app.entity;

import com.ABCResturent.app.enums.MealType;
import com.ABCResturent.app.enums.QueryStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private int queryId;

    @Column(name = "query_text",nullable = false)
    private  String queryText;

    @Column(name = "query_subject",nullable = false)
    private  String querySubject;

    @Column(name = "query_response")
    private String queryResponse;

    @Enumerated(EnumType.STRING)
    @Column(name = "query_status", length = 50,nullable = false)
    private QueryStatus queryStatus = QueryStatus.PENDING;


    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(name = "responder_id")
    private Long responderId;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
}
