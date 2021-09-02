package com.example.springserver.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.example.springserver.model.CsvData;
import com.example.springserver.model.CsvReader;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.springserver.message.ResponseMessage;
import com.example.springserver.service.FilesStorageService;

@Controller
@CrossOrigin
public class FilesController {

    @Autowired
    FilesStorageService storageService;
    CsvReader read = new CsvReader();
    private String path = Paths.get("csvDefault").toAbsolutePath().toString() + "/energy time series data George.csv";
    private final Path root = Paths.get("uploads");

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            storageService.save(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    int k = 0;

    @Scheduled(cron = "*/10000 * * * * ")
    @GetMapping("/files")

    public ResponseEntity<CsvData> getListFiles() throws IOException {
        if (!checkUpload()) {
            System.out.println(path);

        } else {
            System.out.println(" yparxei");
            path = root.toAbsolutePath().toString() + "/energy time series data George.csv";
        }

        List<CsvData> result = read.readFile(path);
        List<String> data = new ArrayList<>();
        for (int i = 0; i < result.size(); i++) {
            data.add(result.get(i).toString());

        }
        if (k < result.size()) {
            k++;
        } else {
            k = k - 1;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result.get(k));
    }

    private boolean checkUpload() {
        boolean empty = true;

        File[] contents = root.toFile().listFiles();
        if (contents == null) {
            empty = true;
            return empty;
        }
// Folder is empty
        else if (contents.length == 0) {
            empty = false;
            return empty;
        }
// Folder contains files

        return empty;
    }
}
