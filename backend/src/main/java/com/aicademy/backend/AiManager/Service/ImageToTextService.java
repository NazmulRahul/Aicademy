package com.aicademy.backend.AiManager.Service;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.documentai.v1.*;
import com.google.common.collect.Lists;
import com.google.protobuf.ByteString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;
@Service
public class ImageToTextService {
    @Value("${documentai.project-id}")
    private String projectId;

    @Value("${documentai.location}")
    private String location;

    @Value("${documentai.processor-id}")
    private String processorId;

    @Value("${documentai.client-email}")
    private String clientEmail;

    @Value("${documentai.private-key}")
    private String privateKey;

    @Value("${documentai.private-key-Id}")
    private String privateKeyId;

    @Value("${documentai.clientId}")
    private String clientId;

    public String extractImage(MultipartFile file) throws IOException {

        byte[] fileBytes = file.getBytes();
        String encodedImage = Base64.getEncoder().encodeToString(fileBytes);


        try (DocumentProcessorServiceClient client = createClient()) {
            String name = String.format("projects/%s/locations/%s/processors/%s", projectId, location, processorId);

            RawDocument rawDocument = RawDocument.newBuilder()
                    .setContent(ByteString.copyFrom(fileBytes))
                    .setMimeType("image/jpeg")
                    .build();

            ProcessRequest request = ProcessRequest.newBuilder()
                    .setName(name)
                    .setRawDocument(rawDocument)
                    .build();

            ProcessResponse result = client.processDocument(request);
            Document document = result.getDocument();

            String documentText = document.getText();
            System.out.println(documentText);
            return documentText;
        } catch (Exception e) {
            return "Unable to create client";
        }
    }



    private DocumentProcessorServiceClient createClient() throws IOException {

        String jsonString = "{\"type\":\"service_account\",\"project_id\":\""+projectId+"\",\"private_key_id\":\""+privateKeyId+"\",\"private_key\":\""+privateKey+"\n\",\"client_email\":\""+clientEmail+"\",\"client_id\":\""+clientId+"\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email.iam.gserviceaccount.com\"}";
        System.out.println(jsonString);
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ByteArrayInputStream(jsonString.getBytes("UTF-8")))
                .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));
        System.out.println("hello");
        DocumentProcessorServiceSettings settings = DocumentProcessorServiceSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        System.out.println("hello 2");

        return DocumentProcessorServiceClient.create(settings);
    }
}
