package com.example.LMS.Config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.LMS.filter.JwtFilter;


@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean filter= new FilterRegistrationBean();
        filter.setFilter(new JwtFilter());

//        provide endpoints which needs to be restricted.
//        All Endpoints would be restricted if unspecified
        filter.addUrlPatterns("/books");
        filter.addUrlPatterns("/user");
        filter.addUrlPatterns("/bookCount");
        filter.addUrlPatterns("/issue-book");
        filter.addUrlPatterns("/return-book");


        return filter;
    }
}