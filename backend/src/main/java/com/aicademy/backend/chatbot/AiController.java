package com.aicademy.backend.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping("/public/bot2")
public class AiController {

    @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    @Autowired
    private RestTemplate template;
    @PostMapping("/chat")
    public ResponseEntity<ResponseDTO> chat(@RequestParam("prompt") String prompt){
        System.out.println(prompt);
        ChatGPTRequest request=new ChatGPTRequest(model, prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        String response= chatGptResponse != null ? chatGptResponse.getChoices().get(0).getMessage().getContent() : "Ai returned null";

        System.out.println(response);
        return ResponseEntity.ok()
                .body(ResponseDTO.builder().content(response).build());

    }

    @PostMapping("/quiz")
    public ResponseEntity<ResponseDTO> quiz(@RequestBody quizDataDTO data){
        String prompt="You are a quiz master. Generate 5 random questions with 4 multiple choice answers. From this text "+data.getText()+" . The questions should be "+data.getLevel()+" level. Also provide the answers separately. The answer should be in the following json  format and provide clean JSON string without escape characters and new lines:{\"question\":[{\"id\":0,\"question\":\"\",\"options\":[],\"answer\":\"\"},..]} options must be indexed 'A','B','C','D' and so on. and answer should only contain 'A','B','C' and so on";
        ChatGPTRequest request=new ChatGPTRequest(model, prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        return ResponseEntity.ok()
                .body(ResponseDTO.builder()
                        .content(chatGptResponse != null ? chatGptResponse
                                .getChoices().get(0).getMessage().getContent() : "Ai returned null in quiz api")
                        .build()) ;
    }

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok().body("Test Successful");
    }

}
