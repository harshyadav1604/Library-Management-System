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

import com.example.LMS.model.BookCount;
import com.example.LMS.services.BookCountRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class BookCountController {

    @Autowired
    private BookCountRepository bkCntRepo;

    @GetMapping("/bookCount")
    public List<BookCount> listAll(Model model) {
        List<BookCount> listBooks = bkCntRepo.findAll();
        listBooks = listBooks.stream().filter(book -> book.getIsActive() == true).toList();
        model.addAttribute("listBooks", listBooks);
        return listBooks;
    }

    @PostMapping("/bookCount")
    public void save(@RequestBody BookCount bookCnt){
        bookCnt.setCreateTs(LocalDateTime.now());
        bookCnt.setModifiedTs(LocalDateTime.now());
        bkCntRepo.save(bookCnt);
    }

    @PutMapping("/bookCount")
    public void updateBook(@RequestBody BookCount bookCnt){
        bookCnt.setModifiedTs(LocalDateTime.now());
        bkCntRepo.save(bookCnt);
    }


    @GetMapping("bookCount/{id}")
    public ResponseEntity<BookCount> getUser(@PathVariable Integer id){

        Optional<BookCount> book = bkCntRepo.findById(id);

        if(book.isPresent()){
            return new ResponseEntity<>(book.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


}
