package com.aicademy.backend.AiManager.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
public class DocumentAIConfig {

    @Value("${PROJECT_ID}")
    private String PROJECT_ID;
    @Value("${LOCATION}")
    private String LOCATION;
    @Value("${PROCESSOR_ID}")
    private String PROCESSOR_ID;
    @Value("${CLIENT_EMAIL}")
    private String CLIENT_EMAIL;
    @Value("${PRIVATE_KEY}")
    private String PRIVATE_KEY;
    @Value("${PRIVATE_KEY_ID}")
    private String PRIVATE_KEY_ID;
    @Value("${CLIENT_ID}")
    private String CLIENT_ID;

    @Bean
    public DocumentProcessorServiceClient documentProcessorServiceClient() throws IOException {
        // Construct service account JSON content
        String serviceAccountJson = String.format("{"
                + "\"type\": \"service_account\","
                + "\"project_id\": \"%s\","
                + "\"private_key_id\": \"%s\","
                + "\"private_key\": \"%s\","
                + "\"client_email\": \"%s\","
                + "\"client_id\": \"%s\","
                + "\"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\","
                + "\"token_uri\": \"https://oauth2.googleapis.com/token\","
                + "\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\","
                + "\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/%s\""
                + "}",
                PROJECT_ID,
                PRIVATE_KEY_ID,
                PRIVATE_KEY.replace("\\n", "\n"), // Handle line breaks
                CLIENT_EMAIL,
                CLIENT_ID,
                CLIENT_EMAIL);

        // Convert service account JSON to credentials
        GoogleCredentials credentials = ServiceAccountCredentials
                .fromStream(new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8)));

        // Create settings for Document AI client
        DocumentProcessorServiceSettings settings = DocumentProcessorServiceSettings.newBuilder()
                .setCredentialsProvider(() -> credentials)
                .build();

        // Return a new client instance
        return DocumentProcessorServiceClient.create(settings);
    }

    @Bean("projectId")
    public String getProjectId() {
        return PROJECT_ID;
    }

    @Bean("location")
    public String getLocation() {
        return LOCATION;
    }

    @Bean("processorId")
    public String getProcessorId() {
        return PROCESSOR_ID;
    }
}
