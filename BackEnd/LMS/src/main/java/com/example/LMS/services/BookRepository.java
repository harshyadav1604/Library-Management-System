package com.example.LMS.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{

}
