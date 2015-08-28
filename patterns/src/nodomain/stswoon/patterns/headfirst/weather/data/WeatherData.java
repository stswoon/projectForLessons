package nodomain.stswoon.patterns.headfirst.weather.data;

import java.util.Observable;

public class WeatherData extends Observable {
    private double t;
    private double h;
    private double p;

    public void mesurementsChanged() {
        setChanged();
        notifyObservers();
    }

    public void setMeasurements(double t, double h, double p) {
        this.t = t;
        this.h = h;
        this.p = p;
        mesurementsChanged();
    }

    public double getT() {
        return t;
    }

    public double getH() {
        return h;
    }

    public double getP() {
        return p;
    }
}
