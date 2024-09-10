package com.aicademy.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    private ObjectId id;

    private String phoneNum;

    private String password;

    private List<Role> roles = new ArrayList<>();
    @Override
    public String toString(){
        return id+" "+phoneNum;
    }
}
