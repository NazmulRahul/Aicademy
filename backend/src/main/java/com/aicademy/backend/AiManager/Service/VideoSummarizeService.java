package com.aicademy.backend.AiManager.Service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VideoSummarizeService {

    public void downloadCaptions(String videoUrl,String CAPTION_FILE_PATH) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "yt-dlp",
                "--write-auto-sub",       // Auto-generated subtitles
                "--sub-lang", "en",       // Subtitle language
                "--skip-download",        // Don't download the video, just the subtitles
                "--convert-subs", "srt",  // Convert to SRT format
                "-o", CAPTION_FILE_PATH,  // Output subtitle file
                videoUrl
        );

        processBuilder.redirectErrorStream(true);  // Merge standard error into standard output
        Process process = processBuilder.start();

        // Capture the yt-dlp output (useful for debugging)
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // Print yt-dlp output
            }
        }

        // Wait for the yt-dlp process to complete
        if (!process.waitFor(60, TimeUnit.SECONDS)) {
            throw new IOException("yt-dlp process timed out.");
        }

        // Check the exit value of the process
        if (process.exitValue() != 0) {
            throw new IOException("yt-dlp failed to download captions. Exit code: " + process.exitValue());
        }

        System.out.println("Captions downloaded successfully.");
    }


    public String readCaptionsFromFile(String filePath) throws IOException {
        StringBuilder captions = new StringBuilder();
        Path captionPath = Paths.get(filePath);
        if (!Files.exists(captionPath)) {
            throw new IOException("Caption file not found: " + filePath);
        }

        List<String> recentLines = new ArrayList<>();
        Files.lines(captionPath).forEach(line -> {

            if (!line.matches("\\d{2}:\\d{2}:\\d{2},\\d{3} --> \\d{2}:\\d{2}:\\d{2},\\d{3}") && !line.matches("\\d+")) {

                String trimmedLine = line.trim();

                if (!recentLines.contains(trimmedLine)) {
                    captions.append(trimmedLine).append("\n");

                    recentLines.add(trimmedLine);
                    if (recentLines.size() > 2) {
                        recentLines.remove(0);
                    }
                }
            }
        });

        String captionString=captions.toString();
        Pattern pattern = Pattern.compile("\\s+");
        Matcher matcher = pattern.matcher(captionString);
        return matcher.replaceAll(" ");
    }


}
