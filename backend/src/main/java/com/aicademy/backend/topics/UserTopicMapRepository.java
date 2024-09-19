package com.aicademy.backend.topics;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserTopicMapRepository extends MongoRepository<UserTopicMap, ObjectId> {
}