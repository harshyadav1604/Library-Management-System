package com.example.LMS.Config;

import java.util.Map;

import com.example.LMS.model.User;


public interface JwtGeneratorInterface {

    Map<String, String> generateToken(User user);
}
