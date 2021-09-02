package com.example.springserver;


import com.example.springserver.service.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;
import java.io.IOException;

@SpringBootApplication
public class SpringServerApplication implements CommandLineRunner {
    @Resource
    FilesStorageService storageService;

    public static void main(String[] args) throws IOException {
        SpringApplication.run(SpringServerApplication.class, args);



    }

    @Override
    public void run(String... args) throws Exception {
        storageService.deleteAll();
        storageService.init();

    }
}
