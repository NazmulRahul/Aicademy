package com.aicademy.backend.fileManager.Controller;

import com.aicademy.backend.AiManager.Service.AiService;
import com.aicademy.backend.fileManager.DTO.DeleteReqDTO;
import com.aicademy.backend.fileManager.DTO.NewSubjectDTO;
import com.aicademy.backend.fileManager.DTO.TopicGenerateDTO;
import com.aicademy.backend.fileManager.Service.FirebaseService;
import com.aicademy.backend.fileManager.Service.FileService;
import com.aicademy.backend.fileManager.models.UserTopicMap;
import com.aicademy.backend.fileManager.models.topicEntity;
import com.aicademy.backend.security.JWT.JWTDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/public")
public class FileController {
    @Autowired
    private FileService fileService;
    @Autowired
    AiService aiService;
    @Autowired
    FirebaseService firebaseService;

    @PostMapping("/topic/new")
    public ResponseEntity<?> createTopic(@RequestBody TopicGenerateDTO topicDTO){
        System.out.println(topicDTO);

        String prompt="Create a "+topicDTO.getLevel()+" detailed lesson on "+topicDTO.getTopic()+" in "+ topicDTO.getSubject() +
                ". Give it a title and maintain " + topicDTO.getLevel() + " level knowledge." +
                " Provide some relevant examples and youtube video links." +
                " Provide the response in a jsx element to put it in react" +
                " with tailwind CSS class. background color and text color: bg-gray-950 text-gray-200" +
                " only provide contents inside the return. do not include return in your response." +
                " Use class instead of className in CSS. Give width full. Response exactly in this format so that i can directly put it in react:" +
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
                "    </div> ";


        String response=aiService.sendSinglePrompt(prompt,"new Topic");

        System.out.println(response);

        topicEntity topic=new topicEntity(topicDTO.getTopic(),response);

        fileService.addTopic(topic,topicDTO.getEmail(),topicDTO.getSubject());

        return ResponseEntity.ok()
                .body("Successfully created new Topic");
    }

    @PostMapping("/all/topic")
    public ResponseEntity<?> getTopics(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) throws Exception {

        return ResponseEntity.ok()
                .body(fileService.getAllTopics(JWTDecoder.getEmailFromJWT(token)));
    }


    @PostMapping("/file/delete")
    public ResponseEntity<?> deleteFile(@RequestBody DeleteReqDTO deleteReqDTO) throws Exception {

        fileService.deleteNote(
                deleteReqDTO.getEmail(),deleteReqDTO.getSubject(),deleteReqDTO.getTopic(),deleteReqDTO.getFile());

        String resultString = deleteReqDTO
                .getFile()
                .getFilePath().replace("https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/", "");

        String fileName=resultString.replace("?alt=media","");

        firebaseService.deleteFileFromFirebase(fileName);

        return ResponseEntity.ok()
                .body(fileService.getAllTopics(deleteReqDTO.getEmail()));
    }
    @PostMapping("/topic/delete")
    public ResponseEntity<?> deleteTopic(@RequestBody DeleteReqDTO deleteReqDTO) throws Exception {

        fileService.deleteTopic(
                deleteReqDTO.getEmail(),deleteReqDTO.getSubject(),deleteReqDTO.getTopic());

        return ResponseEntity.ok()
                .body(fileService.getAllTopics(deleteReqDTO.getEmail()));
    }
    @PostMapping("/subject/new")
    public ResponseEntity<UserTopicMap> addSubject(@RequestBody NewSubjectDTO newSubjectDTO){
        fileService.addSubject(newSubjectDTO.getEmail(),newSubjectDTO.getSubject());
        return ResponseEntity.ok()
                .body(fileService.getAllTopics(newSubjectDTO.getEmail()));
    }
    @PostMapping("/subject/delete")
    public ResponseEntity<?> deleteSubject(@RequestBody NewSubjectDTO newSubjectDTO) throws Exception {

        fileService.deleteSubject(newSubjectDTO.getEmail(),newSubjectDTO.getSubject());

        return ResponseEntity.ok()
                .body(fileService.getAllTopics(newSubjectDTO.getEmail()));
    }
}
