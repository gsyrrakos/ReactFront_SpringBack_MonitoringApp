package com.example.springserver.model;

public class CsvData {
    private int Timestamp;
    private double PV;
    private double demand;
    private double battery;
    private double Hourly_Grid_Price;


    public int getTimestamp() {
        return Timestamp;
    }

    public double getPV() {
        return PV;
    }

    public double getDemand() {
        return demand;
    }

    public double getBattery() {
        return battery;
    }

    public double getHourly_Grid_Price() {
        return Hourly_Grid_Price;
    }

    public void setTimestamp(int timestamp) {
        Timestamp = timestamp;
    }

    public void setPV(double PV) {
        this.PV = PV;
    }

    public void setDemand(double demand) {
        this.demand = demand;
    }

    public void setBattery(double battery) {
        this.battery = battery;
    }

    public void setHourly_Grid_Price(double hourly_Grid_Price) {
        Hourly_Grid_Price = hourly_Grid_Price;
    }

    public String toString() {
        return "Data{" + "timestamp=" + this.getTimestamp() + ", pv='" + this.getPV() + '\'' + ", battary='" + this.getBattery() + '\'' + ", demand='" + this.getDemand() + '\'' + '}';
    }


}
