package nodomain.stswoon.patterns.headfirst.duckfrm.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.fly.FlyNoWay;
import nodomain.stswoon.patterns.headfirst.duckfrm.quack.Quack;

public class ModelDuck extends Duck {
    public ModelDuck() {
        flyBehaviour = new FlyNoWay();
        quackBehavior = new Quack();
    }

    @Override
    public void display() {
        System.out.println("ModelDuck");
    }
}
