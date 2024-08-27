package com.example.LMS.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.model.BookCount;

public interface BookCountRepository extends JpaRepository<BookCount,Integer>{

}
