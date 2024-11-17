package com.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class OrderItem {

    @Id
    private String item_id;
    private double price;
    private int quantity;

    public OrderItem() {}
}
