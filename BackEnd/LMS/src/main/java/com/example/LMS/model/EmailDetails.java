package com.example.LMS.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class EmailDetails {
     // Class data members
     private String recipient;
     private String msgBody;
     private String subject;
     private String attachment;
}
