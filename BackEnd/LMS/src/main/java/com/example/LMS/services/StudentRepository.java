package com.example.LMS.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>{

}
