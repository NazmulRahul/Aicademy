package com.aicademy.backend.topics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="topics")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class topicEntity {
    @Id
    private ObjectId id;
    private String topicName;
    private String topicInfo;
    public topicEntity(String topicName, String topicInfo){
        this.topicName=topicName;
        this.topicInfo=topicInfo;
    }
}

