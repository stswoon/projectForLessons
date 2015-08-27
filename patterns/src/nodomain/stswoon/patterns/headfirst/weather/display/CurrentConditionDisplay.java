package nodomain.stswoon.patterns.headfirst.weather.display;

import nodomain.stswoon.patterns.headfirst.weather.Observer;
import nodomain.stswoon.patterns.headfirst.weather.Subject;

public class CurrentConditionDisplay implements Observer, DisplayElement {
    private double t;
    private double h;
    private Subject subject;

    public CurrentConditionDisplay(Subject subject) {
        this.subject = subject;
        subject.registerObserver(this);
    }

    @Override
    public void display() {
        System.out.println("Current condition: T="+t+" H="+h);
    }

    @Override
    public void update(double t, double h, double p) {
        this.t = t;
        this.h = h;
        display();
    }
}
