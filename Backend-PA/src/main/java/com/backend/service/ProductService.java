package com.backend.service;

import com.backend.model.Product;
import com.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(String id, Product product){
        product.setId(id);
        return productRepository.save(product);
    }

    public void deleteProduct(String id){
        productRepository.deleteById(id);
    }
}
