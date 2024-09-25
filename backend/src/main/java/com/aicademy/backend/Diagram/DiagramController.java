package com.aicademy.backend.Diagram;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/public/diagram")
public class DiagramController {
    @Autowired
    DiagramService diagramService;
    @PostMapping()
    public ResponseEntity<?> generate(@RequestParam MultipartFile file)throws Exception{
        System.out.println("diagram generate api called");
        return ResponseEntity.ok().body(diagramService.generateDiagram(file));
    }
}
