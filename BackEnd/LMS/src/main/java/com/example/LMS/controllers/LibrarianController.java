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

import com.example.LMS.model.Librarian;
import com.example.LMS.services.LibrarianRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class LibrarianController {

    @Autowired
    private LibrarianRepository librarianrepo;

    @GetMapping("/librarians")
    public List<Librarian> listAll(Model model){
        List<Librarian> listLibrarians = librarianrepo.findAll();
        listLibrarians = listLibrarians.stream().filter(librarians -> librarians.getIsActive() == true).toList();
        model.addAttribute("listLibrarians", listLibrarians);
        return listLibrarians;
    }

    @PutMapping("/librarians")
    public void updateStudent(@RequestBody Librarian librarian){
        librarian.setModifiedTs(LocalDateTime.now());
        librarianrepo.save(librarian);
    }

    @GetMapping("/librarians/{id}")
    public ResponseEntity<Librarian> getUser(@PathVariable Integer id){

        Optional<Librarian> librarian = librarianrepo.findById(id);

        if(librarian.isPresent()){
            return new ResponseEntity<>(librarian.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
}
