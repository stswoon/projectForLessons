package nodomain.stswoon.patterns.headfirst.duckfrm;

import nodomain.stswoon.patterns.headfirst.duckfrm.duck.Duck;
import nodomain.stswoon.patterns.headfirst.duckfrm.duck.MallardDuck;
import nodomain.stswoon.patterns.headfirst.duckfrm.fly.FlyRocketPowered;

public class MainDuckSimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.performFly();
        mallard.setFlyBehaviour(new FlyRocketPowered());
        mallard.performFly();
        mallard.performQuack();
        mallard.display();
        mallard.swim();
    }
}
