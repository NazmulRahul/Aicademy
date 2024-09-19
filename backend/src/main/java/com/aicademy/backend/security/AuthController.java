package com.aicademy.backend.security;


import com.aicademy.backend.security.authDTO.AuthResponseDTO;
import com.aicademy.backend.security.authDTO.LoginDto;
import com.aicademy.backend.security.authDTO.RegisterDto;
import com.aicademy.backend.models.Role;
import com.aicademy.backend.models.UserTopicMap;
import com.aicademy.backend.security.repository.RoleRepository;
import com.aicademy.backend.security.repository.UserRepository;


import com.aicademy.backend.topics.UserTopicMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        UserTopicMap user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ResponseEntity<>(new AuthResponseDTO(token,user.getUserTopicMap()), HttpStatus.OK);
    }

    @Autowired
    UserTopicMapRepository userTopicMapRepository;
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        System.out.println(registerDto.getPassword());
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is already in use!", HttpStatus.BAD_REQUEST);
        }

        UserTopicMap user = new UserTopicMap();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        // Create an empty UserTopicMap and save it
        com.aicademy.backend.topics.UserTopicMap userTopicMap = new com.aicademy.backend.topics.UserTopicMap();
        userTopicMap.setSubToTopicsMap(new HashMap<>()); // Initialize an empty map
        com.aicademy.backend.topics.UserTopicMap savedUserTopicMap = userTopicMapRepository.save(userTopicMap);

        // Link the newly created UserTopicMap to the UserEntity
        user.setUserTopicMap(savedUserTopicMap);

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }
}
