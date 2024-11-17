package com.backend.controller;



import com.backend.model.User;
import com.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping(path = "/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User user){
        Optional<User> foundUser = userService.findByUsername(user.getUsername());


        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())){
            return ResponseEntity.ok(Map.of("role", foundUser.get().getRole()));

        }else {
            return ResponseEntity.status(401).body(Map.of("message", "Credenciales incorrecta"));
        }
    }


    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody User user){
        Optional<User> existingUser = userService.findByUsername(user.getUsername());


        if (existingUser.isPresent()){
            return ResponseEntity.status(400).body(Map.of("message", "Usuario ya existe"));

        }else {
            userService.registerUser(user.getUsername(), user.getPassword(), "user");
            return ResponseEntity.ok(Map.of("message", "Usuario registrado con éxito"));
        }
    }


}

