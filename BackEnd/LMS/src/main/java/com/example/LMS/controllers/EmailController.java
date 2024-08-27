package com.example.LMS.controllers;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.model.EmailDetails;
import com.example.LMS.model.IssueBook;
import com.example.LMS.services.EmailService;
import com.example.LMS.services.IssueBookRepository;

@RestController
public class EmailController {
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private IssueBookRepository IssueBkRepo;
 
    // Sending a simple Email
    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details)
    {
        String status = emailService.sendSimpleMail(details);
        return status;
    }

    @GetMapping("/Test")
    public void test(){
        LocalDate currentdate = LocalDate.now();
        EmailDetails details = new EmailDetails();
        //System.out.println(ChronoUnit.DAYS.between(dt, date));

        List<IssueBook> listIssueBook = IssueBkRepo.findAll();
        listIssueBook = listIssueBook.stream().filter(issueBk -> issueBk.getIsActive() == true && (ChronoUnit.DAYS.between(issueBk.getDueDate(), currentdate)>0)).toList();

        for (IssueBook issueBook : listIssueBook) {
            details.setRecipient("yadavhp230@gmail.com");
            details.setMsgBody(issueBook.getStudent().getName()+" please the return the book "+issueBook.getBook().getName());
            details.setSubject("Test Email");
            String status = emailService.sendSimpleMail(details);
            System.out.println(status);
        }


    }
}

