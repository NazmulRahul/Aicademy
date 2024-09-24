package com.aicademy.backend.security.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Async
    public void sendEmail(MimeMessage email) {
        javaMailSender.send(email);
    }
    public MimeMessage createMimeMessage() {
        return javaMailSender.createMimeMessage();
    }
}