package com.jobmatch.infrastructure.web.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String senha;
}
