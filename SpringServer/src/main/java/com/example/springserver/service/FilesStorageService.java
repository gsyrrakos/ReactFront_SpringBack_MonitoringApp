package com.example.springserver.service;

import java.nio.file.Path;
import java.util.stream.Stream;

import com.example.springserver.model.CsvData;
import com.example.springserver.model.CsvReader;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FilesStorageService {
    public void init();

    public void save(MultipartFile file);

    public Resource load(String filename);

    public void deleteAll();




}