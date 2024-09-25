package com.aicademy.backend.security.Service;

import com.aicademy.backend.security.models.ConfirmationToken;
import com.aicademy.backend.security.models.Role;
import com.aicademy.backend.security.models.userEntity;
import com.aicademy.backend.security.repository.ConfirmationTokenRepository;
import com.aicademy.backend.security.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService  implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    EmailService emailService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        userEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found"));
        return new User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }



    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
    public String confirmEmail(String confirmationToken) {
        Optional<ConfirmationToken> token = Optional.ofNullable(
                confirmationTokenRepository.findByConfirmationToken(confirmationToken));

        if(token.isPresent())
        {
            confirmationTokenRepository.deleteById(token.get().getId());
            return "Email verified successfully!";
        }
        return "Error: Couldn't verify email";
    }

    public void sendConfirmationToken(String email)throws MessagingException {

        SecureRandom random = new SecureRandom();
        int randomNumber = 1000 + random.nextInt(9000);

        ConfirmationToken confirmationToken = new ConfirmationToken(randomNumber);

        confirmationTokenRepository.save(confirmationToken);

        MimeMessage mimeMessage = emailService.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(email);
        helper.setSubject("Complete Registration!");


        String htmlContent = "<html>" +
                "<body>" +
                "<h1 style='color:#007BFF;'>Hello!</h1>" +
                "<p>Thank you for registering. Here is your OTP for account confirmation:</p>" +
                "<h2 style='color:#007BFF;'>" + confirmationToken.getConfirmationToken() + "</h2>" +
                "<p>If you did not request this, please ignore this email.</p>" +
                "<p>Thank you!</p>" +
                "</body>" +
                "</html>";

        helper.setText(htmlContent, true); // The 'true' flag enables HTML content

        emailService.sendEmail(mimeMessage);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
    }

}
