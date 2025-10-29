package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionRequest {
    private Long providerId;
    private String skillName;
    private String description;
    private LocalDateTime scheduledTime;
    private Integer durationMinutes;
    private String location;
}

