package com.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private List<OrderItem> items;
    private double totalCost;
    private Customer customer;
    private String paymentMethod;
    private CardInfo cardInfo;
    private String phoneNumber;

    public Order() {}


}