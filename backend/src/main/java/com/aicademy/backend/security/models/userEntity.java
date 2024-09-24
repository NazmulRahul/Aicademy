package com.aicademy.backend.security.models;

import com.aicademy.backend.fileManager.models.UserTopicMap;
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
public class userEntity {
    @Id
    private ObjectId id;
    private String name;
    private String email;
    private String password;
    @DocumentReference
    private UserTopicMap topics;
    private List<Role> roles = new ArrayList<>();
    @Override
    public String toString(){
        return id+" "+ email;
    }
}
