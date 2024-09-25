package com.aicademy.backend.security.repository;

import com.aicademy.backend.security.models.userEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<userEntity, ObjectId> {
    Optional<userEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
}
