package nodomain.stswoon.patterns.headfirst.weather.display;

import nodomain.stswoon.patterns.headfirst.weather.data.WeatherData;

import java.util.Observable;
import java.util.Observer;

public class CurrentConditionDisplay implements Observer, DisplayElement {
    private double t;
    private double h;
    private Observable observable;

    public CurrentConditionDisplay(Observable observable) {
        this.observable = observable;
        observable.addObserver(this);
    }

    @Override
    public void display() {
        System.out.println("Current condition: T=" + t + " H=" + h);
    }

    @Override
    public void update(Observable o, Object arg) {
        if (o instanceof WeatherData) {
            t = ((WeatherData) o).getT();
            h = ((WeatherData) o).getH();
            display();
        }
    }
}
