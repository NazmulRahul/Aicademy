package com.aicademy.backend.fileManager.Service;

import com.aicademy.backend.security.models.userEntity;
import com.aicademy.backend.security.repository.UserRepository;
import com.aicademy.backend.fileManager.Repository.TopicRepository;
import com.aicademy.backend.fileManager.Repository.UserTopicMapRepository;
import com.aicademy.backend.fileManager.models.FileEntity;
import com.aicademy.backend.fileManager.models.UserTopicMap;
import com.aicademy.backend.fileManager.models.topicEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {


        @Autowired
        TopicRepository topicRepository;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private UserTopicMapRepository userTopicMapRepository;

        @Transactional
        public void addTopic(topicEntity topic, String userEmail, String subject) {

            topicEntity savedTopic = topicRepository.save(topic);
            System.out.println(userEmail+subject);

            Optional<userEntity> userOptional = userRepository.findByEmail(userEmail);

            if (userOptional.isPresent()) {
                System.out.println(userOptional.get().getName());
                userEntity user = userOptional.get();

                UserTopicMap userTopicMap = user.getTopics();
                System.out.println(user.getEmail()+"\n"+userEmail);

                if (userTopicMap == null) {
                    userTopicMap = new UserTopicMap();
                }

                List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().getOrDefault(subject, new ArrayList<>());

                topicList.add(savedTopic);

                userTopicMap.getSubToTopicsMap().put(subject, topicList);

                userTopicMap = userTopicMapRepository.save(userTopicMap);

                user.setTopics(userTopicMap);
                userRepository.save(user);
            } else {
                throw new RuntimeException("User with email " + userEmail + " not found");
            }

        }

        public UserTopicMap getAllTopics(String email){

            userEntity user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println(user);
            return user.getTopics();
        }

    public void addSubject(String email, String subject) {

        updateUserTopics(email, subject, new ArrayList<>());
    }

    private UserTopicMap updateUserTopics(String email, String subject, List<topicEntity> topics) {
        Optional<userEntity> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        userEntity user = userOptional.get();
        System.out.println(user.getName());
        System.out.println(user.getEmail() + "\n" + email);

        UserTopicMap userTopicMap = user.getTopics();

        if (userTopicMap == null) {
            userTopicMap = new UserTopicMap();
        }

        List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().getOrDefault(subject, new ArrayList<>());
        topicList.addAll(topics); // Add the passed topics to the existing list

        userTopicMap.getSubToTopicsMap().put(subject, topicList);
        userTopicMap = userTopicMapRepository.save(userTopicMap);

        user.setTopics(userTopicMap);
        userRepository.save(user);

        return userTopicMap;
    }

    public void deleteNote(String email,String subject,String topicName,FileEntity file) throws Exception {
        Optional<userEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        userEntity user = userOptional.get();

        System.out.println(user.getEmail() + "\n" + email);

        UserTopicMap userTopicMap = user.getTopics();

        if (userTopicMap == null) { userTopicMap = new UserTopicMap(); }
        List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().get(subject);

        if(topicList==null)throw new Exception("This Subject does not Exist");

        for (topicEntity topic : topicList) {
            if (topic.getTopicName().equals(topicName)) {
                topic.getFilePath().remove(file);
                break;
            }
        }

        userTopicMap.getSubToTopicsMap().put(subject, topicList);
        userTopicMap = userTopicMapRepository.save(userTopicMap);
        user.setTopics(userTopicMap);
        userRepository.save(user);

    }
    public void deleteTopic(String email,String subject,String topicName) throws Exception {
        Optional<userEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        userEntity user = userOptional.get();

        System.out.println(user.getEmail() + "\n" + email);

        UserTopicMap userTopicMap = user.getTopics();

        if (userTopicMap == null) { userTopicMap = new UserTopicMap(); }
        List<topicEntity> topicList = userTopicMap.getSubToTopicsMap().get(subject);

        if(topicList==null)throw new Exception("This Subject does not Exist");

        for (topicEntity topic : topicList) {
            if (topic.getTopicName().equals(topicName)) {
                topicList.remove(topic);
                break;
            }
        }

        userTopicMap.getSubToTopicsMap().put(subject, topicList);
        userTopicMap = userTopicMapRepository.save(userTopicMap);
        user.setTopics(userTopicMap);
        userRepository.save(user);

    }
    public void deleteSubject(String email,String subject) throws Exception {
        Optional<userEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        userEntity user = userOptional.get();

        System.out.println(user.getEmail() + "\n" + email);

        UserTopicMap userTopicMap = user.getTopics();

        if (userTopicMap == null) { userTopicMap = new UserTopicMap(); }

        userTopicMap.getSubToTopicsMap().remove(subject);

        System.out.println("subject Deleted Success");
        user.setTopics( userTopicMapRepository.save(userTopicMap));
        userRepository.save(user);

    }

}
