package com.aicademy.backend.fileExtraction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/public/extractor")
@CrossOrigin
@RequiredArgsConstructor
@Validated
public class fileExtractorController {

    private final ContentExtractorService contentExtractorControl;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(OK)
    public ResponseEntity<ContentResponseDto> classify(@RequestParam("pdfFile") MultipartFile pdfFile) {
        return ResponseEntity.ok()
                .body(ContentResponseDto.builder().content(this.contentExtractorControl.extractContent(pdfFile)).build());

    }


}