package com.aicademy.backend.topics;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface topicRepository extends MongoRepository<topicEntity, ObjectId> {
}
