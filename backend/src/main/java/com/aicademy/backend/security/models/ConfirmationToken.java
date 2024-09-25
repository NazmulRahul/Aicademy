package com.aicademy.backend.security.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationToken {
    @Id
    private ObjectId Id;
    private String confirmationToken;
    public ConfirmationToken(int number){
        this.confirmationToken= String.valueOf(number);
    }
}
