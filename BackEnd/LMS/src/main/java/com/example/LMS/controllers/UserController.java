package com.example.LMS.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.Config.JwtGeneratorInterface;
import com.example.LMS.Exception.UserNotFoundException;
import com.example.LMS.model.EmailDetails;
import com.example.LMS.model.User;
import com.example.LMS.services.AESEncryption;
import com.example.LMS.services.EmailService;
import com.example.LMS.services.UserRepository;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    private UserRepository userrepo;

    @Autowired
    private EmailService emailService;


    @Autowired
    private JwtGeneratorInterface jwtGenerator;

    @GetMapping("/user")
    public List<User> listAll(Model model){
        List<User> listUsers = userrepo.findAll();
        model.addAttribute("listUsers", listUsers);
        return listUsers;
    }
    

    @PostMapping("/login123")
    public String login(@RequestBody User user) throws Exception{
        System.out.println(user);
        List<User> listUsers = userrepo.findAll();
        String encPassword = AESEncryption.encrypt(user.getPassword());
        Optional<User> userobj = listUsers.stream().filter(obj -> obj.getName().equals(user.getName()) && obj.getPassword().equals(encPassword)).findFirst();
        //
        if(userobj.isPresent()) {
            return "true";
        }

        return "false";
    }
    
    @PutMapping("/user")
    public void updateUser(@RequestBody User user){
        user.setModifiedTs(LocalDateTime.now());
        userrepo.save(user);
    }

    @PutMapping("/resetPassword")
    public void updateUserPassword(@RequestBody User user) throws Exception{
        user.setModifiedTs(LocalDateTime.now());
        user.setPassword(AESEncryption.encrypt(user.getPassword()));
        userrepo.save(user);
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) throws Exception {
        try {
            if(user.getName() == null || user.getPassword() == null) {
                throw new UserNotFoundException("UserName or Password is Empty");
            }
            String encPassword = AESEncryption.encrypt(user.getPassword());
            User userData = userrepo.findByNameAndPassword(user.getName(), encPassword);
            if(userData == null){
                throw new UserNotFoundException("UserName or Password is Invalid");
            }
            return new ResponseEntity<>(jwtGenerator.generateToken(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
        //return new ResponseEntity<>("testing", HttpStatus.OK);
    }

    @PostMapping("/createUser")
     public void saveUser(@RequestBody User user){


        user.setCreateTs(LocalDateTime.now());
        user.setModifiedTs(LocalDateTime.now());
       
        userrepo.save(user);
    }


    @PostMapping("/forgotPassword")
    public String forgotPassword(@RequestBody User user) throws Exception{
        EmailDetails details = new EmailDetails();
        System.out.println(user);
        List<User> listUsers = userrepo.findAll();
        Optional<User> userobj = listUsers.stream().filter(obj -> obj.getName().equals(user.getName()) && obj.getUsertype().equals(user.getUsertype())).findFirst();
        System.out.println(userobj);

        if(userobj.isPresent()) {
            UUID randomUUID = UUID.randomUUID();
            String password = randomUUID.toString().replaceAll("-", "");
            String encPassword = AESEncryption.encrypt(password);            
            User usr = userobj.get();
            usr.setPassword(encPassword);
            updateUser(usr);

            details.setRecipient("yadavhp230@gmail.com");
            details.setMsgBody("Hi! "+user.getName()+"\n\nYour new Password is:"+password+"\n");
            details.setSubject("New Password");
            String status = emailService.sendSimpleMail(details);
            System.out.println(status);
            return "true";
        }

        return "false";
    }

    


}
