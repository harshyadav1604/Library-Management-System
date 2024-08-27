package com.example.LMS.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.model.Admin;
import com.example.LMS.model.EmailDetails;
import com.example.LMS.model.Librarian;
import com.example.LMS.model.Student;
import com.example.LMS.model.User;
import com.example.LMS.services.AESEncryption;
import com.example.LMS.services.AdminRepository;
import com.example.LMS.services.EmailService;
import com.example.LMS.services.LibrarianRepository;
import com.example.LMS.services.StudentRepository;
import com.example.LMS.services.UserRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class AdminController {

    @Autowired
    private AdminRepository adminrepo;

    @Autowired
    private StudentRepository stdRepo;

    @Autowired
    private LibrarianRepository libRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userrepo;

    @GetMapping("/admin")
    public List<Admin> listAll(Model model){

        List<Admin> listAdmin = adminrepo.findAll();
        listAdmin = listAdmin.stream().filter(admin -> admin.getIsActive() == true).toList();
        model.addAttribute("listAdmin", listAdmin);
        return listAdmin;
    }

    @PostMapping("/loginAdmin")
    public String login(@RequestBody Admin admin) throws Exception{
        System.out.println(admin);
        String encPassword = AESEncryption.encrypt(admin.getPassword());
        List<Admin> listAdmins = adminrepo.findAll();
        Optional<Admin> useradmin = listAdmins.stream().filter(obj -> obj.getUsername().equals(admin.getUsername()) && obj.getPassword().equals(encPassword)).findFirst();
        //
        if(useradmin.isPresent()) {
            return "true";
        }

        return "false";
    }

    @PostMapping("/createLibrarians")
     public void saveLibrarians(@RequestBody Librarian librarian) throws Exception{

        UUID randomUUID = UUID.randomUUID();
        String password = randomUUID.toString().replaceAll("-", "");
        String encpassword = AESEncryption.encrypt(password);

        librarian.setCreateTs(LocalDateTime.now());
        librarian.setModifiedTs(LocalDateTime.now());
        libRepo.save(librarian);

        EmailDetails details = new EmailDetails();

        String message = "Dear " + librarian.getName() + ",\n\n" +
        "We are pleased to inform you that you have been successfully added to our Library Management System (LMS). Welcome aboard!\n\n" +
        "As part of your enrollment, a default password has been generated for you:\n\n" +
        "Your Default Password: " + password + "\n\n" +
        "Please use this password to log in to your account. For your security, we strongly recommend that you change your password as soon as possible. " +
        "You can do this by visiting the Librarian Portal and navigating to the Password Settings section.\n\n" +
        "With warm regards,\n" +
        "Admin\n" +
        "LMS Administration Team";

        details.setRecipient("yadavhp230@gmail.com");
        // details.setMsgBody("Hi! "+librarian.getName()+"\n\n You've been added Successfully\n Your default Password is "+password+"\nIf you to change the password you can go to Student portal Password Setting to set your own Password \nWith Regards,\n Admin");
        details.setMsgBody(message);
        details.setSubject("Welcome to LMS - Admission Confirmation");
        String status = emailService.sendSimpleMail(details);
        System.out.println(status);

        User user = new User();

        user.setId(null);
        user.setName(librarian.getUsername());
        user.setIsActive(true);
        user.setPassword(encpassword);
        user.setCreateTs(LocalDateTime.now());
        user.setModifiedTs(LocalDateTime.now());
        user.setUsertype("Librarian");
        user.setEmailId(librarian.getEmailId());

        userrepo.save(user);


    }

    @PostMapping("/createStudents")
    public void saveStudents(@RequestBody Student student) throws Exception{

        UUID randomUUID = UUID.randomUUID();
        String password = randomUUID.toString().replaceAll("-", "");
        String encpassword = AESEncryption.encrypt(password);

        student.setCreateTs(LocalDateTime.now());
        student.setModifiedTs(LocalDateTime.now());
        stdRepo.save(student);

        EmailDetails details = new EmailDetails();

        String message = "Dear " + student.getName() + ",\n\n" +
        "We are pleased to inform you that you have been successfully added to our Library Management System (LMS). Welcome aboard!\n\n" +
        "As part of your enrollment, a default password has been generated for you:\n\n" +
        "Your Default Password: " + password + "\n\n" +
        "Please use this password to log in to your account. For your security, we strongly recommend that you change your password as soon as possible. " +
        "You can do this by visiting the Student Portal and navigating to the Password Settings section.\n\n" +
        "With warm regards,\n" +
        "Admin\n" +
        "LMS Administration Team";

        details.setRecipient("yadavhp230@gmail.com");
        details.setMsgBody(message);
        details.setSubject("Welcome to LMS - Admission Confirmation");
        String status = emailService.sendSimpleMail(details);
        System.out.println(status);

        User user = new User();

        user.setId(null);
        user.setName(student.getUsername());
        user.setIsActive(true);
        user.setPassword(encpassword);
        user.setCreateTs(LocalDateTime.now());
        user.setModifiedTs(LocalDateTime.now());
        user.setUsertype("Student");
        user.setEmailId(student.getEmailId());


        userrepo.save(user);


    }

    @PostMapping("/forgotPasswordAdmin")
    public String forgotPassword(@RequestBody Admin admin) throws Exception{
        EmailDetails details = new EmailDetails();
        System.out.println(admin);
        List<Admin> listAdmin = adminrepo.findAll();
        Optional<Admin> adminObj = listAdmin.stream().filter(obj -> obj.getUsername().equals(admin.getUsername())).findFirst();
        System.out.println(adminObj);

        if(adminObj.isPresent()) {
            UUID randomUUID = UUID.randomUUID();
            String password = randomUUID.toString().replaceAll("-", "");
            String encPassword = AESEncryption.encrypt(password); 
            
            Admin adm = adminObj.get();
            adm.setPassword(encPassword);
            updateAdmin(adm);

            details.setRecipient("yadavhp230@gmail.com");
            details.setMsgBody("Hi! "+admin.getName()+"\n\nYour new Password is:"+password+"\n");
            details.setSubject("New Password");
            String status = emailService.sendSimpleMail(details);
            System.out.println(status);
            return "true";
        }

        return "false";
    }

    @PutMapping("/admin")
    public void updateAdmin(@RequestBody Admin admin){
        admin.setModifiedTs(LocalDateTime.now());
        adminrepo.save(admin);
    }

    @PutMapping("/resetAdminPass")
    public void updateAdminPass(@RequestBody Admin admin) throws Exception{
        admin.setPassword(AESEncryption.encrypt(admin.getPassword()));
        admin.setModifiedTs(LocalDateTime.now());
        adminrepo.save(admin);
    }



}
