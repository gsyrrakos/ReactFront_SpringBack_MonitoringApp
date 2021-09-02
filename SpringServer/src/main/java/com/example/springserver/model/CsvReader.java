package com.example.springserver.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CsvReader {
    public List<CsvData> readFile(String fileName) throws IOException {
        List<CsvData> result = new ArrayList<CsvData>();
        BufferedReader br = new BufferedReader(new FileReader(new File(fileName)));
        try {
            // Read first line
            String line = br.readLine();

            if (line == null) throw new IllegalArgumentException("File is empty");
            if (!line.equals("Timestamp (Sec),PV (kWh),demand (kWh),battery (kWh),Hourly Grid Price"))
                throw new IllegalArgumentException("File has wrong columns: " + line);

            while ((line = br.readLine()) != null) {

                String[] items = line.split(",");
                try {
                    // If there are too many entries, throw a dummy exception, if
                    if (items.length > 5) throw new ArrayIndexOutOfBoundsException();
                    // Convert data to csvData record
                    CsvData csvData = new CsvData();

                    csvData.setTimestamp(Integer.parseInt(items[0]));
                    csvData.setBattery(Double.parseDouble(items[3]));
                    csvData.setDemand(Double.parseDouble(items[2]));
                    csvData.setHourly_Grid_Price(Double.parseDouble(items[4]));
                    csvData.setPV(Double.parseDouble(items[1]));


                    result.add(csvData);
                } catch (ArrayIndexOutOfBoundsException | NumberFormatException | NullPointerException e) {

                    System.out.println(e);
                }
            }
            //System.out.println(result.get(0).getBattery());
            return result;

        } finally {

            br.close();
        }
    }

}




