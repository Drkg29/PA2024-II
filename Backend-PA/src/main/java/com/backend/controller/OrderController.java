package com.backend.controller;
import com.backend.model.Order;
import com.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @CrossOrigin
    @PostMapping(path="/api/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {

        try {
            Order saved_order = new Order();
            saved_order.setCardInfo(order.getCardInfo());
            saved_order.setCustomer(order.getCustomer());
            saved_order.setPhoneNumber(order.getPhoneNumber());
            saved_order.setTotalCost(order.getTotalCost());
            saved_order.setPaymentMethod(order.getPaymentMethod());
            saved_order.setItems(order.getItems());
            orderRepository.save(saved_order);

            return new ResponseEntity<>(saved_order, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear el pedido" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}