package com.aicademy.backend.Diagram;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.io.IOException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class DiagramService {

    @Value("${openai.api.key}")
    String API_KEY ;
    private static final String API_URL = "https://api.openai.com/v1/images/generations";

    public String generateDiagram(MultipartFile file)throws Exception {
        try {
            byte[] imageBytes = file.getBytes();

            // Construct HTTP Request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(API_URL))
                    .header("Authorization", "Bearer " + API_KEY)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(createRequestBody(imageBytes)))
                    .build();
            System.out.println("Request Sent to dall e 2");
            // Send HTTP Request and Get Response
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Handle the Response
            if (response.statusCode() == 200) {
                JSONObject jsonResponse = new JSONObject(response.body());
                String imageUrl = jsonResponse.getJSONArray("data").getJSONObject(0).getString("url");
                System.out.println("Generated image URL: " + imageUrl);

            return imageUrl;
            } else {
                throw new Exception("Error: " + response.body());
            }

        } catch (IOException | InterruptedException e) {
           throw new Exception("Unable to generate diagram");
        }

    }

    // Method to create JSON request body
    private static String createRequestBody(byte[] imageBytes) {
        // Replace this method with the actual JSON you need for the DALL·E API request
        String base64Image = java.util.Base64.getEncoder().encodeToString(imageBytes);

        JSONObject json = new JSONObject();
        json.put("model","dall-e-3");
        json.put("image", base64Image);
        json.put("prompt", "Convert this hand-drawn diagram to a digital diagram");
        json.put("size", "1024x1024"); // Customize size if needed

        // You may need to convert the image to a format supported by the API
        // For example, you might encode it in base64

        return json.toString();
    }
}
// model: "dall-e-2",
//         image: fs.createReadStream("sunlit_lounge.png"),
//         mask: fs.createReadStream("mask.png"),
//         prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
//         n: 1,
//         size: "1024x1024"