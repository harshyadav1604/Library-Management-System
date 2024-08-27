package com.example.LMS.services;

import com.example.LMS.model.EmailDetails;

public interface EmailService {
     String sendSimpleMail(EmailDetails details);
}
