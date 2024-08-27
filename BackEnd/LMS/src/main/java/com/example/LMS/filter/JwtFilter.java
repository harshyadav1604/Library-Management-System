package com.example.LMS.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Enumeration;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");
        response.addHeader("Access-Control-Expose-Headers", "xsrf-token");
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(servletRequest, servletResponse);
        } 
        else { 
        
        System.out.println("Request: "+ request.getHeaderNames());

        Enumeration<String> requestEn = request.getHeaderNames();

        while(requestEn.hasMoreElements()){
            System.out.println(requestEn.nextElement());
        }

        final String authHeader = request.getHeader("Authorization");
        // if ("OPTIONS".equals(request.getMethod())) {
        //     response.setStatus(HttpServletResponse.SC_OK);
        //     filterChain.doFilter(request, response);
        // } else {
        //     if(authHeader == null || !authHeader.startsWith("Bearer ")){
        //         throw new ServletException("An exception occurred");
        //     }
        // }
        final String token = authHeader.substring(7);
        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
        request.setAttribute("claims", claims);
        request.setAttribute("blog", servletRequest.getParameter("id"));
        filterChain.doFilter(servletRequest, servletResponse);
    }
    }
}
