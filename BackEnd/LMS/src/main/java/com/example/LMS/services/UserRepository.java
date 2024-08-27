package com.example.LMS.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    public User findByNameAndPassword(String userName, String password);

    
}
