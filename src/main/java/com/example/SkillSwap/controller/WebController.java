package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/skills")
    public String skills() {
        return "skills";
    }

    @GetMapping("/matches")
    public String matches() {
        return "matches";
    }

    @GetMapping("/sessions")
    public String sessions() {
        return "sessions";
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }
}

