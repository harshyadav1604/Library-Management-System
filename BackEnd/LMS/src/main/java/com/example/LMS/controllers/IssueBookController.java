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

import com.example.LMS.model.IssueBook;
import com.example.LMS.services.BookRepository;
import com.example.LMS.services.IssueBookRepository;
import com.example.LMS.services.LibrarianRepository;
import com.example.LMS.services.StudentRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class IssueBookController {

    @Autowired
    private IssueBookRepository repo;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LibrarianRepository librarianRepository;

    @GetMapping("/issue-book")
    public List<IssueBook> listAll(Model model) {
        List<IssueBook> listIssueBook = repo.findAll();
        listIssueBook = listIssueBook.stream().filter(issueBk -> issueBk.getIsActive() == true).toList();
        model.addAttribute("listIssueBook", listIssueBook);
        return listIssueBook;
    }

    @PostMapping("/issue-book")
    public void save(@RequestBody IssueBook issueBook){
        System.out.println(issueBook);
        System.out.println(issueBook.getIssueDate());
        issueBook.setStudent(studentRepository.findById(issueBook.getStudent().getId()).get());
        System.out.println(studentRepository.findById(issueBook.getStudent().getId()).get());
        issueBook.setBook(bookRepository.findById(issueBook.getBook().getId()).get());
        issueBook.setLibrarian(librarianRepository.findById(issueBook.getLibrarian().getId()).get());
        issueBook.setCreateTs(LocalDateTime.now());
        issueBook.setModifiedTs(LocalDateTime.now());
        //issueBook.setStudent();

        repo.save(issueBook);
    }

    @GetMapping("issue-book/{id}")
    public ResponseEntity<IssueBook> getUser(@PathVariable Integer id){

        Optional<IssueBook> issueBook = repo.findById(id);

        if(issueBook.isPresent()){
            return new ResponseEntity<>(issueBook.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("/issue-book")
    public void updateBook(@RequestBody IssueBook issueBook){
        issueBook.setModifiedTs(LocalDateTime.now());
        repo.save(issueBook);
    }
    
}
