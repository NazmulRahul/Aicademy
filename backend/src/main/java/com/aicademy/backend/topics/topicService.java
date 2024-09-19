package com.aicademy.backend.topics;

import com.aicademy.backend.models.UserTopicMap;
import com.aicademy.backend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class topicService {


        @Autowired
        private topicRepository topicRepository;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private UserTopicMapRepository userTopicMapRepository;

        @Transactional
        public topicEntity addTopic(topicEntity topic, String userEmail, String subject) {
            // Save the new topic to the database
            topicEntity savedTopic = topicRepository.save(topic);

            // Find the user by email (or ID if preferred)
            Optional<UserTopicMap> userOptional = userRepository.findByEmail(userEmail);

            if (userOptional.isPresent()) {
                UserTopicMap user = userOptional.get();
                com.aicademy.backend.topics.UserTopicMap userTopicMap = user.getUserTopicMap();
                System.out.println(user.getEmail()+"\n"+userEmail);
                // If user does not yet have a topic map, create a new one
                if (userTopicMap == null) {
                    userTopicMap = new com.aicademy.backend.topics.UserTopicMap();
                }

                // Fetch the list of topics for the given subject, or create a new list if none exist
                List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().getOrDefault(subject, new ArrayList<>());

                // Add the newly saved topic to the list
                topicList.add(savedTopic);

                // Update the map
                userTopicMap.getSubToTopicsMap().put(subject, topicList);

                // Save the updated topic map
                userTopicMap = userTopicMapRepository.save(userTopicMap);

                // Update the user entity with the reference to the new/updated UserTopicMap
                user.setUserTopicMap(userTopicMap);
                userRepository.save(user);
            } else {
                throw new RuntimeException("User with email " + userEmail + " not found");
            }

            return savedTopic;
        }


}
