package com.aicademy.backend.security.models;

import com.aicademy.backend.fileManager.models.UserTopicMap;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class userEntity implements UserDetails {
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
    
    
    //TODO: temporary return statement
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> roles.toString());
    }
    
    @Override
    public String getPassword() {
        return this.password;
    }
    
    @Override
    public String getUsername() {
        return this.name;
    }
}
