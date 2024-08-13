package com.example.skilltracker_api.web;

import com.example.skilltracker_api.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("authenticate")
  public String authenticate() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return authenticationService.authenticate(authentication);
  }
}

