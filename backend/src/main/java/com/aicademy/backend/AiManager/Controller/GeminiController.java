package com.aicademy.backend.AiManager.Controller;

import com.aicademy.backend.AiManager.DTO.QuizDataDTO;
import com.aicademy.backend.AiManager.DTO.ResponseDTO;
import com.aicademy.backend.AiManager.DTO.SummarizeRequestDTO;
import com.aicademy.backend.AiManager.Service.GeminiService;
import com.aicademy.backend.AiManager.Service.VideoSummarizeService;
import com.aicademy.backend.fileManager.DTO.TopicGenerateDTO;
import com.aicademy.backend.fileManager.Service.FileService;
import com.aicademy.backend.fileManager.models.topicEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/public")
public class GeminiController {
    @Autowired
    FileService fileService;
    @Autowired
    GeminiService geminiService;
    @Autowired
    VideoSummarizeService videoSummarizeService;
    @PostMapping("/gemini/topic/new")
    public ResponseEntity<?> generateStory(@RequestBody TopicGenerateDTO topicDTO) {
        System.out.println("generateStory called");

        String prompt="Create a "+topicDTO.getLevel()+" detailed lesson on "+topicDTO.getTopic()+" in "+ topicDTO.getSubject() +
                ". Give it a title and maintain " + topicDTO.getLevel() + " level knowledge." +
                " Provide some relevant examples and youtube video links. You should Generate minimum 1000 tokens" +
                " Provide the response in a jsx element to put it in react" +
                " with tailwind CSS class. background color and text color: bg-gray-950 text-gray-200" +
                " only provide contents inside the return. do not include return in your response." +
                " Use class instead of className in CSS. Give width full.don't include ```jsx in response. Response exactly in this format so that i can directly put it in react:" +
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
                "    </div> " + "also "+topicDTO.getInstruction();


        topicEntity topic=new topicEntity(topicDTO.getTopic(),geminiService.generate(prompt));

        fileService.addTopic(topic,topicDTO.getEmail(),topicDTO.getSubject());
        return ResponseEntity.ok().body("Successfully generated new topic");
    }

//    @PostMapping("/gemini/quiz")
//    public ResponseEntity<?> generateQuiz(@RequestBody QuizDataDTO data) {
//        System.out.println("generate quiz called");
//
//        String prompt="You are a quiz master. Generate "+ data.getTotalQuestions() +
//                " random questions with 4 multiple choice answers. From this text " + data.getText() +
//                " . The questions should be " + data.getLevel() + " level. Also provide the answers separately. " +
//                "The answer should be in the following json  format and provide clean JSON string without escape " +
//                "characters and new lines:{\"questions\":[{\"id\":0,\"question\":\"\",\"options\":[],\"answer\":\"\"},..]} " +
//                "options must be indexed 'A','B','C','D' and so on.and answer should only contain 'A','B','C' and so on." +
//                " Do not include any extra word like `/```/jsx at beginning or at end of the response";
//
//        return ResponseEntity.ok().body(ResponseDTO.builder()
//                .content(geminiService.generate(prompt))
//                .build());
//    }

    @PostMapping("/gemini/text/summary")
    public ResponseEntity<?> generateQuiz(@RequestBody ResponseDTO data) {
        System.out.println("generate text Summary called");

        String prompt="Summarize this text clearly and add additional texts,links or videos to know more. "+ data +" Provide the response in a jsx element to put it in react. background color and text color: bg-gray-950 text-gray-300" +
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
                "    </div> Do not include any unnecessary character like ```jsx in the response";

        return ResponseEntity.ok().body(ResponseDTO.builder()
                .content(geminiService.generate(prompt))
                .build());
    }
    @PostMapping("/youtube/summarize")
    public ResponseEntity<?> test(@RequestBody SummarizeRequestDTO summarizeRequest) throws Exception{
        String CAPTION_FILE_PATH = "captions";
        videoSummarizeService.downloadCaptions(summarizeRequest.getUrl(),CAPTION_FILE_PATH);

        String captions = videoSummarizeService.readCaptionsFromFile(CAPTION_FILE_PATH+".en.srt");
        System.out.println("Captions:\n" + captions);
        String prompt="Give me a detailed summary of the following caption of a youtube video and" +
                " point out the key points of the video. Provide the response in a jsx element to put it in react. background color and text color: bg-gray-950 text-gray-300" +
                "use tailwind css to style the element. Use class instead of className to add css. Do not add the word '```jsx ' in your response. Response exactly like this so that i can directly use it in react:" +
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

        return ResponseEntity.ok().body(ResponseDTO.builder().content(geminiService.generate(prompt)).build());
    }
}
