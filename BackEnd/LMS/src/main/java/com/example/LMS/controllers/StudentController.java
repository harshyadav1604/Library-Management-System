package com.example.LMS.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.model.Student;
import com.example.LMS.services.StudentRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class StudentController {

    @Autowired
    private StudentRepository repo;

    @GetMapping("/students")
    public List<Student> listAll(Model model) {
        List<Student> listStudents = repo.findAll();
        listStudents = listStudents.stream().filter(student -> student.getIsActive() == true).toList();
        model.addAttribute("listStudents", listStudents);
        return listStudents;
    }

    @PutMapping("/students")
    public void updateStudent(@RequestBody Student student){
        student.setModifiedTs(LocalDateTime.now());
        repo.save(student);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getUser(@PathVariable Integer id){

        Optional<Student> student = repo.findById(id);

        if(student.isPresent()){
            return new ResponseEntity<>(student.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    
}
