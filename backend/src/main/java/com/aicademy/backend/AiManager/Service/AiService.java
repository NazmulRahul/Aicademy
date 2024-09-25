package com.aicademy.backend.AiManager.Service;

import com.aicademy.backend.AiManager.DTO.ChatGPTRequest;
import com.aicademy.backend.AiManager.DTO.ChatGptResponse;
import com.aicademy.backend.AiManager.DTO.GenerationResponse;
import com.aicademy.backend.AiManager.DTO.ImageGenerationRequest;
import com.aicademy.backend.fileManager.Service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;

@Service
public class AiService {

    @Value("${openai.model}")
    private String model;
    @Value(("${openai.api.url}"))
    private String apiURL;
    @Autowired
    private RestTemplate template;
    @Autowired
    FirebaseService firebaseService;

    public String generateQuiz(String text,String totalQuestions,String level){
        System.out.println(totalQuestions);
        String prompt="You are a quiz master. Generate "+ totalQuestions +
                " random questions with 4 multiple choice answers. From this text " + text +
                " . The questions should be " + level + " level. Also provide the answers separately. " +
                "The answer should be in the following json  format and provide clean JSON string without escape " +
                "characters and new lines:{\"questions\":[{\"id\":0,\"question\":\"\",\"options\":[],\"answer\":\"\"},..]} " +
                "options must be indexed 'A','B','C','D' and so on.and answer should only contain 'A','B','C' and so on. Only send the question data nothing else";

        return sendSinglePrompt(prompt," Quiz");
    }

    public String generateImage(String prompt, int n, String size) throws Exception {
        String url = "https://api.openai.com/v1/images/generations";

        ImageGenerationRequest requestBody = new ImageGenerationRequest("dall-e-2", prompt, n, size);
        System.out.println("Generation request send");
        GenerationResponse response = template.postForObject(url, requestBody, GenerationResponse.class);
        if(response==null) throw new Exception("Dall e returned null");
        return response.getData().get(0).getUrl();
    }

    public File downloadImage(String imageUrl, String fileName) throws IOException {
        try {
            URL url = new URL(imageUrl);
            ReadableByteChannel rbc = Channels.newChannel(url.openStream());
            FileOutputStream fos = new FileOutputStream(fileName);

            fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
            fos.close();
            System.out.println("Image downloaded successfully!");
            return new File(fileName);
        } catch (MalformedURLException e) {
            System.err.println("Invalid image URL: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("Error downloading image: " + e.getMessage());
        }
        return null;
    }
    public String sendSinglePrompt(String prompt,String ErrorMessage){
        ChatGPTRequest request=new ChatGPTRequest(model, prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        return chatGptResponse != null
                ? chatGptResponse.getChoices().get(0).getMessage().getContent()
                : "Ai returned null while generating "+ErrorMessage;
    }

}
