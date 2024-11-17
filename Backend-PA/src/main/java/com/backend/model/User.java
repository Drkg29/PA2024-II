package com.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Setter
@Getter
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String role;

    public User(){}

    public User(String username, String password, String role){
        this.username = username;
        this.password = password;
        this.role = role;
    }


}
