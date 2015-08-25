package nodomain.stswoon.patterns.headfirst.duck;

public class FlyNoWay implements FlyBehaviour {
    @Override
    public void fly() {
        System.out.println("fly-no");
    }
}
