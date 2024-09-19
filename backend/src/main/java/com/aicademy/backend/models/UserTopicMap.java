package com.aicademy.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTopicMap {

    @Id
    private ObjectId id;
    private String email;
    private String password;
    @DocumentReference
    private com.aicademy.backend.topics.UserTopicMap userTopicMap;
    private List<Role> roles = new ArrayList<>();
    @Override
    public String toString(){
        return id+" "+ email;
    }
}
