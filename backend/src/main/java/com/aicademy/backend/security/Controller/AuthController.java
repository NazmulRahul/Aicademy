package com.aicademy.backend.security.Controller;

import com.aicademy.backend.security.JWT.JWTGenerator;
import com.aicademy.backend.security.Service.CustomUserDetailsService;

import com.aicademy.backend.security.authDTO.AuthResponseDTO;
import com.aicademy.backend.security.authDTO.LoginDto;
import com.aicademy.backend.security.authDTO.RegisterDto;
import com.aicademy.backend.security.models.Role;
import com.aicademy.backend.security.models.userEntity;
import com.aicademy.backend.security.authDTO.VerifyDTO;
import com.aicademy.backend.security.repository.RoleRepository;
import com.aicademy.backend.security.repository.UserRepository;

import com.aicademy.backend.fileManager.models.UserTopicMap;
import com.aicademy.backend.fileManager.Repository.UserTopicMapRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    private CustomUserDetailsService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
            RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator,
            CustomUserDetailsService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.userService = userService;
    }

    @Operation(summary = "User login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful login", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid email or password", content = @Content)
    })
    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto) {
        System.out.println(loginDto.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @Autowired
    UserTopicMapRepository userTopicMapRepository;

    @Operation(summary = "User registration")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful registration", content = @Content),
            @ApiResponse(responseCode = "400", description = "Email is already in use", content = @Content)
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {

        System.out.println(registerDto.getPassword());

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is already in use!", HttpStatus.BAD_REQUEST);
        }

        userEntity user = new userEntity();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));
        System.out.println("roles set for registration");

        UserTopicMap userTopicMap = new UserTopicMap();
        userTopicMap.setSubToTopicsMap(new HashMap<>());
        UserTopicMap savedUserTopicMap = userTopicMapRepository.save(userTopicMap);

        user.setTopics(savedUserTopicMap);
        System.out.println("topics set for registration");

        userRepository.save(user);

        try {
            userService.sendConfirmationToken(registerDto.getEmail());
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send Mail from User Service");
        }

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }

    @Operation(summary = "Verify email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email verified successfully", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid OTP", content = @Content)
    })
    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody VerifyDTO verifyDTO) throws Exception {

        return ResponseEntity.ok().body(userService.confirmEmail(verifyDTO.getOtp()));
    }
}
