package com.aicademy.backend.fileManager.Service;

import com.aicademy.backend.fileManager.DTO.FirebaseUploadDTO;
import com.aicademy.backend.security.models.userEntity;
import com.aicademy.backend.security.repository.UserRepository;
import com.aicademy.backend.fileManager.Repository.UserTopicMapRepository;
import com.aicademy.backend.fileManager.models.FileEntity;
import com.aicademy.backend.fileManager.models.UserTopicMap;
import com.aicademy.backend.fileManager.models.topicEntity;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FirebaseService {

    @Value(("${firebase.bucket.name}"))
    private String bucketName;
    @Autowired
    FirebaseInitializer firebaseInitializer;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserTopicMapRepository userTopicMapRepository;
    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    public String uploadFile(File file, String fileName) throws IOException {

        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        InputStream inputStream = FirebaseService.class.getClassLoader().getResourceAsStream("firebaseCredentials.json"); // change the file name with your one
        if(inputStream==null) throw new RuntimeException("input Stream is null. Json file not found");
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        System.out.println("Uploaded Successfully");
        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/"+bucketName+"/o/%s?alt=media";
        System.out.println("Image Uploaded Successfully");
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }


    public String upload(FirebaseUploadDTO firebaseUploadDTO) {
        try {
            String fileName = firebaseUploadDTO.getFile().getOriginalFilename();
            System.out.println(fileName);
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));
            File file = this.convertToFile(firebaseUploadDTO.getFile(), fileName);
            String URL = this.uploadFile(file, fileName);
            file.delete();
            return URL;
        } catch (Exception e) {
            e.printStackTrace();
            return "Image couldn't upload, Something went wrong";
        }
    }

    public void addFilePathToUser(String email, String subject, String topicName,String fileName ,String filePath,boolean isImage){
        Optional<userEntity> userOptional=userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            System.out.println(userOptional.get().getName());
            userEntity user = userOptional.get();

            UserTopicMap userTopicMap = user.getTopics();
            System.out.println(user.getEmail()+"\n"+email);

            if (userTopicMap == null) { userTopicMap = new UserTopicMap(); }

            List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().get(subject);
            if(topicList==null) throw new RuntimeException("No Subject is registered in this name"+subject);

            for (topicEntity topic : topicList) {
                if (topic.getTopicName().equals(topicName)) {
                    if(isImage) topic.getImagePath().add(filePath);
                    else topic.getFilePath().add(new FileEntity(fileName,filePath));
                    break;
                }
            }
            userTopicMap.getSubToTopicsMap().put(subject, topicList);
            userTopicMap = userTopicMapRepository.save(userTopicMap);
            user.setTopics(userTopicMap);
            userRepository.save(user);
        }
    }
    public String deleteFileFromFirebase(String fileName){
        try {

            InputStream inputStream = FirebaseService.class.getClassLoader().getResourceAsStream("firebaseCredentials.json");
            if (inputStream == null) throw new RuntimeException("input Stream is null. JSON file not found");

            Credentials credentials = GoogleCredentials.fromStream(inputStream);
            Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();


            BlobId blobId = BlobId.of(bucketName, fileName);

            // Delete the file
            boolean deleted = storage.delete(blobId);

            if (deleted) {
                return "File deleted successfully.";
            } else {
                throw new Exception("File not found or deletion failed.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error occurred while deleting file: " + e.getMessage());
        }
    }
}
