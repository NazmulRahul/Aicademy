package com.aicademy.backend.AiManager.Controller;

import com.aicademy.backend.AiManager.DTO.*;
import com.aicademy.backend.AiManager.Service.AiService;
import com.aicademy.backend.fileManager.Service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin
@RequestMapping("/public/bot")
public class AiController {

    @Autowired
    private AiService aiService;
    @Autowired
    FirebaseService firebaseService;

    @PostMapping("/chat")
    public ResponseEntity<ResponseDTO> chat(@RequestBody ChatRequestDTO chatRequestDTO){

        System.out.println(chatRequestDTO.getPrompt());
        String prompt="This is our chat history "+chatRequestDTO.getHistory()+
                ". Now response to this prompt: "+chatRequestDTO.getPrompt();

        return ResponseEntity.ok()
                .body(ResponseDTO.builder().content(
                        aiService.sendSinglePrompt(prompt," ChatBot")).build());
    }

    @PostMapping("/quiz")
    public ResponseEntity<ResponseDTO> quiz(@RequestBody quizDataDTO data){
        System.out.println("Quiz generation API Called");
        return ResponseEntity.ok().body(ResponseDTO.builder()
                        .content(aiService.generateQuiz(data.getText(),data.getTotalQuestions(),data.getLevel()))
                        .build()) ;
    }

    @PostMapping("/image/generate")
    public ResponseEntity<?> generateImageUsingOpenAI(@RequestBody ImageGenerateDTO imageGenerateDTO) throws Exception {
        System.out.println("Image generation api called");

        String Url=aiService.generateImage(imageGenerateDTO.getPrompt(),1, "1024x1024");
        System.out.println(Url);

        String imageName = "generated-image-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".jpg";


        System.out.println("Image Generated Successfully " + imageName);
        String fireBaseUrl=firebaseService.uploadFile(aiService.downloadImage(Url,imageName),imageName);
        System.out.println("file Uploaded to firebase Successfully");
        firebaseService.addFilePathToUser(
                imageGenerateDTO.getEmail(),
                imageGenerateDTO.getSubject(),
                imageGenerateDTO.getTopic(),imageName,fireBaseUrl,true);
        System.out.println("Image path added to user successfully");

        return ResponseEntity.ok()
                .body(ImageGenResponseDTO.builder().link(fireBaseUrl).build());
    }

}
