package com.example.LMS.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.model.EmailDetails;
import com.example.LMS.model.IssueBook;
import com.example.LMS.model.ReturnBook;
import com.example.LMS.services.EmailService;
import com.example.LMS.services.IssueBookRepository;
import com.example.LMS.services.ReturnBookRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class ReturnBookController {
    
    @Autowired
    private ReturnBookRepository returnBookRepo;


    @Autowired
    private IssueBookRepository issueBookRepo;

    @Autowired
    private EmailService emailService;

    @GetMapping("/return-book")
    public List<ReturnBook> listAll(Model model){
        List<ReturnBook> listReturnBook = returnBookRepo.findAll();
        model.addAttribute("listReturnBook", listReturnBook);
        return listReturnBook;
    }

    @PostMapping("/return-book")
    public void save(@RequestBody ReturnBook returnBook){

        EmailDetails details = new EmailDetails();
        LocalDate currentdate = LocalDate.now();

        IssueBook issueBook = issueBookRepo.findById(returnBook.getIssueBook().getTID()).get();
        returnBook.setIssueBook(issueBook);
        returnBook.setCreateTs(LocalDateTime.now());
        returnBook.setModifiedTs(LocalDateTime.now());
        returnBookRepo.save(returnBook);

        issueBook.setIsActive(false);

        issueBookRepo.save(issueBook);

        int fine = (int)(ChronoUnit.DAYS.between(returnBook.getIssueBook().getDueDate(), currentdate))*50;

        if(fine<=0){
            fine = 0;
        }

        details.setRecipient("yadavhp230@gmail.com");
        details.setMsgBody("Hi! "+returnBook.getIssueBook().getStudent().getName()+"\n\nBook Returned Successfully\n You Paid: "+fine+"\n\nIssue Date: "+returnBook.getIssueBook().getIssueDate()
        +"\n\n Due Date: "+ returnBook.getIssueBook().getDueDate()+"\n\n Return Date: "+currentdate);
        details.setSubject("Test Email");
        String status = emailService.sendSimpleMail(details);
        System.out.println(status);

    }
}
