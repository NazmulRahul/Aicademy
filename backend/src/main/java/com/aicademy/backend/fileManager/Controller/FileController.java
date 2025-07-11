package com.aicademy.backend.fileManager.Controller;

import com.aicademy.backend.AiManager.Service.AiService;
import com.aicademy.backend.fileManager.DTO.ContentResponseDto;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin
@RequestMapping("/public")
public class FileController {
    @Autowired
    private FileService fileService;
    @Autowired
    FirebaseService firebaseService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(OK)
    public ResponseEntity<ContentResponseDto> extractPDF(@RequestParam("pdfFile") MultipartFile pdfFile) {
        return ResponseEntity.ok()
                .body(ContentResponseDto.builder().content(this.fileService.extractContent(pdfFile)).build());

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
