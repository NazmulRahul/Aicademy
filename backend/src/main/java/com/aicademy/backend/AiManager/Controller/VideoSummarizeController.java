package com.aicademy.backend.AiManager.Controller;

import com.aicademy.backend.AiManager.DTO.ResponseDTO;
import com.aicademy.backend.AiManager.Service.AiService;
import com.aicademy.backend.AiManager.Service.VideoSummarizeService;
import com.aicademy.backend.AiManager.DTO.SummarizeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/public/youtube")
public class VideoSummarizeController {
    @Autowired
    VideoSummarizeService videoSummarizeService;
    @Autowired
    AiService aiService;
    @PostMapping("/summarize")
    public ResponseEntity<?> test(@RequestBody SummarizeRequestDTO summarizeRequest) throws Exception{
        String CAPTION_FILE_PATH = "captions";
        videoSummarizeService.downloadCaptions(summarizeRequest.getUrl(),CAPTION_FILE_PATH);

        String captions = videoSummarizeService.readCaptionsFromFile(CAPTION_FILE_PATH+".en.srt");
        System.out.println("Captions:\n" + captions);
        String prompt="Give me a detailed summary of the following caption of a youtube video and" +
                " point out the key points of the video. Provide the response in a jsx element to put it in react. background color and text color: bg-gray-950 text-gray-300" +
                "use tailwind css to style the element. Use class instead of className to add css. Response exactly like this so that i can directly put it in react:" +
                "  <div class=\"p-4 bg-gray-100 rounded-md shadow-md\">\n" +
                "      <h2 class=\"text-2xl font-bold mb-4\">Summary of the Video</h2>\n" +
                "      <p class=\"mb-2\">In this video, the author demonstrates how to implement user registration, authentication, and authorization in Spring Boot web APIs using JSON Web Token (JWT). The next video will cover role-based authorization. Key steps outlined are as follows:</p>\n" +
                "      <ul class=\"list-disc list-inside mb-4\">\n" +
                "        <li>Create a new Spring Boot project using Spring Initializer.</li>\n" +
                "        <li>Add necessary dependencies including Spring Web, MySQL driver, Spring JPA, Validation, and Spring Security.</li>\n" +
                "        <li>Implement profile retrieval method that requires authentication using JWT.</li>\n" +
                "      </ul>\n" +
                "      <p class=\"mb-2\">The application is thoroughly explained and run using Postman to test the endpoints. The next video will delve into implementing role-based authorization using JWT.</p>\n" +
                "      <p class=\"text-blue-600\">Watch the next video for role-based authorization by following the link in the description.</p>\n" +
                "    </div> : "+captions;

        return ResponseEntity.ok().body(ResponseDTO.builder().content(aiService.sendSinglePrompt(prompt,"Summarizing youtube video")).build());
    }
}
