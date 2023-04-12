package com.autonomous.nuribom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class NuriBomApplication {
    public static void main(String[] args) {
        SpringApplication.run(NuriBomApplication.class, args);
    }
}