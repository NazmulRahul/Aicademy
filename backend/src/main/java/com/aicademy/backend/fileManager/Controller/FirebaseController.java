package com.aicademy.backend.fileManager.Controller;

import com.aicademy.backend.fileManager.DTO.FirebaseUploadDTO;
import com.aicademy.backend.fileManager.Service.FirebaseService;
import com.aicademy.backend.fileManager.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/public/firebase")
public class FirebaseController {
    @Value(("${firebase.bucket.name}"))
    private String bucketName;
    @Autowired
    FirebaseService firebaseService;
    @Autowired
    FileService fileService;
    @PostMapping("/upload")
    public ResponseEntity<?> saveFile(@ModelAttribute FirebaseUploadDTO firebaseUploadDTO){
        System.out.println("Starting Upload to firebase" + firebaseUploadDTO.getFileName());
        String firebaseUrl=firebaseService.upload(firebaseUploadDTO);
        firebaseService.addFilePathToUser(
                firebaseUploadDTO.getEmail(),
                firebaseUploadDTO.getSubject(),
                firebaseUploadDTO.getTopic(),
                firebaseUploadDTO.getFileName(),
                firebaseUrl,false);

        return ResponseEntity.ok()
                .body(fileService.getAllTopics(firebaseUploadDTO.getEmail()));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestParam String fileUrl) throws Exception {
        String resultString = fileUrl.replace("https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/", "");
        String fileName=resultString.replace("?alt=media","");
        return ResponseEntity.ok().body(firebaseService.deleteFileFromFirebase(fileName));
    }

}
