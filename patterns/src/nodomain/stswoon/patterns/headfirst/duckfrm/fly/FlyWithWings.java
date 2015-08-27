package nodomain.stswoon.patterns.headfirst.duckfrm.fly;

public class FlyWithWings implements FlyBehaviour {
    @Override
    public void fly() {
        System.out.println("fly-wings");
    }
}
