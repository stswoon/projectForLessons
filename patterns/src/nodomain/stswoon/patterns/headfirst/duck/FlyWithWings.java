package nodomain.stswoon.patterns.headfirst.duck;

public class FlyWithWings implements FlyBehaviour {
    @Override
    public void fly() {
        System.out.println("fly-wings");
    }
}
