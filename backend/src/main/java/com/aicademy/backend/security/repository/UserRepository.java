package com.aicademy.backend.security.repository;

import com.aicademy.backend.models.UserTopicMap;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<UserTopicMap, ObjectId> {
    Optional<UserTopicMap> findByEmail(String email);
    Boolean existsByEmail(String email);
}
