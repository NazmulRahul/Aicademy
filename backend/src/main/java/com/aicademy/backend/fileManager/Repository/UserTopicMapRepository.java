package com.aicademy.backend.fileManager.Repository;

import com.aicademy.backend.fileManager.models.UserTopicMap;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTopicMapRepository extends MongoRepository<UserTopicMap, ObjectId> {
}