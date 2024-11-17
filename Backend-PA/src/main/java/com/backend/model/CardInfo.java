package com.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Setter
@Getter
public class CardInfo {

    @Id
    private String card_info_id;
    private String card_number;
    private String expiration_date;
    private String cvv;

    public CardInfo () {}
}
