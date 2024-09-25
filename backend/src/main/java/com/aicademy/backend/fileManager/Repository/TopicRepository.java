package com.aicademy.backend.fileManager.Repository;

import com.aicademy.backend.fileManager.models.topicEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TopicRepository extends MongoRepository<topicEntity, ObjectId> {
    Optional<topicEntity> findByTopicName(String topicName);
}
