package com.aicademy.backend.security.repository;

import com.aicademy.backend.security.models.ConfirmationToken;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, ObjectId> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}