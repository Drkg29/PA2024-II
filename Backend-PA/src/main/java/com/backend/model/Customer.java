package com.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class Customer {

    @Id
    private String customer_id;
    private String fullName;
    private String email;
    private String address;
    private String city;
    private String postalCode;

    public Customer() {}
}
