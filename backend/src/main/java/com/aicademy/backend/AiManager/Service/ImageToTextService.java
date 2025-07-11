package com.aicademy.backend.AiManager.Service;

import com.google.cloud.documentai.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ImageToTextService {

    private static final Logger logger = LoggerFactory.getLogger(ImageToTextService.class);

    @Autowired
    private DocumentProcessorServiceClient documentProcessorServiceClient;

    @Autowired
    @Qualifier("projectId")
    private String projectId;

    @Autowired
    @Qualifier("location")
    private String location;

    @Autowired
    @Qualifier("processorId")
    private String processorId;

    public String extractImage(MultipartFile file) throws IOException {
        byte[] fileBytes = file.getBytes();

        try {
            String name = String.format("projects/%s/locations/%s/processors/%s", projectId, location, processorId);

            RawDocument rawDocument = RawDocument.newBuilder()
                    .setContent(ByteString.copyFrom(fileBytes))
                    .setMimeType("image/jpeg")
                    .build();

            ProcessRequest request = ProcessRequest.newBuilder()
                    .setName(name)
                    .setRawDocument(rawDocument)
                    .build();

            ProcessResponse result = documentProcessorServiceClient.processDocument(request);
            Document document = result.getDocument();

            String documentText = document.getText();
            logger.info("Extracted document text: {}", documentText);
            return documentText;
        } catch (Exception e) {
            logger.error("Failed to extract image text: ", e);
            return "Unable to process document";
        }
    }
}
