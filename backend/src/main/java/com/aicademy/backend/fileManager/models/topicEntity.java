package com.aicademy.backend.fileManager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection ="topics")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class topicEntity {
    @Id
    private ObjectId id;
    private String topicName;
    private String content;
    private List<String> imagePath;
    private List<FileEntity> filePath;
    private List<String> videoPath;
    public topicEntity(String topicName,String content){
        this.topicName=topicName;
        this.content=content;
        this.imagePath=new ArrayList<>();
        this.filePath=new ArrayList<>();
        this.videoPath=new ArrayList<>();
    }
}

