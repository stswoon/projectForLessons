package nodomain.stswoon.patterns.headfirst.duckfrm.fly;

public class FlyNoWay implements FlyBehaviour {
    @Override
    public void fly() {
        System.out.println("fly-no");
    }
}
