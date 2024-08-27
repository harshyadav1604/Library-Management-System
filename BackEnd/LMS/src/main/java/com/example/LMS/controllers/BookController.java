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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.model.Book;
import com.example.LMS.services.BookRepository;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
@SecurityRequirement(name = "bearerAuth")
public class BookController {

    @Autowired
    private BookRepository repo;

    @GetMapping("/books")
    public List<Book> listAll(Model model) {
        List<Book> listBooks = repo.findAll();
        listBooks = listBooks.stream().filter(book -> book.getIsActive() == true).toList();
        model.addAttribute("listUsers", listBooks);
        return listBooks;
    }

    @PostMapping("/books")
    public void save(@RequestBody Book book){
        book.setCreateTs(LocalDateTime.now());
        book.setModifiedTs(LocalDateTime.now());
        repo.save(book);
    }

    @PutMapping("/books")
    public void updateBook(@RequestBody Book book){
        book.setModifiedTs(LocalDateTime.now());
        repo.save(book);
    }

    @GetMapping("books/{id}")
    public ResponseEntity<Book> getUser(@PathVariable Integer id){

        Optional<Book> book = repo.findById(id);

        if(book.isPresent()){
            return new ResponseEntity<>(book.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }  



    
}
