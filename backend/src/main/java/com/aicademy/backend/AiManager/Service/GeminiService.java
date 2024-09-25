package com.aicademy.backend.AiManager.Service;

import com.aicademy.backend.fileManager.models.topicEntity;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GeminiService {

    String apiKey = "Your-gemini-api-key";
    String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;


    public String generate(String prompt){
        try {
            JsonObject textPart = new JsonObject();
            textPart.addProperty("text", prompt);

            JsonObject partsObject = new JsonObject();
            partsObject.add("parts", textPart);

            JsonObject contentsObject = new JsonObject();
            contentsObject.add("contents", partsObject);


            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(contentsObject.toString()))
                    .build();


            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());


            JsonObject responseObject = JsonParser.parseString(response.body()).getAsJsonObject();
            String story=responseObject.getAsJsonArray("candidates")
                    .get(0).getAsJsonObject()
                    .get("content").getAsJsonObject()
                    .getAsJsonArray("parts")
                    .get(0).getAsJsonObject()
                    .get("text").getAsString();
            System.out.println(story);

            return story;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Error("Unable to generate story");
        }
    }
}
