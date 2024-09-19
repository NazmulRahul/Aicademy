package com.aicademy.backend.topics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/topic/new")
public class topicController {
    @Autowired
    private topicService reviewService;

    @PostMapping()
    public ResponseEntity<topicEntity> createReview(@RequestBody topicRegisterDTO trdto){
        System.out.println(trdto);
        return new ResponseEntity<>(
                reviewService.addTopic(trdto.getTopic(),trdto.getEmail(),trdto.getSubject()),
                HttpStatus.CREATED);
    }
}
