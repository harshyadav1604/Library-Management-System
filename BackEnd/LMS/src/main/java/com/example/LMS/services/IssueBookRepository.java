package com.example.LMS.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.model.IssueBook;

public interface IssueBookRepository extends JpaRepository<IssueBook, Integer>{

}
