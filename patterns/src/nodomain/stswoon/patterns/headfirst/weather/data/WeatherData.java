package nodomain.stswoon.patterns.headfirst.weather.data;

import nodomain.stswoon.patterns.headfirst.weather.Observer;
import nodomain.stswoon.patterns.headfirst.weather.Subject;

import java.util.ArrayList;
import java.util.Collection;

public class WeatherData implements Subject {
    private Collection<Observer> observers = new ArrayList<>();
    private double t;
    private double h;
    private double p;

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observers);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(t, h, p);
        }
    }

    public void mesurementsChanged() {
        notifyObservers();
    }

    public void setMeasurements(double t, double h, double p) {
        this.t = t;
        this.h = h;
        this.p = p;
        mesurementsChanged();
    }
}
