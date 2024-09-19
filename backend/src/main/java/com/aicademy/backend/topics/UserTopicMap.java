package com.aicademy.backend.topics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "user_topic_maps")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTopicMap {
    @Id
    private ObjectId id;
    private Map<String, List<topicEntity>> subToTopicsMap=new HashMap<>();
}
