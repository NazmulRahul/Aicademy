package com.aicademy.backend.repository;

import com.aicademy.backend.models.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
    Optional<UserEntity> findByPhoneNum(String phoneNum);
    Boolean existsByPhoneNum(String phoneNum);
}
