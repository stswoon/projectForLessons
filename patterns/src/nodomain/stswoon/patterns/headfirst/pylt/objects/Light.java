package nodomain.stswoon.patterns.headfirst.pylt.objects;

public class Light {
    private final String concreteLamp;

    public Light(String concreteLamp) {
        this.concreteLamp = concreteLamp;
    }

    public void on() {
        System.out.println("Light (" + concreteLamp + ") on");
    }

    public void off() {
        System.out.println("Light (" + concreteLamp + ") off");
    }
}
